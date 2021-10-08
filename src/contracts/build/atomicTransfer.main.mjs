// Automatically generated with Reach 0.1.5
/* eslint-disable */
export const _version = '0.1.5';
export const _backendVersion = 3;


export function getExports(s) {
  const stdlib = s.reachStdlib;
  return {
    };
  };

export function _getViews(s, viewlib) {
  const stdlib = s.reachStdlib;
  const ctc0 = stdlib.T_Address;
  const ctc1 = stdlib.T_Token;
  const ctc2 = stdlib.T_UInt;
  
  return {
    infos: {
      },
    views: {
      1: [ctc0, ctc1, ctc2, ctc1, ctc2, ctc2],
      2: [ctc0, ctc1, ctc2, ctc1, ctc2, ctc2]
      }
    };
  
  };

export function _getMaps(s) {
  const stdlib = s.reachStdlib;
  const ctc0 = stdlib.T_Tuple([]);
  return {
    mapDataTy: ctc0
    };
  };

export async function Alice(ctc, interact) {
  if (typeof(ctc) !== 'object' || ctc.sendrecv === undefined) {
    return Promise.reject(new Error(`The backend for Alice expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for Alice expects to receive an interact object as its second argument.`));}
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_UInt;
  const ctc1 = stdlib.T_Token;
  const ctc2 = stdlib.T_Object({
    amountA: ctc0,
    amountB: ctc0,
    time: ctc0,
    tokenA: ctc1,
    tokenB: ctc1
    });
  const ctc3 = stdlib.T_Null;
  const ctc4 = stdlib.T_Address;
  
  
  const v111 = stdlib.protect(ctc2, await interact.getSwap(), {
    at: './atomicTransfer.rsh:39:87:application',
    fs: ['at ./atomicTransfer.rsh:38:11:application call to [unknown function] (defined at: ./atomicTransfer.rsh:38:15:function exp)'],
    msg: 'getSwap',
    who: 'Alice'
    });
  const v112 = v111.tokenA;
  const v113 = v111.amountA;
  const v114 = v111.tokenB;
  const v115 = v111.amountB;
  const v116 = v111.time;
  const v117 = stdlib.tokenEq(v112, v114);
  const v118 = v117 ? false : true;
  stdlib.assert(v118, {
    at: './atomicTransfer.rsh:40:15:application',
    fs: ['at ./atomicTransfer.rsh:38:11:application call to [unknown function] (defined at: ./atomicTransfer.rsh:38:15:function exp)'],
    msg: null,
    who: 'Alice'
    });
  
  const txn1 = await (ctc.sendrecv({
    args: [v112, v113, v114, v115, v116],
    evt_cnt: 5,
    funcNum: 0,
    lct: stdlib.checkedBigNumberify('./atomicTransfer.rsh:42:7:dot', stdlib.UInt_max, 0),
    onlyIf: true,
    out_tys: [ctc1, ctc0, ctc1, ctc0, ctc0],
    pay: [stdlib.checkedBigNumberify('./atomicTransfer.rsh:decimal', stdlib.UInt_max, 0), []],
    sim_p: (async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], mapsPrev: [], mapsNext: [] };
      
      const {data: [v120, v121, v122, v123, v124], secs: v126, time: v125, didSend: v39, from: v119 } = txn1;
      
      const v127 = stdlib.tokenEq(v120, v122);
      const v128 = v127 ? false : true;
      stdlib.assert(v128, {
        at: './atomicTransfer.rsh:42:7:dot',
        fs: [],
        msg: null,
        who: 'Alice'
        });
      sim_r.txns.push({
        amt: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, 0),
        kind: 'init',
        tok: v120
        });
      sim_r.txns.push({
        amt: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, 0),
        kind: 'init',
        tok: v122
        });
      sim_r.txns.push({
        amt: stdlib.checkedBigNumberify('./atomicTransfer.rsh:decimal', stdlib.UInt_max, 0),
        kind: 'to',
        tok: undefined
        });
      sim_r.isHalt = false;
      
      return sim_r;
      }),
    soloSend: true,
    timeoutAt: undefined,
    tys: [ctc1, ctc0, ctc1, ctc0, ctc0],
    waitIfNotPresent: false
    }));
  const {data: [v120, v121, v122, v123, v124], secs: v126, time: v125, didSend: v39, from: v119 } = txn1;
  const v127 = stdlib.tokenEq(v120, v122);
  const v128 = v127 ? false : true;
  stdlib.assert(v128, {
    at: './atomicTransfer.rsh:42:7:dot',
    fs: [],
    msg: null,
    who: 'Alice'
    });
  ;
  ;
  ;
  const txn2 = await (ctc.sendrecv({
    args: [v119, v120, v121, v122, v123, v124],
    evt_cnt: 0,
    funcNum: 1,
    lct: v125,
    onlyIf: true,
    out_tys: [],
    pay: [stdlib.checkedBigNumberify('./atomicTransfer.rsh:44:7:dot', stdlib.UInt_max, 0), [[v121, v120]]],
    sim_p: (async (txn2) => {
      const sim_r = { txns: [], mapRefs: [], mapsPrev: [], mapsNext: [] };
      
      const {data: [], secs: v132, time: v131, didSend: v47, from: v130 } = txn2;
      
      sim_r.txns.push({
        amt: stdlib.checkedBigNumberify('./atomicTransfer.rsh:44:7:dot', stdlib.UInt_max, 0),
        kind: 'to',
        tok: undefined
        });
      sim_r.txns.push({
        amt: v121,
        kind: 'to',
        tok: v120
        });
      const v136 = stdlib.addressEq(v119, v130);
      stdlib.assert(v136, {
        at: './atomicTransfer.rsh:44:7:dot',
        fs: [],
        msg: 'sender correct',
        who: 'Alice'
        });
      const v138 = stdlib.add(v132, v124);
      sim_r.isHalt = false;
      
      return sim_r;
      }),
    soloSend: true,
    timeoutAt: undefined,
    tys: [ctc4, ctc1, ctc0, ctc1, ctc0, ctc0],
    waitIfNotPresent: false
    }));
  const {data: [], secs: v132, time: v131, didSend: v47, from: v130 } = txn2;
  ;
  ;
  const v136 = stdlib.addressEq(v119, v130);
  stdlib.assert(v136, {
    at: './atomicTransfer.rsh:44:7:dot',
    fs: [],
    msg: 'sender correct',
    who: 'Alice'
    });
  const v138 = stdlib.add(v132, v124);
  const txn3 = await (ctc.recv({
    didSend: false,
    evt_cnt: 0,
    funcNum: 2,
    out_tys: [],
    timeoutAt: ['secs', v138],
    waitIfNotPresent: false
    }));
  if (txn3.didTimeout) {
    const txn4 = await (ctc.sendrecv({
      args: [v119, v120, v121, v122, v123, v138],
      evt_cnt: 0,
      funcNum: 3,
      lct: v131,
      onlyIf: true,
      out_tys: [],
      pay: [stdlib.checkedBigNumberify('./atomicTransfer.rsh:decimal', stdlib.UInt_max, 0), []],
      sim_p: (async (txn4) => {
        const sim_r = { txns: [], mapRefs: [], mapsPrev: [], mapsNext: [] };
        
        const {data: [], secs: v168, time: v167, didSend: v90, from: v166 } = txn4;
        
        sim_r.txns.push({
          amt: stdlib.checkedBigNumberify('./atomicTransfer.rsh:decimal', stdlib.UInt_max, 0),
          kind: 'to',
          tok: undefined
          });
        const v170 = stdlib.addressEq(v119, v166);
        stdlib.assert(v170, {
          at: './atomicTransfer.rsh:53:15:dot',
          fs: [],
          msg: 'sender correct',
          who: 'Alice'
          });
        sim_r.txns.push({
          amt: v121,
          kind: 'from',
          to: v119,
          tok: v120
          });
        
        sim_r.txns.push({
          kind: 'halt',
          tok: v122
          })
        sim_r.txns.push({
          kind: 'halt',
          tok: v120
          })
        sim_r.txns.push({
          kind: 'halt',
          tok: undefined
          })
        sim_r.isHalt = true;
        
        return sim_r;
        }),
      soloSend: true,
      timeoutAt: undefined,
      tys: [ctc4, ctc1, ctc0, ctc1, ctc0, ctc0],
      waitIfNotPresent: false
      }));
    const {data: [], secs: v168, time: v167, didSend: v90, from: v166 } = txn4;
    ;
    const v170 = stdlib.addressEq(v119, v166);
    stdlib.assert(v170, {
      at: './atomicTransfer.rsh:53:15:dot',
      fs: [],
      msg: 'sender correct',
      who: 'Alice'
      });
    ;
    stdlib.protect(ctc3, await interact.seeTimeout(), {
      at: './atomicTransfer.rsh:55:51:application',
      fs: ['at ./atomicTransfer.rsh:55:17:application call to [unknown function] (defined at: ./atomicTransfer.rsh:55:29:function exp)'],
      msg: 'seeTimeout',
      who: 'Alice'
      });
    
    return;
    }
  else {
    const {data: [], secs: v146, time: v145, didSend: v59, from: v144 } = txn3;
    ;
    ;
    ;
    ;
    stdlib.protect(ctc3, await interact.seeTransfer(), {
      at: './atomicTransfer.rsh:61:44:application',
      fs: ['at ./atomicTransfer.rsh:61:9:application call to [unknown function] (defined at: ./atomicTransfer.rsh:61:21:function exp)'],
      msg: 'seeTransfer',
      who: 'Alice'
      });
    
    return;}
  
  
  
  };
