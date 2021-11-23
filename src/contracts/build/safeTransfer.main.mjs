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
      1: [ctc0, ctc1, ctc2, ctc2, ctc2],
      2: [ctc0, ctc1, ctc2, ctc2, ctc2]
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
    amountAlgo: ctc0,
    amountToken: ctc0,
    time: ctc0,
    token: ctc1
    });
  const ctc3 = stdlib.T_Null;
  const ctc4 = stdlib.T_Address;
  
  
  const v98 = stdlib.protect(ctc2, await interact.getSwap(), {
    at: './safeTransfer.rsh:34:85:application',
    fs: ['at ./safeTransfer.rsh:33:11:application call to [unknown function] (defined at: ./safeTransfer.rsh:33:15:function exp)'],
    msg: 'getSwap',
    who: 'Alice'
    });
  const v99 = v98.token;
  const v100 = v98.amountToken;
  const v101 = v98.amountAlgo;
  const v102 = v98.time;
  
  const txn1 = await (ctc.sendrecv({
    args: [v99, v100, v101, v102],
    evt_cnt: 4,
    funcNum: 0,
    lct: stdlib.checkedBigNumberify('./safeTransfer.rsh:36:7:dot', stdlib.UInt_max, 0),
    onlyIf: true,
    out_tys: [ctc1, ctc0, ctc0, ctc0],
    pay: [stdlib.checkedBigNumberify('./safeTransfer.rsh:decimal', stdlib.UInt_max, 0), []],
    sim_p: (async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], mapsPrev: [], mapsNext: [] };
      
      const {data: [v104, v105, v106, v107], secs: v109, time: v108, didSend: v31, from: v103 } = txn1;
      
      sim_r.txns.push({
        amt: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, 0),
        kind: 'init',
        tok: v104
        });
      sim_r.txns.push({
        amt: stdlib.checkedBigNumberify('./safeTransfer.rsh:decimal', stdlib.UInt_max, 0),
        kind: 'to',
        tok: undefined
        });
      sim_r.isHalt = false;
      
      return sim_r;
      }),
    soloSend: true,
    timeoutAt: undefined,
    tys: [ctc1, ctc0, ctc0, ctc0],
    waitIfNotPresent: false
    }));
  const {data: [v104, v105, v106, v107], secs: v109, time: v108, didSend: v31, from: v103 } = txn1;
  ;
  ;
  const txn2 = await (ctc.sendrecv({
    args: [v103, v104, v105, v106, v107],
    evt_cnt: 0,
    funcNum: 1,
    lct: v108,
    onlyIf: true,
    out_tys: [],
    pay: [stdlib.checkedBigNumberify('./safeTransfer.rsh:40:7:dot', stdlib.UInt_max, 0), [[v105, v104]]],
    sim_p: (async (txn2) => {
      const sim_r = { txns: [], mapRefs: [], mapsPrev: [], mapsNext: [] };
      
      const {data: [], secs: v113, time: v112, didSend: v39, from: v111 } = txn2;
      
      sim_r.txns.push({
        amt: stdlib.checkedBigNumberify('./safeTransfer.rsh:40:7:dot', stdlib.UInt_max, 0),
        kind: 'to',
        tok: undefined
        });
      sim_r.txns.push({
        amt: v105,
        kind: 'to',
        tok: v104
        });
      const v117 = stdlib.addressEq(v103, v111);
      stdlib.assert(v117, {
        at: './safeTransfer.rsh:40:7:dot',
        fs: [],
        msg: 'sender correct',
        who: 'Alice'
        });
      const v119 = stdlib.add(v113, v107);
      sim_r.isHalt = false;
      
      return sim_r;
      }),
    soloSend: true,
    timeoutAt: undefined,
    tys: [ctc4, ctc1, ctc0, ctc0, ctc0],
    waitIfNotPresent: false
    }));
  const {data: [], secs: v113, time: v112, didSend: v39, from: v111 } = txn2;
  ;
  ;
  const v117 = stdlib.addressEq(v103, v111);
  stdlib.assert(v117, {
    at: './safeTransfer.rsh:40:7:dot',
    fs: [],
    msg: 'sender correct',
    who: 'Alice'
    });
  const v119 = stdlib.add(v113, v107);
  const txn3 = await (ctc.recv({
    didSend: false,
    evt_cnt: 0,
    funcNum: 2,
    out_tys: [],
    timeoutAt: ['secs', v119],
    waitIfNotPresent: false
    }));
  if (txn3.didTimeout) {
    const txn4 = await (ctc.sendrecv({
      args: [v103, v104, v105, v106, v119],
      evt_cnt: 0,
      funcNum: 3,
      lct: v112,
      onlyIf: true,
      out_tys: [],
      pay: [stdlib.checkedBigNumberify('./safeTransfer.rsh:decimal', stdlib.UInt_max, 0), []],
      sim_p: (async (txn4) => {
        const sim_r = { txns: [], mapRefs: [], mapsPrev: [], mapsNext: [] };
        
        const {data: [], secs: v146, time: v145, didSend: v79, from: v144 } = txn4;
        
        sim_r.txns.push({
          amt: stdlib.checkedBigNumberify('./safeTransfer.rsh:decimal', stdlib.UInt_max, 0),
          kind: 'to',
          tok: undefined
          });
        const v148 = stdlib.addressEq(v103, v144);
        stdlib.assert(v148, {
          at: './safeTransfer.rsh:51:15:dot',
          fs: [],
          msg: 'sender correct',
          who: 'Alice'
          });
        sim_r.txns.push({
          amt: v105,
          kind: 'from',
          to: v103,
          tok: v104
          });
        
        sim_r.txns.push({
          kind: 'halt',
          tok: v104
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
      tys: [ctc4, ctc1, ctc0, ctc0, ctc0],
      waitIfNotPresent: false
      }));
    const {data: [], secs: v146, time: v145, didSend: v79, from: v144 } = txn4;
    ;
    const v148 = stdlib.addressEq(v103, v144);
    stdlib.assert(v148, {
      at: './safeTransfer.rsh:51:15:dot',
      fs: [],
      msg: 'sender correct',
      who: 'Alice'
      });
    ;
    stdlib.protect(ctc3, await interact.seeTimeout(), {
      at: './safeTransfer.rsh:53:51:application',
      fs: ['at ./safeTransfer.rsh:53:17:application call to [unknown function] (defined at: ./safeTransfer.rsh:53:29:function exp)'],
      msg: 'seeTimeout',
      who: 'Alice'
      });
    
    return;
    
    }
  else {
    const {data: [], secs: v127, time: v126, didSend: v50, from: v125 } = txn3;
    ;
    ;
    ;
    stdlib.protect(ctc3, await interact.seeTransfer(), {
      at: './safeTransfer.rsh:61:44:application',
      fs: ['at ./safeTransfer.rsh:61:9:application call to [unknown function] (defined at: ./safeTransfer.rsh:61:21:function exp)'],
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
    evt_cnt: 4,
    funcNum: 0,
    out_tys: [ctc0, ctc1, ctc1, ctc1],
    timeoutAt: undefined,
    waitIfNotPresent: false
    }));
  const {data: [v104, v105, v106, v107], secs: v109, time: v108, didSend: v31, from: v103 } = txn1;
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
  const {data: [], secs: v113, time: v112, didSend: v39, from: v111 } = txn2;
  ;
  ;
  const v117 = stdlib.addressEq(v103, v111);
  stdlib.assert(v117, {
    at: './safeTransfer.rsh:40:7:dot',
    fs: [],
    msg: 'sender correct',
    who: 'Bob'
    });
  const v119 = stdlib.add(v113, v107);
  const v123 = {
    amountAlgo: v106,
    amountToken: v105,
    time: v107,
    token: v104
    };
  const v124 = stdlib.protect(ctc2, await interact.acceptSwap(v123), {
    at: './safeTransfer.rsh:45:64:application',
    fs: ['at ./safeTransfer.rsh:44:11:application call to [unknown function] (defined at: ./safeTransfer.rsh:44:15:function exp)'],
    msg: 'acceptSwap',
    who: 'Bob'
    });
  
  const txn3 = await (ctc.sendrecv({
    args: [v103, v104, v105, v106, v119],
    evt_cnt: 0,
    funcNum: 2,
    lct: v112,
    onlyIf: v124,
    out_tys: [],
    pay: [v106, []],
    sim_p: (async (txn3) => {
      const sim_r = { txns: [], mapRefs: [], mapsPrev: [], mapsNext: [] };
      
      const {data: [], secs: v127, time: v126, didSend: v50, from: v125 } = txn3;
      
      sim_r.txns.push({
        amt: v106,
        kind: 'to',
        tok: undefined
        });
      sim_r.txns.push({
        amt: v106,
        kind: 'from',
        to: v103,
        tok: undefined
        });
      sim_r.txns.push({
        amt: v105,
        kind: 'from',
        to: v125,
        tok: v104
        });
      
      sim_r.txns.push({
        kind: 'halt',
        tok: v104
        })
      sim_r.txns.push({
        kind: 'halt',
        tok: undefined
        })
      sim_r.isHalt = true;
      
      return sim_r;
      }),
    soloSend: true,
    timeoutAt: ['secs', v119],
    tys: [ctc4, ctc0, ctc1, ctc1, ctc1],
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
    const {data: [], secs: v146, time: v145, didSend: v79, from: v144 } = txn4;
    ;
    const v148 = stdlib.addressEq(v103, v144);
    stdlib.assert(v148, {
      at: './safeTransfer.rsh:51:15:dot',
      fs: [],
      msg: 'sender correct',
      who: 'Bob'
      });
    ;
    stdlib.protect(ctc3, await interact.seeTimeout(), {
      at: './safeTransfer.rsh:53:51:application',
      fs: ['at ./safeTransfer.rsh:53:17:application call to [unknown function] (defined at: ./safeTransfer.rsh:53:29:function exp)'],
      msg: 'seeTimeout',
      who: 'Bob'
      });
    
    return;
    
    }
  else {
    const {data: [], secs: v127, time: v126, didSend: v50, from: v125 } = txn3;
    ;
    ;
    ;
    stdlib.protect(ctc3, await interact.seeTransfer(), {
      at: './safeTransfer.rsh:61:44:application',
      fs: ['at ./safeTransfer.rsh:61:9:application call to [unknown function] (defined at: ./safeTransfer.rsh:61:21:function exp)'],
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
int 64
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
pop
txn Sender
global CreatorAddress
==
assert
load 255
store 3
// "CheckPay"
// "./safeTransfer.rsh:36:7:dot"
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
// "CheckPay"
// "./safeTransfer.rsh:36:7:dot"
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
int 1
bzero
dig 1
extract 0 64
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
bz l4_afterHandler1
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
pop
txna ApplicationArgs 2
dup
len
int 0
==
assert
pop
// "CheckPay"
// "./safeTransfer.rsh:40:7:dot"
// "[]"
// "CheckPay"
// "./safeTransfer.rsh:40:7:dot"
// "[]"
load 253
dup
bz l5_checkTxnK
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
l5_checkTxnK:
pop
// Just "sender correct"
// "./safeTransfer.rsh:40:7:dot"
// "[]"
load 255
txn Sender
==
assert
global LatestTimestamp
load 251
+
store 250
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
load 250
itob
concat
int 1
bzero
dig 1
extract 0 64
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
l4_afterHandler1:
// Handler 2
dup
int 2
==
bz l6_afterHandler2
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
pop
txna ApplicationArgs 2
dup
len
int 0
==
assert
pop
global LatestTimestamp
load 251
<
assert
// "CheckPay"
// "./safeTransfer.rsh:49:7:dot"
// "[]"
load 252
dup
bz l7_checkTxnK
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
l7_checkTxnK:
pop
load 252
dup
bz l8_checkTxnK
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
load 255
dig 1
gtxns Receiver
==
assert
l8_checkTxnK:
pop
load 253
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
l9_checkTxnK:
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
l10_checkTxnK:
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
l11_checkTxnK:
pop
txn OnCompletion
int DeleteApplication
==
assert
b updateState
l6_afterHandler2:
// Handler 3
dup
int 3
==
bz l12_afterHandler3
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
pop
txna ApplicationArgs 2
dup
len
int 0
==
assert
pop
global LatestTimestamp
load 251
>=
assert
// "CheckPay"
// "./safeTransfer.rsh:51:15:dot"
// "[]"
// Just "sender correct"
// "./safeTransfer.rsh:51:15:dot"
// "[]"
load 255
txn Sender
==
assert
load 253
dup
bz l13_checkTxnK
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
l14_checkTxnK:
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
l15_checkTxnK:
pop
txn OnCompletion
int DeleteApplication
==
assert
b updateState
l12_afterHandler3:
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
  stateSize: 64,
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
                "name": "v104",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "v105",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "v106",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "v107",
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
                "name": "v104",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "v105",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "v106",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "v107",
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
  Bytecode: `0x608060405260405162000f7c38038062000f7c833981016040819052620000269162000291565b60008055604080518251815260208084015180516001600160a01b0316828401529081015182840152808301516060808401919091520151608082015290517ffefad5e0d88b997203a7f63b283abe03e4e673fa9ccc91b6b9327ca8f53a9be19181900360a00190a16200009d341560076200018a565b620000e26040518060a0016040528060006001600160a01b0316815260200160006001600160a01b031681526020016000815260200160008152602001600081525090565b3380825260208381018051516001600160a01b039081168386019081528251840151604080880191825284518101516060808a0191825295518601516080808b01918252600160008190554390558351808a019a909a5294519095168883015291519487019490945251908501525160a0808501919091528151808503909101815260c0909301905281516200017d926002920190620001b4565b5050436003555062000388565b81620001b05760405163100960cb60e01b81526004810182905260240160405180910390fd5b5050565b828054620001c2906200034b565b90600052602060002090601f016020900481019282620001e6576000855562000231565b82601f106200020157805160ff191683800117855562000231565b8280016001018555821562000231579182015b828111156200023157825182559160200191906001019062000214565b506200023f92915062000243565b5090565b5b808211156200023f576000815560010162000244565b604051608081016001600160401b03811182821017156200028b57634e487b7160e01b600052604160045260246000fd5b60405290565b600081830360a0811215620002a557600080fd5b604080519081016001600160401b0381118282101715620002d657634e487b7160e01b600052604160045260246000fd5b604052835181526080601f1983011215620002f057600080fd5b620002fa6200025a565b60208501519092506001600160a01b03811681146200031857600080fd5b80835250604084015160208301526060840151604083015260808401516060830152816020820152809250505092915050565b600181811c908216806200036057607f821691505b602082108114156200038257634e487b7160e01b600052602260045260246000fd5b50919050565b610be480620003986000396000f3fe6080604052600436106100565760003560e01c80631e93b0f11461005f5780637963168e146100835780638323075714610096578063ab53f2c6146100ab578063f147248d146100ce578063fd948b86146100e157005b3661005d57005b005b34801561006b57600080fd5b506003545b6040519081526020015b60405180910390f35b61005d6100913660046109a3565b6100f4565b3480156100a257600080fd5b50600154610070565b3480156100b757600080fd5b506100c061030d565b60405161007a9291906109eb565b61005d6100dc3660046109a3565b6103aa565b61005d6100ef3660046109a3565b610517565b610104600160005414600b610690565b61011e8135158061011757506001548235145b600c610690565b60008080556002805461013090610a25565b80601f016020809104026020016040519081016040528092919081815260200182805461015c90610a25565b80156101a95780601f1061017e576101008083540402835291602001916101a9565b820191906000526020600020905b81548152906001019060200180831161018c57829003601f168201915b50505050508060200190518101906101c19190610b00565b90506101d96040518060200160405280600081525090565b7f9f41c6cf17ede288cbb2cfbbafdd05b2b2025dea3b047cdb79dbc892d7a9286d836040516102089190610b2a565b60405180910390a161021c34156008610690565b61023961023233846020015185604001516106b6565b6009610690565b8151610251906001600160a01b03163314600a610690565b60808201516102609042610b4f565b81526040805160a0808201835260008083526020808401828152848601838152606080870185815260808089018781528c516001600160a01b03908116808c528e890151821688528e8d015187528e86015185528d5183526002998a9055436001558c51808a0191909152965116868c0152935192850192909252519083015251818501528551808203909401845260c0019094528151929361030693919201906108cd565b5050505050565b60006060600054600280805461032290610a25565b80601f016020809104026020016040519081016040528092919081815260200182805461034e90610a25565b801561039b5780601f106103705761010080835404028352916020019161039b565b820191906000526020600020905b81548152906001019060200180831161037e57829003601f168201915b50505050509050915091509091565b6103ba6002600054146013610690565b6103d4813515806103cd57506001548235145b6014610690565b6000808055600280546103e690610a25565b80601f016020809104026020016040519081016040528092919081815260200182805461041290610a25565b801561045f5780601f106104345761010080835404028352916020019161045f565b820191906000526020600020905b81548152906001019060200180831161044257829003601f168201915b50505050508060200190518101906104779190610b00565b905061048b81608001514210156015610690565b7fe92d4e1229145c13e718fdc692a322df4a6700c6bebac0841f0e9f44c56a1529826040516104ba9190610b2a565b60405180910390a16104ce34156011610690565b80516104e6906001600160a01b031633146012610690565b6104fd8160200151826000015183604001516106ce565b6000808055600181905561051390600290610951565b5050565b610527600260005414600e610690565b6105418135158061053a57506001548235145b600f610690565b60008080556002805461055390610a25565b80601f016020809104026020016040519081016040528092919081815260200182805461057f90610a25565b80156105cc5780601f106105a1576101008083540402835291602001916105cc565b820191906000526020600020905b8154815290600101906020018083116105af57829003601f168201915b50505050508060200190518101906105e49190610b00565b90506105f7816080015142106010610690565b7fe0777bbb0edbebd8a5c254bf54fd955256e9bf9fb0fe4138cd88ac193a101d15826040516106269190610b2a565b60405180910390a161063f81606001513414600d610690565b805160608201516040516001600160a01b039092169181156108fc0291906000818181858888f1935050505015801561067c573d6000803e3d6000fd5b506104fd81602001513383604001516106ce565b816105135760405163100960cb60e01b8152600481018290526024015b60405180910390fd5b60006106c4838530856106e7565b90505b9392505050565b6106d98383836107c1565b6106e257600080fd5b505050565b604080516001600160a01b0385811660248301528481166044830152606480830185905283518084039091018152608490920183526020820180516001600160e01b03166323b872dd60e01b17905291516000928392839291891691839161074e91610b75565b60006040518083038185875af1925050503d806000811461078b576040519150601f19603f3d011682016040523d82523d6000602084013e610790565b606091505b50915091506107a182826001610892565b50808060200190518101906107b69190610b91565b979650505050505050565b604080516001600160a01b038481166024830152604480830185905283518084039091018152606490920183526020820180516001600160e01b031663a9059cbb60e01b17905291516000928392839291881691839161082091610b75565b60006040518083038185875af1925050503d806000811461085d576040519150601f19603f3d011682016040523d82523d6000602084013e610862565b606091505b509150915061087382826002610892565b50808060200190518101906108889190610b91565b9695505050505050565b606083156108a15750816106c7565b8251156108b15782518084602001fd5b60405163100960cb60e01b8152600481018390526024016106ad565b8280546108d990610a25565b90600052602060002090601f0160209004810192826108fb5760008555610941565b82601f1061091457805160ff1916838001178555610941565b82800160010185558215610941579182015b82811115610941578251825591602001919060010190610926565b5061094d92915061098e565b5090565b50805461095d90610a25565b6000825580601f1061096d575050565b601f01602090049060005260206000209081019061098b919061098e565b50565b5b8082111561094d576000815560010161098f565b6000604082840312156109b557600080fd5b50919050565b60005b838110156109d65781810151838201526020016109be565b838111156109e5576000848401525b50505050565b8281526040602082015260008251806040840152610a108160608501602087016109bb565b601f01601f1916919091016060019392505050565b600181811c90821680610a3957607f821691505b602082108114156109b557634e487b7160e01b600052602260045260246000fd5b80516001600160a01b0381168114610a7157600080fd5b919050565b600060a08284031215610a8857600080fd5b60405160a0810181811067ffffffffffffffff82111715610ab957634e487b7160e01b600052604160045260246000fd5b604052905080610ac883610a5a565b8152610ad660208401610a5a565b60208201526040830151604082015260608301516060820152608083015160808201525092915050565b600060a08284031215610b1257600080fd5b6106c78383610a76565b801515811461098b57600080fd5b81358152604081016020830135610b4081610b1c565b80151560208401525092915050565b60008219821115610b7057634e487b7160e01b600052601160045260246000fd5b500190565b60008251610b878184602087016109bb565b9190910192915050565b600060208284031215610ba357600080fd5b81516106c781610b1c56fea2646970667358221220a93d7012333bc8b2e69250ea08e0ce14667483b3f8c8ab888ca9b10ba38303df64736f6c63430008090033`,
  BytecodeLen: 3964,
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
