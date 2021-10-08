'reach 0.1';
'use strict';

/* eslint-disable */

/*
 * Example atomic swap contract from Reach repository
 * https://github.com/reach-sh/reach-lang/blob/master/examples/atomic-swap/index.rsh
 */

// TYPES
const TransferParams = Object({
    tokenA: Token,
    amountA: UInt,
    tokenB: Token,
    amountB: UInt,
    time: UInt
})

// INTERFACES
const Common = {
    seeTimeout: Fun([], Null),
    seeTransfer: Fun([], Null),
};

export const main = Reach.App(() => {
    const A = Participant('Alice', {
        ...Common,
        // token A, amount A, token B, amount B, timeout
        getSwap: Fun([], TransferParams),
    });
    const B = Participant('Bob', {
        ...Common,
        accSwap: Fun([TransferParams], Bool),
    });
    deploy();

    A.only(() => {
        const { tokenA, amountA, tokenB, amountB, time } = declassify(interact.getSwap());
        assume(tokenA != tokenB);
    });
    A.publish(tokenA, amountA, tokenB, amountB, time);
    commit();
    A.pay([[amountA, tokenA]]);
    commit();

    B.only(() => {
        const bwhen = declassify(interact.accSwap({ tokenA, amountA, tokenB, amountB, time }));
    });
    B.pay([[amountB, tokenB]])
        .when(bwhen)
        .timeout(relativeSecs(time), () => {
            A.publish();
            transfer(amountA, tokenA).to(A);
            each([A, B], () => interact.seeTimeout());
            commit();
            exit();
        });
    transfer(amountB, tokenB).to(A);
    transfer([[amountA, tokenA]]).to(B);
    each([A, B], () => interact.seeTransfer());
    commit();

    exit();
});