export async function Bob(ctc, interact) {
  if (typeof(ctc) !== 'object' || ctc.sendrecv === undefined) {
    return Promise.reject(new Error(`The backend for Bob expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for Bob expects to receive an interact object as its second argument.`));}
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Token;
  const ctc1 = stdlib.T_UInt;
  const ctc2 = stdlib.T_Bool;
  const ctc3 = stdlib.T_Null;
  const ctc4 = stdlib.T_Address;
  
  
  const txn1 = await (ctc.recv({
    didSend: false,
    evt_cnt: 5,
    funcNum: 0,
    out_tys: [ctc0, ctc1, ctc0, ctc1, ctc1],
    timeoutAt: undefined,
    waitIfNotPresent: false
    }));
  const {data: [v120, v121, v122, v123, v124], secs: v126, time: v125, didSend: v39, from: v119 } = txn1;
  const v127 = stdlib.tokenEq(v120, v122);
  const v128 = v127 ? false : true;
  stdlib.assert(v128, {
    at: './atomicTransfer.rsh:42:7:dot',
    fs: [],
    msg: null,
    who: 'Bob'
    });
  ;
  ;
  ;
  const txn2 = await (ctc.recv({
    didSend: false,
    evt_cnt: 0,
    funcNum: 1,
    out_tys: [],
    timeoutAt: undefined,
    waitIfNotPresent: false
    }));
  const {data: [], secs: v132, time: v131, didSend: v47, from: v130 } = txn2;
  ;
  ;
  const v136 = stdlib.addressEq(v119, v130);
  stdlib.assert(v136, {
    at: './atomicTransfer.rsh:44:7:dot',
    fs: [],
    msg: 'sender correct',
    who: 'Bob'
    });
  const v138 = stdlib.add(v132, v124);
  const v142 = {
    amountA: v121,
    amountB: v123,
    time: v124,
    tokenA: v120,
    tokenB: v122
    };
  const v143 = stdlib.protect(ctc2, await interact.accSwap(v142), {
    at: './atomicTransfer.rsh:48:50:application',
    fs: ['at ./atomicTransfer.rsh:47:11:application call to [unknown function] (defined at: ./atomicTransfer.rsh:47:15:function exp)'],
    msg: 'accSwap',
    who: 'Bob'
    });
  
  const txn3 = await (ctc.sendrecv({
    args: [v119, v120, v121, v122, v123, v138],
    evt_cnt: 0,
    funcNum: 2,
    lct: v131,
    onlyIf: v143,
    out_tys: [],
    pay: [stdlib.checkedBigNumberify('./atomicTransfer.rsh:50:7:dot', stdlib.UInt_max, 0), [[v123, v122]]],
    sim_p: (async (txn3) => {
      const sim_r = { txns: [], mapRefs: [], mapsPrev: [], mapsNext: [] };
      
      const {data: [], secs: v146, time: v145, didSend: v59, from: v144 } = txn3;
      
      sim_r.txns.push({
        amt: stdlib.checkedBigNumberify('./atomicTransfer.rsh:50:7:dot', stdlib.UInt_max, 0),
        kind: 'to',
        tok: undefined
        });
      sim_r.txns.push({
        amt: v123,
        kind: 'to',
        tok: v122
        });
      sim_r.txns.push({
        amt: v123,
        kind: 'from',
        to: v119,
        tok: v122
        });
      sim_r.txns.push({
        amt: v121,
        kind: 'from',
        to: v144,
        tok: v120
        });
      
      sim_r.txns.push({
        kind: 'halt',
        tok: v122
        })
      sim_r.txns.push({
        kind: 'halt',
        tok: v120
        })
      sim_r.txns.push({
        kind: 'halt',
        tok: undefined
        })
      sim_r.isHalt = true;
      
      return sim_r;
      }),
    soloSend: true,
    timeoutAt: ['secs', v138],
    tys: [ctc4, ctc0, ctc1, ctc0, ctc1, ctc1],
    waitIfNotPresent: false
    }));
  if (txn3.didTimeout) {
    const txn4 = await (ctc.recv({
      didSend: false,
      evt_cnt: 0,
      funcNum: 3,
      out_tys: [],
      timeoutAt: undefined,
      waitIfNotPresent: false
      }));
    const {data: [], secs: v168, time: v167, didSend: v90, from: v166 } = txn4;
    ;
    const v170 = stdlib.addressEq(v119, v166);
    stdlib.assert(v170, {
      at: './atomicTransfer.rsh:53:15:dot',
      fs: [],
      msg: 'sender correct',
      who: 'Bob'
      });
    ;
    stdlib.protect(ctc3, await interact.seeTimeout(), {
      at: './atomicTransfer.rsh:55:51:application',
      fs: ['at ./atomicTransfer.rsh:55:17:application call to [unknown function] (defined at: ./atomicTransfer.rsh:55:29:function exp)'],
      msg: 'seeTimeout',
      who: 'Bob'
      });
    
    return;
    }
  else {
    const {data: [], secs: v146, time: v145, didSend: v59, from: v144 } = txn3;
    ;
    ;
    ;
    ;
    stdlib.protect(ctc3, await interact.seeTransfer(), {
      at: './atomicTransfer.rsh:61:44:application',
      fs: ['at ./atomicTransfer.rsh:61:9:application call to [unknown function] (defined at: ./atomicTransfer.rsh:61:21:function exp)'],
      msg: 'seeTransfer',
      who: 'Bob'
      });
    
    return;}
  
  
  
  };

