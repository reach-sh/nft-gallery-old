// Automatically generated with Reach 0.1.6
/* eslint-disable */
export const _version = '0.1.6';
export const _backendVersion = 5;

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
export async function Alice(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for Alice expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for Alice expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
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
  
  
  const v110 = stdlib.protect(ctc2, await interact.getSwap(), {
    at: './atomicTransfer.rsh:39:87:application',
    fs: ['at ./atomicTransfer.rsh:38:11:application call to [unknown function] (defined at: ./atomicTransfer.rsh:38:15:function exp)'],
    msg: 'getSwap',
    who: 'Alice'
    });
  const v111 = v110.tokenA;
  const v112 = v110.amountA;
  const v113 = v110.tokenB;
  const v114 = v110.amountB;
  const v115 = v110.time;
  const v116 = stdlib.tokenEq(v111, v113);
  const v117 = v116 ? false : true;
  stdlib.assert(v117, {
    at: './atomicTransfer.rsh:40:15:application',
    fs: ['at ./atomicTransfer.rsh:38:11:application call to [unknown function] (defined at: ./atomicTransfer.rsh:38:15:function exp)'],
    msg: null,
    who: 'Alice'
    });
  
  const txn1 = await (ctc.sendrecv({
    args: [v111, v112, v113, v114, v115],
    evt_cnt: 5,
    funcNum: 0,
    lct: stdlib.checkedBigNumberify('./atomicTransfer.rsh:42:7:dot', stdlib.UInt_max, 0),
    onlyIf: true,
    out_tys: [ctc1, ctc0, ctc1, ctc0, ctc0],
    pay: [stdlib.checkedBigNumberify('./atomicTransfer.rsh:decimal', stdlib.UInt_max, 0), []],
    sim_p: (async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], mapsPrev: [], mapsNext: [] };
      
      const {data: [v119, v120, v121, v122, v123], secs: v125, time: v124, didSend: v38, from: v118 } = txn1;
      
      const v126 = stdlib.tokenEq(v119, v121);
      const v127 = v126 ? false : true;
      stdlib.assert(v127, {
        at: './atomicTransfer.rsh:42:7:dot',
        fs: [],
        msg: null,
        who: 'Alice'
        });
      sim_r.txns.push({
        amt: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, 0),
        kind: 'init',
        tok: v119
        });
      sim_r.txns.push({
        amt: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, 0),
        kind: 'init',
        tok: v121
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
  const {data: [v119, v120, v121, v122, v123], secs: v125, time: v124, didSend: v38, from: v118 } = txn1;
  const v126 = stdlib.tokenEq(v119, v121);
  const v127 = v126 ? false : true;
  stdlib.assert(v127, {
    at: './atomicTransfer.rsh:42:7:dot',
    fs: [],
    msg: null,
    who: 'Alice'
    });
  ;
  ;
  ;
  const txn2 = await (ctc.sendrecv({
    args: [v118, v119, v120, v121, v122, v123],
    evt_cnt: 0,
    funcNum: 1,
    lct: v124,
    onlyIf: true,
    out_tys: [],
    pay: [stdlib.checkedBigNumberify('./atomicTransfer.rsh:44:7:dot', stdlib.UInt_max, 0), [[v120, v119]]],
    sim_p: (async (txn2) => {
      const sim_r = { txns: [], mapRefs: [], mapsPrev: [], mapsNext: [] };
      
      const {data: [], secs: v131, time: v130, didSend: v46, from: v129 } = txn2;
      
      sim_r.txns.push({
        amt: stdlib.checkedBigNumberify('./atomicTransfer.rsh:44:7:dot', stdlib.UInt_max, 0),
        kind: 'to',
        tok: undefined
        });
      sim_r.txns.push({
        amt: v120,
        kind: 'to',
        tok: v119
        });
      const v135 = stdlib.addressEq(v118, v129);
      stdlib.assert(v135, {
        at: './atomicTransfer.rsh:44:7:dot',
        fs: [],
        msg: 'sender correct',
        who: 'Alice'
        });
      const v137 = stdlib.add(v131, v123);
      sim_r.isHalt = false;
      
      return sim_r;
      }),
    soloSend: true,
    timeoutAt: undefined,
    tys: [ctc4, ctc1, ctc0, ctc1, ctc0, ctc0],
    waitIfNotPresent: false
    }));
  const {data: [], secs: v131, time: v130, didSend: v46, from: v129 } = txn2;
  ;
  ;
  const v135 = stdlib.addressEq(v118, v129);
  stdlib.assert(v135, {
    at: './atomicTransfer.rsh:44:7:dot',
    fs: [],
    msg: 'sender correct',
    who: 'Alice'
    });
  const v137 = stdlib.add(v131, v123);
  const txn3 = await (ctc.recv({
    didSend: false,
    evt_cnt: 0,
    funcNum: 2,
    out_tys: [],
    timeoutAt: ['secs', v137],
    waitIfNotPresent: false
    }));
  if (txn3.didTimeout) {
    const txn4 = await (ctc.sendrecv({
      args: [v118, v119, v120, v121, v122, v137],
      evt_cnt: 0,
      funcNum: 3,
      lct: v130,
      onlyIf: true,
      out_tys: [],
      pay: [stdlib.checkedBigNumberify('./atomicTransfer.rsh:decimal', stdlib.UInt_max, 0), []],
      sim_p: (async (txn4) => {
        const sim_r = { txns: [], mapRefs: [], mapsPrev: [], mapsNext: [] };
        
        const {data: [], secs: v167, time: v166, didSend: v89, from: v165 } = txn4;
        
        sim_r.txns.push({
          amt: stdlib.checkedBigNumberify('./atomicTransfer.rsh:decimal', stdlib.UInt_max, 0),
          kind: 'to',
          tok: undefined
          });
        const v169 = stdlib.addressEq(v118, v165);
        stdlib.assert(v169, {
          at: './atomicTransfer.rsh:53:15:dot',
          fs: [],
          msg: 'sender correct',
          who: 'Alice'
          });
        sim_r.txns.push({
          amt: v120,
          kind: 'from',
          to: v118,
          tok: v119
          });
        
        sim_r.txns.push({
          kind: 'halt',
          tok: v121
          })
        sim_r.txns.push({
          kind: 'halt',
          tok: v119
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
    const {data: [], secs: v167, time: v166, didSend: v89, from: v165 } = txn4;
    ;
    const v169 = stdlib.addressEq(v118, v165);
    stdlib.assert(v169, {
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
    const {data: [], secs: v145, time: v144, didSend: v58, from: v143 } = txn3;
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
    
    return;
    }
  
  
  
  
  
  };
export async function Bob(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for Bob expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for Bob expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
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
  const {data: [v119, v120, v121, v122, v123], secs: v125, time: v124, didSend: v38, from: v118 } = txn1;
  const v126 = stdlib.tokenEq(v119, v121);
  const v127 = v126 ? false : true;
  stdlib.assert(v127, {
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
  const {data: [], secs: v131, time: v130, didSend: v46, from: v129 } = txn2;
  ;
  ;
  const v135 = stdlib.addressEq(v118, v129);
  stdlib.assert(v135, {
    at: './atomicTransfer.rsh:44:7:dot',
    fs: [],
    msg: 'sender correct',
    who: 'Bob'
    });
  const v137 = stdlib.add(v131, v123);
  const v141 = {
    amountA: v120,
    amountB: v122,
    time: v123,
    tokenA: v119,
    tokenB: v121
    };
  const v142 = stdlib.protect(ctc2, await interact.accSwap(v141), {
    at: './atomicTransfer.rsh:48:50:application',
    fs: ['at ./atomicTransfer.rsh:47:11:application call to [unknown function] (defined at: ./atomicTransfer.rsh:47:15:function exp)'],
    msg: 'accSwap',
    who: 'Bob'
    });
  
  const txn3 = await (ctc.sendrecv({
    args: [v118, v119, v120, v121, v122, v137],
    evt_cnt: 0,
    funcNum: 2,
    lct: v130,
    onlyIf: v142,
    out_tys: [],
    pay: [stdlib.checkedBigNumberify('./atomicTransfer.rsh:50:7:dot', stdlib.UInt_max, 0), [[v122, v121]]],
    sim_p: (async (txn3) => {
      const sim_r = { txns: [], mapRefs: [], mapsPrev: [], mapsNext: [] };
      
      const {data: [], secs: v145, time: v144, didSend: v58, from: v143 } = txn3;
      
      sim_r.txns.push({
        amt: stdlib.checkedBigNumberify('./atomicTransfer.rsh:50:7:dot', stdlib.UInt_max, 0),
        kind: 'to',
        tok: undefined
        });
      sim_r.txns.push({
        amt: v122,
        kind: 'to',
        tok: v121
        });
      sim_r.txns.push({
        amt: v122,
        kind: 'from',
        to: v118,
        tok: v121
        });
      sim_r.txns.push({
        amt: v120,
        kind: 'from',
        to: v143,
        tok: v119
        });
      
      sim_r.txns.push({
        kind: 'halt',
        tok: v121
        })
      sim_r.txns.push({
        kind: 'halt',
        tok: v119
        })
      sim_r.txns.push({
        kind: 'halt',
        tok: undefined
        })
      sim_r.isHalt = true;
      
      return sim_r;
      }),
    soloSend: true,
    timeoutAt: ['secs', v137],
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
    const {data: [], secs: v167, time: v166, didSend: v89, from: v165 } = txn4;
    ;
    const v169 = stdlib.addressEq(v118, v165);
    stdlib.assert(v169, {
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
    const {data: [], secs: v145, time: v144, didSend: v58, from: v143 } = txn3;
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
    
    return;
    }
  
  
  
  
  
  };
const _ALGO = {
  appApproval: `#pragma version 5
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
int 0
extract_uint64
store 1
dup
int 8
extract_uint64
store 2
extract 16 32
store 3
txn NumAppArgs
int 3
==
assert
txna ApplicationArgs 0
btoi
preamble:
// Handler 0
dup
int 0
==
bz l0_afterHandler0
pop
// check step
int 0
load 1
==
assert
// check time
txna ApplicationArgs 1
btoi
dup
int 0
==
swap
load 2
==
||
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
extract 0 32
store 255
dup
int 32
extract_uint64
store 254
dup
int 40
extract_uint64
store 253
dup
int 48
extract_uint64
store 252
dup
int 56
extract_uint64
store 251
dup
int 64
extract_uint64
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
bz l1_checkTxnK
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
l1_checkTxnK:
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
l2_checkTxnK:
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
l3_checkTxnK:
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
l4_checkTxnK:
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
l5_checkTxnK:
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
extract 0 72
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
l0_afterHandler0:
// Handler 1
dup
int 1
==
bz l6_afterHandler1
pop
// check step
int 1
load 1
==
assert
// check time
txna ApplicationArgs 1
btoi
dup
int 0
==
swap
load 2
==
||
assert
int 1
bzero
app_global_get
dup
extract 0 32
store 255
dup
int 32
extract_uint64
store 254
dup
int 40
extract_uint64
store 253
dup
int 48
extract_uint64
store 252
dup
int 56
extract_uint64
store 251
dup
int 64
extract_uint64
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
bz l7_checkTxnK
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
l7_checkTxnK:
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
extract 0 72
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
l6_afterHandler1:
// Handler 2
dup
int 2
==
bz l8_afterHandler2
pop
// check step
int 2
load 1
==
assert
// check time
txna ApplicationArgs 1
btoi
dup
int 0
==
swap
load 2
==
||
assert
int 1
bzero
app_global_get
dup
extract 0 32
store 255
dup
int 32
extract_uint64
store 254
dup
int 40
extract_uint64
store 253
dup
int 48
extract_uint64
store 252
dup
int 56
extract_uint64
store 251
dup
int 64
extract_uint64
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
bz l9_checkTxnK
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
l9_checkTxnK:
pop
load 251
dup
bz l10_checkTxnK
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
l10_checkTxnK:
pop
load 253
dup
bz l11_checkTxnK
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
l11_checkTxnK:
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
l12_checkTxnK:
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
l13_checkTxnK:
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
l14_checkTxnK:
pop
txn OnCompletion
int DeleteApplication
==
assert
b updateState
l8_afterHandler2:
// Handler 3
dup
int 3
==
bz l15_afterHandler3
pop
// check step
int 2
load 1
==
assert
// check time
txna ApplicationArgs 1
btoi
dup
int 0
==
swap
load 2
==
||
assert
int 1
bzero
app_global_get
dup
extract 0 32
store 255
dup
int 32
extract_uint64
store 254
dup
int 40
extract_uint64
store 253
dup
int 48
extract_uint64
store 252
dup
int 56
extract_uint64
store 251
dup
int 64
extract_uint64
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
bz l16_checkTxnK
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
l16_checkTxnK:
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
l17_checkTxnK:
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
l18_checkTxnK:
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
l19_checkTxnK:
pop
txn OnCompletion
int DeleteApplication
==
assert
b updateState
l15_afterHandler3:
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
  appClear: `#pragma version 5
int 0
`,
  escrow: `#pragma version 5
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
  version: 5
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
                "name": "v119",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "v120",
                "type": "uint256"
              },
              {
                "internalType": "address payable",
                "name": "v121",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "v122",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "v123",
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
                "name": "v119",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "v120",
                "type": "uint256"
              },
              {
                "internalType": "address payable",
                "name": "v121",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "v122",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "v123",
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
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "inputs": [],
    "name": "_reachCurrentState",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
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
  Bytecode: `0x60806040526040516200101438038062001014833981016040819052620000269162000303565b60008055604080518251815260208084015180516001600160a01b0390811683850152918101518385015292830151166060808301919091528201516080808301919091529091015160a08201527f2f2e1b322fe4c931a7f65952bbed29e8a203ee40710e6e8d285f2761f1205be19060c00160405180910390a1602081015160408101519051620000d8916001600160a01b03918216911614620000cd576001620000d0565b60005b6007620001df565b620000e634156008620001df565b6040805160c081018252600080825260208201819052918101829052606081018290526080810182905260a08101919091523380825260208381018051516001600160a01b0390811683860190815282518401516040808801918252845181015184166060808a0191825286518101516080808c01918252975188015160a0808d019182526001600081905543905585519a8b019b909b5295518716938901939093529251928701929092529051909216928401929092525192820192909252905160c082015260e00160405160208183030381529060405260029080519060200190620001d692919062000209565b505050620003fb565b81620002055760405163100960cb60e01b81526004810182905260240160405180910390fd5b5050565b8280546200021790620003be565b90600052602060002090601f0160209004810192826200023b576000855562000286565b82601f106200025657805160ff191683800117855562000286565b8280016001018555821562000286579182015b828111156200028657825182559160200191906001019062000269565b506200029492915062000298565b5090565b5b8082111562000294576000815560010162000299565b60405160a081016001600160401b0381118282101715620002e057634e487b7160e01b600052604160045260246000fd5b60405290565b80516001600160a01b0381168114620002fe57600080fd5b919050565b600081830360c08112156200031757600080fd5b604080519081016001600160401b03811182821017156200034857634e487b7160e01b600052604160045260246000fd5b6040528351815260a0601f19830112156200036257600080fd5b6200036c620002af565b91506200037c60208501620002e6565b8252604084015160208301526200039660608501620002e6565b6040830152608084810151606084015260a09094015193820193909352602083015250919050565b600181811c90821680620003d357607f821691505b60208210811415620003f557634e487b7160e01b600052602260045260246000fd5b50919050565b610c09806200040b6000396000f3fe60806040526004361061004b5760003560e01c80637963168e146100545780638323075714610067578063ab53f2c61461008a578063f147248d146100ad578063fd948b86146100c057005b3661005257005b005b6100526100623660046109b7565b6100d3565b34801561007357600080fd5b506001546040519081526020015b60405180910390f35b34801561009657600080fd5b5061009f610330565b6040516100819291906109ff565b6100526100bb3660046109b7565b6103cd565b6100526100ce3660046109b7565b61053a565b6100e3600160005414600c6106a4565b6100fd813515806100f657506001548235145b600d6106a4565b60008080556002805461010f90610a39565b80601f016020809104026020016040519081016040528092919081815260200182805461013b90610a39565b80156101885780601f1061015d57610100808354040283529160200191610188565b820191906000526020600020905b81548152906001019060200180831161016b57829003601f168201915b50505050508060200190518101906101a09190610b25565b90506101b86040518060200160405280600081525090565b7f9f41c6cf17ede288cbb2cfbbafdd05b2b2025dea3b047cdb79dbc892d7a9286d836040516101e79190610b4f565b60405180910390a16101fb341560096106a4565b61021861021133846020015185604001516106ca565b600a6106a4565b8151610230906001600160a01b03163314600b6106a4565b60a082015161023f9042610b74565b81526040805160c081018252600080825260208201819052918101829052606081018290526080810182905260a081019190915282516001600160a01b0390811680835260208086015183168185019081526040808801518187019081526060808a015187168189019081526080808c0151818b019081528b5160a0808d019182526002600055436001558751998a019a909a5296518a16958801959095529251918601919091525190951694830194909452925191810191909152905160c082015260e001604051602081830303815290604052600290805190602001906103299291906108e1565b5050505050565b60006060600054600280805461034590610a39565b80601f016020809104026020016040519081016040528092919081815260200182805461037190610a39565b80156103be5780601f10610393576101008083540402835291602001916103be565b820191906000526020600020905b8154815290600101906020018083116103a157829003601f168201915b50505050509050915091509091565b6103dd60026000541460156106a4565b6103f7813515806103f057506001548235145b60166106a4565b60008080556002805461040990610a39565b80601f016020809104026020016040519081016040528092919081815260200182805461043590610a39565b80156104825780601f1061045757610100808354040283529160200191610482565b820191906000526020600020905b81548152906001019060200180831161046557829003601f168201915b505050505080602001905181019061049a9190610b25565b90506104ae8160a0015142101560176106a4565b7fe92d4e1229145c13e718fdc692a322df4a6700c6bebac0841f0e9f44c56a1529826040516104dd9190610b4f565b60405180910390a16104f1341560136106a4565b8051610509906001600160a01b0316331460146106a4565b6105208160200151826000015183604001516106e2565b6000808055600181905561053690600290610965565b5050565b61054a60026000541460106106a4565b6105648135158061055d57506001548235145b60116106a4565b60008080556002805461057690610a39565b80601f01602080910402602001604051908101604052809291908181526020018280546105a290610a39565b80156105ef5780601f106105c4576101008083540402835291602001916105ef565b820191906000526020600020905b8154815290600101906020018083116105d257829003601f168201915b50505050508060200190518101906106079190610b25565b905061061a8160a00151421060126106a4565b7fe0777bbb0edbebd8a5c254bf54fd955256e9bf9fb0fe4138cd88ac193a101d15826040516106499190610b4f565b60405180910390a161065d3415600e6106a4565b61067a61067333836060015184608001516106ca565b600f6106a4565b6106918160600151826000015183608001516106e2565b61052081602001513383604001516106e2565b816105365760405163100960cb60e01b8152600481018290526024015b60405180910390fd5b60006106d8838530856106fb565b90505b9392505050565b6106ed8383836107d5565b6106f657600080fd5b505050565b604080516001600160a01b0385811660248301528481166044830152606480830185905283518084039091018152608490920183526020820180516001600160e01b03166323b872dd60e01b17905291516000928392839291891691839161076291610b9a565b60006040518083038185875af1925050503d806000811461079f576040519150601f19603f3d011682016040523d82523d6000602084013e6107a4565b606091505b50915091506107b5828260016108a6565b50808060200190518101906107ca9190610bb6565b979650505050505050565b604080516001600160a01b038481166024830152604480830185905283518084039091018152606490920183526020820180516001600160e01b031663a9059cbb60e01b17905291516000928392839291881691839161083491610b9a565b60006040518083038185875af1925050503d8060008114610871576040519150601f19603f3d011682016040523d82523d6000602084013e610876565b606091505b5091509150610887828260026108a6565b508080602001905181019061089c9190610bb6565b9695505050505050565b606083156108b55750816106db565b8251156108c55782518084602001fd5b60405163100960cb60e01b8152600481018390526024016106c1565b8280546108ed90610a39565b90600052602060002090601f01602090048101928261090f5760008555610955565b82601f1061092857805160ff1916838001178555610955565b82800160010185558215610955579182015b8281111561095557825182559160200191906001019061093a565b506109619291506109a2565b5090565b50805461097190610a39565b6000825580601f10610981575050565b601f01602090049060005260206000209081019061099f91906109a2565b50565b5b8082111561096157600081556001016109a3565b6000604082840312156109c957600080fd5b50919050565b60005b838110156109ea5781810151838201526020016109d2565b838111156109f9576000848401525b50505050565b8281526040602082015260008251806040840152610a248160608501602087016109cf565b601f01601f1916919091016060019392505050565b600181811c90821680610a4d57607f821691505b602082108114156109c957634e487b7160e01b600052602260045260246000fd5b80516001600160a01b0381168114610a8557600080fd5b919050565b600060c08284031215610a9c57600080fd5b60405160c0810181811067ffffffffffffffff82111715610acd57634e487b7160e01b600052604160045260246000fd5b604052905080610adc83610a6e565b8152610aea60208401610a6e565b602082015260408301516040820152610b0560608401610a6e565b60608201526080830151608082015260a083015160a08201525092915050565b600060c08284031215610b3757600080fd5b6106db8383610a8a565b801515811461099f57600080fd5b81358152604081016020830135610b6581610b41565b80151560208401525092915050565b60008219821115610b9557634e487b7160e01b600052601160045260246000fd5b500190565b60008251610bac8184602087016109cf565b9190910192915050565b600060208284031215610bc857600080fd5b81516106db81610b4156fea264697066735822122060607901dd6f2ff95f853c8510fc6e9c714a4f783c6608cbf95d8c98823a068364736f6c63430008090033`,
  BytecodeLen: 4116,
  Which: `oD`,
  version: 4,
  views: {
    }
  };
export const _Connectors = {
  ALGO: _ALGO,
  ETH: _ETH
  };
export const _Participants = {
  "Alice": Alice,
  "Bob": Bob
  };
export const _APIs = {
  };
