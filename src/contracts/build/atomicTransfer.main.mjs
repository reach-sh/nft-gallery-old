// Automatically generated with Reach 0.1.6 (fb449c94)
/* eslint-disable */
export const _version = '0.1.6';
export const _versionHash = '0.1.6 (fb449c94)';
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
    "name": "_reachCreationTime",
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
  Bytecode: `0x60806040526040516200103938038062001039833981016040819052620000269162000307565b60008055604080518251815260208084015180516001600160a01b0390811683850152918101518385015292830151166060808301919091528201516080808301919091529091015160a08201527f2f2e1b322fe4c931a7f65952bbed29e8a203ee40710e6e8d285f2761f1205be19060c00160405180910390a1602081015160408101519051620000d8916001600160a01b03918216911614620000cd576001620000d0565b60005b6007620001e3565b620000e634156008620001e3565b6040805160c081018252600080825260208201819052918101829052606081018290526080810182905260a08101919091523380825260208381018051516001600160a01b0390811683860190815282518401516040808801918252845181015184166060808a0191825286518101516080808c01918252975188015160a0808d019182526001600081905543905585519a8b019b909b5295518716938901939093529251928701929092529051909216928401929092525192820192909252905160c082015260e00160405160208183030381529060405260029080519060200190620001d69291906200020d565b50504360035550620003ff565b81620002095760405163100960cb60e01b81526004810182905260240160405180910390fd5b5050565b8280546200021b90620003c2565b90600052602060002090601f0160209004810192826200023f57600085556200028a565b82601f106200025a57805160ff19168380011785556200028a565b828001600101855582156200028a579182015b828111156200028a5782518255916020019190600101906200026d565b50620002989291506200029c565b5090565b5b808211156200029857600081556001016200029d565b60405160a081016001600160401b0381118282101715620002e457634e487b7160e01b600052604160045260246000fd5b60405290565b80516001600160a01b03811681146200030257600080fd5b919050565b600081830360c08112156200031b57600080fd5b604080519081016001600160401b03811182821017156200034c57634e487b7160e01b600052604160045260246000fd5b6040528351815260a0601f19830112156200036657600080fd5b62000370620002b3565b91506200038060208501620002ea565b8252604084015160208301526200039a60608501620002ea565b6040830152608084810151606084015260a09094015193820193909352602083015250919050565b600181811c90821680620003d757607f821691505b60208210811415620003f957634e487b7160e01b600052602260045260246000fd5b50919050565b610c2a806200040f6000396000f3fe6080604052600436106100565760003560e01c80631e93b0f11461005f5780637963168e146100835780638323075714610096578063ab53f2c6146100ab578063f147248d146100ce578063fd948b86146100e157005b3661005d57005b005b34801561006b57600080fd5b506003545b6040519081526020015b60405180910390f35b61005d6100913660046109d8565b6100f4565b3480156100a257600080fd5b50600154610070565b3480156100b757600080fd5b506100c0610351565b60405161007a929190610a20565b61005d6100dc3660046109d8565b6103ee565b61005d6100ef3660046109d8565b61055b565b610104600160005414600c6106c5565b61011e8135158061011757506001548235145b600d6106c5565b60008080556002805461013090610a5a565b80601f016020809104026020016040519081016040528092919081815260200182805461015c90610a5a565b80156101a95780601f1061017e576101008083540402835291602001916101a9565b820191906000526020600020905b81548152906001019060200180831161018c57829003601f168201915b50505050508060200190518101906101c19190610b46565b90506101d96040518060200160405280600081525090565b7f9f41c6cf17ede288cbb2cfbbafdd05b2b2025dea3b047cdb79dbc892d7a9286d836040516102089190610b70565b60405180910390a161021c341560096106c5565b61023961023233846020015185604001516106eb565b600a6106c5565b8151610251906001600160a01b03163314600b6106c5565b60a08201516102609042610b95565b81526040805160c081018252600080825260208201819052918101829052606081018290526080810182905260a081019190915282516001600160a01b0390811680835260208086015183168185019081526040808801518187019081526060808a015187168189019081526080808c0151818b019081528b5160a0808d019182526002600055436001558751998a019a909a5296518a16958801959095529251918601919091525190951694830194909452925191810191909152905160c082015260e0016040516020818303038152906040526002908051906020019061034a929190610902565b5050505050565b60006060600054600280805461036690610a5a565b80601f016020809104026020016040519081016040528092919081815260200182805461039290610a5a565b80156103df5780601f106103b4576101008083540402835291602001916103df565b820191906000526020600020905b8154815290600101906020018083116103c257829003601f168201915b50505050509050915091509091565b6103fe60026000541460156106c5565b6104188135158061041157506001548235145b60166106c5565b60008080556002805461042a90610a5a565b80601f016020809104026020016040519081016040528092919081815260200182805461045690610a5a565b80156104a35780601f10610478576101008083540402835291602001916104a3565b820191906000526020600020905b81548152906001019060200180831161048657829003601f168201915b50505050508060200190518101906104bb9190610b46565b90506104cf8160a0015142101560176106c5565b7fe92d4e1229145c13e718fdc692a322df4a6700c6bebac0841f0e9f44c56a1529826040516104fe9190610b70565b60405180910390a1610512341560136106c5565b805161052a906001600160a01b0316331460146106c5565b610541816020015182600001518360400151610703565b6000808055600181905561055790600290610986565b5050565b61056b60026000541460106106c5565b6105858135158061057e57506001548235145b60116106c5565b60008080556002805461059790610a5a565b80601f01602080910402602001604051908101604052809291908181526020018280546105c390610a5a565b80156106105780601f106105e557610100808354040283529160200191610610565b820191906000526020600020905b8154815290600101906020018083116105f357829003601f168201915b50505050508060200190518101906106289190610b46565b905061063b8160a00151421060126106c5565b7fe0777bbb0edbebd8a5c254bf54fd955256e9bf9fb0fe4138cd88ac193a101d158260405161066a9190610b70565b60405180910390a161067e3415600e6106c5565b61069b61069433836060015184608001516106eb565b600f6106c5565b6106b2816060015182600001518360800151610703565b6105418160200151338360400151610703565b816105575760405163100960cb60e01b8152600481018290526024015b60405180910390fd5b60006106f98385308561071c565b90505b9392505050565b61070e8383836107f6565b61071757600080fd5b505050565b604080516001600160a01b0385811660248301528481166044830152606480830185905283518084039091018152608490920183526020820180516001600160e01b03166323b872dd60e01b17905291516000928392839291891691839161078391610bbb565b60006040518083038185875af1925050503d80600081146107c0576040519150601f19603f3d011682016040523d82523d6000602084013e6107c5565b606091505b50915091506107d6828260016108c7565b50808060200190518101906107eb9190610bd7565b979650505050505050565b604080516001600160a01b038481166024830152604480830185905283518084039091018152606490920183526020820180516001600160e01b031663a9059cbb60e01b17905291516000928392839291881691839161085591610bbb565b60006040518083038185875af1925050503d8060008114610892576040519150601f19603f3d011682016040523d82523d6000602084013e610897565b606091505b50915091506108a8828260026108c7565b50808060200190518101906108bd9190610bd7565b9695505050505050565b606083156108d65750816106fc565b8251156108e65782518084602001fd5b60405163100960cb60e01b8152600481018390526024016106e2565b82805461090e90610a5a565b90600052602060002090601f0160209004810192826109305760008555610976565b82601f1061094957805160ff1916838001178555610976565b82800160010185558215610976579182015b8281111561097657825182559160200191906001019061095b565b506109829291506109c3565b5090565b50805461099290610a5a565b6000825580601f106109a2575050565b601f0160209004906000526020600020908101906109c091906109c3565b50565b5b8082111561098257600081556001016109c4565b6000604082840312156109ea57600080fd5b50919050565b60005b83811015610a0b5781810151838201526020016109f3565b83811115610a1a576000848401525b50505050565b8281526040602082015260008251806040840152610a458160608501602087016109f0565b601f01601f1916919091016060019392505050565b600181811c90821680610a6e57607f821691505b602082108114156109ea57634e487b7160e01b600052602260045260246000fd5b80516001600160a01b0381168114610aa657600080fd5b919050565b600060c08284031215610abd57600080fd5b60405160c0810181811067ffffffffffffffff82111715610aee57634e487b7160e01b600052604160045260246000fd5b604052905080610afd83610a8f565b8152610b0b60208401610a8f565b602082015260408301516040820152610b2660608401610a8f565b60608201526080830151608082015260a083015160a08201525092915050565b600060c08284031215610b5857600080fd5b6106fc8383610aab565b80151581146109c057600080fd5b81358152604081016020830135610b8681610b62565b80151560208401525092915050565b60008219821115610bb657634e487b7160e01b600052601160045260246000fd5b500190565b60008251610bcd8184602087016109f0565b9190910192915050565b600060208284031215610be957600080fd5b81516106fc81610b6256fea264697066735822122020fe6f314cfc33f4e077f571ec2a73cb32272ad4235552b069c65cc348bfc33664736f6c63430008090033`,
  BytecodeLen: 4153,
  Which: `oD`,
  version: 5,
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