const _ALGO = {
  appApproval: `#pragma version 4
txn RekeyTo
global ZeroAddress
==
assert
txn Lease
global ZeroAddress
==
assert
int 0
store 0
txn ApplicationID
bz alloc
byte base64()
app_global_get
dup
substring 0 8
btoi
store 1
dup
substring 8 16
btoi
store 2
substring 16 48
store 3
txn NumAppArgs
int 3
==
assert
txna ApplicationArgs 0
btoi
// Handler 0
dup
int 0
==
bz l0
pop
// check step
int 0
load 1
==
assert
// check time
txna ApplicationArgs 1
btoi
load 2
==
assert
byte base64()
pop
txna ApplicationArgs 2
dup
len
int 72
==
assert
dup
substring 0 32
store 255
dup
substring 32 40
btoi
store 254
dup
substring 40 48
btoi
store 253
dup
substring 48 56
btoi
store 252
dup
substring 56 64
btoi
store 251
dup
substring 64 72
btoi
store 250
pop
txn Sender
global CreatorAddress
==
assert
load 255
store 3
// "CheckPay"
// "./atomicTransfer.rsh:42:7:dot"
// "[]"
int 100000
dup
bz l1
load 0
dup
int 1
+
store 0
swap
dig 1
gtxns Amount
==
assert
int pay
dig 1
gtxns TypeEnum
==
assert
int 0
dig 1
gtxns Fee
==
assert
global ZeroAddress
dig 1
gtxns Lease
==
assert
global ZeroAddress
dig 1
gtxns RekeyTo
==
assert
load 3
dig 1
gtxns Receiver
==
assert
l1:
pop
// Nothing
// "./atomicTransfer.rsh:42:7:dot"
// "[]"
load 254
load 252
==
!
assert
// Initializing token
int 100000
load 0
dup
int 1
+
store 0
swap
dig 1
gtxns Amount
==
assert
int pay
dig 1
gtxns TypeEnum
==
assert
int 0
dig 1
gtxns Fee
==
assert
global ZeroAddress
dig 1
gtxns Lease
==
assert
global ZeroAddress
dig 1
gtxns RekeyTo
==
assert
load 3
dig 1
gtxns Receiver
==
assert
l2:
pop
int 0
load 0
dup
int 1
+
store 0
swap
dig 1
gtxns AssetAmount
==
assert
load 254
dig 1
gtxns XferAsset
==
assert
int axfer
dig 1
gtxns TypeEnum
==
assert
int 0
dig 1
gtxns Fee
==
assert
global ZeroAddress
dig 1
gtxns Lease
==
assert
global ZeroAddress
dig 1
gtxns RekeyTo
==
assert
load 3
dig 1
gtxns Sender
==
assert
load 3
dig 1
gtxns AssetReceiver
==
assert
l3:
pop
// Initializing token
int 100000
load 0
dup
int 1
+
store 0
swap
dig 1
gtxns Amount
==
assert
int pay
dig 1
gtxns TypeEnum
==
assert
int 0
dig 1
gtxns Fee
==
assert
global ZeroAddress
dig 1
gtxns Lease
==
assert
global ZeroAddress
dig 1
gtxns RekeyTo
==
assert
load 3
dig 1
gtxns Receiver
==
assert
l4:
pop
int 0
load 0
dup
int 1
+
store 0
swap
dig 1
gtxns AssetAmount
==
assert
load 252
dig 1
gtxns XferAsset
==
assert
int axfer
dig 1
gtxns TypeEnum
==
assert
int 0
dig 1
gtxns Fee
==
assert
global ZeroAddress
dig 1
gtxns Lease
==
assert
global ZeroAddress
dig 1
gtxns RekeyTo
==
assert
load 3
dig 1
gtxns Sender
==
assert
load 3
dig 1
gtxns AssetReceiver
==
assert
l5:
pop
// "CheckPay"
// "./atomicTransfer.rsh:42:7:dot"
// "[]"
txn Sender
load 254
itob
concat
load 253
itob
concat
load 252
itob
concat
load 251
itob
concat
load 250
itob
concat
int 1
bzero
dig 1
substring 0 72
app_global_put
pop
int 1
store 1
global Round
store 2
txn OnCompletion
int NoOp
==
assert
b updateState
l0:
// Handler 1
dup
int 1
==
bz l6
pop
// check step
int 1
load 1
==
assert
// check time
txna ApplicationArgs 1
btoi
load 2
==
assert
int 1
bzero
app_global_get
dup
substring 0 32
store 255
dup
substring 32 40
btoi
store 254
dup
substring 40 48
btoi
store 253
dup
substring 48 56
btoi
store 252
dup
substring 56 64
btoi
store 251
dup
substring 64 72
btoi
store 250
pop
txna ApplicationArgs 2
dup
len
int 0
==
assert
pop
// "CheckPay"
// "./atomicTransfer.rsh:44:7:dot"
// "[]"
// "CheckPay"
// "./atomicTransfer.rsh:44:7:dot"
// "[]"
load 253
dup
bz l7
load 0
dup
int 1
+
store 0
swap
dig 1
gtxns AssetAmount
==
assert
load 254
dig 1
gtxns XferAsset
==
assert
int axfer
dig 1
gtxns TypeEnum
==
assert
int 0
dig 1
gtxns Fee
==
assert
global ZeroAddress
dig 1
gtxns Lease
==
assert
global ZeroAddress
dig 1
gtxns RekeyTo
==
assert
load 3
dig 1
gtxns AssetReceiver
==
assert
l7:
pop
// Just "sender correct"
// "./atomicTransfer.rsh:44:7:dot"
// "[]"
load 255
txn Sender
==
assert
global LatestTimestamp
load 250
+
store 249
load 255
load 254
itob
concat
load 253
itob
concat
load 252
itob
concat
load 251
itob
concat
load 249
itob
concat
int 1
bzero
dig 1
substring 0 72
app_global_put
pop
int 2
store 1
global Round
store 2
txn OnCompletion
int NoOp
==
assert
b updateState
l6:
// Handler 2
dup
int 2
==
bz l8
pop
// check step
int 2
load 1
==
assert
// check time
txna ApplicationArgs 1
btoi
load 2
==
assert
int 1
bzero
app_global_get
dup
substring 0 32
store 255
dup
substring 32 40
btoi
store 254
dup
substring 40 48
btoi
store 253
dup
substring 48 56
btoi
store 252
dup
substring 56 64
btoi
store 251
dup
substring 64 72
btoi
store 250
pop
txna ApplicationArgs 2
dup
len
int 0
==
assert
pop
global LatestTimestamp
load 250
<
assert
// "CheckPay"
// "./atomicTransfer.rsh:50:7:dot"
// "[]"
// "CheckPay"
// "./atomicTransfer.rsh:50:7:dot"
// "[]"
load 251
dup
bz l9
load 0
dup
int 1
+
store 0
swap
dig 1
gtxns AssetAmount
==
assert
load 252
dig 1
gtxns XferAsset
==
assert
int axfer
dig 1
gtxns TypeEnum
==
assert
int 0
dig 1
gtxns Fee
==
assert
global ZeroAddress
dig 1
gtxns Lease
==
assert
global ZeroAddress
dig 1
gtxns RekeyTo
==
assert
load 3
dig 1
gtxns AssetReceiver
==
assert
l9:
pop
load 251
dup
bz l10
load 0
dup
int 1
+
store 0
swap
dig 1
gtxns AssetAmount
==
assert
load 252
dig 1
gtxns XferAsset
==
assert
int axfer
dig 1
gtxns TypeEnum
==
assert
int 0
dig 1
gtxns Fee
==
assert
global ZeroAddress
dig 1
gtxns Lease
==
assert
global ZeroAddress
dig 1
gtxns RekeyTo
==
assert
load 3
dig 1
gtxns Sender
==
assert
load 255
dig 1
gtxns AssetReceiver
==
assert
l10:
pop
load 253
dup
bz l11
load 0
dup
int 1
+
store 0
swap
dig 1
gtxns AssetAmount
==
assert
load 254
dig 1
gtxns XferAsset
==
assert
int axfer
dig 1
gtxns TypeEnum
==
assert
int 0
dig 1
gtxns Fee
==
assert
global ZeroAddress
dig 1
gtxns Lease
==
assert
global ZeroAddress
dig 1
gtxns RekeyTo
==
assert
load 3
dig 1
gtxns Sender
==
assert
txn Sender
dig 1
gtxns AssetReceiver
==
assert
l11:
pop
int 0
load 0
dup
int 1
+
store 0
swap
dig 1
gtxns AssetAmount
==
assert
load 252
dig 1
gtxns XferAsset
==
assert
int axfer
dig 1
gtxns TypeEnum
==
assert
int 0
dig 1
gtxns Fee
==
assert
global ZeroAddress
dig 1
gtxns Lease
==
assert
global ZeroAddress
dig 1
gtxns RekeyTo
==
assert
load 3
dig 1
gtxns Sender
==
assert
global CreatorAddress
dig 1
gtxns AssetCloseTo
==
assert
l12:
pop
int 0
load 0
dup
int 1
+
store 0
swap
dig 1
gtxns AssetAmount
==
assert
load 254
dig 1
gtxns XferAsset
==
assert
int axfer
dig 1
gtxns TypeEnum
==
assert
int 0
dig 1
gtxns Fee
==
assert
global ZeroAddress
dig 1
gtxns Lease
==
assert
global ZeroAddress
dig 1
gtxns RekeyTo
==
assert
load 3
dig 1
gtxns Sender
==
assert
global CreatorAddress
dig 1
gtxns AssetCloseTo
==
assert
l13:
pop
int 0
load 0
dup
int 1
+
store 0
swap
dig 1
gtxns Amount
==
assert
int pay
dig 1
gtxns TypeEnum
==
assert
int 0
dig 1
gtxns Fee
==
assert
global ZeroAddress
dig 1
gtxns Lease
==
assert
global ZeroAddress
dig 1
gtxns RekeyTo
==
assert
load 3
dig 1
gtxns Sender
==
assert
global CreatorAddress
dig 1
gtxns CloseRemainderTo
==
assert
l14:
pop
txn OnCompletion
int DeleteApplication
==
assert
b updateState
l8:
// Handler 3
dup
int 3
==
bz l15
pop
// check step
int 2
load 1
==
assert
// check time
txna ApplicationArgs 1
btoi
load 2
==
assert
int 1
bzero
app_global_get
dup
substring 0 32
store 255
dup
substring 32 40
btoi
store 254
dup
substring 40 48
btoi
store 253
dup
substring 48 56
btoi
store 252
dup
substring 56 64
btoi
store 251
dup
substring 64 72
btoi
store 250
pop
txna ApplicationArgs 2
dup
len
int 0
==
assert
pop
global LatestTimestamp
load 250
>=
assert
// "CheckPay"
// "./atomicTransfer.rsh:53:15:dot"
// "[]"
// Just "sender correct"
// "./atomicTransfer.rsh:53:15:dot"
// "[]"
load 255
txn Sender
==
assert
load 253
dup
bz l16
load 0
dup
int 1
+
store 0
swap
dig 1
gtxns AssetAmount
==
assert
load 254
dig 1
gtxns XferAsset
==
assert
int axfer
dig 1
gtxns TypeEnum
==
assert
int 0
dig 1
gtxns Fee
==
assert
global ZeroAddress
dig 1
gtxns Lease
==
assert
global ZeroAddress
dig 1
gtxns RekeyTo
==
assert
load 3
dig 1
gtxns Sender
==
assert
load 255
dig 1
gtxns AssetReceiver
==
assert
l16:
pop
int 0
load 0
dup
int 1
+
store 0
swap
dig 1
gtxns AssetAmount
==
assert
load 252
dig 1
gtxns XferAsset
==
assert
int axfer
dig 1
gtxns TypeEnum
==
assert
int 0
dig 1
gtxns Fee
==
assert
global ZeroAddress
dig 1
gtxns Lease
==
assert
global ZeroAddress
dig 1
gtxns RekeyTo
==
assert
load 3
dig 1
gtxns Sender
==
assert
global CreatorAddress
dig 1
gtxns AssetCloseTo
==
assert
l17:
pop
int 0
load 0
dup
int 1
+
store 0
swap
dig 1
gtxns AssetAmount
==
assert
load 254
dig 1
gtxns XferAsset
==
assert
int axfer
dig 1
gtxns TypeEnum
==
assert
int 0
dig 1
gtxns Fee
==
assert
global ZeroAddress
dig 1
gtxns Lease
==
assert
global ZeroAddress
dig 1
gtxns RekeyTo
==
assert
load 3
dig 1
gtxns Sender
==
assert
global CreatorAddress
dig 1
gtxns AssetCloseTo
==
assert
l18:
pop
int 0
load 0
dup
int 1
+
store 0
swap
dig 1
gtxns Amount
==
assert
int pay
dig 1
gtxns TypeEnum
==
assert
int 0
dig 1
gtxns Fee
==
assert
global ZeroAddress
dig 1
gtxns Lease
==
assert
global ZeroAddress
dig 1
gtxns RekeyTo
==
assert
load 3
dig 1
gtxns Sender
==
assert
global CreatorAddress
dig 1
gtxns CloseRemainderTo
==
assert
l19:
pop
txn OnCompletion
int DeleteApplication
==
assert
b updateState
l15:
int 0
assert
updateState:
byte base64()
load 1
itob
load 2
itob
load 3
concat
concat
app_global_put
checkSize:
load 0
dup
dup
int 1
+
global GroupSize
==
assert
txn GroupIndex
==
assert
int 1000
*
txn Fee
<=
assert
done:
int 1
return
alloc:
txn OnCompletion
int NoOp
==
assert
int 0
store 1
int 0
store 2
global ZeroAddress
store 3
b updateState
`,
  appClear: `#pragma version 4
int 0
`,
  escrow: `#pragma version 4
global GroupSize
int 1
-
dup
gtxns TypeEnum
int appl
==
assert
gtxns ApplicationID
int {{ApplicationID}}
==
assert
done:
int 1
`,
  mapDataKeys: 0,
  mapDataSize: 0,
  stateKeys: 1,
  stateSize: 72,
  unsupported: [],
  version: 4
  };
