'reach 0.1';
'use strict';

/* eslint-disable */

// TYPES
const TransferParams = Object({
    token: Token,
    amountToken: UInt,
    amountAlgo: UInt,
    time: UInt
});

// INTERFACES
const Common = {
    seeTimeout: Fun([], Null),
    seeTransfer: Fun([], Null),
};

export const main = Reach.App(() => {
    const A = Participant('Alice', {
        ...Common,
        getSwap: Fun([], TransferParams)
    });

    const B = Participant('Bob', {
        ...Common,
        acceptSwap: Fun([TransferParams], Bool)
    });

    deploy();

    A.only(() => {
        const { token, amountToken, amountAlgo, time } = declassify(interact.getSwap());
    });
    A.publish(token, amountToken, amountAlgo, time);

    commit();

    A.pay([[amountToken, token]]);

    commit();

    B.only(() => {
        const transferAccepted = declassify(interact.acceptSwap({
            token, amountToken, amountAlgo, time
        }));
    });
    B.pay(amountAlgo).when(transferAccepted).timeout(
        relativeSecs(time), () => {
            A.publish();
            transfer(amountToken, token).to(A);
            each([A, B], () => interact.seeTimeout());
            commit();
            exit();
        }
    );

    transfer(amountAlgo).to(A);
    transfer([[amountToken, token]]).to(B);
    each([A, B], () => interact.seeTransfer());

    commit();
    exit();
});