const _ETH = {
  ABI: `[
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "address payable",
                "name": "v120",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "v121",
                "type": "uint256"
              },
              {
                "internalType": "address payable",
                "name": "v122",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "v123",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "v124",
                "type": "uint256"
              }
            ],
            "internalType": "struct T1",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "internalType": "struct T2",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "stateMutability": "payable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "msg",
        "type": "uint256"
      }
    ],
    "name": "ReachError",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "address payable",
                "name": "v120",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "v121",
                "type": "uint256"
              },
              {
                "internalType": "address payable",
                "name": "v122",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "v123",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "v124",
                "type": "uint256"
              }
            ],
            "internalType": "struct T1",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "indexed": false,
        "internalType": "struct T2",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "e0",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "indexed": false,
        "internalType": "struct T5",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "e1",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "indexed": false,
        "internalType": "struct T5",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "e2",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "indexed": false,
        "internalType": "struct T5",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "e3",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "_reachCurrentTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "internalType": "struct T5",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "m1",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "internalType": "struct T5",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "m2",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "msg",
            "type": "bool"
          }
        ],
        "internalType": "struct T5",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "m3",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
]`,
  Bytecode: `0x608060405260405162000eed38038062000eed8339810160408190526200002691620002cc565b60008055604080518251815260208084015180516001600160a01b0390811683850152918101518385015292830151166060808301919091528201516080808301919091529091015160a08201527f2f2e1b322fe4c931a7f65952bbed29e8a203ee40710e6e8d285f2761f1205be19060c00160405180910390a1602081015160408101519051620000d8916001600160a01b03918216911614620000cd576001620000d0565b60005b6007620001df565b620000e634156008620001df565b6040805160c081018252600080825260208201819052918101829052606081018290526080810182905260a08101919091523380825260208381018051516001600160a01b0390811683860190815282518401516040808801918252845181015184166060808a0191825286518101516080808c01918252975188015160a0808d019182526001600081905543905585519a8b019b909b5295518716938901939093529251928701929092529051909216928401929092525192820192909252905160c082015260e00160405160208183030381529060405260029080519060200190620001d692919062000209565b505050620003fb565b81620002055760405163100960cb60e01b81526004810182905260240160405180910390fd5b5050565b8280546200021790620003be565b90600052602060002090601f0160209004810192826200023b576000855562000286565b82601f106200025657805160ff191683800117855562000286565b8280016001018555821562000286579182015b828111156200028657825182559160200191906001019062000269565b506200029492915062000298565b5090565b5b8082111562000294576000815560010162000299565b80516001600160a01b0381168114620002c757600080fd5b919050565b600081830360c0811215620002e057600080fd5b604080519081016001600160401b03811182821017156200031157634e487b7160e01b600052604160045260246000fd5b6040528351815260a0601f19830112156200032b57600080fd5b6200033562000387565b91506200034560208501620002af565b8252604084015160208301526200035f60608501620002af565b6040830152608084810151606084015260a09094015193820193909352602083015250919050565b60405160a081016001600160401b0381118282101715620003b857634e487b7160e01b600052604160045260246000fd5b60405290565b600181811c90821680620003d357607f821691505b60208210811415620003f557634e487b7160e01b600052602260045260246000fd5b50919050565b610ae2806200040b6000396000f3fe6080604052600436106100435760003560e01c80637963168e1461004f5780638323075714610064578063f147248d14610086578063fd948b861461009957600080fd5b3661004a57005b600080fd5b61006261005d3660046109cb565b6100ac565b005b34801561007057600080fd5b5060015460405190815260200160405180910390f35b6100626100943660046109cb565b610300565b6100626100a73660046109cb565b610463565b6100bc600160005414600c6105c4565b6001546100cd90823514600d6105c4565b6000808055600280546100df90610a69565b80601f016020809104026020016040519081016040528092919081815260200182805461010b90610a69565b80156101585780601f1061012d57610100808354040283529160200191610158565b820191906000526020600020905b81548152906001019060200180831161013b57829003601f168201915b505050505080602001905181019061017091906109af565b90506101886040518060200160405280600081525090565b7f9f41c6cf17ede288cbb2cfbbafdd05b2b2025dea3b047cdb79dbc892d7a9286d836040516101b79190610a1e565b60405180910390a16101cb341560096105c4565b6101e86101e133846020015185604001516105ee565b600a6105c4565b8151610200906001600160a01b03163314600b6105c4565b60a082015161020f9042610a43565b81526040805160c081018252600080825260208201819052918101829052606081018290526080810182905260a081019190915282516001600160a01b0390811680835260208086015183168185019081526040808801518187019081526060808a015187168189019081526080808c0151818b019081528b5160a0808d019182526002600055436001558751998a019a909a5296518a16958801959095529251918601919091525190951694830194909452925191810191909152905160c082015260e001604051602081830303815290604052600290805190602001906102f9929190610805565b5050505050565b61031060026000541460156105c4565b6001546103219082351460166105c4565b60008080556002805461033390610a69565b80601f016020809104026020016040519081016040528092919081815260200182805461035f90610a69565b80156103ac5780601f10610381576101008083540402835291602001916103ac565b820191906000526020600020905b81548152906001019060200180831161038f57829003601f168201915b50505050508060200190518101906103c491906109af565b90506103d88160a0015142101560176105c4565b7fe92d4e1229145c13e718fdc692a322df4a6700c6bebac0841f0e9f44c56a1529826040516104079190610a1e565b60405180910390a161041b341560136105c4565b8051610433906001600160a01b0316331460146105c4565b61044a816020015182600001518360400151610606565b6000808055600181905561046090600290610889565b33ff5b61047360026000541460106105c4565b6001546104849082351460116105c4565b60008080556002805461049690610a69565b80601f01602080910402602001604051908101604052809291908181526020018280546104c290610a69565b801561050f5780601f106104e45761010080835404028352916020019161050f565b820191906000526020600020905b8154815290600101906020018083116104f257829003601f168201915b505050505080602001905181019061052791906109af565b905061053a8160a00151421060126105c4565b7fe0777bbb0edbebd8a5c254bf54fd955256e9bf9fb0fe4138cd88ac193a101d15826040516105699190610a1e565b60405180910390a161057d3415600e6105c4565b61059a61059333836060015184608001516105ee565b600f6105c4565b6105b1816060015182600001518360800151610606565b61044a8160200151338360400151610606565b816105ea5760405163100960cb60e01b8152600481018290526024015b60405180910390fd5b5050565b60006105fc8385308561061f565b90505b9392505050565b6106118383836106f9565b61061a57600080fd5b505050565b604080516001600160a01b0385811660248301528481166044830152606480830185905283518084039091018152608490920183526020820180516001600160e01b03166323b872dd60e01b179052915160009283928392918916918391610686916109e3565b60006040518083038185875af1925050503d80600081146106c3576040519150601f19603f3d011682016040523d82523d6000602084013e6106c8565b606091505b50915091506106d9828260016107ca565b50808060200190518101906106ee9190610992565b979650505050505050565b604080516001600160a01b038481166024830152604480830185905283518084039091018152606490920183526020820180516001600160e01b031663a9059cbb60e01b179052915160009283928392918816918391610758916109e3565b60006040518083038185875af1925050503d8060008114610795576040519150601f19603f3d011682016040523d82523d6000602084013e61079a565b606091505b50915091506107ab828260026107ca565b50808060200190518101906107c09190610992565b9695505050505050565b606083156107d95750816105ff565b8251156107e95782518084602001fd5b60405163100960cb60e01b8152600481018390526024016105e1565b82805461081190610a69565b90600052602060002090601f0160209004810192826108335760008555610879565b82601f1061084c57805160ff1916838001178555610879565b82800160010185558215610879579182015b8281111561087957825182559160200191906001019061085e565b506108859291506108c6565b5090565b50805461089590610a69565b6000825580601f106108a5575050565b601f0160209004906000526020600020908101906108c391906108c6565b50565b5b8082111561088557600081556001016108c7565b80516001600160a01b03811681146108f257600080fd5b919050565b600060c0828403121561090957600080fd5b60405160c0810181811067ffffffffffffffff8211171561093a57634e487b7160e01b600052604160045260246000fd5b604052905080610949836108db565b8152610957602084016108db565b602082015260408301516040820152610972606084016108db565b60608201526080830151608082015260a083015160a08201525092915050565b6000602082840312156109a457600080fd5b81516105ff81610a9e565b600060c082840312156109c157600080fd5b6105ff83836108f7565b6000604082840312156109dd57600080fd5b50919050565b6000825160005b81811015610a0457602081860181015185830152016109ea565b81811115610a13576000828501525b509190910192915050565b81358152604081016020830135610a3481610a9e565b80151560208401525092915050565b60008219821115610a6457634e487b7160e01b600052601160045260246000fd5b500190565b600181811c90821680610a7d57607f821691505b602082108114156109dd57634e487b7160e01b600052602260045260246000fd5b80151581146108c357600080fdfea26469706673582212202ae623982d9ae6ce142d0465507f0bd85272bdc08b8b6a72c21b139bd456fbd664736f6c63430008070033`,
  BytecodeLen: 3821,
  Which: `oD`,
  version: 3,
  views: {
    }
  };

export const _Connectors = {
  ALGO: _ALGO,
  ETH: _ETH
  };

