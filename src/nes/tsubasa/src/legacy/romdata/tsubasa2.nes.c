typedef unsigned char   undefined;

typedef unsigned char    byte;
typedef unsigned char    undefined1;
typedef unsigned short    undefined2;



// WARNING: Control flow encountered bad instruction data

void FUN_PRG00__8285(void)

{
  switchD_PRG12::82e1::caseD_6a = 1;
  FUN_PRG00__9fa8(1);
  FUN_c4b9(1);
                    // WARNING: Bad instruction - Truncating control flow here
  halt_baddata();
}



void FUN_PRG00__8297(undefined param_1)

{
  DAT_00e6 = 1;
  DAT_004d = 0xe5;
  DAT_004e = 0;
  DAT_00e7 = param_1;
  FUN_PRG00__9085();
  return;
}



void FUN_PRG00__82a9(void)

{
  do {
    FUN_PRG00__9fa8(1);
  } while ((DAT_004d | DAT_004e) != 0);
  return;
}



void FUN_PRG00__82b5(void)

{
  do {
    FUN_PRG00__9fa8(1);
    if ((DAT_004d | DAT_004e) == 0) break;
  } while ((SUB_001e & 0x20) == 0);
  DAT_0005 = 0;
  DAT_0006 = 0;
  DAT_0009._0_1_ = 0;
  DAT_0009._1_1_ = 0;
  DAT_0011._0_1_ = 0;
  DAT_0011._1_1_ = 0;
  DAT_000d._0_1_ = 0;
  DAT_000d._1_1_ = 0;
  LAB_004c = 0;
  switchD_PRG12::82e1::caseD_6a = 1;
  FUN_PRG00__9ba0();
  DAT_0044 = 0;
  DAT_0045 = 0;
  DAT_0079._1_1_ = 0;
  DAT_007b._0_1_ = 0;
  return;
}



void FUN_PRG00__838a(void)

{
  FUN_c4b9(2);
  FUN_a215();
  FUN_c4b9(6);
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG00__8464(byte param_1)

{
  byte bVar1;
  
  bVar1 = 0;
  do {
    bVar1 = bVar1 + 2;
  } while ((byte)(&LAB_PRG00__8aed_1)[bVar1] <= param_1);
  DAT_0056 = (&LAB_PRG00__8aed)[bVar1];
  _DAT_004d = (undefined2 *)
              CONCAT11(0xa0,(param_1 - (&LAB_PRG00__8aeb_1)[bVar1]) * '\x02' -
                            ((char)(param_1 - (&LAB_PRG00__8aeb_1)[bVar1]) >> 7));
  SUB_00ed = DAT_0025;
  FUN_c4b9();
  _DAT_004d = (undefined2 *)*_DAT_004d;
  DAT_0005 = 0xc5;
  DAT_0006 = 0x84;
  FUN_PRG00__9f69(0,0x50);
  DAT_000d._0_1_ = 0;
  DAT_000d._1_1_ = 0;
  DAT_0652 = 0;
  DAT_00e6 = 0xe0;
  DAT_00e7 = 0x23;
  FUN_PRG00__98ea(0x55,0x20,1);
  FUN_c4b9(SUB_00ed);
  return;
}



void FUN_PRG00__88b1(void)

{
  DAT_00e6 = DAT_004f & 0xe0 | DAT_0054;
  DAT_00e7 = (undefined)DAT_0050;
  FUN_PRG00__98e8((DAT_0054 ^ 0xff) + 0x1f,8);
  return;
}



void FUN_PRG00__88ca(byte param_1,byte param_2)

{
  byte bStack0000;
  
  bStack0000 = param_1;
  FUN_PRG00__9b28(0x82);
  if (0x9f < bStack0000) {
    (&DAT_05e8)[param_2] = (199 < bStack0000) + -0x6c;
    (&DAT_05e8)[(byte)(param_2 + 1)] = *(undefined *)(bStack0000 + 0x8a14);
    FUN_PRG00__9b5e(param_2 + 2);
    return;
  }
  (&DAT_05e9)[param_2] = bStack0000;
  (&DAT_05e8)[param_2] = 0;
  FUN_PRG00__9b5e(param_2 + 2);
  return;
}



void FUN_PRG00__88fb(void)

{
  byte bVar1;
  
  bVar1 = 0;
  do {
    (&DAT_046a)[bVar1] = (&DAT_046a)[bVar1] ^ 0x20;
    bVar1 = bVar1 + 4;
  } while (bVar1 != 0);
  return;
}



void FUN_PRG00__890c(char param_1)

{
  byte bVar1;
  
  bVar1 = 0;
  SUB_00ed = param_1;
  do {
    (&DAT_0468)[bVar1] = (&DAT_0468)[bVar1] + SUB_00ed;
    bVar1 = bVar1 + 4;
  } while (bVar1 != 0);
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG00__8920(void)

{
  char cVar1;
  byte bVar2;
  
  FUN_PRG00__9dee(0x13);
  RAM0x00ec = (undefined *)CONCAT11(SUB_00ed + -0x41,DAT_00eb._1_1_);
  switchD_PRG12::82e1::caseD_54._1_1_ = DAT_0025;
  FUN_c4b9(6);
  do {
  } while (DAT_0077._1_1_ != '\0');
  DAT_0079._0_1_ = *RAM0x00ec;
  DAT_0079._1_1_ = 0;
  bVar2 = 1;
  cVar1 = '\x12';
  do {
    *(undefined *)(bVar2 + 0x7b) = RAM0x00ec[bVar2];
    bVar2 = bVar2 + 1;
    cVar1 = cVar1 + -1;
  } while (cVar1 != '\0');
  FUN_c4b9(switchD_PRG12::82e1::caseD_54._1_1_);
  return;
}



void FUN_PRG00__895d(char param_1)

{
  if ((char)DAT_0098._1_1_ < '\0') {
    DAT_0098._1_1_ = DAT_0098._1_1_ ^ 0x41;
  }
  do {
    FUN_PRG00__9fa8(1);
    FUN_PRG00__89ff();
    param_1 = param_1 + -1;
  } while (param_1 != '\0');
  return;
}



void FUN_PRG00__899a(void)

{
  DAT_0098._1_1_ = DAT_0098._1_1_ & 0x80 | 0x40;
  return;
}



void FUN_PRG00__89a3(void)

{
  undefined uVar1;
  byte bVar2;
  char cVar3;
  
  do {
    bVar2 = 0xfc;
    do {
      (&DAT_0468)[bVar2] = *(undefined *)(bVar2 + 0x88d2);
      bVar2 = bVar2 + 1;
    } while (bVar2 != 0);
    uVar1 = 0xf8;
    cVar3 = '\0';
    while( true ) {
      FUN_PRG00__9fa8(1);
      if (SUB_001e < '\0') {
        DAT_0564 = uVar1;
        return;
      }
      cVar3 = cVar3 + '\x01';
      if (cVar3 == '(') break;
      if (cVar3 == '\x18') {
        DAT_0564 = uVar1;
      }
    }
  } while( true );
}



void FUN_PRG00__89d2(char param_1)

{
  FUN_c4b9(6);
  DAT_0654 = FUN_bd00[(byte)(param_1 << 1)];
  DAT_0655 = (&DAT_bd01)[(byte)(param_1 << 1)];
  DAT_0652 = 0x80;
  DAT_0653 = 1;
  DAT_008f._1_1_ = 0;
  DAT_0091._0_1_ = 2;
  FUN_c4b9(DAT_0056);
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG00__89ff(void)

{
  byte bVar1;
  byte bVar2;
  
  if (((char)DAT_0652 < '\0') && (DAT_0653 = DAT_0653 - 1, DAT_0653 == 0)) {
    FUN_c4b9(6);
    while( true ) {
      _DAT_00e6 = (byte *)CONCAT11(DAT_0655 + CARRY1(DAT_0652 & 0x3f,DAT_0654),
                                   (DAT_0652 & 0x3f) + DAT_0654);
      bVar2 = *_DAT_00e6;
      if (bVar2 == 0xff) break;
      if (bVar2 != 0xfe) {
        bVar2 = bVar2 & 0xf8;
        bVar1 = (bVar2 >> 1) + bVar2;
        DAT_00e8 = bVar1 + 0x80;
        switchD_PRG12::82e1::caseD_54._0_1_ = CARRY1(bVar2 >> 1,bVar2) + -0x43 + (0x7f < bVar1);
        DAT_0652 = DAT_0652 + 1;
        FUN_PRG00__8a91(0x23,2);
        FUN_PRG00__8a91(0x23,3);
        FUN_PRG00__8a91(0x23,4);
        DAT_0653 = _DAT_00e6[1] & 7;
        goto LAB_PRG00__8a8b;
      }
      DAT_0652 = DAT_0652 + 1 & 0xc0;
    }
    DAT_0652 = 0;
LAB_PRG00__8a8b:
    FUN_c4b9(DAT_0056);
  }
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG00__8a91(byte param_1)

{
  byte bVar1;
  
  FUN_PRG00__9b28(0x84);
  bVar1 = 0;
  do {
    (&DAT_05e8)[param_1] = *(undefined *)(_DAT_00e8 + (ushort)bVar1);
    param_1 = param_1 + 1;
    bVar1 = bVar1 + 1;
  } while (bVar1 != 4);
  FUN_PRG00__9b5e();
  _DAT_00e8 = CONCAT11((char)switchD_PRG12::82e1::caseD_54 + (0xfb < DAT_00e8),DAT_00e8 + 4);
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG00__8af7(char param_1)

{
  byte bVar1;
  byte bVar2;
  bool bVar3;
  bool bVar4;
  
  DAT_0009._0_1_ = 0;
  DAT_0009._1_1_ = 0;
  DAT_000d._0_1_ = 0;
  DAT_000d._1_1_ = 0;
  DAT_005a._1_1_ = DAT_005a._1_1_ & 0x7f;
  DAT_0077._0_1_ = DAT_0025;
  SUB_00ed = param_1;
  FUN_c4b9(7);
  bVar2 = 0xf8;
  do {
    *(undefined *)(bVar2 + 0x552) = 0;
    bVar2 = bVar2 + 1;
  } while (bVar2 != 0);
  DAT_0063 = (undefined2 *)CONCAT11(-0x60 - (SUB_00ed >> 7),SUB_00ed * '\x02');
  DAT_0063 = (undefined2 *)*DAT_0063;
  DAT_0075._0_1_ = *(undefined *)DAT_0063;
  DAT_0075._1_1_ = *(undefined *)((short)DAT_0063 + 1);
  DAT_0048 = *(byte *)((short)DAT_0063 + 2) & 0x3f;
  DAT_005a._1_1_ = DAT_005a._1_1_ & 0xfe | *(byte *)((short)DAT_0063 + 2) >> 7;
  DAT_005e = *(byte *)((short)DAT_0063 + 3);
  DAT_005f._0_1_ = *(char *)((short)DAT_0063 + 4);
  bVar2 = *(byte *)((short)DAT_0063 + 5) & 0xf8;
  bVar3 = (bool)(*(byte *)((short)DAT_0063 + 5) >> 7);
  bVar4 = (bool)((byte)(bVar2 << 1) >> 7);
  bVar2 = bVar2 << 2;
  bVar1 = *(byte *)((short)DAT_0063 + 5) & 7 | bVar2;
  DAT_005c = bVar1 << 2;
  DAT_005d = (((bVar3 | 4U) << 1 | bVar4) << 1 | bVar2 >> 7) << 1 | (byte)(bVar1 << 1) >> 7;
  if (!bVar4 && !bVar3) {
    DAT_005d = ((char)DAT_007b << 2 ^ DAT_005a._1_1_) & 4 | DAT_005d;
  }
  if (DAT_005e < 9) {
    if ((DAT_005d & 4) == 0) {
      FUN_PRG00__9071();
      goto LAB_PRG00__8bae;
    }
  }
  else {
    FUN_PRG00__9071();
  }
  FUN_PRG00__9076();
LAB_PRG00__8bae:
  FUN_PRG00__9fa8(1);
  DAT_0063._1_1_ = DAT_0063._1_1_ + (0xf9 < (byte)DAT_0063);
  DAT_0063._0_1_ = (byte)DAT_0063 + 6;
  FUN_PRG00__9dee(DAT_005e,(char)DAT_005f);
  _SUB_0070 = CONCAT11(DAT_0063._1_1_ + SUB_00ed + CARRY1((byte)DAT_0063,DAT_00eb._1_1_),
                       (byte)DAT_0063 + DAT_00eb._1_1_);
  DAT_0061._1_1_ = *(byte *)(_SUB_0070 + 1) & 0xe0;
  DAT_0071._1_1_ = *(byte *)(_SUB_0070 + 1) & 0x1f;
  DAT_0061._0_1_ = DAT_0071._1_1_ >> 2;
  DAT_005f._1_1_ = (byte)(DAT_0071._1_1_ << 7) >> 1 | (DAT_0071._1_1_ >> 1) << 7;
  if (DAT_0071._1_1_ != 0) {
    DAT_0071._1_1_ = *(byte *)(_SUB_0070 + 2);
  }
  bVar2 = *(byte *)(_SUB_0070 + 1) & 0xc0;
  if (bVar2 == 0) {
    bVar3 = CARRY1((char)DAT_005f - 1U,(byte)DAT_0063);
    DAT_0063._0_1_ = ((char)DAT_005f - 1U) + (byte)DAT_0063;
    DAT_0063._1_1_ = DAT_0063._1_1_ + bVar3;
    DAT_006d = 0xfc;
    DAT_006e = 0xff;
    DAT_006f = (char)DAT_005f;
  }
  else if (bVar2 == 0x40) {
    FUN_PRG00__9dee(DAT_005e,(char)DAT_005f);
    bVar2 = DAT_00eb._1_1_ - 1;
    SUB_00ed = SUB_00ed - ((bVar2 & ~DAT_00eb._1_1_ & 0x80) == 0);
    bVar3 = CARRY1((byte)DAT_0063,bVar2);
    DAT_0063._0_1_ = (byte)DAT_0063 + bVar2;
    DAT_0063._1_1_ = DAT_0063._1_1_ + SUB_00ed + bVar3;
    DAT_006d = 0xfc;
    DAT_006e = 0xff;
    DAT_006f = -(char)DAT_005f;
    DAT_00eb._1_1_ = bVar2;
  }
  else if (bVar2 == 0x80) {
    DAT_006d = 4;
    DAT_006e = 1;
    DAT_006f = (char)DAT_005f;
  }
  else {
    DAT_006d = 4;
    DAT_006e = 1;
    DAT_006f = (char)DAT_005f;
  }
  if (DAT_005e < 7) {
    FUN_PRG00__8e15((char)DAT_005f,DAT_005e);
    if (DAT_0071._1_1_ != 0) {
      DAT_0009._0_1_ = 0x21;
      DAT_0009._1_1_ = 0x8d;
      FUN_PRG00__9f69(0,0x78);
    }
  }
  else {
    DAT_005e = DAT_005e - 7;
    FUN_PRG00__8e15((char)DAT_005f,7);
    DAT_007b._0_1_ = '\x01';
    DAT_0009._0_1_ = 0xb9;
    DAT_0009._1_1_ = 0x8c;
    FUN_PRG00__9f69(0,0x78);
  }
  DAT_008e = (undefined)DAT_0075;
  DAT_008f._0_1_ = DAT_0075._1_1_;
  DAT_0044 = 0;
  DAT_0045 = 0;
  DAT_0079._1_1_ = 0;
  FUN_c4b9((undefined)DAT_0077);
  return;
}



byte FUN_PRG00__8e15(char param_1,char param_2)

{
  byte bVar1;
  byte bVar2;
  char cVar3;
  bool bVar4;
  
  DAT_006b = param_1;
  DAT_006c = param_2;
  do {
    DAT_0065._0_1_ = (byte)DAT_0063;
    DAT_0065._1_1_ = DAT_0063._1_1_;
    SUB_00ed = DAT_006b;
    DAT_0073 = DAT_005c;
    DAT_0074 = DAT_005d;
    do {
      FUN_PRG00__8ef0(*DAT_0063);
      bVar2 = DAT_005c + DAT_006d;
      bVar1 = DAT_005c ^ bVar2;
      DAT_005c = bVar2;
      if ((bVar1 & 0x20) != 0) {
        DAT_005c = (DAT_006d << 3 ^ 0xffU) + 1 + bVar2;
        DAT_005d = DAT_005d ^ 4;
      }
      cVar3 = CARRY1(DAT_006e,(byte)DAT_0063);
      if ((char)DAT_006e < '\0') {
        cVar3 = -!(bool)cVar3;
      }
      DAT_0063 = (undefined *)CONCAT11(DAT_0063._1_1_ + cVar3,DAT_006e + (byte)DAT_0063);
      SUB_00ed = SUB_00ed + -1;
    } while (SUB_00ed != '\0');
    cVar3 = CARRY1(DAT_006f,(byte)DAT_0065);
    if ((char)DAT_006f < '\0') {
      cVar3 = -!(bool)cVar3;
    }
    DAT_0063 = (undefined *)CONCAT11(DAT_0065._1_1_ + cVar3,DAT_006f + (byte)DAT_0065);
    if ((DAT_0061._1_1_ & 0xc0) == 0x40) {
      DAT_005c = DAT_0073 + 0x80;
      DAT_005d = DAT_0074 -
                 ((byte)(~DAT_0073 & 0x80 | DAT_005c & 0x80 | DAT_005c & ~DAT_0073 & 0x80) == 0);
      bVar2 = DAT_005c;
      if (((char)DAT_005c < '\0') && (bVar2 = DAT_005d & 3, bVar2 == 3)) {
        bVar4 = 0x3f < DAT_005c;
        DAT_005c = DAT_0073 + 0x40;
        bVar2 = DAT_005d + 3 + bVar4;
        DAT_005d = bVar2;
      }
    }
    else {
      bVar1 = DAT_0073 + 0x80;
      DAT_005d = DAT_0074 + (0x7f < DAT_0073);
      bVar2 = DAT_0073 + 0x40;
      DAT_005c = bVar1;
      if (((char)bVar2 < '\0') &&
         (bVar2 = DAT_005d - ((bVar2 & ~bVar1 & 0x80) == 0) & 3, bVar2 == 3)) {
        DAT_005c = DAT_0073 - 0x40;
        bVar2 = (DAT_005d - 3) -
                (((~bVar1 & 0xc0 | DAT_005c & 0xc0 | DAT_005c & ~bVar1) & 0x80) == 0);
        DAT_005d = bVar2;
      }
    }
    DAT_006c = DAT_006c + -1;
  } while (DAT_006c != '\0');
  return bVar2;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG00__8ef0(byte param_1)

{
  byte bVar1;
  byte bVar2;
  byte bVar3;
  
  DAT_0067 = DAT_005c;
  DAT_0068 = DAT_005d;
  RAM0x00ea = (byte *)CONCAT11((DAT_005a._1_1_ & 1) +
                               (((((DAT_005a._1_1_ & 1) << 1 | param_1 >> 7) << 1 |
                                 (byte)(param_1 << 1) >> 7) << 1 | (byte)(param_1 << 2) >> 7) << 1 |
                               (byte)(param_1 << 3) >> 7) + CARRY1(param_1 * '\x10',param_1) + -0x60
                               ,param_1 * '\x11');
  FUN_c4b9(8);
  DAT_00e7 = *RAM0x00ea;
  FUN_PRG00__8fd1();
  if ((byte)(switchD_PRG12::82e1::caseD_54._1_1_ + '\x01') == '\0') {
    DAT_00eb._0_1_ = (char)DAT_00eb + '\x01';
  }
  RAM0x00ea = (byte *)CONCAT11((char)DAT_00eb,switchD_PRG12::82e1::caseD_54._1_1_ + '\x01');
  DAT_00e8 = '\x04';
  bVar3 = DAT_0067;
  while( true ) {
    DAT_0067 = bVar3;
    bVar2 = DAT_0068;
    FUN_PRG00__9b28(4,DAT_0067);
    bVar3 = 0;
    do {
      (&DAT_05e8)[bVar2] = *(undefined *)((short)RAM0x00ea + (ushort)bVar3);
      bVar2 = bVar2 + 1;
      bVar3 = bVar3 + 1;
    } while (bVar3 != 4);
    FUN_PRG00__9b5e();
    DAT_00e8 = DAT_00e8 + -1;
    if (DAT_00e8 == '\0') break;
    RAM0x00ea = (byte *)CONCAT11((char)DAT_00eb + (0xfb < switchD_PRG12::82e1::caseD_54._1_1_),
                                 switchD_PRG12::82e1::caseD_54._1_1_ + 4);
    bVar3 = DAT_0067 + 0x20;
    DAT_0068 = DAT_0068 + (0xdf < DAT_0067);
    if (((DAT_0068 & 3) == 3) && (0xbf < bVar3)) {
      DAT_0067 = DAT_0067 + 0x60;
      DAT_0068 = (DAT_0068 - 3) -
                 (((~bVar3 & 0xc0 | DAT_0067 & 0xc0 | DAT_0067 & ~bVar3) & 0x80) == 0);
      FUN_PRG00__9049();
      FUN_PRG00__9b28(1);
      bVar3 = DAT_0067 >> 2 & 7;
      if ((DAT_0061._1_1_ & 0xc0) == 0x40) {
        (&DAT_05e8)[bVar2] = DAT_00e7 >> 4 | (&DAT_064a)[bVar3];
        FUN_PRG00__9b5e(bVar2 + 1);
        bVar3 = DAT_0067;
      }
      else {
        bVar1 = DAT_00e7 >> 4;
        (&DAT_05e8)[bVar2] = bVar1;
        (&DAT_064a)[bVar3] = bVar1;
        FUN_PRG00__9b5e(bVar2 + 1);
        bVar3 = DAT_0067;
      }
    }
  }
  FUN_c4b9(7);
  return;
}



void FUN_PRG00__8fd1(byte param_1,char param_2)

{
  char cVar1;
  byte bVar2;
  
  FUN_PRG00__9049();
  if ((DAT_0067 & 0x40) == 0x40) {
    DAT_00e8 = param_2;
    switchD_PRG12::82e1::caseD_54._0_1_ = param_1;
    FUN_PRG00__9b28(1);
    bVar2 = DAT_0067 >> 2 & 7;
    if ((DAT_0061._1_1_ & 0xc0) == 0x40) {
      cVar1 = DAT_00e7 << 4;
      (&DAT_05e8)[param_1] = cVar1;
      DAT_00e6 = DAT_00e7 >> 4 | (&DAT_064a)[bVar2];
      (&DAT_064a)[bVar2] = cVar1;
    }
    else {
      (&DAT_05e8)[param_1] = DAT_00e7 << 4 | (&DAT_064a)[bVar2];
      DAT_00e6 = DAT_00e7 >> 4;
      (&DAT_064a)[bVar2] = DAT_00e6;
    }
    FUN_PRG00__9b5e(param_1 + 1);
    param_1 = (byte)switchD_PRG12::82e1::caseD_54;
    FUN_PRG00__9b28(1,DAT_00e8 + '\b');
    bVar2 = DAT_00e6;
  }
  else {
    FUN_PRG00__9b28(1);
    bVar2 = DAT_00e7;
  }
  (&DAT_05e8)[param_1] = bVar2;
  FUN_PRG00__9b5e(param_1 + 1);
  return;
}



char FUN_PRG00__9049(void)

{
  DAT_00e6 = ((DAT_0067 & 0x9c) >> 2 & 0x20 | DAT_0067 & 0x1c) >> 2;
  return (DAT_0068 & 0xfc) + 3 + (0x3f < (byte)((DAT_0068 & 3) << 4));
}



void FUN_PRG00__9071(void)

{
  DAT_00e7 = 0x20;
  DAT_00e6 = 0;
  FUN_PRG00__98e8(0x20,0x10);
  return;
}



void FUN_PRG00__9076(void)

{
  DAT_00e7 = 0x24;
  DAT_00e6 = 0;
  FUN_PRG00__98e8(0x20,0x10);
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG00__9085(void)

{
  undefined uVar1;
  byte bVar2;
  
  bVar2 = 1;
  do {
    *(undefined *)(bVar2 + 0x467) = 0;
    bVar2 = bVar2 + 1;
  } while (bVar2 != 0);
  DAT_0097 = 0;
  DAT_00eb._1_1_ = *(char *)((short)_DAT_004d + 1);
  _DAT_004d = (byte *)CONCAT11(DAT_004e + (0xfd < DAT_004d),DAT_004d + 2);
  RAM0x0094 = &DAT_0568;
  do {
    SUB_00ed = DAT_0025;
    bVar2 = *_DAT_004d;
    uVar1 = 9;
    if (0x6c < bVar2) {
      bVar2 = bVar2 + 0x93;
      uVar1 = 10;
    }
    FUN_c4b9(uVar1);
    RAM0x0092 = (undefined2 *)CONCAT11(-0x60 - ((char)bVar2 >> 7),bVar2 * '\x02');
    unique0x10000017 = (undefined2 *)*RAM0x0092;
    bVar2 = 0;
    do {
      RAM0x0094[bVar2] = (&DAT_PRG00__978b)[bVar2];
      bVar2 = bVar2 + 1;
    } while (bVar2 != 0x20);
    *RAM0x0094 = DAT_0025 - 9U | *RAM0x0094;
    DAT_0049 = *(undefined *)RAM0x0092;
    bVar2 = DAT_0091._1_1_ + 1;
    if (bVar2 == 0) {
      DAT_0093._0_1_ = (byte)DAT_0093 + '\x01';
    }
    RAM0x0092 = (undefined2 *)CONCAT11((byte)DAT_0093,bVar2);
    RAM0x0094[2] = bVar2;
    RAM0x0094[3] = (byte)DAT_0093;
    FUN_c4b9(SUB_00ed);
    if ((byte)(DAT_004d + '\x01') == '\0') {
      DAT_004e = DAT_004e + '\x01';
    }
    _DAT_004d = (byte *)CONCAT11(DAT_004e,DAT_004d + '\x01');
    RAM0x0094 = (byte *)CONCAT11((char)DAT_0095 + (0xdf < DAT_0093._1_1_),DAT_0093._1_1_ + 0x20);
    DAT_00eb._1_1_ = DAT_00eb._1_1_ + -1;
  } while (DAT_00eb._1_1_ != '\0');
  DAT_0011._0_1_ = 0x47;
  DAT_0011._1_1_ = 0x91;
  FUN_PRG00__9f69(0,200);
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG00__9143(void)

{
  byte bVar1;
  char cVar2;
  byte bVar3;
  byte bVar4;
  bool bVar5;
  
  FUN_PRG00__9fa8(1);
  RAM0x0094 = &DAT_0568;
  DAT_0095._1_1_ = 4;
  if (-1 < (char)DAT_0568) {
    FUN_PRG00__94c1();
    return;
  }
  bVar3 = DAT_0568;
  FUN_PRG00__974a(4);
  FUN_PRG00__974a(6);
  if ((bVar3 & 0x10) == 0) {
    if ((bVar3 & 0x20) == 0) goto LAB_PRG00__91f3;
    FUN_PRG00__975b(4,10);
    DAT_00e6 = DAT_009a;
    FUN_PRG00__974a(4);
    DAT_00e6 = DAT_009a - DAT_00e6;
    FUN_PRG00__975b(6,0xe);
    DAT_00e8 = DAT_009c;
    FUN_PRG00__974a(6);
    DAT_00e8 = DAT_009c - DAT_00e8;
  }
  else {
    DAT_00e6 = -DAT_0046;
    DAT_00e8 = -DAT_0047;
  }
  bVar3 = RAM0x0094[0x10];
  bVar4 = RAM0x0094[0x11] >> 2;
  do {
    bVar5 = CARRY1(DAT_00e6,(&DAT_0468)[bVar3]);
    bVar1 = DAT_00e6 + (&DAT_0468)[bVar3];
    (&DAT_0468)[bVar3] = bVar1;
    if ((char)((bVar1 >> 1 | bVar5 << 7) ^ DAT_00e6) < '\0') {
      (&DAT_046a)[bVar3] = (&DAT_046a)[bVar3] ^ 8;
    }
    bVar5 = CARRY1(DAT_00e8,(&DAT_046b)[bVar3]);
    bVar1 = DAT_00e8 + (&DAT_046b)[bVar3];
    (&DAT_046b)[bVar3] = bVar1;
    if ((char)((bVar1 >> 1 | bVar5 << 7) ^ DAT_00e8) < '\0') {
      (&DAT_046a)[bVar3] = (&DAT_046a)[bVar3] ^ 4;
    }
    bVar3 = bVar3 + 4;
    bVar4 = bVar4 - 1;
  } while (bVar4 != 0);
LAB_PRG00__91f3:
  bVar3 = RAM0x0094[1];
  RAM0x0094[1] = bVar3 - 1;
  if ((byte)(bVar3 - 1) != 0) {
    FUN_PRG00__94c1();
    return;
  }
  FUN_c4b9((*RAM0x0094 & 1) + 9);
  unique0x10000044 = *(byte **)(RAM0x0094 + 2);
  if ((*RAM0x0094 & 2) == 0) {
    while( true ) {
      bVar3 = *RAM0x0092;
      if (-1 < (char)bVar3) {
        RAM0x0094[1] = bVar3 << 1;
        bVar5 = 0xfe < DAT_0091._1_1_;
        RAM0x0094[2] = DAT_0091._1_1_ + 1;
        RAM0x0094[3] = (char)DAT_0093 + bVar5;
        FUN_PRG00__94c1();
        return;
      }
      if (bVar3 < 0xa0) break;
      if (bVar3 < 0xc0) {
        RAM0x0092 = (byte *)CONCAT11(bVar3,RAM0x0092[1]);
      }
      else if (bVar3 < 0xe0) {
        bVar4 = RAM0x0094[0x13];
        do {
        } while (2 < bVar4);
        DAT_00e7 = bVar3;
        RAM0x0094[0x13] = bVar4 + 1;
        bVar5 = 0xfd < DAT_0091._1_1_;
        RAM0x0094[(byte)(bVar4 * '\x02' + 0x18)] = DAT_0091._1_1_ + 2;
        RAM0x0094[(byte)(bVar4 * '\x02' + 0x19)] = (char)DAT_0093 + bVar5;
        RAM0x0092 = (byte *)CONCAT11(DAT_00e7 - 0x20,RAM0x0092[1]);
      }
      else {
        if (0xef < bVar3) {
          return;
        }
        bVar4 = RAM0x0094[0x13];
        do {
        } while (3 < bVar4);
        RAM0x0094[0x13] = bVar4 + 1;
        RAM0x0094[(byte)(bVar4 + 0x14)] = bVar3 + 0x20;
        cVar2 = (bVar4 + 0x14) * '\x02';
        bVar5 = 0xfe < DAT_0091._1_1_;
        bVar3 = DAT_0091._1_1_ + 1;
        DAT_0091._1_1_ = bVar3;
        RAM0x0094[(byte)(cVar2 - 0x10)] = bVar3;
        bVar3 = (char)DAT_0093 + bVar5;
        RAM0x0092 = (byte *)CONCAT11(bVar3,DAT_0091._1_1_);
        RAM0x0094[(byte)(cVar2 - 0xf)] = bVar3;
      }
    }
    DAT_00e7 = bVar3 + 0x20;
    DAT_00e6 = RAM0x0092[1];
    FUN_PRG00__94d8();
    FUN_PRG00__94ae(2);
    return;
  }
  FUN_PRG00__9459();
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG00__9224(void)

{
  byte bVar1;
  byte bVar2;
  char cVar3;
  char cVar4;
  bool bVar5;
  
  while( true ) {
    bVar1 = *RAM0x0092;
    if (-1 < (char)bVar1) {
      *(byte *)(RAM0x0094 + 1) = bVar1 << 1;
      bVar5 = 0xfe < DAT_0091._1_1_;
      *(byte *)(RAM0x0094 + 2) = DAT_0091._1_1_ + 1;
      *(char *)(RAM0x0094 + 3) = (char)DAT_0093 + bVar5;
      FUN_PRG00__94c1();
      return;
    }
    if (bVar1 < 0xa0) break;
    if (bVar1 < 0xc0) {
      RAM0x0092 = (byte *)CONCAT11(bVar1,RAM0x0092[1]);
    }
    else if (bVar1 < 0xe0) {
      bVar2 = *(byte *)(RAM0x0094 + 0x13);
      do {
      } while (2 < bVar2);
      DAT_00e7 = bVar1;
      *(byte *)(RAM0x0094 + 0x13) = bVar2 + 1;
      bVar5 = 0xfd < DAT_0091._1_1_;
      *(byte *)(RAM0x0094 + (ushort)(byte)(bVar2 * '\x02' + 0x18)) = DAT_0091._1_1_ + 2;
      *(char *)(RAM0x0094 + (ushort)(byte)(bVar2 * '\x02' + 0x19)) = (char)DAT_0093 + bVar5;
      RAM0x0092 = (byte *)CONCAT11(DAT_00e7 - 0x20,RAM0x0092[1]);
    }
    else {
      if (0xef < bVar1) {
        return;
      }
      bVar2 = *(byte *)(RAM0x0094 + 0x13);
      do {
      } while (3 < bVar2);
      *(byte *)(RAM0x0094 + 0x13) = bVar2 + 1;
      *(byte *)(RAM0x0094 + (ushort)(byte)(bVar2 + 0x14)) = bVar1 + 0x20;
      cVar3 = (bVar2 + 0x14) * '\x02';
      bVar5 = 0xfe < DAT_0091._1_1_;
      cVar4 = DAT_0091._1_1_ + 1;
      DAT_0091._1_1_ = cVar4;
      *(char *)(RAM0x0094 + (ushort)(byte)(cVar3 - 0x10)) = cVar4;
      cVar4 = (char)DAT_0093 + bVar5;
      RAM0x0092 = (byte *)CONCAT11(cVar4,DAT_0091._1_1_);
      *(char *)(RAM0x0094 + (ushort)(byte)(cVar3 - 0xf)) = cVar4;
    }
  }
  DAT_00e7 = bVar1 + 0x20;
  DAT_00e6 = RAM0x0092[1];
  FUN_PRG00__94d8();
  FUN_PRG00__94ae(2);
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG00__9459(void)

{
  byte bVar1;
  
  if ((DAT_0098._1_1_ & 0x40) == 0x40) {
    bVar1 = (DAT_0098._1_1_ & 1) << 1 | 1;
    DAT_00e6 = *(undefined *)(RAM0x0092 + (ushort)bVar1);
    DAT_00e7 = *(undefined *)(RAM0x0092 + (ushort)(byte)(bVar1 + 1));
    FUN_PRG00__94d8();
    if (DAT_0098._1_1_ == 0xfe) {
      *RAM0x0094 = *RAM0x0094 & 0xfd;
      FUN_PRG00__94ae(5);
      return;
    }
    DAT_0098._1_1_ = DAT_0098._1_1_ & 0xbf;
  }
  RAM0x0094[1] = 1;
  FUN_PRG00__94c1();
  return;
}



void FUN_PRG00__94ae(byte param_1)

{
  bool bVar1;
  
  bVar1 = CARRY1(param_1,DAT_0091._1_1_);
  DAT_0091._1_1_ = param_1 + DAT_0091._1_1_;
  DAT_0093._0_1_ = (char)DAT_0093 + bVar1;
  FUN_PRG00__9224();
  return;
}


/*
Unable to decompile 'FUN_PRG00__94c1'
Cause: 
Low-level Error: Overlapping input varnodes
*/


// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG00__94d8(void)

{
  byte bVar1;
  byte bVar2;
  char cVar3;
  bool bVar4;
  
  switchD_PRG12::8266::caseD_e4._1_1_ = *_DAT_00e6 | 0x80;
  DAT_009f = _DAT_00e6[1];
  switchD_PRG12::82e1::caseD_7a._0_1_ = _DAT_00e6[2];
  switchD_PRG12::82e1::caseD_7a._1_1_ = _DAT_00e6[3];
  _DAT_00e6 = (byte *)CONCAT11(DAT_00e7 + (0xfb < DAT_00e6),DAT_00e6 + 4);
  if ((*RAM0x0094 & 8) == 0) {
    RAM0x0094[0x10] = DAT_0097;
  }
  DAT_0098._0_1_ = RAM0x0094[0x10];
  DAT_00e8 = 0;
  switchD_PRG12::82e1::caseD_54._0_1_ = 0;
  while( true ) {
    while( true ) {
      while( true ) {
        while (bVar1 = (byte)DAT_0098, bVar2 = *_DAT_00e6, -1 < (char)bVar2) {
          bVar2 = (bVar2 & 0x3c) << 2;
          if ((char)bVar2 < '\0') {
            bVar2 = bVar2 >> 1 | 0x80;
            bVar4 = CARRY1(bVar2,DAT_009a);
            switchD_PRG12::82e1::caseD_54._1_1_ = bVar2 + DAT_009a;
            (&DAT_0468)[(byte)DAT_0098] = switchD_PRG12::82e1::caseD_54._1_1_;
            bVar2 = -!bVar4 - DAT_009b;
          }
          else {
            bVar4 = CARRY1(bVar2 >> 1,DAT_009a);
            switchD_PRG12::82e1::caseD_54._1_1_ = (bVar2 >> 1) + DAT_009a;
            (&DAT_0468)[(byte)DAT_0098] = switchD_PRG12::82e1::caseD_54._1_1_;
            bVar2 = DAT_009b + bVar4;
          }
          DAT_00eb._0_1_ = bVar2 & 1;
          DAT_00eb._1_1_ = (byte)DAT_00eb << 1;
          (&DAT_046b)[bVar1] = DAT_00e8;
          DAT_00eb._1_1_ =
               (*_DAT_00e6 ^ *RAM0x0094) & 0x40 |
               ((byte)switchD_PRG12::82e1::caseD_54 & 1 | DAT_00eb._1_1_) << 2;
          (&DAT_046a)[bVar1] = *_DAT_00e6 & 3 | DAT_00eb._1_1_;
          (&DAT_0469)[bVar1] = _DAT_00e6[1];
          DAT_0098._0_1_ = (byte)DAT_0098 + 4;
          _DAT_00e6 = (byte *)CONCAT11(DAT_00e7 + (0xfd < DAT_00e6),DAT_00e6 + 2);
        }
        if (0x9f < bVar2) break;
        cVar3 = '\0';
        bVar2 = bVar2 * '\b';
        if ((char)bVar2 < '\0') {
          cVar3 = -1;
        }
        switchD_PRG12::82e1::caseD_54._1_1_ = DAT_009a + bVar2;
        DAT_00eb._0_1_ = DAT_009b + cVar3 + CARRY1(DAT_009a,bVar2);
        if ((byte)(DAT_00e6 + '\x01') == '\0') {
          DAT_00e7 = DAT_00e7 + '\x01';
        }
        _DAT_00e6 = (byte *)CONCAT11(DAT_00e7,DAT_00e6 + '\x01');
      }
      if (0xbf < bVar2) break;
      if ((char)(*RAM0x0094 << 1) < '\0') {
        bVar2 = (bVar2 ^ 0xff) + 1;
      }
      cVar3 = '\0';
      bVar2 = bVar2 * '\b';
      if ((char)bVar2 < '\0') {
        cVar3 = -1;
      }
      DAT_00e8 = DAT_009c + bVar2;
      switchD_PRG12::82e1::caseD_54._0_1_ =
           (char)switchD_PRG12::8266::caseD_e4 + cVar3 + CARRY1(DAT_009c,bVar2);
      if ((byte)(DAT_00e6 + '\x01') == '\0') {
        DAT_00e7 = DAT_00e7 + '\x01';
      }
      _DAT_00e6 = (byte *)CONCAT11(DAT_00e7,DAT_00e6 + '\x01');
    }
    if (0xcf < bVar2) break;
    if ((char)(*RAM0x0094 << 1) < '\0') {
      bVar2 = (bVar2 ^ 0xff) + 1;
    }
    if ((bVar2 & 8) == 0) {
      bVar2 = bVar2 & 7;
      cVar3 = '\0';
    }
    else {
      bVar2 = bVar2 | 0xf0;
      cVar3 = -1;
    }
    bVar4 = CARRY1(bVar2,DAT_00e8);
    (&DAT_046b)[(byte)DAT_0098] = bVar2 + DAT_00e8;
    DAT_00eb._1_1_ = cVar3 + (byte)switchD_PRG12::82e1::caseD_54 + bVar4 & 1;
    bVar2 = (_DAT_00e6[1] & 0x3c) >> 2;
    if ((bVar2 & 8) == 0) {
      bVar4 = CARRY1(bVar2,switchD_PRG12::82e1::caseD_54._1_1_);
      (&DAT_0468)[bVar1] = bVar2 + switchD_PRG12::82e1::caseD_54._1_1_;
      bVar2 = (byte)DAT_00eb + bVar4;
    }
    else {
      bVar4 = CARRY1(bVar2 - 0x10,switchD_PRG12::82e1::caseD_54._1_1_);
      (&DAT_0468)[bVar1] = (bVar2 - 0x10) + switchD_PRG12::82e1::caseD_54._1_1_;
      bVar2 = (byte)DAT_00eb - !bVar4;
    }
    DAT_00eb._1_1_ = (_DAT_00e6[1] ^ *RAM0x0094) & 0x40 | ((bVar2 & 1) << 1 | DAT_00eb._1_1_) << 2;
    (&DAT_046a)[bVar1] = _DAT_00e6[1] & 3 | DAT_00eb._1_1_;
    (&DAT_0469)[bVar1] = _DAT_00e6[2];
    DAT_0098._0_1_ = (byte)DAT_0098 + 4;
    _DAT_00e6 = (byte *)CONCAT11(DAT_00e7 + (0xfc < DAT_00e6),DAT_00e6 + 3);
  }
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG00__9735(char param_1,byte param_2)

{
  *(undefined *)(RAM0x0094 + (ushort)param_2) = 0;
  param_2 = param_2 + 1;
  *(char *)(RAM0x0094 + (ushort)param_2) = param_1;
  *(char *)(param_2 + 0x95) = param_1 << 1;
  *(char *)(param_2 + 0x96) = -(param_1 >> 7);
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG00__974a(byte param_1)

{
  byte bVar1;
  byte bVar2;
  
  bVar2 = param_1 + 1;
  bVar1 = *(byte *)(RAM0x0094 + (ushort)bVar2);
  *(byte *)(bVar2 + 0x95) = bVar1 << 1 | *(byte *)(RAM0x0094 + (ushort)param_1) >> 7;
  *(byte *)(bVar2 + 0x96) = bVar1 >> 7;
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG00__975b(byte param_1,byte param_2)

{
  byte bVar1;
  byte bVar2;
  byte bVar3;
  char cVar4;
  bool bVar5;
  
  bVar1 = *(byte *)(RAM0x0094 + (ushort)param_2);
  bVar2 = *(byte *)(RAM0x0094 + (ushort)param_2);
  bVar3 = *(byte *)(RAM0x0094 + (ushort)(byte)(param_2 - 2));
  DAT_00eb._1_1_ = bVar2 + bVar3;
  SUB_00ed = param_1;
  *(byte *)(RAM0x0094 + (ushort)(byte)(param_2 - 2)) = DAT_00eb._1_1_;
  cVar4 = (bVar1 >> 7 ^ 0xff) + 1 + *(char *)(RAM0x0094 + (ushort)(byte)(param_2 - 1)) +
          CARRY1(bVar2,bVar3);
  *(char *)(RAM0x0094 + (ushort)(byte)(param_2 - 1)) = cVar4;
  bVar1 = SUB_00ed;
  bVar5 = CARRY1(DAT_00eb._1_1_,*(byte *)(RAM0x0094 + (ushort)SUB_00ed));
  *(byte *)(RAM0x0094 + (ushort)SUB_00ed) = DAT_00eb._1_1_ + *(byte *)(RAM0x0094 + (ushort)SUB_00ed)
  ;
  *(char *)(RAM0x0094 + (ushort)(byte)(bVar1 + 1)) =
       cVar4 + *(char *)(RAM0x0094 + (ushort)(byte)(bVar1 + 1)) + bVar5;
  return;
}


/*
Unable to decompile 'FUN_PRG00__97b6'
Cause: 
Low-level Error: Overlapping input varnodes
*/


void FUN_PRG00__98a0(void)

{
  char cVar1;
  char cVar2;
  
  PPUMASK = SUB_0021 & 0xe7;
  PPUADDR = (code)0x0;
  cVar2 = '\b';
  cVar1 = '\0';
  do {
    do {
      PPUDATA = 0;
      cVar1 = cVar1 + '\x01';
    } while (cVar1 != '\0');
    cVar2 = cVar2 + -1;
  } while (cVar2 != '\0');
  SUB_0021 = SUB_0021 & 0xe7 | 0x18;
  PPUMASK = SUB_0021;
  DAT_001f._1_1_ = (code)((byte)DAT_001f._1_1_ & 0x7f | 0x80);
  PPUCTRL = DAT_001f._1_1_;
  return;
}



void FUN_PRG00__98e8(char param_1,byte param_2)

{
  undefined uVar1;
  byte bVar2;
  char cVar3;
  bool bVar4;
  
  DAT_00eb._0_1_ = 0;
  DAT_00e8 = param_2;
  switchD_PRG12::82e1::caseD_54._0_1_ = param_1;
  if ((DAT_004a | (byte)FUN_004b) == 0) {
    PPUMASK = SUB_0021 & 0xe7;
    do {
      PPUADDR = DAT_00e6;
      cVar3 = param_1;
      do {
        PPUDATA = 0;
        cVar3 = cVar3 + -1;
      } while (cVar3 != '\0');
      bVar4 = 0xdf < (byte)DAT_00e6;
      DAT_00e6 = (code)((char)DAT_00e6 + 0x20);
      DAT_00e7 = DAT_00e7 + bVar4;
      DAT_00e8 = DAT_00e8 - 1;
    } while (DAT_00e8 != 0);
    SUB_0021 = SUB_0021 & 0xe7 | 0x18;
    PPUMASK = SUB_0021;
    DAT_001f._1_1_ = (code)((byte)DAT_001f._1_1_ & 0x7f | 0x80);
    PPUCTRL = DAT_001f._1_1_;
    return;
  }
  do {
    bVar2 = DAT_00e7;
    FUN_PRG00__9b28((char)switchD_PRG12::82e1::caseD_54,DAT_00e6);
    uVar1 = (undefined)DAT_00eb;
    cVar3 = (char)switchD_PRG12::82e1::caseD_54;
    do {
      (&DAT_05e8)[bVar2] = uVar1;
      bVar2 = bVar2 + 1;
      cVar3 = cVar3 + -1;
    } while (cVar3 != '\0');
    FUN_PRG00__9b5e();
    if ((char)DAT_00e8 < '\0') {
      FUN_PRG00__9fa8(1);
    }
    bVar4 = 0xdf < (byte)DAT_00e6;
    DAT_00e6 = (code)((char)DAT_00e6 + 0x20);
    DAT_00e7 = DAT_00e7 + bVar4;
    DAT_00e8 = DAT_00e8 - 1;
  } while ((DAT_00e8 & 0x7f) != 0);
  return;
}



void FUN_PRG00__98ea(undefined param_1,char param_2,byte param_3)

{
  undefined uVar1;
  byte bVar2;
  char cVar3;
  bool bVar4;
  
  DAT_00eb._0_1_ = param_1;
  DAT_00e8 = param_3;
  switchD_PRG12::82e1::caseD_54._0_1_ = param_2;
  if ((DAT_004a | (byte)FUN_004b) == 0) {
    PPUMASK = SUB_0021 & 0xe7;
    do {
      PPUADDR = DAT_00e6;
      cVar3 = param_2;
      do {
        PPUDATA = param_1;
        cVar3 = cVar3 + -1;
      } while (cVar3 != '\0');
      bVar4 = 0xdf < (byte)DAT_00e6;
      DAT_00e6 = (code)((char)DAT_00e6 + 0x20);
      DAT_00e7 = DAT_00e7 + bVar4;
      DAT_00e8 = DAT_00e8 - 1;
    } while (DAT_00e8 != 0);
    SUB_0021 = SUB_0021 & 0xe7 | 0x18;
    PPUMASK = SUB_0021;
    DAT_001f._1_1_ = (code)((byte)DAT_001f._1_1_ & 0x7f | 0x80);
    PPUCTRL = DAT_001f._1_1_;
    return;
  }
  do {
    bVar2 = DAT_00e7;
    FUN_PRG00__9b28((char)switchD_PRG12::82e1::caseD_54,DAT_00e6);
    uVar1 = (undefined)DAT_00eb;
    cVar3 = (char)switchD_PRG12::82e1::caseD_54;
    do {
      (&DAT_05e8)[bVar2] = uVar1;
      bVar2 = bVar2 + 1;
      cVar3 = cVar3 + -1;
    } while (cVar3 != '\0');
    FUN_PRG00__9b5e();
    if ((char)DAT_00e8 < '\0') {
      FUN_PRG00__9fa8(1);
    }
    bVar4 = 0xdf < (byte)DAT_00e6;
    DAT_00e6 = (code)((char)DAT_00e6 + 0x20);
    DAT_00e7 = DAT_00e7 + bVar4;
    DAT_00e8 = DAT_00e8 - 1;
  } while ((DAT_00e8 & 0x7f) != 0);
  return;
}



void FUN_PRG00__997e(void)

{
  FUN_PRG00__9b07();
  FUN_PRG00__9ab8();
  FUN_PRG00__9ada();
  FUN_c4b9((undefined)switchD_PRG12::82e1::caseD_54);
  do {
    if (DAT_004a < 0xf) {
      DAT_004a = DAT_004a + 1;
    }
    if ((byte)FUN_004b < 0xf) {
      FUN_004b = (code)((char)FUN_004b + '\x01');
    }
    FUN_PRG00__9a71();
    FUN_PRG00__9fa8(1);
  } while ((byte)(DAT_004a + (char)FUN_004b) < 0x1e);
  return;
}



void FUN_PRG00__99b0(void)

{
  FUN_PRG00__9b07();
  FUN_PRG00__9ab8();
  FUN_c4b9((undefined)switchD_PRG12::82e1::caseD_54);
  while (DAT_004a < 0xf) {
    DAT_004a = DAT_004a + 1;
    FUN_PRG00__9a71();
    FUN_PRG00__9fa8(1);
  }
  return;
}



void FUN_PRG00__99d1(void)

{
  FUN_PRG00__9b07();
  FUN_PRG00__9ada();
  FUN_c4b9((undefined)switchD_PRG12::82e1::caseD_54);
  while ((byte)FUN_004b < 0xf) {
    FUN_004b = (code)((char)FUN_004b + '\x01');
    FUN_PRG00__9a71();
    FUN_PRG00__9fa8(1);
  }
  return;
}



void FUN_PRG00__99f0(void)

{
  while ((DAT_004a | (byte)FUN_004b) != 0) {
    if ((DAT_004a | (byte)FUN_004b) != 0) {
      DAT_004a = DAT_004a - 1;
    }
    if (FUN_004b != (code)0x0) {
      FUN_004b = (code)((char)FUN_004b + -1);
    }
    FUN_PRG00__9a71();
    FUN_PRG00__9fa8(1);
  }
  return;
}



void FUN_PRG00__9a0d(void)

{
  while (DAT_004a != '\0') {
    DAT_004a = DAT_004a + -1;
    FUN_PRG00__9a71();
    FUN_PRG00__9fa8(1);
  }
  return;
}



void FUN_PRG00__9a1f(void)

{
  while (FUN_004b != (code)0x0) {
    FUN_004b = (code)((char)FUN_004b + -1);
    FUN_PRG00__9a71();
    FUN_PRG00__9fa8(1);
  }
  return;
}



void FUN_PRG00__9a31(undefined param_1,undefined param_2)

{
  DAT_0048 = param_1;
  DAT_0049 = param_2;
  FUN_PRG00__9b07();
  FUN_PRG00__9ab8();
  FUN_PRG00__9ada();
  FUN_c4b9((undefined)switchD_PRG12::82e1::caseD_54);
  DAT_004a = 0xf;
  FUN_004b = (code)0xf;
  FUN_PRG00__9a71();
  return;
}



void FUN_PRG00__9a35(void)

{
  FUN_PRG00__9b07();
  FUN_PRG00__9ab8();
  FUN_PRG00__9ada();
  FUN_c4b9((undefined)switchD_PRG12::82e1::caseD_54);
  DAT_004a = 0xf;
  FUN_004b = (code)0xf;
  FUN_PRG00__9a71();
  return;
}



void FUN_PRG00__9a43(void)

{
  DAT_004a = 0xf;
  FUN_004b = (code)0xf;
  FUN_PRG00__9a71();
  return;
}



void FUN_PRG00__9a4c(undefined param_1)

{
  DAT_0048 = param_1;
  FUN_PRG00__9b07();
  FUN_PRG00__9ab8();
  FUN_c4b9((undefined)switchD_PRG12::82e1::caseD_54);
  DAT_004a = 0xf;
  FUN_PRG00__9a71();
  return;
}



void FUN_PRG00__9a60(undefined param_1)

{
  undefined uVar1;
  byte bVar2;
  
  DAT_0049 = param_1;
  FUN_PRG00__9b07();
  FUN_PRG00__9ada();
  FUN_c4b9((undefined)switchD_PRG12::82e1::caseD_54);
  FUN_004b = (code)0xf;
  uVar1 = 0x3f;
  FUN_PRG00__9b28(0x20,0);
  bVar2 = 0;
  DAT_00e7 = uVar1;
  do {
    FUN_PRG00__9aa2(((&DAT_062a)[bVar2] & 0x30) + DAT_004a);
  } while (bVar2 != 0x10);
  do {
    FUN_PRG00__9aa2(((&DAT_062a)[bVar2] & 0x30) + (char)FUN_004b);
  } while (bVar2 != 0x20);
  FUN_PRG00__9b5e(DAT_00e7);
  return;
}



void FUN_PRG00__9a71(void)

{
  undefined uVar1;
  byte bVar2;
  
  uVar1 = 0x3f;
  FUN_PRG00__9b28(0x20,0);
  bVar2 = 0;
  DAT_00e7 = uVar1;
  do {
    FUN_PRG00__9aa2(((&DAT_062a)[bVar2] & 0x30) + DAT_004a);
  } while (bVar2 != 0x10);
  do {
    FUN_PRG00__9aa2(((&DAT_062a)[bVar2] & 0x30) + (char)FUN_004b);
  } while (bVar2 != 0x20);
  FUN_PRG00__9b5e(DAT_00e7);
  return;
}



void FUN_PRG00__9aa2(byte param_1,byte param_2)

{
  DAT_00e6 = (&DAT_PRG00__9ea2)[param_1];
  (&DAT_05e8)[DAT_00e7] = (&DAT_062a)[param_2] & 0xf | DAT_00e6;
  DAT_00e7 = DAT_00e7 + 1;
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG00__9ab8(void)

{
  byte bVar1;
  byte bVar2;
  
  _DAT_00e6 = CONCAT11(((((DAT_0048 >> 7) << 1 | (byte)(DAT_0048 << 1) >> 7) << 1 |
                        (byte)(DAT_0048 << 2) >> 7) << 1 | (byte)(DAT_0048 << 3) >> 7) + 0xb0,
                       DAT_0048 * '\x10');
  bVar1 = 0;
  bVar2 = 0;
  do {
    (&DAT_062a)[bVar1] = *(undefined *)(_DAT_00e6 + (ushort)bVar2);
    bVar1 = bVar1 + 1;
    bVar2 = bVar2 + 1;
  } while (bVar2 != 0x10);
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG00__9ada(void)

{
  byte bVar1;
  byte bVar2;
  
  _DAT_00e6 = CONCAT11(((((DAT_0049 >> 7) << 1 | (byte)(DAT_0049 << 1) >> 7) << 1 |
                        (byte)(DAT_0049 << 2) >> 7) << 1 | (byte)(DAT_0049 << 3) >> 7) + 0xb3,
                       DAT_0049 * '\x10');
  bVar1 = 0x10;
  bVar2 = 0;
  do {
    (&DAT_062a)[bVar1] = *(undefined *)(_DAT_00e6 + (ushort)bVar2);
    bVar1 = bVar1 + 1;
    bVar2 = bVar2 + 1;
  } while (bVar2 != 0x10);
  return;
}



void FUN_PRG00__9b07(void)

{
  switchD_PRG12::82e1::caseD_54._0_1_ = DAT_0025;
  FUN_c4b9(6);
  return;
}



void FUN_PRG00__9b11(void)

{
  byte bVar1;
  
  DAT_0048 = 0;
  DAT_0049 = 0;
  DAT_004a = 0;
  FUN_004b = (code)0x0;
  bVar1 = 0xe0;
  do {
    *(undefined *)(bVar1 + 0x54a) = 0xf;
    bVar1 = bVar1 + 1;
  } while (bVar1 != 0);
  FUN_PRG00__9a71();
  return;
}



void FUN_PRG00__9b28(byte param_1,undefined param_2,undefined param_3)

{
  byte bVar1;
  byte bStack0000;
  
  bStack0000 = param_1;
  while ((bVar1 = DAT_0628, (DAT_0629 & 0x40) == 0x40 ||
         (0x3c < (byte)((bStack0000 & 0x3f) + DAT_0628)))) {
    FUN_PRG00__9fa8(1);
  }
  DAT_0629 = bStack0000 | 0x40;
  (&DAT_05ea)[DAT_0628] = param_2;
  (&DAT_05e9)[bVar1] = param_3;
  (&DAT_05e8)[bVar1] = DAT_0629 & 0xbf;
  return;
}



void FUN_PRG00__9b5e(byte param_1)

{
  (&DAT_05e8)[param_1] = 0;
  DAT_0628 = param_1;
  DAT_0629 = DAT_0629 & 0xbf;
  return;
}



void FUN_PRG00__9b7f(void)

{
  byte bVar1;
  
  bVar1 = 0;
  do {
    (&DAT_0468)[bVar1] = 0xf8;
    bVar1 = bVar1 + 1;
  } while (bVar1 != 0);
  bVar1 = 0;
  do {
    *(undefined *)(bVar1 + 0x200) = 0xf8;
    bVar1 = bVar1 + 1;
  } while (bVar1 != 0);
  DAT_0568 = 0;
  DAT_0588 = 0;
  DAT_05a8 = 0;
  DAT_05c8 = 0;
  return;
}



void FUN_PRG00__9ba0(void)

{
  FUN_PRG00__99f0();
  FUN_PRG00__98a0();
  FUN_PRG00__9b7f();
  return;
}



void FUN_PRG00__9ba9(char param_1)

{
  DAT_0046 = param_1;
  if (-1 < param_1) {
    DAT_0044 = param_1 + DAT_0044;
    if (0xef < DAT_0044) {
      DAT_0044 = DAT_0044 + 0xf + (0xef < DAT_0044);
      DAT_0045 = DAT_0045 + '\x01';
    }
    return;
  }
  DAT_0044 = param_1 + DAT_0044;
  if (DAT_0044 >= 0xf0) {
    DAT_0044 = (DAT_0044 - 0x10) - (DAT_0044 < 0xf0);
    DAT_0045 = DAT_0045 + -1;
  }
  return;
}



void FUN_PRG00__9bca(byte param_1)

{
  char cVar1;
  
  DAT_0047 = param_1;
  cVar1 = CARRY1(param_1,DAT_0079._1_1_);
  DAT_0079._1_1_ = param_1 + DAT_0079._1_1_;
  if ((char)param_1 < '\0') {
    cVar1 = -!(bool)cVar1;
  }
  DAT_007b._0_1_ = (char)DAT_007b + cVar1;
  return;
}



void FUN_PRG00__9c71(void)

{
  byte bVar1;
  char in_C;
  
  DAT_00e8 = '\x10';
LAB_PRG00__9c75:
  do {
    bVar1 = FUN_PRG00__9ce7(DAT_001c);
    if (in_C == '\0') {
      return;
    }
    if ((byte)switchD_PRG12::82e1::caseD_54 == 0xff) goto LAB_PRG00__9c89;
    in_C = (byte)switchD_PRG12::82e1::caseD_54 <= bVar1;
  } while (bVar1 == (byte)switchD_PRG12::82e1::caseD_54);
  goto LAB_PRG00__9cb3;
LAB_PRG00__9c89:
  in_C = (byte)DAT_00eb <= bVar1;
  if (bVar1 != (byte)DAT_00eb) {
    bVar1 = DAT_055c;
    if (0xb7 < DAT_055c) {
      bVar1 = DAT_055c - 0x10;
    }
    FUN_PRG00__9d08(DAT_055f,bVar1);
    bVar1 = *DAT_0034;
    in_C = DAT_0451 <= bVar1;
    if (((bVar1 != DAT_0451) && (in_C = DAT_0452 <= bVar1, bVar1 != DAT_0452)) &&
       (in_C = DAT_0453 <= bVar1, bVar1 != DAT_0453)) {
LAB_PRG00__9cb3:
      do {
        FUN_PRG00__9fa8(1);
        if ("  000000000"[DAT_001c + 0xb] == '\0') {
          return;
        }
        DAT_00e8 = DAT_00e8 + -1;
      } while (DAT_00e8 != '\0');
      DAT_00e8 = '\b';
    }
  }
  goto LAB_PRG00__9c75;
}



void FUN_PRG00__9cd3(undefined param_1,byte param_2)

{
  if (-1 < (char)(&DAT_046b)[param_2]) {
    (&DAT_046a)[(byte)((&DAT_0468)[param_2] - DAT_00e7) >> 2] = param_1;
  }
  return;
}



void FUN_PRG00__9ce7(byte param_1,byte param_2)

{
  byte bVar1;
  
  if ("  000000000"[(param_1 & 0xf) + 0xb] != '\0') {
    bVar1 = "  000000000"[(param_1 & 0xf) + 0xb] + (&DAT_0468)[param_2];
    if (bVar1 < DAT_00e7) {
      bVar1 = DAT_00e6;
    }
    if ((bVar1 != DAT_00e6) && (DAT_00e6 <= bVar1)) {
      bVar1 = DAT_00e7;
    }
    (&DAT_0468)[param_2] = bVar1;
    return;
  }
  return;
}



void FUN_PRG00__9d08(char param_1,byte param_2)

{
  if (-1 < param_1) {
    SUB_00ed = (byte)((param_2 ^ 0xff) - 0x28) >> 4;
    FUN_c50c();
    return;
  }
  SUB_00ed = (param_2 >> 4) + 0x14;
  FUN_c50c();
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG00__9d58(void)

{
  while( true ) {
    DAT_00eb._0_1_ = (byte)DAT_00eb + 1;
    if (0xfb < *(byte *)(_DAT_00e6 + (ushort)(byte)DAT_00eb)) break;
    FUN_PRG00__88ca((char)switchD_PRG12::82e1::caseD_54,DAT_00e8);
    DAT_00e8 = DAT_00e8 + '\x01';
    if (DAT_00e8 == '\0') {
      switchD_PRG12::82e1::caseD_54._0_1_ = (char)switchD_PRG12::82e1::caseD_54 + '\x01';
    }
  }
  return;
}



void FUN_PRG00__9dda(byte param_1,byte param_2)

{
  if (param_1 >> 4 != 0) {
    DAT_00e7 = '3';
  }
  (&DAT_05e8)[param_2] = (param_1 >> 4) + DAT_00e7;
  return;
}



void FUN_PRG00__9dde(byte param_1,byte param_2)

{
  if ((param_1 & 0xf) != 0) {
    DAT_00e7 = '3';
  }
  (&DAT_05e8)[param_2] = (param_1 & 0xf) + DAT_00e7;
  return;
}



void FUN_PRG00__9dee(byte param_1,byte param_2)

{
  char cVar1;
  byte bVar2;
  bool bVar3;
  
  DAT_00eb._1_1_ = 0;
  cVar1 = '\b';
  SUB_00ed = param_1;
  do {
    bVar2 = DAT_00eb._1_1_ >> 7;
    DAT_00eb._1_1_ = DAT_00eb._1_1_ * '\x02';
    bVar2 = SUB_00ed << 1 | bVar2;
    bVar3 = (char)SUB_00ed < '\0';
    SUB_00ed = bVar2;
    if (bVar3) {
      bVar3 = CARRY1(param_2,DAT_00eb._1_1_);
      DAT_00eb._1_1_ = param_2 + DAT_00eb._1_1_;
      SUB_00ed = bVar2 + bVar3;
    }
    cVar1 = cVar1 + -1;
  } while (cVar1 != '\0');
  return;
}



void FUN_PRG00__9e0c(void)

{
  byte bVar1;
  char cVar2;
  byte bVar3;
  byte bVar4;
  
  DAT_00e8 = 0;
  switchD_PRG12::82e1::caseD_54._0_1_ = 0;
  cVar2 = '\x10';
  do {
    bVar3 = DAT_00eb._1_1_ >> 7;
    DAT_00eb._1_1_ = DAT_00eb._1_1_ * '\x02';
    bVar4 = SUB_00ed >> 7;
    SUB_00ed = SUB_00ed << 1 | bVar3;
    bVar4 = DAT_00e8 << 1 | bVar4;
    switchD_PRG12::82e1::caseD_54._0_1_ = (byte)switchD_PRG12::82e1::caseD_54 << 1 | DAT_00e8 >> 7;
    bVar3 = bVar4 - switchD_PRG12::82e1::caseD_54._1_1_;
    bVar1 = ((byte)switchD_PRG12::82e1::caseD_54 - (byte)DAT_00eb) -
            (((switchD_PRG12::82e1::caseD_54._1_1_ & (~bVar4 | bVar3) | bVar3 & ~bVar4) & 0x80) == 0
            );
    DAT_00e8 = bVar4;
    if ((((byte)DAT_00eb & (~(byte)switchD_PRG12::82e1::caseD_54 | bVar1) |
         bVar1 & ~(byte)switchD_PRG12::82e1::caseD_54) & 0x80) != 0) {
      DAT_00eb._1_1_ = DAT_00eb._1_1_ + 1;
      DAT_00e8 = bVar3;
      switchD_PRG12::82e1::caseD_54._0_1_ = bVar1;
      if (DAT_00eb._1_1_ == 0) {
        SUB_00ed = SUB_00ed + 1;
      }
    }
    cVar2 = cVar2 + -1;
  } while (cVar2 != '\0');
  return;
}



void FUN_PRG00__9e36(void)

{
  char cVar1;
  byte bVar2;
  
  switchD_PRG12::82e1::caseD_54._1_1_ = 0;
  cVar1 = '\b';
  do {
    bVar2 = SUB_00ed >> 7;
    SUB_00ed = SUB_00ed * '\x02';
    switchD_PRG12::82e1::caseD_54._1_1_ = switchD_PRG12::82e1::caseD_54._1_1_ << 1 | bVar2;
    bVar2 = switchD_PRG12::82e1::caseD_54._1_1_ - DAT_00eb._1_1_;
    if (((DAT_00eb._1_1_ & (~switchD_PRG12::82e1::caseD_54._1_1_ | bVar2) |
         bVar2 & ~switchD_PRG12::82e1::caseD_54._1_1_) & 0x80) != 0) {
      SUB_00ed = SUB_00ed + 1;
      switchD_PRG12::82e1::caseD_54._1_1_ = bVar2;
    }
    cVar1 = cVar1 + -1;
  } while (cVar1 != '\0');
  return;
}



void FUN_PRG00__9f69(undefined param_1,byte param_2,char param_3)

{
  byte bVar1;
  
  *(undefined *)(ushort)(byte)(param_2 + 2) = param_1;
  bVar1 = param_3 - 2;
  (&DAT_0101)[bVar1] = *(undefined *)(ushort)param_2;
  FUN_0102[bVar1] = *(code *)(ushort)(byte)(param_2 + 1);
  *(byte *)(ushort)(byte)(param_2 + 1) = bVar1;
  *(undefined *)(ushort)param_2 = 0xff;
  return;
}



undefined FUN_PRG00__9fa8(char param_1)

{
  char cVar1;
  short sVar2;
  undefined auStack_a [10];
  
  DAT_0019 = param_1;
  *(char *)(ushort)(byte)((char)FUN_0000 + 1) = (char)auStack_a;
  *(undefined *)(ushort)(byte)((char)FUN_0000 + 2) = DAT_0024;
  *(undefined *)(ushort)(byte)((char)FUN_0000 + 3) = DAT_0025;
  if ((DAT_0019 == '\0') || (cVar1 = DAT_0019, DAT_0019 == -1)) {
    cVar1 = -2;
  }
  *(char *)(ushort)(byte)FUN_0000 = cVar1;
  while( true ) {
    do {
      FUN_0000 = (code)((char)FUN_0000 + '\x04');
      if (FUN_0000 == (code)0x19) {
        do {
        } while (-1 < (char)SUB_001a._1_1_);
        SUB_001a._1_1_ = SUB_001a._1_1_ & 0x7f;
        FUN_0000 = (code)0x1;
      }
    } while (*(char *)(ushort)(byte)FUN_0000 == '\0');
    if (*(char *)(ushort)(byte)FUN_0000 == -1) break;
    cVar1 = *(char *)(ushort)(byte)FUN_0000 + -1;
    *(char *)(ushort)(byte)FUN_0000 = cVar1;
    if (cVar1 == '\0') {
                    // WARNING: Read-only address (RAM,0x8000) is written
      DAT_0025 = *(undefined *)(ushort)(byte)((char)FUN_0000 + 3);
                    // WARNING: Read-only address (RAM,0x8001) is written
      DAT_0023 = DAT_0022 | 6;
                    // WARNING: Read-only address (RAM,0x8000) is written
      LAB_PRG00__8000 = DAT_0022 | 6;
      DAT_0024 = *(undefined *)(ushort)(byte)((char)FUN_0000 + 2);
                    // WARNING: Read-only address (RAM,0x8001) is written
      LAB_PRG00__8000_1 = *(undefined *)(ushort)(byte)((char)FUN_0000 + 2);
      sVar2 = CONCAT11((char)((ushort)auStack_a >> 8),
                       *(undefined *)(ushort)(byte)((char)FUN_0000 + 1));
      DAT_00e6 = *(undefined *)(sVar2 + 1);
      DAT_00e7 = *(undefined *)(sVar2 + 2);
      DAT_00e8 = *(undefined *)(sVar2 + 3);
      switchD_PRG12::82e1::caseD_54._0_1_ = *(undefined *)(sVar2 + 4);
      switchD_PRG12::82e1::caseD_54._1_1_ = *(undefined *)(sVar2 + 5);
      DAT_00eb._0_1_ = *(undefined *)(sVar2 + 6);
      DAT_00eb._1_1_ = *(undefined *)(sVar2 + 7);
      SUB_00ed = *(undefined *)(sVar2 + 8);
      return *(undefined *)(sVar2 + 10);
    }
  }
  DAT_0023 = DAT_0022 | 6;
                    // WARNING: Read-only address (RAM,0x8000) is written
  LAB_PRG00__8000 = DAT_0022 | 6;
  DAT_0024 = *(undefined *)(ushort)(byte)((char)FUN_0000 + 2);
                    // WARNING: Read-only address (RAM,0x8001) is written
  LAB_PRG00__8000_1 = *(undefined *)(ushort)(byte)((char)FUN_0000 + 2);
  return *(undefined *)(ushort)(byte)((char)FUN_0000 + 1);
}



byte FUN_PRG01__8464(byte param_1)

{
  byte bVar1;
  char in_C;
  
  bVar1 = DAT_00eb._1_1_;
  DAT_00eb._1_1_ = DAT_00eb._1_1_ >> 1;
  return (byte)((byte)((byte)(&DAT_0657)[param_1] >> 1 | in_C << 7) >> 1 | bVar1 << 7) >> 2;
}



// WARNING: Control flow encountered bad instruction data

void FUN_PRG01__88ca(void)

{
  FUN_PRG01__97ad(0xfb,0xb7,0x90);
  FUN_ae77(0xad,0xb8);
  FUN_a719();
  DAT_0564 = 0x48;
                    // WARNING: Bad instruction - Truncating control flow here
  halt_baddata();
}



// WARNING: Control flow encountered bad instruction data

void FUN_PRG01__891b(void)

{
  char in_C;
  char cVar1;
  
  if (in_C != '\0') {
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  }
  FUN_PRG01__9cd3(1);
  FUN_PRG01__9c3c(DAT_0560,0xad,0xc4);
  if (DAT_0450 < 3) {
    DAT_00e6 = 0xb8;
    DAT_00eb._0_1_ = (byte)switchD_PRG12::82e1::caseD_54;
    switchD_PRG12::82e1::caseD_54._1_1_ = (byte)switchD_PRG12::82e1::caseD_54;
    switchD_PRG12::82e1::caseD_54._0_1_ = 0xff;
  }
  do {
    FUN_PRG01__9fa8(1);
    FUN_PRG01__9cc9();
    if ((DAT_0450 < 3) && ((SUB_001e & 3) != 0)) {
      if ((bool)(SUB_001e & 1)) {
        FUN_PRG01__9cd3(0);
        DAT_055f = 0xc0;
        DAT_00eb._0_1_ = 0;
        DAT_00e6 = 0x98;
        cVar1 = 0xa7 < DAT_055c;
        if ((bool)cVar1) {
          DAT_055c = 0x98;
        }
        FUN_aabf(0xc0,DAT_055c);
        if (cVar1 != '\0') {
          DAT_055c = DAT_055c + 0x10;
          if (0xa7 < DAT_055c) {
            DAT_055c = 0x28;
          }
                    // WARNING: Bad instruction - Truncating control flow here
          halt_baddata();
        }
      }
      else {
        DAT_055f = 0x20;
        DAT_00e6 = 0xb8;
        DAT_00eb._0_1_ = switchD_PRG12::82e1::caseD_54._1_1_;
        if (switchD_PRG12::82e1::caseD_54._1_1_ == DAT_055c) {
          DAT_055c = switchD_PRG12::82e1::caseD_54._1_1_ + 0x10;
                    // WARNING: Bad instruction - Truncating control flow here
          halt_baddata();
        }
      }
    }
    if ((SUB_001e & 0x40) == 0x40) {
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    }
  } while ((SUB_001e & 0x80) != 0x80);
                    // WARNING: Bad instruction - Truncating control flow here
  halt_baddata();
}



// WARNING: Control flow encountered bad instruction data

void FUN_PRG01__8920(void)

{
  char cVar1;
  
  FUN_PRG01__9cd3(1);
  FUN_PRG01__9c3c(DAT_0560,0xad,0xc4);
  if (DAT_0450 < 3) {
    DAT_00e6 = 0xb8;
    DAT_00eb._0_1_ = (byte)switchD_PRG12::82e1::caseD_54;
    switchD_PRG12::82e1::caseD_54._1_1_ = (byte)switchD_PRG12::82e1::caseD_54;
    switchD_PRG12::82e1::caseD_54._0_1_ = 0xff;
  }
  do {
    FUN_PRG01__9fa8(1);
    FUN_PRG01__9cc9();
    if ((DAT_0450 < 3) && ((SUB_001e & 3) != 0)) {
      if ((bool)(SUB_001e & 1)) {
        FUN_PRG01__9cd3(0);
        DAT_055f = 0xc0;
        DAT_00eb._0_1_ = 0;
        DAT_00e6 = 0x98;
        cVar1 = 0xa7 < DAT_055c;
        if ((bool)cVar1) {
          DAT_055c = 0x98;
        }
        FUN_aabf(0xc0,DAT_055c);
        if (cVar1 != '\0') {
          DAT_055c = DAT_055c + 0x10;
          if (0xa7 < DAT_055c) {
            DAT_055c = 0x28;
          }
                    // WARNING: Bad instruction - Truncating control flow here
          halt_baddata();
        }
      }
      else {
        DAT_055f = 0x20;
        DAT_00e6 = 0xb8;
        DAT_00eb._0_1_ = switchD_PRG12::82e1::caseD_54._1_1_;
        if (switchD_PRG12::82e1::caseD_54._1_1_ == DAT_055c) {
          DAT_055c = switchD_PRG12::82e1::caseD_54._1_1_ + 0x10;
                    // WARNING: Bad instruction - Truncating control flow here
          halt_baddata();
        }
      }
    }
    if ((SUB_001e & 0x40) == 0x40) {
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    }
  } while ((SUB_001e & 0x80) != 0x80);
                    // WARNING: Bad instruction - Truncating control flow here
  halt_baddata();
}



// WARNING: Control flow encountered bad instruction data

void FUN_PRG01__89a3(char param_1)

{
  DAT_055c = param_1 + 0x10;
  if (0xa7 < DAT_055c) {
    DAT_055c = 0x28;
  }
                    // WARNING: Bad instruction - Truncating control flow here
  halt_baddata();
}



// WARNING: Control flow encountered bad instruction data

void FUN_PRG01__8a12(void)

{
  FUN_PRG01__9d08();
  FUN_af67();
  DAT_055c = 0xf8;
  DAT_0560 = 0xf8;
  if ((DAT_055f < '\0') && (DAT_0027 != '\0')) {
    DAT_0450 = DAT_0450 + 1;
    (&DAT_0450)[DAT_0450] = *DAT_0034;
    FUN_b0a1();
    FUN_aa7f();
  }
  DAT_00e6 = 0x85;
  DAT_00e7 = 0x20;
  FUN_aeac();
  DAT_00e6 = 0x99;
  DAT_00e7 = 0x20;
  FUN_aebe();
  DAT_0562 = 0;
  FUN_ae01(0xd8);
                    // WARNING: Bad instruction - Truncating control flow here
  halt_baddata();
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG01__97ad(void)

{
                    // WARNING: Could not recover jumptable at 0x97af. Too many branches
                    // WARNING: Treating indirect jump as call
  (*_UNK_fffe)();
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG01__97b6(undefined param_1,byte param_2)

{
  *(undefined *)(ushort)param_2 = param_1;
                    // WARNING: Treating indirect jump as call
  (*_UNK_fffe)();
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG01__97b8(void)

{
                    // WARNING: Could not recover jumptable at 0x97b8. Too many branches
                    // WARNING: Treating indirect jump as call
  (*_UNK_fffe)();
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG01__9895(void)

{
                    // WARNING: Could not recover jumptable at 0x9895. Too many branches
                    // WARNING: Treating indirect jump as call
  (*_UNK_fffe)();
  return;
}



// WARNING: Control flow encountered bad instruction data

void FUN_PRG01__98a0(undefined param_1)

{
  DAT_7d01 = param_1;
  func_0x4190();
                    // WARNING: Bad instruction - Truncating control flow here
  halt_baddata();
}



// WARNING: Control flow encountered bad instruction data

void FUN_PRG01__98df(void)

{
                    // WARNING: Bad instruction - Truncating control flow here
  halt_baddata();
}



// WARNING: Control flow encountered bad instruction data

void FUN_PRG01__98e8(void)

{
                    // WARNING: Bad instruction - Truncating control flow here
  halt_baddata();
}



// WARNING: Control flow encountered bad instruction data

void FUN_PRG01__997a(void)

{
                    // WARNING: Bad instruction - Truncating control flow here
  halt_baddata();
}



// WARNING: Control flow encountered bad instruction data

void FUN_PRG01__997e(void)

{
                    // WARNING: Bad instruction - Truncating control flow here
  halt_baddata();
}



// WARNING: Control flow encountered bad instruction data

void FUN_PRG01__99f0(void)

{
                    // WARNING: Bad instruction - Truncating control flow here
  halt_baddata();
}



// WARNING: Control flow encountered bad instruction data

void FUN_PRG01__9b6f(byte param_1,byte param_2)

{
  FUN_0000 = (code)((char)FUN_0000 << 1);
  if ((char)(param_1 | **(byte **)(ushort)(byte)((char)FUN_0102[param_2] + 6)) < '\0') {
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  }
                    // WARNING: Bad instruction - Truncating control flow here
  halt_baddata();
}



// WARNING: Control flow encountered bad instruction data

void FUN_PRG01__9b74(byte param_1,char param_2)

{
  if ((char)(param_1 | **(byte **)(ushort)(byte)(param_2 + 6)) < '\0') {
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  }
                    // WARNING: Bad instruction - Truncating control flow here
  halt_baddata();
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG01__9b7f(void)

{
                    // WARNING: Could not recover jumptable at 0x9b80. Too many branches
                    // WARNING: Treating indirect jump as call
  (*_UNK_fffe)();
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG01__9ba0(void)

{
                    // WARNING: Could not recover jumptable at 0x9ba0. Too many branches
                    // WARNING: Treating indirect jump as call
  (*_UNK_fffe)();
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG01__9be3(void)

{
                    // WARNING: Could not recover jumptable at 0x9be3. Too many branches
                    // WARNING: Treating indirect jump as call
  (*_UNK_fffe)();
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG01__9c0d(void)

{
                    // WARNING: Could not recover jumptable at 0x9c0d. Too many branches
                    // WARNING: Treating indirect jump as call
  (*_UNK_fffe)();
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG01__9c3a(void)

{
  SUB_00fe._1_1_ = SUB_00fe._1_1_ << 1;
                    // WARNING: Could not recover jumptable at 0x9c3c. Too many branches
                    // WARNING: Treating indirect jump as call
  (*_UNK_fffe)();
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG01__9c3c(void)

{
                    // WARNING: Could not recover jumptable at 0x9c3c. Too many branches
                    // WARNING: Treating indirect jump as call
  (*_UNK_fffe)();
  return;
}



// WARNING: Control flow encountered bad instruction data

void FUN_PRG01__9c71(void)

{
  char in_N;
  
  if (in_N != '\0') {
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  }
                    // WARNING: Bad instruction - Truncating control flow here
  halt_baddata();
}



// WARNING: Control flow encountered bad instruction data

void FUN_PRG01__9cc9(void)

{
                    // WARNING: Bad instruction - Truncating control flow here
  halt_baddata();
}



// WARNING: Control flow encountered bad instruction data

void FUN_PRG01__9d08(void)

{
  DAT_006f = DAT_006f >> 1;
                    // WARNING: Bad instruction - Truncating control flow here
  halt_baddata();
}



// WARNING: Control flow encountered bad instruction data

void FUN_PRG01__9d27(void)

{
  char in_C;
  
  DAT_6f46 = DAT_6f46 >> 1 | in_C << 7;
                    // WARNING: Bad instruction - Truncating control flow here
  halt_baddata();
}



void FUN_PRG01__9d50(void)

{
                    // WARNING: Could not recover jumptable at 0x9d50. Too many branches
                    // WARNING: Treating indirect jump as call
  (*DAT_697d)();
  return;
}



// WARNING: Control flow encountered bad instruction data

void FUN_PRG01__9d73(void)

{
                    // WARNING: Read-only address (RAM,0xa602) is written
  DAT_a602 = DAT_a602 << 1;
                    // WARNING: Bad instruction - Truncating control flow here
  halt_baddata();
}



// WARNING: Control flow encountered bad instruction data

void FUN_PRG01__9db5(byte param_1)

{
  if (-1 < (char)(&DAT_be29)[param_1]) {
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  }
                    // WARNING: Bad instruction - Truncating control flow here
  halt_baddata();
}



// WARNING: Control flow encountered bad instruction data

void FUN_PRG01__9dee(void)

{
                    // WARNING: Bad instruction - Truncating control flow here
  halt_baddata();
}



void FUN_PRG01__9e0c(void)

{
  return;
}



// WARNING: Control flow encountered bad instruction data

void FUN_PRG01__9e4f(void)

{
                    // WARNING: Bad instruction - Truncating control flow here
  halt_baddata();
}



// WARNING: Control flow encountered bad instruction data

void FUN_PRG02__82a9(code param_1)

{
  PPUCTRL = param_1;
                    // WARNING: Bad instruction - Truncating control flow here
  halt_baddata();
}



void FUN_PRG02__8464(byte param_1,byte param_2)

{
  DAT_055d = (&DAT_a472)[param_1 ^ *(byte *)((short)&DAT_a504 + param_2 + 1)];
  return;
}



void FUN_PRG02__8895(byte param_1,byte param_2)

{
  byte bVar1;
  
  bVar1 = param_1;
  while( true ) {
    (&SUB_0408)[param_2] = param_1;
    bVar1 = bVar1 + 1;
    param_2 = param_2 + 4;
    if (0x27 < param_2) break;
    param_1 = (&DAT_aa47)[bVar1];
  }
  DAT_002c = (&DAT_aa47)[bVar1];
  DAT_002a = (&DAT_aa75)[DAT_0026];
  DAT_002b = DAT_0026 + 3;
  return;
}



// WARNING: Control flow encountered bad instruction data

void FUN_PRG02__88ca(char param_1,undefined param_2)

{
  char cVar1;
  undefined uVar2;
  char cVar3;
  byte bVar4;
  bool in_Z;
  byte in_C;
  byte bVar5;
  
  DAT_008f._1_1_ = param_2;
  if (!in_Z) {
    FUN_PRG02__9fa8(1);
    bVar4 = 0;
    do {
      uVar2 = (&DAT_0468)[bVar4];
      if (((&DAT_046a)[bVar4] & 0xc) != 0) {
        uVar2 = 0xf8;
      }
      *(undefined *)(bVar4 + 0x200) = uVar2;
      (&DAT_0201)[bVar4] = (&DAT_0469)[bVar4];
      (&DAT_0202)[bVar4] = (&DAT_046a)[bVar4];
      (&DAT_0203)[bVar4] = (&DAT_046b)[bVar4];
      bVar4 = bVar4 + 4;
    } while (bVar4 != 0);
    return;
  }
  bVar4 = *(byte *)(ushort)(byte)(param_1 + 0xaa);
  bVar5 = bVar4 >> 7;
  *(byte *)(ushort)(byte)(param_1 + 0xaa) = bVar4 << 1 | in_C;
  do {
    do {
      FUN_PRG02__9fa8(1);
      if (SUB_001e < '\0') {
        FUN_PRG02__99f0();
        FUN_PRG02__9b7f();
        if (DAT_0042 != DAT_0026) {
          DAT_0026 = DAT_0042;
          bVar4 = DAT_0042 << 1;
          DAT_0042 = (&DAT_a996)[bVar4];
          DAT_0043 = (&DAT_a997)[bVar4];
          bVar4 = 0;
          do {
            (&DAT_0454)[bVar4] = DAT_0042;
            (&DAT_0455)[bVar4] = DAT_0043;
            bVar4 = bVar4 + 2;
          } while (bVar4 != 0x14);
          FUN_a86e();
        }
        return;
      }
      cVar1 = FUN_aa20();
    } while (bVar5 == 0);
    cVar3 = '\x10';
    bVar5 = 0x20 < (byte)(cVar1 + DAT_0042);
    if (!(bool)bVar5) {
      DAT_0042 = cVar1 + DAT_0042;
    }
    FUN_aa36();
    while( true ) {
      FUN_PRG02__9fa8(1);
      FUN_aa20();
      if (bVar5 == 0) break;
      cVar3 = cVar3 + -1;
      if (cVar3 == '\0') {
                    // WARNING: Bad instruction - Truncating control flow here
        halt_baddata();
      }
    }
  } while( true );
}



void FUN_PRG02__88fb(byte param_1)

{
  undefined uVar1;
  char in_Z;
  
  while (in_Z == '\0') {
    uVar1 = (&DAT_0468)[param_1];
    if (((&DAT_046a)[param_1] & 0xc) != 0) {
      uVar1 = 0xf8;
    }
    *(undefined *)(param_1 + 0x200) = uVar1;
    (&DAT_0201)[param_1] = (&DAT_0469)[param_1];
    (&DAT_0202)[param_1] = (&DAT_046a)[param_1];
    (&DAT_0203)[param_1] = (&DAT_046b)[param_1];
    param_1 = param_1 + 4;
    in_Z = param_1 == 0;
  }
  return;
}



// WARNING: Control flow encountered bad instruction data

void FUN_PRG02__890c(void)

{
                    // WARNING: Bad instruction - Truncating control flow here
  halt_baddata();
}



// WARNING: Control flow encountered bad instruction data

void FUN_PRG02__8920(byte param_1)

{
  char cVar1;
  char cVar2;
  byte bVar3;
  char in_Z;
  char in_C;
  
  while (in_Z == '\0') {
    (&DAT_0460)[param_1] = (&DAT_a896)[param_1];
    param_1 = param_1 + 1;
    in_Z = param_1 == 0;
  }
  FUN_PRG02__997a(1,1);
  DAT_0042 = DAT_0026;
  FUN_aa36();
  do {
    do {
      FUN_PRG02__9fa8(1);
      if (SUB_001e < '\0') {
        FUN_PRG02__99f0();
        FUN_PRG02__9b7f();
        if (DAT_0042 != DAT_0026) {
          DAT_0026 = DAT_0042;
          bVar3 = DAT_0042 << 1;
          DAT_0042 = (&DAT_a996)[bVar3];
          DAT_0043 = (&DAT_a997)[bVar3];
          bVar3 = 0;
          do {
            (&DAT_0454)[bVar3] = DAT_0042;
            (&DAT_0455)[bVar3] = DAT_0043;
            bVar3 = bVar3 + 2;
          } while (bVar3 != 0x14);
          FUN_a86e();
        }
        return;
      }
      cVar1 = FUN_aa20();
    } while (in_C == '\0');
    cVar2 = '\x10';
    in_C = 0x20 < (byte)(cVar1 + DAT_0042);
    if (!(bool)in_C) {
      DAT_0042 = cVar1 + DAT_0042;
    }
    FUN_aa36();
    while( true ) {
      FUN_PRG02__9fa8(1);
      FUN_aa20();
      if (in_C == '\0') break;
      cVar2 = cVar2 + -1;
      if (cVar2 == '\0') {
                    // WARNING: Bad instruction - Truncating control flow here
        halt_baddata();
      }
    }
  } while( true );
}



void FUN_PRG02__8976(undefined param_1)

{
  byte bVar1;
  
  bVar1 = 0;
  DAT_0043 = param_1;
  do {
    (&DAT_0454)[bVar1] = DAT_0042;
    (&DAT_0455)[bVar1] = DAT_0043;
    bVar1 = bVar1 + 2;
  } while (bVar1 != 0x14);
  FUN_a86e();
  return;
}



// WARNING: Control flow encountered bad instruction data
// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG02__89e6(char param_1)

{
  if (param_1 == 'w') {
                    // WARNING: Could not recover jumptable at 0x89ea. Too many branches
                    // WARNING: Treating indirect jump as call
    (*_UNK_fffe)();
    return;
  }
                    // WARNING: Bad instruction - Truncating control flow here
  halt_baddata();
}



// WARNING: Control flow encountered bad instruction data
// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG02__8ba4(void)

{
  undefined uVar1;
  char cVar2;
  byte bVar3;
  char cVar4;
  bool bVar5;
  
  bVar3 = 1;
  do {
    *(undefined *)(bVar3 + 0x1ff) = 0;
    bVar3 = bVar3 + 1;
  } while (bVar3 != 0);
  OAMADDR = 0;
  OAMDMA = 2;
                    // WARNING: Read-only address (RAM,0x8000) is written
                    // WARNING: Read-only address (RAM,0x8001) is written
                    // WARNING: Read-only address (RAM,0x8000) is written
  LAB_PRG02__8000 = 1;
                    // WARNING: Read-only address (RAM,0x8001) is written
  LAB_PRG02__8000_1 = 2;
  cVar2 = '\x10';
  cVar4 = '\0';
  do {
    do {
      PPUDATA = 0;
      cVar4 = cVar4 + -1;
    } while (cVar4 != '\0');
    cVar2 = cVar2 + -1;
  } while (cVar2 != '\0');
  _DAT_00e8 = 0;
  DAT_00eb._0_1_ = ' ';
  DAT_00e6 = 2;
  DAT_00e7 = '!';
  switchD_PRG12::82e1::caseD_54._1_1_ = '\b';
  PPUADDR = (code)0x2;
  uVar1 = FUN_ac71(0);
  PPUDATA = uVar1;
  uVar1 = FUN_ac6d(DAT_00e8);
  PPUDATA = uVar1;
  uVar1 = FUN_ac71(DAT_00e8);
  PPUDATA = uVar1;
  PPUDATA = 0;
  PPUDATA = 0;
  bVar3 = 0;
  do {
    uVar1 = FUN_ac6d(*(undefined *)(_DAT_00e8 + (ushort)bVar3));
    PPUDATA = uVar1;
    uVar1 = FUN_ac71(*(undefined *)(_DAT_00e8 + (ushort)bVar3));
    PPUDATA = uVar1;
    PPUDATA = 0;
    bVar3 = bVar3 + 1;
  } while (bVar3 != 8);
  _DAT_00e8 = CONCAT11((char)switchD_PRG12::82e1::caseD_54 + (0xf7 < DAT_00e8),DAT_00e8 + 8);
  bVar5 = 0xbf < DAT_00e6;
  DAT_00e6 = DAT_00e6 + 0x40;
  DAT_00e7 = DAT_00e7 + bVar5;
  switchD_PRG12::82e1::caseD_54._1_1_ = switchD_PRG12::82e1::caseD_54._1_1_ + -1;
  if (switchD_PRG12::82e1::caseD_54._1_1_ != '\0') {
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  }
  FUN_ac7e();
  DAT_00eb._0_1_ = (char)DAT_00eb + -1;
  if ((char)DAT_00eb != '\0') {
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  }
                    // WARNING: Bad instruction - Truncating control flow here
  halt_baddata();
}



void FUN_PRG02__8c83(void)

{
  char cVar1;
  char cVar2;
  char cVar3;
  
  cVar3 = '\0';
  cVar2 = '\0';
  cVar1 = '@';
  do {
    do {
      cVar3 = cVar3 + -1;
    } while (cVar3 != '\0');
    cVar2 = cVar2 + -1;
  } while ((cVar2 != '\0') || (cVar1 = cVar1 + -1, cVar1 != '\0'));
  PPUMASK = 0;
  PPUSCROLL = (code)0x0;
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG11__810c(void)

{
  byte bVar1;
  byte bVar2;
  
  bVar2 = DAT_05d4;
  bVar1 = DAT_05d5;
  if ((char)DAT_05d5 < '\0') {
    bVar1 = DAT_05d5 ^ 0xff;
    bVar2 = (DAT_05d4 ^ 0xff) + 1;
    if (bVar2 == 0) {
      bVar1 = bVar1 + 1;
    }
  }
  DAT_0039._1_1_ = bVar2 - 0x20;
  DAT_003b = bVar1 + 1 + (0x1f < bVar2);
  bVar1 = FUN_PRG11__86d3(*(undefined *)(RAM0x005b + (ushort)DAT_003b));
  bVar2 = (byte)((byte)(bVar1 << 7) >> 1 | (bVar1 >> 1) << 7) >> 1 | (bVar1 >> 2) << 7;
  DAT_0058._0_1_ = bVar2 + 100;
  DAT_0058._1_1_ = (bVar1 >> 3) + 0x8b + (0x9b < bVar2);
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG11__812b(byte param_1)

{
  byte bVar1;
  byte bVar2;
  
  bVar2 = FUN_PRG11__86d3(*(undefined *)(RAM0x005b + (ushort)param_1));
  bVar1 = (byte)((byte)(bVar2 << 7) >> 1 | (bVar2 >> 1) << 7) >> 1 | (bVar2 >> 2) << 7;
  DAT_0058._0_1_ = bVar1 + 100;
  DAT_0058._1_1_ = (bVar2 >> 3) + 0x8b + (0x9b < bVar1);
  return;
}



void FUN_PRG11__81a7(void)

{
                    // WARNING: Subroutine does not return
  FUN_c509();
}



void FUN_PRG11__81bc(byte param_1)

{
  DAT_0525 = 0;
                    // WARNING: Subroutine does not return
  FUN_c509(param_1 & 0xf);
}



void FUN_PRG11__82f7(void)

{
  FUN_PRG11__82fe(DAT_05fb);
  return;
}



char FUN_PRG11__82fe(char param_1)

{
  byte bVar1;
  
  bVar1 = DAT_0637 + 0xb0U & 0xf0;
  DAT_0039._1_1_ = (bVar1 >> 3) + (bVar1 >> 1);
  if (param_1 != '\0') {
    param_1 = ((byte)(DAT_0635 - 0x30U) >> 4) + DAT_0039._1_1_ + '<';
  }
  return param_1;
}



void FUN_PRG11__832b(undefined param_1)

{
  DAT_05cc = param_1;
  FUN_PRG11__8525(DAT_05cd);
  SUB_05cb = 1;
  if (DAT_05cd != 0) {
    DAT_05cd = DAT_05cd & 0x20 | 0x80;
  }
  DAT_05ce = DAT_05cd;
  DAT_05cd = (DAT_05cd | 0x80) ^ 0x20;
  DAT_05db = 0;
  DAT_05dc = 0;
  DAT_05dd = 0;
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG11__845c(void)

{
  byte bVar1;
  
  bVar1 = *(byte *)(_DAT_0052 + 4);
  if ((DAT_05df & 0x80) == 0x80) {
    DAT_05e1 = 0x1c;
    DAT_05e2 = bVar1 >> 1;
    if ((bVar1 & 1) != 0) {
      DAT_05e1 = 0x8c;
    }
  }
  else {
    DAT_05e1 = 0x74;
    DAT_05e2 = (byte)(bVar1 - 1) >> 1;
    if ((bVar1 - 1 & 1) != 0) {
      DAT_05e1 = 0xe4;
    }
  }
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG11__847f(void)

{
  byte bVar1;
  
  bVar1 = 5;
  if ((DAT_052a & 0x40) == 0x40) {
    bVar1 = 7;
  }
  _DAT_0052 = CONCAT11(*(undefined *)(_DAT_0052 + (ushort)(byte)(bVar1 + 1)),
                       *(undefined *)(_DAT_0052 + (ushort)bVar1));
  return;
}



void FUN_PRG11__8493(void)

{
  DAT_005a._1_1_ = DAT_0052 + 5;
  DAT_005c = DAT_0053 + (0xfa < DAT_0052);
  return;
}



void FUN_PRG11__84a1(byte param_1)

{
  byte bVar1;
  
  bVar1 = 2;
  if ((param_1 < 0x80) && (bVar1 = 1, param_1 < 0x40)) {
    bVar1 = 0;
  }
  FUN_004b = (code)0x74;
  if ((param_1 & 0x3f) < 0x20) {
    FUN_004b = (code)0xe4;
    bVar1 = bVar1 ^ 2;
  }
  DAT_001f._1_1_ = bVar1 | DAT_001f._1_1_ & 0xfc;
  DAT_046b = SUB_05cb;
  return;
}



void FUN_PRG11__84cf(undefined param_1,undefined param_2)

{
  FUN_PRG11__84f4();
  DAT_05de = param_1;
  DAT_05df = param_2;
  return;
}



void FUN_PRG11__84d9(byte param_1,byte param_2)

{
  FUN_PRG11__84f4();
  if ((DAT_052a & 0x40) == 0x40) {
    param_2 = param_2 ^ 0xff;
    param_1 = (param_1 ^ 0xff) + 1;
    if (param_1 == 0) {
      param_2 = param_2 + 1;
    }
  }
  DAT_05de = param_1;
  DAT_05df = param_2;
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

char FUN_PRG11__84f4(void)

{
  byte bVar1;
  byte bVar2;
  
  if (*(char *)(_DAT_0052 + 3) != -0x80) {
    return *(char *)(_DAT_0052 + 3);
  }
  bVar1 = DAT_061c << 3;
  DAT_0039._1_1_ =
       ((DAT_061d << 1 | DAT_061c >> 7) << 1 | (byte)(DAT_061c << 1) >> 7) << 1 |
       (byte)(DAT_061c << 2) >> 7;
  if (*(char *)(_DAT_0052 + 2) != '\x01') {
    bVar2 = bVar1 >> 7;
    bVar1 = DAT_061c << 4;
    DAT_0039._1_1_ = DAT_0039._1_1_ << 1 | bVar2;
  }
  return DAT_0039._1_1_ + (0x3f < bVar1);
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG11__8525(char param_1,char param_2)

{
  byte bVar1;
  byte bVar2;
  char cVar3;
  char cStack0000;
  
  _DAT_0054 = &UNK_PRG11__86ee;
  if (param_1 < '\0') {
    _DAT_0054 = &UNK_PRG11__87ee;
  }
  DAT_0526 = _DAT_0054[(byte)(param_1 * '\x02')] | 0x80;
  DAT_0527 = _DAT_0054[(byte)(param_1 * '\x02' + 1)];
  DAT_05c8 = param_2;
  cStack0000 = param_1;
  bVar2 = FUN_PRG11__86d3(param_1);
  bVar1 = (byte)((byte)(bVar2 << 7) >> 1 | (bVar2 >> 1) << 7) >> 1 | (bVar2 >> 2) << 7;
  _DAT_0054 = (undefined *)CONCAT11((bVar2 >> 3) + 0x8b + (0x9b < bVar1),bVar1 + 100);
  DAT_05c9 = ' ';
  cStack0000 = DAT_05ca;
  do {
    do {
      FUN_c515(1);
    } while (DAT_0515 != '\0');
    DAT_0515 = 1;
    DAT_05c7 = 0;
    cVar3 = '\x03';
    do {
      DAT_05ca = cStack0000;
      FUN_PRG11__85c2(*(undefined *)((short)_DAT_0054 + (ushort)(byte)(0x20 - DAT_05c9)),DAT_05c8);
      DAT_05c8 = DAT_05c8 + '\x01';
      DAT_05c9 = DAT_05c9 + -1;
      if (DAT_05c9 == '\0') {
        DAT_0515 = 0x80;
        FUN_c515(1);
        return;
      }
      cVar3 = cVar3 + -1;
    } while (cVar3 != '\0');
    DAT_0515 = -0x80;
  } while( true );
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

char FUN_PRG11__85c2(byte param_1,byte param_2,byte param_3)

{
  byte bVar1;
  char cVar2;
  char cVar3;
  byte bVar4;
  byte bVar5;
  
  DAT_0056 = param_1;
  (&DAT_04a6)[param_2] = (param_3 & 7) << 2;
  (&DAT_04a7)[param_2] = 0;
  bVar1 = param_3 & 0x38;
  (&DAT_04a7)[param_2] = (&DAT_04a7)[param_2] << 1 | (byte)(bVar1 << 2) >> 7;
  (&DAT_04a7)[param_2] = (&DAT_04a7)[param_2] << 1 | (byte)(bVar1 << 3) >> 7;
  (&DAT_04a6)[param_2] = bVar1 << 4 | (&DAT_04a6)[param_2];
  bVar1 = (param_3 & 0xc0) >> 4 | 0x20 | (&DAT_04a7)[param_2];
  (&DAT_04a7)[param_2] = bVar1;
  (&DAT_04ae)[param_2] = bVar1;
  (&DAT_04b5)[param_2] = bVar1;
  (&DAT_04bc)[param_2] = bVar1;
  bVar1 = (&DAT_04a6)[param_2];
  (&DAT_04ad)[param_2] = bVar1 + 0x20;
  cVar2 = bVar1 + 0x40 + (0xdf < bVar1);
  (&DAT_04b4)[param_2] = cVar2;
  (&DAT_04bb)[param_2] = cVar2 + ' ' + (0xdf < (byte)(bVar1 + 0x20));
  (&DAT_04c2)[param_2] = param_3 & 0x3f | 0xc0;
  (&DAT_04c3)[param_2] = (param_3 & 0xc0) >> 4 | 0x23;
  (&DAT_04a5)[param_2] = 4;
  (&DAT_04ac)[param_2] = 4;
  (&DAT_04b3)[param_2] = 4;
  (&DAT_04ba)[param_2] = 4;
  (&DAT_04c1)[param_2] = 1;
  bVar1 = DAT_0056;
  _DAT_0056 = CONCAT11(DAT_05ca + 0x9b,0xe4);
  (&DAT_04c4)[param_2] = *(undefined *)(_DAT_0056 + bVar1);
  DAT_0039._1_1_ = DAT_05ca >> 2;
  _DAT_0056 = CONCAT11((byte)(bVar1 >> 1 & 0xf8 | DAT_05ca << 7) >> 3,
                       (byte)((byte)((byte)(bVar1 << 7) >> 1 | (bVar1 >> 1) << 7) >> 1 |
                             (bVar1 >> 2) << 7) >> 1 | (bVar1 >> 3) << 7) | 0xa000;
  DAT_0025 = 0x12;
  if ((DAT_05ca >> 1 & 1) != 0) {
    DAT_0025 = 0x13;
  }
  DAT_0023 = DAT_0022 | 7;
                    // WARNING: Read-only address (RAM,0x8000) is written
                    // WARNING: Read-only address (RAM,0x8001) is written
  cVar2 = '\x04';
  bVar5 = 0;
  bVar1 = param_2;
  LAB_PRG11__8000 = DAT_0023;
  LAB_PRG11__8000_1 = DAT_0025;
  do {
    cVar3 = '\x04';
    do {
      bVar4 = bVar1;
      (&DAT_04a8)[bVar4] = *(undefined *)(_DAT_0056 + bVar5);
      bVar5 = bVar5 + 1;
      cVar3 = cVar3 + -1;
      bVar1 = bVar4 + 1;
    } while (cVar3 != '\0');
    bVar1 = bVar4 + 4;
    cVar2 = cVar2 + -1;
  } while (cVar2 != '\0');
  (&DAT_04c5)[param_2] = 0;
  if ((param_3 & 0x3f) < 0x38) {
    return param_2 + 0x20;
  }
  cVar2 = '\x05';
  do {
    (&DAT_04b3)[param_2] = (&DAT_04c1)[param_2];
    param_2 = param_2 + 1;
    cVar2 = cVar2 + -1;
  } while (cVar2 != '\0');
  return cVar2;
}



byte FUN_PRG11__86d3(byte param_1)

{
  byte bVar1;
  byte bVar2;
  
  bVar1 = param_1 & 3;
  bVar2 = (&LAB_PRG11__8b42)[param_1 >> 2];
  while (bVar1 = bVar1 - 1, -1 < (char)bVar1) {
    bVar2 = bVar2 >> 2;
  }
  DAT_05ca = bVar2 & 3;
  return param_1;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG12__816e(void)

{
  byte bVar1;
  byte bVar2;
  byte bVar3;
  undefined *puVar4;
  byte bStack0000;
  undefined uStack_1;
  
  bVar1 = (SUB_00f1._1_1_ ^ 3) << 2;
  bStack0000 = *(byte *)(_SUB_00f0 + 6);
  DAT_00fa._1_1_ = SUB_00f1._1_1_;
  puVar4 = &uStack_1;
  if ((SUB_00f1._1_1_ == 1) &&
     (bVar2 = *(byte *)(_SUB_00f0 + 6) & 0xf | 0x80, puVar4 = (undefined *)register0x22, bVar2 != 0)
     ) {
    *(byte *)(bVar1 + 0x4000) = bVar2;
  }
  else {
    *(byte *)(bVar1 + 0x4000) = puVar4[1] | 0x30;
    if ((*(byte *)(_SUB_00f0 + 5) & 0x10) == 0) {
      (&DAT_07e4)[DAT_00fa._1_1_] = 8;
      (&SQ1_SWEEP)[bVar1] = 8;
      goto LAB_PRG12__81b1;
    }
  }
  if (-1 < (char)*(byte *)(_SUB_00f0 + 8)) {
    return;
  }
  *(byte *)(_SUB_00f0 + 8) = *(byte *)(_SUB_00f0 + 8) & 0x7f;
LAB_PRG12__81b1:
  (&SQ1_LO)[bVar1] = *(undefined *)(_SUB_00f0 + 7);
  bVar2 = DAT_00fa._1_1_;
  bVar3 = *(byte *)(_SUB_00f0 + 8) | 0x18;
  if (((DAT_00fa._1_1_ == 0) || (DAT_00fa._1_1_ == 1)) ||
     (bVar3 != *(byte *)(DAT_00fa._1_1_ + 0x7e0))) {
    (&SQ1_HI)[bVar1] = bVar3;
    *(byte *)(bVar2 + 0x7e0) = bVar3;
    if ((&DAT_07e4)[bVar2] == '\0') {
      *(undefined *)(bVar2 + 0x7e0) = 0;
    }
  }
  return;
}



// WARNING: Control flow encountered bad instruction data
// WARNING: Instruction at (RAM,0x859f) overlaps instruction at (RAM,0x859e)
// 
// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG12__81db(void)

{
  byte bVar1;
  byte bVar2;
  byte bVar3;
  byte bVar4;
  char cVar5;
  byte bVar6;
  byte bVar7;
  bool bVar8;
  byte bStack0000;
  undefined uStack_1;
  
  bVar6 = *(byte *)(_SUB_00f0 + 5);
  DAT_00f5._1_1_ = bVar6 & 0xf0;
  if ((bVar6 & 0x20) == 0) {
    DAT_00f7 = bVar6 & 0xf;
    bVar6 = (char)DAT_00f3 - 1;
    if (((&switchD_PRG12::82e1::caseD_a2)[bVar6] != '\0') &&
       (cVar5 = (&switchD_PRG12::82e1::caseD_a2)[bVar6] + -1,
       (&switchD_PRG12::82e1::caseD_a2)[bVar6] = cVar5, cVar5 == '\0')) {
      DAT_00f7 = DAT_00f7 + 1;
      if (DAT_00f7 == 0xf) {
        (&DAT_07d7)[bVar6] = 0;
        switchD_PRG12::82e1::caseD_ae = 0x80;
      }
      bVar6 = DAT_00f7 | DAT_00f5._1_1_;
      *(byte *)(_SUB_00f0 + 5) = bVar6;
      DAT_00f7 = bVar6 & 0xf;
      bVar6 = (char)DAT_00f3 - 1;
      if ((&switchD_PRG12::82e1::caseD_a2)[bVar6] == '\0') {
        (&switchD_PRG12::82e1::caseD_a2)[bVar6] = (&DAT_07d7)[bVar6];
      }
    }
  }
  else {
    DAT_00f7 = 0xf;
  }
  bVar2 = (&DAT_070a)[SUB_00f1._1_1_];
  bVar3 = bVar2 - DAT_00f7;
  bVar6 = ~DAT_00f7;
  bVar4 = ~bVar3;
  bVar1 = ~bVar2 & DAT_00f7 & bVar3;
  if ((char)bVar3 < '\0') {
    bVar3 = 0;
  }
  *(byte *)(_SUB_00f0 + 6) = bVar3 | DAT_00f5._1_1_;
  cVar5 = (char)DAT_00f3;
  bVar3 = (char)DAT_00f3 - 1;
  if ((&switchD_PRG12::82e1::caseD_96)[bVar3] == '\x01') {
    bVar8 = (bool)((byte)(&switchD_PRG12::82e1::caseD_38)[bVar3] >> 7);
    bVar7 = (&switchD_PRG12::82e1::caseD_38)[bVar3] << 1;
    bStack0000 = (&BYTE_PRG12__826a)[bVar7];
    RAM0x00f9 = CONCAT11(bStack0000,(&switchD_PRG12::8266::switchdataD_PRG12__8269)[bVar7]);
    switch(bVar7) {
    case 0:
    case 2:
    case 10:
    case 0xc:
      *(undefined *)(_SUB_00f0 + 7) = (&switchD_PRG12::82e1::caseD_14)[bVar3];
      *(undefined *)(_SUB_00f0 + 8) = (&switchD_PRG12::82e1::caseD_32)[bVar3];
      goto switchD_PRG12__8266_caseD_5e;
    case 4:
    case 8:
      bVar4 = (&switchD_PRG12::82e1::caseD_14)[bVar3] - 1;
      bVar6 = bVar4 & ~(&switchD_PRG12::82e1::caseD_14)[bVar3];
      goto code_r0x82ba;
    case 6:
      bVar4 = (&switchD_PRG12::82e1::caseD_14)[bVar3] - 2;
      bVar6 = bVar4 & ~(&switchD_PRG12::82e1::caseD_14)[bVar3];
code_r0x82ba:
      *(byte *)(_SUB_00f0 + 7) = bVar4;
      *(undefined *)(_SUB_00f0 + 8) =
           (&switchD_PRG12::82e1::caseD_32)[bVar3] - ((bVar6 & 0x80) == 0);
      goto switchD_PRG12__8266_caseD_5e;
    case 0xe:
    case 0x12:
      bStack0000 = 1;
      break;
    case 0x10:
      bStack0000 = 2;
      break;
    case 0x14:
      goto switchD_PRG12__82e1_caseD_d2;
    case 0x16:
      goto switchD_PRG12__82e1_caseD_12;
    case 0x18:
    case 0x4c:
    case 0xa6:
    case 0xd8:
      goto code_r0x07b7;
    case 0x1a:
    case 0xa8:
    case 200:
      goto switchD_PRG12__82e1_caseD_16;
    default:
      goto switchD_PRG12__82e1_caseD_18;
    case 0x1e:
    case 0xac:
    case 0xcc:
      goto switchD_PRG12__82e1_caseD_1a;
    case 0x20:
      goto switchD_PRG12__82e1_caseD_1c;
    case 0x22:
    case 0xd0:
      goto switchD_PRG12__82e1_caseD_1e;
    case 0x26:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0x28:
    case 0x8a:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0x2a:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0x2c:
      break;
    case 0x2e:
    case 0x60:
    case 0xc2:
      goto switchD_PRG12__82e1_caseD_2a;
    case 0x30:
    case 0x90:
      goto switchD_PRG12__82e1_caseD_2c;
    case 0x32:
    case 0x52:
    case 0x92:
      goto switchD_PRG12__82e1_caseD_2e;
    case 0x34:
    case 0x3a:
    case 0x54:
    case 0x94:
      goto switchD_PRG12__82e1_caseD_30;
    case 0x36:
    case 0x56:
    case 0x96:
      goto code_r0x07bf;
    case 0x38:
    case 0x5a:
    case 0x9a:
      goto switchD_PRG12__82e1_caseD_34;
    case 0x3c:
    case 0x48:
    case 0x6a:
      goto code_r0x07c7;
    case 0x3e:
      goto switchD_PRG12__82e1_caseD_3a;
    case 0x40:
      goto switchD_PRG12__82e1_caseD_3c;
    case 0x42:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0x44:
      goto switchD_PRG12__82e1_caseD_40;
    case 0x46:
      goto switchD_PRG12__82e1_caseD_42;
    case 0x4a:
      goto switchD_PRG12__82e1_caseD_46;
    case 0x4e:
    case 0xda:
      goto switchD_PRG12__82e1_caseD_4a;
    case 0x50:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0x58:
      goto switchD_PRG12__82e1_caseD_54;
    case 0x5c:
    case 0x9c:
      goto switchD_PRG12__82e1_caseD_58;
    case 0x5e:
      goto switchD_PRG12__8266_caseD_5e;
    case 0x62:
    case 0xc4:
      goto switchD_PRG12__82e1_caseD_5e;
    case 100:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0x66:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0x68:
    case 0xa4:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0x6c:
      goto switchD_PRG12__82e1_caseD_6e;
    case 0x6e:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0x70:
      return;
    case 0x72:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0x74:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0x76:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0x78:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0x7a:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0x7c:
    case 0x80:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0x7e:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0x82:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0x84:
    case 0x88:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0x86:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0x8c:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0x8e:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0x98:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0x9e:
      goto switchD_PRG12__82e1_caseD_5a;
    case 0xa0:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0xa2:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0xae:
      goto switchD_PRG12__82e1_caseD_bc;
    case 0xb2:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0xb4:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0xb6:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0xb8:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0xba:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0xbc:
    case 0xe2:
      goto switchD_PRG12__82e1_caseD_90;
    case 0xbe:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0xc0:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0xc6:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0xce:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0xd4:
      goto switchD_PRG12__82e1_caseD_22;
    case 0xd6:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0xdc:
      goto switchD_PRG12__82e1_caseD_26;
    case 0xde:
      goto switchD_PRG12__8266_caseD_de;
    case 0xe0:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0xe4:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0xe6:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0xe8:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0xea:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0xec:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0xee:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0xf0:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0xf2:
      goto switchD_PRG12__82e1_caseD_72;
    case 0xf4:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0xf6:
      goto switchD_PRG12__82e1_caseD_f0;
    case 0xf8:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0xfa:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0xfc:
      if (((bVar2 & bVar6 & bVar4 | bVar1) & 0x80) == 0) {
                    // WARNING: Bad instruction - Truncating control flow here
        halt_baddata();
      }
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    case 0xfe:
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    }
    bVar6 = (&switchD_PRG12::82e1::caseD_14)[bVar3];
    *(byte *)(_SUB_00f0 + 7) = bStack0000 + bVar6;
    *(undefined *)(_SUB_00f0 + 8) =
         (&switchD_PRG12::82e1::caseD_32)[bVar3] + CARRY1(bStack0000,bVar6);
switchD_PRG12__8266_caseD_5e:
    cVar5 = (&switchD_PRG12::82e1::caseD_38)[bVar3] + '\x01';
    if (cVar5 == '\n') {
      cVar5 = '\0';
    }
    (&switchD_PRG12::82e1::caseD_38)[bVar3] = cVar5;
    return;
  }
  if ((&switchD_PRG12::82e1::caseD_96)[bVar3] != '\x02') {
    return;
  }
  bVar8 = (bool)((byte)(&switchD_PRG12::82e1::caseD_38)[bVar3] >> 7);
  bVar7 = (&switchD_PRG12::82e1::caseD_38)[bVar3] * '\x02';
  bStack0000 = (&switchD_PRG12::8266::caseD_74)[bVar7];
  RAM0x00f9 = CONCAT11(bStack0000,(&switchD_PRG12::82e1::switchdataD_PRG12__82e4)[bVar7]);
  switch(bVar7) {
  case 0:
  case 8:
    *(undefined *)(_SUB_00f0 + 7) = (&switchD_PRG12::82e1::caseD_14)[bVar3];
    *(undefined *)(_SUB_00f0 + 8) = (&switchD_PRG12::82e1::caseD_32)[bVar3];
    goto switchD_PRG12__82e1_caseD_5a;
  case 2:
  case 6:
    bStack0000 = (&switchD_PRG12::82e1::caseD_14)[bVar3] - 3;
    bVar8 = (bStack0000 & ~(&switchD_PRG12::82e1::caseD_14)[bVar3] & 0x80) != 0;
    goto switchD_PRG12__8266_caseD_de;
  case 4:
    bStack0000 = (&switchD_PRG12::82e1::caseD_14)[bVar3] - 6;
    bVar8 = (bStack0000 & ~(&switchD_PRG12::82e1::caseD_14)[bVar3] & 0x80) != 0;
switchD_PRG12__8266_caseD_de:
    *(byte *)(_SUB_00f0 + 7) = bStack0000;
    *(undefined *)(_SUB_00f0 + 8) = (&switchD_PRG12::82e1::caseD_32)[bVar3] - !bVar8;
    goto switchD_PRG12__82e1_caseD_5a;
  case 10:
  case 0xe:
    bStack0000 = 3;
    break;
  case 0xc:
    bStack0000 = 6;
    break;
  case 0x10:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x12:
switchD_PRG12__82e1_caseD_12:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x14:
  case 0x48:
code_r0x07b7:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x16:
switchD_PRG12__82e1_caseD_16:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x18:
  case 0x20:
switchD_PRG12__82e1_caseD_18:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x1a:
switchD_PRG12__82e1_caseD_1a:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x1c:
switchD_PRG12__82e1_caseD_1c:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x1e:
switchD_PRG12__82e1_caseD_1e:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x22:
switchD_PRG12__82e1_caseD_22:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x24:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x26:
switchD_PRG12__82e1_caseD_26:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x28:
    break;
  case 0x2a:
  case 0x5c:
switchD_PRG12__82e1_caseD_2a:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x2c:
switchD_PRG12__82e1_caseD_2c:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x2e:
  case 0x4e:
switchD_PRG12__82e1_caseD_2e:
                    // WARNING: Treating indirect jump as call
    (*_UNK_fffe)();
    return;
  case 0x30:
  case 0x36:
  case 0x50:
switchD_PRG12__82e1_caseD_30:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x32:
  case 0x52:
code_r0x07bf:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x34:
  case 0x56:
switchD_PRG12__82e1_caseD_34:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x38:
  case 0x44:
code_r0x07c7:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x3a:
switchD_PRG12__82e1_caseD_3a:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x3c:
switchD_PRG12__82e1_caseD_3c:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x3e:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x40:
switchD_PRG12__82e1_caseD_40:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x42:
  case 0x68:
  case 0xc4:
switchD_PRG12__82e1_caseD_42:
    if (bVar8 == false) {
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    }
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x46:
switchD_PRG12__82e1_caseD_46:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x4a:
switchD_PRG12__82e1_caseD_4a:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x4c:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x54:
switchD_PRG12__82e1_caseD_54:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x58:
switchD_PRG12__82e1_caseD_58:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x5a:
    goto switchD_PRG12__82e1_caseD_5a;
  case 0x5e:
switchD_PRG12__82e1_caseD_5e:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x60:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x62:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 100:
    bVar6 = (char)DAT_00f3 - 2;
    (&switchD_PRG12::82e1::caseD_96)[bVar6] = *(undefined *)(RAM0x00f4 + (ushort)bVar7);
    (&switchD_PRG12::82e1::caseD_38)[bVar6] = 0;
    return;
  case 0x66:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x6a:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x6c:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x6e:
switchD_PRG12__82e1_caseD_6e:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x70:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x72:
switchD_PRG12__82e1_caseD_72:
    register0x22 = (BADSPACEBASE *)&uStack_1;
    bVar6 = *(byte *)(_SUB_00f0 + 9);
    bVar8 = CARRY1(bVar7 + 1,DAT_00f3._1_1_);
    *(byte *)(_SUB_00f0 + (ushort)bVar6) = bVar7 + 1 + DAT_00f3._1_1_;
    *(char *)(_SUB_00f0 + (ushort)(byte)(bVar6 - 1)) = (char)DAT_00f5 + bVar8;
    bVar7 = bVar6 - 2;
code_r0x85a2:
    *(byte *)(_SUB_00f0 + 9) = bVar7;
    RAM0x00f4 = CONCAT11(*(undefined *)((short)register0x22 + 1),bVar3);
    return;
  case 0x74:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x76:
                    // WARNING (jumptable): Read-only address (RAM,0x8e5b) is written
                    // WARNING: Read-only address (RAM,0x8e5b) is written
    LAB_PRG12__8e59_2 = bVar3;
                    // WARNING (jumptable): Read-only address (RAM,0x8e89) is written
                    // WARNING: Read-only address (RAM,0x8e89) is written
    LAB_PRG12__8e89 = bVar3;
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x78:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x7a:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  default:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x7e:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x80:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x82:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x84:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x86:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x88:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x8a:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x8c:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x8e:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x90:
switchD_PRG12__82e1_caseD_90:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x92:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x94:
  case 0xa0:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x96:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x98:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x9a:
  case 0xa6:
  case 0xac:
  case 0xe0:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x9c:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0x9e:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0xa2:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0xa4:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0xa8:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0xaa:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0xae:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0xb0:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0xb2:
  case 0xb4:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0xb6:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0xba:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0xbc:
switchD_PRG12__82e1_caseD_bc:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0xc0:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0xc2:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0xc6:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 200:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0xca:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0xcc:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0xce:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0xd0:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0xd2:
switchD_PRG12__82e1_caseD_d2:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0xd4:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0xd6:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0xd8:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0xda:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0xdc:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0xde:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0xe2:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0xe4:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0xe6:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0xe8:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0xea:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0xec:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0xee:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0xf0:
switchD_PRG12__82e1_caseD_f0:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0xf2:
    *(char *)(ushort)(byte)((char)DAT_00f3 + 0x9f) =
         *(char *)(ushort)(byte)((char)DAT_00f3 + 0x9f) + '\x01';
    if ((bStack0000 | 0xb1) != 0) {
      cVar5 = *(char *)(_SUB_00f0 + (ushort)(byte)(bVar7 + 1)) + -1;
      *(char *)(_SUB_00f0 + (ushort)(byte)(bVar7 + 1)) = cVar5;
      if (cVar5 == '\0') {
        *(byte *)(_SUB_00f0 + 9) = bVar7 + 3;
        return;
      }
      RAM0x00f4 = CONCAT11(*(undefined *)(_SUB_00f0 + (ushort)(byte)(bVar7 + 2)),
                           *(undefined *)(_SUB_00f0 + (ushort)(byte)(bVar7 + 3)));
      return;
    }
    if ((bool)-*(char *)(ushort)(byte)(cVar5 + 0x90) == !bVar8) {
                    // WARNING: Bad instruction - Truncating control flow here
      halt_baddata();
    }
    goto code_r0x85a2;
  case 0xf4:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0xf8:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0xfa:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0xfc:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  case 0xfe:
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  }
  bVar6 = (&switchD_PRG12::82e1::caseD_14)[bVar3];
  *(byte *)(_SUB_00f0 + 7) = bStack0000 + bVar6;
  *(undefined *)(_SUB_00f0 + 8) = (&switchD_PRG12::82e1::caseD_32)[bVar3] + CARRY1(bStack0000,bVar6)
  ;
switchD_PRG12__82e1_caseD_5a:
  cVar5 = (&switchD_PRG12::82e1::caseD_38)[bVar3] + '\x01';
  if (cVar5 == '\b') {
    cVar5 = '\0';
  }
  (&switchD_PRG12::82e1::caseD_38)[bVar3] = cVar5;
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG12__8349(byte param_1,char param_2)

{
  ushort uVar1;
  byte bVar2;
  byte bVar3;
  char cVar4;
  byte bVar5;
  bool bVar6;
  byte bVar7;
  
  RAM0x00f4 = CONCAT11(param_1,DAT_00f3._1_1_);
  *(undefined *)(param_1 + 0x700) = 0;
  bVar5 = (param_2 + -1) * '\x02';
  _SUB_00f0 = (ushort *)
              CONCAT11(*(undefined *)(bVar5 + 0x8bdb),(&switchD_PRG12::8266::caseD_ec)[bVar5]);
  bVar5 = 0;
  do {
    cVar4 = *(char *)((short)_SUB_00f0 + (ushort)bVar5);
    if (cVar4 < '\0') {
      SND_CHN = 0xf;
      return;
    }
    RAM0x00f4 = CONCAT11((byte)DAT_00f5,cVar4);
    bVar2 = 7 - cVar4;
    (&DAT_07a7)[bVar2] = 0;
    (&switchD_PRG12::82e1::caseD_96)[bVar2] = 0;
    DAT_07e3 = 0;
    switchD_PRG12::82e1::caseD_9c = 0;
    (&DAT_07ea)[bVar2] = 0;
    (&switchD_PRG12::82e1::caseD_a2)[bVar2] = 0;
    (&DAT_07d7)[bVar2] = 0;
    switchD_PRG12::82e1::caseD_a8 = 0;
    (&DAT_07f4)[bVar2] = 0;
    switchD_PRG12::82e1::caseD_ae = 0;
    bVar2 = DAT_00f3._1_1_ << 4;
    (&DAT_0727)[bVar2] = *(char *)((short)_SUB_00f0 + (ushort)(byte)(bVar5 + 1));
    (&DAT_0728)[bVar2] = *(char *)((short)_SUB_00f0 + (ushort)(byte)(bVar5 + 2));
    (&switchD_PRG12::82e1::caseD_c6)[bVar2] = 0;
    (&DAT_0730)[bVar2] = 0xf;
    *(undefined *)((short)&switchD_PRG12::82e1::caseD_e2 + (byte)(DAT_00f3._1_1_ << 2) + 1) = 1;
    bVar2 = 0;
    cVar4 = DAT_00f3._1_1_;
    bVar3 = 1;
    do {
      bVar7 = bVar2 >> 7;
      bVar2 = bVar2 << 1 | bVar3;
      cVar4 = cVar4 + -1;
      bVar3 = bVar7;
    } while (-1 < cVar4);
    switchD_PRG12::82e1::caseD_e2._0_1_ = bVar2 | (byte)switchD_PRG12::82e1::caseD_e2;
    bVar5 = bVar5 + 3;
  } while (-1 < (char)bVar5);
  *(byte *)((short)_SUB_00f0 + 5) = *(byte *)((short)_SUB_00f0 + 5) & 0xcf;
  unique0x10000026 = *_SUB_00f0;
  bVar5 = 0;
  do {
    do {
      bVar2 = *(byte *)(RAM0x00f4 + bVar5);
      if (-1 < (char)bVar2) goto LAB_PRG12__8404;
      bVar5 = bVar5 + 1;
      cVar4 = (char)(bVar2 + 0x20) < '\0';
    } while (((0xdf < bVar2) && (bVar2 = FUN_PRG12__84c9(), cVar4 == '\0')) ||
            ((bVar3 = SUB_00f1._1_1_, 0xaf < bVar2 && (bVar5 = bVar5 + 1, bVar5 != 0))));
    bVar2 = (&LAB_PRG12__8725)[bVar2 & 0x3f];
    bVar6 = -1 < (char)SUB_00f1._1_1_;
    *(byte *)((short)&switchD_PRG12::82e1::caseD_e2 + SUB_00f1._1_1_ + 1) = bVar2;
    (&DAT_0708)[bVar3] = bVar2;
  } while (bVar6);
LAB_PRG12__8404:
  bVar6 = CARRY1(bVar5 + 1,DAT_00f3._1_1_);
  *(byte *)_SUB_00f0 = bVar5 + 1 + DAT_00f3._1_1_;
  *(byte *)((short)_SUB_00f0 + 1) = (byte)DAT_00f5 + bVar6;
  if (((byte)DAT_00f3 == 5) || ((byte)DAT_00f3 < 2)) {
    bVar5 = 0;
    if (bVar2 == 0x10) goto LAB_PRG12__8435;
    RAM0x00f4 = (ushort)bVar2;
  }
  else {
    bVar3 = bVar2 & 0xf;
    bVar5 = bVar2;
    if (bVar3 == 0xc) {
LAB_PRG12__8435:
      bVar3 = *(byte *)((short)_SUB_00f0 + 5) | 0x20;
      *(byte *)((short)_SUB_00f0 + 5) = bVar3;
      if (bVar3 != 0) goto LAB_PRG12__84a6;
    }
    RAM0x00f4 = CONCAT11((&LAB_PRG12__870d_1)[(byte)(bVar3 << 1)],
                         (&LAB_PRG12__870d)[(byte)(bVar3 << 1)]);
    uVar1 = RAM0x00f4;
    for (bVar5 = bVar5 >> 4; unique0x10000086 = uVar1, bVar5 != 0; bVar5 = bVar5 - 1) {
      DAT_00f5._0_1_ = (byte)(uVar1 >> 8);
      DAT_00f3._1_1_ = (byte)uVar1;
      RAM0x00f4 = CONCAT11((byte)DAT_00f5 >> 1,DAT_00f3._1_1_ >> 1 | (byte)DAT_00f5 << 7);
      uVar1 = RAM0x00f4;
    }
  }
  bVar5 = (byte)DAT_00f3 - 1;
  if ((&DAT_07f4)[bVar5] == '\0') {
    bVar6 = CARRY1(DAT_00f3._1_1_,(&DAT_07a7)[bVar5]);
    cVar4 = DAT_00f3._1_1_ + (&DAT_07a7)[bVar5];
    *(char *)((short)_SUB_00f0 + 7) = cVar4;
    (&switchD_PRG12::82e1::caseD_14)[bVar5] = cVar4;
    bVar2 = (byte)DAT_00f5 + bVar6 | 0x80;
    *(byte *)(_SUB_00f0 + 4) = bVar2;
    (&switchD_PRG12::82e1::caseD_32)[bVar5] = bVar2;
  }
  else {
    bVar2 = DAT_00f3._1_1_ - (&DAT_07a7)[bVar5];
    if ((((&DAT_07a7)[bVar5] & (~DAT_00f3._1_1_ | bVar2) | bVar2 & ~DAT_00f3._1_1_) & 0x80) == 0) {
      *(byte *)((short)_SUB_00f0 + 7) = bVar2;
      (&switchD_PRG12::82e1::caseD_14)[bVar5] = bVar2;
      bVar2 = (byte)DAT_00f5 - 1;
    }
    else {
      *(byte *)((short)_SUB_00f0 + 7) = bVar2;
      (&switchD_PRG12::82e1::caseD_14)[bVar5] = bVar2;
      bVar2 = (byte)DAT_00f5;
    }
    *(byte *)(_SUB_00f0 + 4) = bVar2 | 0x80;
    (&switchD_PRG12::82e1::caseD_32)[bVar5] = bVar2 | 0x80;
  }
LAB_PRG12__84a6:
  bVar5 = (byte)DAT_00f3 - 1;
  (&DAT_07f4)[bVar5] = 0;
  if ((&DAT_07ea)[bVar5] == '\0') {
    (&DAT_0709)[SUB_00f1._1_1_] = 1;
    *(char *)(_SUB_00f0 + 2) = '\0';
  }
  *(undefined *)((short)&switchD_PRG12::82e1::caseD_e2 + SUB_00f1._1_1_ + 1) =
       (&DAT_0708)[SUB_00f1._1_1_];
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG12__83cb(void)

{
  ushort uVar1;
  byte bVar2;
  byte bVar3;
  byte bVar4;
  char cVar5;
  bool bVar6;
  
  *(byte *)((short)_SUB_00f0 + 5) = *(byte *)((short)_SUB_00f0 + 5) & 0xcf;
  unique0x1000001d = *_SUB_00f0;
  bVar4 = 0;
  do {
    do {
      bVar2 = *(byte *)(RAM0x00f4 + bVar4);
      if (-1 < (char)bVar2) goto LAB_PRG12__8404;
      bVar4 = bVar4 + 1;
      cVar5 = (char)(bVar2 + 0x20) < '\0';
    } while (((0xdf < bVar2) && (bVar2 = FUN_PRG12__84c9(), cVar5 == '\0')) ||
            ((bVar3 = SUB_00f1._1_1_, 0xaf < bVar2 && (bVar4 = bVar4 + 1, bVar4 != 0))));
    bVar2 = (&LAB_PRG12__8725)[bVar2 & 0x3f];
    bVar6 = -1 < (char)SUB_00f1._1_1_;
    *(byte *)((short)&switchD_PRG12::82e1::caseD_e2 + SUB_00f1._1_1_ + 1) = bVar2;
    (&DAT_0708)[bVar3] = bVar2;
  } while (bVar6);
LAB_PRG12__8404:
  bVar6 = CARRY1(bVar4 + 1,DAT_00f3._1_1_);
  *(byte *)_SUB_00f0 = bVar4 + 1 + DAT_00f3._1_1_;
  *(byte *)((short)_SUB_00f0 + 1) = (byte)DAT_00f5 + bVar6;
  if (((byte)DAT_00f3 == 5) || ((byte)DAT_00f3 < 2)) {
    bVar4 = 0;
    if (bVar2 == 0x10) goto LAB_PRG12__8435;
    RAM0x00f4 = (ushort)bVar2;
  }
  else {
    bVar3 = bVar2 & 0xf;
    bVar4 = bVar2;
    if (bVar3 == 0xc) {
LAB_PRG12__8435:
      bVar3 = *(byte *)((short)_SUB_00f0 + 5) | 0x20;
      *(byte *)((short)_SUB_00f0 + 5) = bVar3;
      if (bVar3 != 0) goto LAB_PRG12__84a6;
    }
    RAM0x00f4 = CONCAT11((&LAB_PRG12__870d_1)[(byte)(bVar3 << 1)],
                         (&LAB_PRG12__870d)[(byte)(bVar3 << 1)]);
    uVar1 = RAM0x00f4;
    for (bVar4 = bVar4 >> 4; unique0x1000005e = uVar1, bVar4 != 0; bVar4 = bVar4 - 1) {
      DAT_00f5._0_1_ = (byte)(uVar1 >> 8);
      DAT_00f3._1_1_ = (byte)uVar1;
      RAM0x00f4 = CONCAT11((byte)DAT_00f5 >> 1,DAT_00f3._1_1_ >> 1 | (byte)DAT_00f5 << 7);
      uVar1 = RAM0x00f4;
    }
  }
  bVar4 = (byte)DAT_00f3 - 1;
  if ((&DAT_07f4)[bVar4] == '\0') {
    bVar6 = CARRY1(DAT_00f3._1_1_,(&DAT_07a7)[bVar4]);
    cVar5 = DAT_00f3._1_1_ + (&DAT_07a7)[bVar4];
    *(char *)((short)_SUB_00f0 + 7) = cVar5;
    (&switchD_PRG12::82e1::caseD_14)[bVar4] = cVar5;
    bVar2 = (byte)DAT_00f5 + bVar6 | 0x80;
    *(byte *)(_SUB_00f0 + 4) = bVar2;
    (&switchD_PRG12::82e1::caseD_32)[bVar4] = bVar2;
  }
  else {
    bVar2 = DAT_00f3._1_1_ - (&DAT_07a7)[bVar4];
    if ((((&DAT_07a7)[bVar4] & (~DAT_00f3._1_1_ | bVar2) | bVar2 & ~DAT_00f3._1_1_) & 0x80) == 0) {
      *(byte *)((short)_SUB_00f0 + 7) = bVar2;
      (&switchD_PRG12::82e1::caseD_14)[bVar4] = bVar2;
      bVar2 = (byte)DAT_00f5 - 1;
    }
    else {
      *(byte *)((short)_SUB_00f0 + 7) = bVar2;
      (&switchD_PRG12::82e1::caseD_14)[bVar4] = bVar2;
      bVar2 = (byte)DAT_00f5;
    }
    *(byte *)(_SUB_00f0 + 4) = bVar2 | 0x80;
    (&switchD_PRG12::82e1::caseD_32)[bVar4] = bVar2 | 0x80;
  }
LAB_PRG12__84a6:
  bVar4 = (byte)DAT_00f3 - 1;
  (&DAT_07f4)[bVar4] = 0;
  if ((&DAT_07ea)[bVar4] == '\0') {
    (&DAT_0709)[SUB_00f1._1_1_] = 1;
    *(char *)(_SUB_00f0 + 2) = '\0';
  }
  *(undefined *)((short)&switchD_PRG12::82e1::caseD_e2 + SUB_00f1._1_1_ + 1) =
       (&DAT_0708)[SUB_00f1._1_1_];
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

byte FUN_PRG12__84c9(byte param_1,byte param_2)

{
  undefined uVar1;
  char cVar2;
  char cVar3;
  byte bVar4;
  byte bVar5;
  bool bVar6;
  byte unaff_retaddr;
  
  bVar4 = (param_1 & 0x1f) << 1;
  bVar5 = (&BYTE_PRG12__84db)[bVar4];
  RAM0x00f6 = CONCAT11(bVar5,(&switchD_PRG12::84d7::switchdataD_PRG12__84da)[bVar4]);
  switch(param_1 & 0x1f) {
  case 0:
    RAM0x00f6 = CONCAT11(bVar5,param_2 + 1);
    bVar4 = *(char *)(RAM0x00f4 + (ushort)param_2) << 1;
    bVar5 = (&LAB_PRG12__8755)[bVar4];
    *(undefined *)(_SUB_00f0 + 2) = (&LAB_PRG12__8753_1)[bVar4];
    *(byte *)(_SUB_00f0 + 3) = bVar5;
    return bVar5;
  default:
    return bVar5;
  case 2:
    RAM0x00f6 = CONCAT11(*(byte *)(RAM0x00f4 + (ushort)param_2),param_2 + 1);
    bVar5 = *(byte *)(_SUB_00f0 + 5) & 0x3f | *(byte *)(RAM0x00f4 + (ushort)param_2);
    *(byte *)(_SUB_00f0 + 5) = bVar5;
    return bVar5;
  case 3:
    bVar4 = *(byte *)(RAM0x00f4 + (ushort)param_2);
    RAM0x00f6 = CONCAT11(bVar5,param_2 + 1);
    if (switchD_PRG12::82e1::caseD_a8 == '\0') {
      RAM0x00f6 = CONCAT11(bVar4,param_2 + 1);
      bVar4 = *(byte *)(_SUB_00f0 + 5) & 0xf0 | bVar4;
      *(byte *)(_SUB_00f0 + 5) = bVar4;
    }
    return bVar4;
  case 4:
    RAM0x00f6 = CONCAT11(bVar5,param_2);
    *(byte *)(_SUB_00f0 + 5) = *(byte *)(_SUB_00f0 + 5) | 0x10;
    (&SQ1_SWEEP)[(byte)((((char)DAT_00f3 - 1U ^ 7) & 3) << 2)] =
         *(undefined *)(RAM0x00f4 + (RAM0x00f6 & 0xff));
    (&DAT_07e4)[(char)DAT_00f3 - 1U & 3] = 0;
    return 0;
  case 5:
    bVar4 = (char)DAT_00f3 - 1;
    bVar5 = *(byte *)(RAM0x00f4 + (ushort)param_2);
    if (!(bool)(bVar5 >> 7)) {
      (&DAT_07f4)[bVar4] = bVar5 << 1;
    }
    (&DAT_07a7)[bVar4] = bVar5 & 0x7f;
    return bVar5 & 0x7f;
  case 8:
    bVar5 = *(byte *)(RAM0x00f4 + (ushort)(byte)(param_2 + 1));
    RAM0x00f4 = CONCAT11(bVar5,*(undefined *)(RAM0x00f4 + (ushort)param_2));
    return bVar5;
  case 9:
    uVar1 = *(undefined *)(RAM0x00f4 + (ushort)param_2);
    bVar5 = *(byte *)(RAM0x00f4 + (ushort)(byte)(param_2 + 1));
    bVar4 = *(byte *)(_SUB_00f0 + 9);
    bVar6 = CARRY1(param_2 + 2,DAT_00f3._1_1_);
    *(byte *)(_SUB_00f0 + (ushort)bVar4) = param_2 + 2 + DAT_00f3._1_1_;
    *(char *)(_SUB_00f0 + (ushort)(byte)(bVar4 - 1)) = (char)DAT_00f5 + bVar6;
    *(byte *)(_SUB_00f0 + 9) = bVar4 - 2;
    RAM0x00f4 = CONCAT11(bVar5,uVar1);
    return bVar5;
  case 10:
    bVar5 = *(char *)(_SUB_00f0 + 9) + 2;
    RAM0x00f4 = CONCAT11(*(undefined *)(_SUB_00f0 + (ushort)(byte)(*(char *)(_SUB_00f0 + 9) + 1)),
                         *(undefined *)(_SUB_00f0 + (ushort)bVar5));
    *(byte *)(_SUB_00f0 + 9) = bVar5;
    return bVar5;
  case 0xb:
    uVar1 = *(undefined *)(RAM0x00f4 + (ushort)param_2);
    bVar5 = *(byte *)(_SUB_00f0 + 9);
    bVar6 = CARRY1(param_2 + 1,DAT_00f3._1_1_);
    cVar3 = param_2 + 1 + DAT_00f3._1_1_;
    DAT_00f3._1_1_ = cVar3;
    *(char *)(_SUB_00f0 + (ushort)bVar5) = cVar3;
    cVar3 = (char)DAT_00f5 + bVar6;
    RAM0x00f4 = CONCAT11(cVar3,DAT_00f3._1_1_);
    *(char *)(_SUB_00f0 + (ushort)(byte)(bVar5 - 1)) = cVar3;
    *(undefined *)(_SUB_00f0 + (ushort)(byte)(bVar5 - 2)) = uVar1;
    *(byte *)(_SUB_00f0 + 9) = bVar5 - 3;
    return bVar5 - 3;
  case 0xc:
    break;
  case 0xd:
    bVar5 = (char)DAT_00f3 - 1;
    (&switchD_PRG12::82e1::caseD_96)[bVar5] = *(undefined *)(RAM0x00f4 + (ushort)param_2);
    (&switchD_PRG12::82e1::caseD_38)[bVar5] = 0;
    return 0;
  case 0xf:
    (&switchD_PRG12::82e1::caseD_96)[(byte)((char)DAT_00f3 - 1)] = 0;
    return 0;
  case 0x10:
    return bVar5;
  case 0x12:
    DAT_07f2 = 0;
    switchD_PRG12::82e1::caseD_6a = 0;
    DAT_0701 = 0;
    DAT_0702 = 0;
    FUN_0703 = (code)0x0;
    DAT_0704 = 0;
    DAT_0705 = 0;
    return 0;
  case 0x13:
    (&DAT_07ea)[(byte)((char)DAT_00f3 - 1)] = 0xf;
    return 0xf;
  case 0x14:
    (&DAT_07ea)[(byte)((char)DAT_00f3 - 1)] = 0;
    return 0;
  case 0x19:
    SND_CHN = 0xf;
    bVar5 = switchD_PRG12::82e1::caseD_ae;
    if (switchD_PRG12::82e1::caseD_ae == 0) {
      DMC_FREQ = 0xf;
      DMC_START = 0;
      DMC_LEN = 0xc;
      bVar5 = 0x1f;
      SND_CHN = 0x1f;
    }
    return bVar5;
  case 0x1a:
    SND_CHN = 0xf;
    bVar5 = switchD_PRG12::82e1::caseD_ae;
    if (switchD_PRG12::82e1::caseD_ae == 0) {
      DMC_FREQ = 0xf;
      DMC_START = 3;
      DMC_LEN = 0x20;
      bVar5 = 0x1f;
      SND_CHN = 0x1f;
    }
    return bVar5;
  case 0x1b:
    SND_CHN = 0xf;
    bVar5 = switchD_PRG12::82e1::caseD_ae;
    if (switchD_PRG12::82e1::caseD_ae == 0) {
      DMC_FREQ = 0xf;
      DMC_START = 0xb;
      DMC_LEN = 0x13;
      bVar5 = 0x1f;
      SND_CHN = 0x1f;
    }
    return bVar5;
  case 0x1e:
    bVar4 = *(byte *)(RAM0x00f4 + (ushort)param_2);
    RAM0x00f6 = CONCAT11(bVar5,param_2 + 1);
    bVar5 = (char)DAT_00f3 - 1;
    (&switchD_PRG12::82e1::caseD_a2)[bVar5] = bVar4;
    (&DAT_07d7)[bVar5] = bVar4;
    return bVar4;
  case 0x1f:
    switchD_PRG12::82e1::caseD_e2._0_1_ = (byte)switchD_PRG12::82e1::caseD_e2 & 0x7f;
    *(undefined *)((byte)((((char)DAT_00f3 - 1U ^ 7) & 3) << 2) + 0x4000) = 0x30;
    return unaff_retaddr;
  }
  RAM0x00f6 = CONCAT11(bVar5,param_2);
  cVar3 = *(char *)(_SUB_00f0 + 9);
  cVar2 = *(char *)(_SUB_00f0 + (ushort)(byte)(cVar3 + 1U)) + -1;
  *(char *)(_SUB_00f0 + (ushort)(byte)(cVar3 + 1U)) = cVar2;
  if (cVar2 != '\0') {
    bVar5 = *(byte *)(_SUB_00f0 + (ushort)(byte)(cVar3 + 3));
    RAM0x00f4 = CONCAT11(*(undefined *)(_SUB_00f0 + (ushort)(byte)(cVar3 + 2)),bVar5);
    return bVar5;
  }
  *(byte *)(_SUB_00f0 + 9) = cVar3 + 3U;
  return cVar3 + 3U;
}



void FUN_PRG16__80a9(char param_1)

{
                    // WARNING: Subroutine does not return
  FUN_c509(param_1 + '\x10');
}



byte FUN_PRG16__8138(byte param_1)

{
  byte bVar1;
  bool bVar2;
  
  param_1 = param_1 & 0xfc;
  if (param_1 != 0) {
    DAT_003b = param_1 >> 1;
    for (bVar1 = DAT_00e2; bVar2 = DAT_003b <= bVar1, bVar2; bVar1 = (bVar1 - DAT_003b) - !bVar2) {
    }
    param_1 = bVar1 + DAT_003b + bVar2;
  }
  return param_1;
}



void FUN_PRG16__8150(void)

{
  char cVar1;
  byte bVar2;
  
  FUN_c50c();
  bVar2 = *(byte *)(DAT_0034 + 1) - 0x40;
  cVar1 = *(char *)(DAT_0034 + 2) - ((bVar2 & ~*(byte *)(DAT_0034 + 1) & 0x80) == 0);
  if (cVar1 < '\0') {
    bVar2 = 0;
    cVar1 = '\0';
  }
  *(char *)(DAT_0034 + 2) = cVar1;
  *(byte *)(DAT_0034 + 1) = bVar2;
  return;
}



void FUN_PRG16__816e(byte param_1)

{
                    // WARNING: Subroutine does not return
  FUN_c509(param_1 & 0x7f);
}



void FUN_PRG16__8211(void)

{
  bool in_Z;
  
  if (!in_Z) {
    DAT_0516 = DAT_0516 | 4;
  }
  return;
}



void thunk_FUN_c509(void)

{
                    // WARNING: Subroutine does not return
  FUN_c509();
}



void FUN_PRG16__8350(void)

{
  DAT_0442 = FUN_c548(DAT_05fb ^ 0xb);
  return;
}



void FUN_PRG16__835c(void)

{
  DAT_0441 = FUN_c548(DAT_05fb);
  return;
}



void FUN_PRG16__838b(void)

{
                    // WARNING: Subroutine does not return
  FUN_c509(SUB_0612);
}



void FUN_PRG16__8677(void)

{
  byte bVar1;
  
  bVar1 = FUN_PRG16__8138(DAT_0444,0);
  if (0x7f < bVar1) {
    FUN_PRG16__8150(DAT_0442);
  }
  return;
}



void thunk_FUN_c509(void)

{
                    // WARNING: Subroutine does not return
  FUN_c509();
}



void FUN_PRG16__8991(char param_1)

{
                    // WARNING: Subroutine does not return
  FUN_c509(param_1 + '\x10');
}



void FUN_PRG16__899c(char param_1)

{
                    // WARNING: Subroutine does not return
  FUN_c509(param_1 + '\x10');
}



void FUN_PRG16__89a7(char param_1)

{
                    // WARNING: Subroutine does not return
  FUN_c509(param_1 + '\x10');
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG19__83e4(void)

{
                    // WARNING: Could not recover jumptable at 0x83e8. Too many branches
                    // WARNING: Treating indirect jump as call
  (*_UNK_fffe)();
  return;
}



void FUN_PRG20__8084(char param_1)

{
                    // WARNING: Subroutine does not return
  FUN_c509(param_1 + '\x10');
}



void FUN_PRG20__81ba(byte param_1)

{
                    // WARNING: Subroutine does not return
  FUN_c509(param_1 & 0x7f);
}



void FUN_PRG20__826a(void)

{
  byte in_C;
  
  DAT_0546 = (&LAB_PRG20__88ef_1)[*DAT_0034];
  if (((byte)((*DAT_0034 == 0) << 1 | in_C & 2) != 0) && (DAT_0039._1_1_ == '\v')) {
    DAT_0546 = 4;
  }
  return;
}



void FUN_PRG20__8282(byte param_1)

{
  undefined uVar1;
  
  uVar1 = 1;
  if (((param_1 != 1) && (uVar1 = 0, 0xe < param_1)) && (param_1 < 0x17)) {
    uVar1 = 2;
  }
  DAT_003b = param_1;
                    // WARNING: Subroutine does not return
  FUN_c509(uVar1);
}



void FUN_PRG20__8316(byte param_1)

{
                    // WARNING: Subroutine does not return
  FUN_c509(param_1 & 0x7f);
}



void FUN_PRG20__83cf(byte param_1)

{
  bool bVar1;
  
  bVar1 = CARRY1(param_1,LAB_004c);
  LAB_004c = param_1 + LAB_004c;
  if (bVar1 != false) {
    DAT_004d = DAT_004d + '\x01';
  }
  return;
}



void FUN_PRG20__8438(char param_1)

{
                    // WARNING: Subroutine does not return
  FUN_c509(param_1 + '\x10');
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG20__857a(void)

{
  ushort uVar1;
  
  uVar1 = (ushort)(byte)DAT_0040;
  DAT_0040._0_1_ = (byte)DAT_0040 + 1;
                    // WARNING: Subroutine does not return
  FUN_c509(*(undefined *)(_DAT_003e + uVar1));
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG20__85a9(void)

{
  undefined uVar1;
  byte bVar2;
  
  FUN_PRG20__85e7();
  uVar1 = *(undefined *)(_DAT_003e + (ushort)(byte)DAT_0040);
  bVar2 = (byte)DAT_0040 + 1;
  DAT_0040._0_1_ = (byte)DAT_0040 + 2;
  *(undefined *)(_DAT_003c + 7) = *(undefined *)(_DAT_003e + (ushort)bVar2);
  *(undefined *)(_DAT_003c + 5) = uVar1;
  uVar1 = *(undefined *)(_DAT_003e + (ushort)(byte)DAT_0040);
  bVar2 = (byte)DAT_0040 + 1;
  DAT_0040._0_1_ = (byte)DAT_0040 + 2;
  *(undefined *)(_DAT_003c + 0xb) = *(undefined *)(_DAT_003e + (ushort)bVar2);
  *(undefined *)(_DAT_003c + 9) = uVar1;
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG20__85e7(void)

{
  *(undefined *)(_DAT_003c + 0x11) = *(undefined *)(_DAT_003e + (ushort)(byte)DAT_0040);
  DAT_0040._0_1_ = (byte)DAT_0040 + 1;
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG20__85f2(char param_1,byte param_2)

{
  byte bVar1;
  byte bVar2;
  byte bVar3;
  byte bVar4;
  
  bVar1 = *(byte *)(_DAT_003c + (ushort)param_2);
  bVar2 = *(byte *)(_DAT_003c + (ushort)(byte)(param_2 + 1));
  *(byte *)(_DAT_003c + (ushort)(byte)(param_2 + 1)) = bVar1 + bVar2;
  bVar3 = *(byte *)(_DAT_003c + (ushort)(byte)(param_2 + 2));
  if ((char)bVar3 < '\0') {
    *(char *)(ushort)(byte)(param_1 + 0x42) = *(char *)(ushort)(byte)(param_1 + 0x42) + -1;
  }
  bVar4 = *(byte *)(_DAT_003c + (ushort)(byte)(param_2 + 3));
  *(byte *)(_DAT_003c + (ushort)(byte)(param_2 + 3)) = bVar3 + bVar4 + CARRY1(bVar1,bVar2);
  *(char *)(ushort)(byte)(param_1 + 0x42) =
       *(char *)(ushort)(byte)(param_1 + 0x42) + CARRY1(bVar3,bVar4);
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG20__860d(byte param_1,byte param_2)

{
  char cVar1;
  byte bVar2;
  byte bVar3;
  
  cVar1 = *(char *)(_DAT_003e + (ushort)param_2);
  bVar2 = *(byte *)(_DAT_003e + (ushort)(byte)(param_2 - 1));
  bVar3 = *(byte *)(_DAT_003c + (ushort)param_1);
  *(byte *)(_DAT_003c + (ushort)param_1) = bVar2 + bVar3;
  *(char *)(_DAT_003c + (ushort)(byte)(param_1 + 2)) =
       cVar1 + *(char *)(_DAT_003c + (ushort)(byte)(param_1 + 2)) + CARRY1(bVar2,bVar3);
  return;
}



void FUN_PRG20__86db(void)

{
  FUN_c50c();
                    // WARNING: Subroutine does not return
  FUN_c509(DAT_062d & 0xf);
}



char FUN_PRG20__86f2(void)

{
  char cVar1;
  bool in_V;
  
  cVar1 = DAT_0046;
  if (DAT_0046 == DAT_05fd) {
    if (DAT_062e == '\0') {
      DAT_062e = '\a';
      DAT_062d = DAT_062d ^ 0x40;
      if (!in_V) {
        DAT_062e = '\x04';
      }
    }
    DAT_062e = DAT_062e + -1;
    if ((DAT_062d & 0x40) != 0x40) {
      cVar1 = DAT_0046 + '\v';
    }
  }
  return cVar1;
}



void FUN_PRG20__8753(void)

{
                    // WARNING: Subroutine does not return
  FUN_c509(DAT_062d & 0xf);
}



char FUN_PRG20__87a7(char param_1,byte param_2,char param_3)

{
  char cVar1;
  byte bVar2;
  bool bVar3;
  
  DAT_003e = param_1;
  FUN_c545(DAT_062c);
  DAT_003c = param_2;
  DAT_003d = param_3;
  bVar2 = DAT_0639;
  cVar1 = DAT_0635;
  do {
    bVar3 = CARRY1(bVar2,param_2);
    bVar2 = bVar2 + param_2;
    cVar1 = cVar1 + param_3 + bVar3;
    DAT_003e = DAT_003e + -1;
  } while (-1 < DAT_003e);
  return cVar1;
}



char FUN_PRG20__87c7(char param_1,byte param_2,char param_3)

{
  char cVar1;
  byte bVar2;
  bool bVar3;
  
  DAT_003e = param_1;
  FUN_c542(DAT_062c);
  DAT_003c = param_2;
  DAT_003d = param_3;
  bVar2 = DAT_063b;
  cVar1 = DAT_0637;
  do {
    bVar3 = CARRY1(bVar2,param_2);
    bVar2 = bVar2 + param_2;
    cVar1 = cVar1 + param_3 + bVar3;
    DAT_003e = DAT_003e + -1;
  } while (-1 < DAT_003e);
  return cVar1;
}



undefined FUN_PRG20__881d(byte param_1)

{
  byte bVar1;
  byte bVar2;
  byte in_C;
  
  if (DAT_0640 == '\0') {
    DAT_0641 = DAT_0641 + 1;
    in_C = 0;
    if (DAT_0641 == 3) {
      DAT_0641 = 0;
    }
    DAT_0640 = '\x04';
  }
  bVar1 = 0;
  bVar2 = DAT_0641;
  if ((byte)((DAT_05fb == '\0') << 1 | in_C & 2) != 0) {
    bVar2 = DAT_0641 + 3;
    bVar1 = 0x80;
  }
  if ((DAT_0637 & 0x80) != 0x80) {
    bVar1 = bVar1 ^ 0x80;
  }
  (&DAT_0202)[param_1] = bVar1 | (&DAT_0202)[param_1];
  DAT_0640 = DAT_0640 + -1;
  return (&LAB_PRG20__885b)[bVar2];
}



void FUN_PRG20__8861(void)

{
  byte bVar1;
  byte bVar2;
  
  bVar2 = DAT_002c * '\n' - ((char)(DAT_002c << 2) >> 7);
  DAT_0046 = 0;
  do {
    (&DAT_0201)[DAT_003b] = (&DAT_PRG20__88d0)[DAT_0046];
    bVar1 = (&LAB_PRG20__88a8)[bVar2];
    (&DAT_0203)[DAT_003b] = ((bVar1 & 0xf0) >> 1) + 0xa0;
    *(byte *)(DAT_003b + 0x200) = (bVar1 & 0xf) * '\x04' + -0x5e;
    (&DAT_0202)[DAT_003b] = 0;
    bVar2 = bVar2 + 1;
    DAT_003b = DAT_003b + 4;
    DAT_0048 = DAT_0048 + '\x01';
    DAT_0046 = DAT_0046 + 1;
  } while (DAT_0046 != 10);
  return;
}



// WARNING: Control flow encountered bad instruction data

void FUN_PRG21__8001(void)

{
                    // WARNING: Bad instruction - Truncating control flow here
  halt_baddata();
}



void FUN_PRG22__80b3(void)

{
  DAT_0044 = DAT_0044 + '\x01';
                    // WARNING: Subroutine does not return
  FUN_c509();
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

undefined FUN_PRG22__80c0(void)

{
  byte bVar1;
  undefined uVar2;
  char cVar3;
  
  DAT_0045 = (*(byte *)(_DAT_0042 + (ushort)DAT_0044) & 0x38) >> 3;
  bVar1 = (&LAB_PRG22__81d2)[*(byte *)(_DAT_0042 + (ushort)(byte)(DAT_0044 + 1))];
  cVar3 = '\0';
  if ((DAT_0049 & 0x80) == 0x80) {
    bVar1 = (bVar1 ^ 0xff) + 1;
  }
  if ((char)bVar1 < '\0') {
    cVar3 = -1;
  }
  DAT_0046 = bVar1 + (byte)DAT_0040;
  if ((((char)(cVar3 + DAT_0040._1_1_ + CARRY1(bVar1,(byte)DAT_0040)) != '\0') ||
      (DAT_0046 < DAT_0540)) || ((DAT_0046 != DAT_0541 && (DAT_0541 <= DAT_0046)))) {
    DAT_0044 = DAT_0044 + 2;
    do {
      DAT_0044 = DAT_0044 + '\x02';
      DAT_0045 = DAT_0045 - 1;
    } while (-1 < (char)DAT_0045);
    return 0xf8;
  }
  DAT_0044 = DAT_0044 + 2;
  do {
    bVar1 = (&LAB_PRG22__81fa)[*(byte *)(_DAT_0042 + (ushort)DAT_0044) >> 2];
    cVar3 = '\0';
    if ((DAT_0049 & 0x40) == 0x40) {
      bVar1 = (bVar1 ^ 0xff) + 1;
    }
    if ((char)bVar1 < '\0') {
      cVar3 = -1;
    }
    DAT_0047 = bVar1 + DAT_003e;
    if ((char)(cVar3 + DAT_003f + CARRY1(bVar1,DAT_003e)) == '\0') {
LAB_PRG22__8136:
      *(byte *)(DAT_003b + 0x200) = DAT_0046;
      (&DAT_0203)[DAT_003b] = DAT_0047;
      (&DAT_0202)[DAT_003b] = *(byte *)(_DAT_0042 + (ushort)DAT_0044) & 3 | DAT_0049;
      DAT_0044 = DAT_0044 + 1;
      uVar2 = *(undefined *)(_DAT_0042 + (ushort)DAT_0044);
      (&DAT_0201)[DAT_003b] = uVar2;
      DAT_003b = DAT_003b + 4;
      DAT_0048 = DAT_0048 + '\x01';
    }
    else {
      uVar2 = 0xf8;
      *(undefined *)(DAT_003b + 0x200) = 0xf8;
      DAT_0044 = DAT_0044 + 1;
      if (DAT_0044 == 0) goto LAB_PRG22__8136;
    }
    DAT_0044 = DAT_0044 + 1;
    DAT_0045 = DAT_0045 - 1;
    if ((char)DAT_0045 < '\0') {
      return uVar2;
    }
  } while( true );
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG22__8187(void)

{
  byte bVar1;
  char cVar2;
  char in_V;
  char in_B;
  char in_D;
  char in_I;
  bool bVar3;
  byte in_C;
  byte bStack0000;
  
  bStack0000 = in_V << 6 | 0x20U | in_B << 4 | in_D << 3 | in_I << 2 |
               (((*_DAT_003c ^ DAT_0517) & 0x40) == 0) << 1 | in_C;
  bVar1 = _DAT_003c[0x13];
  if (bVar1 != 0) {
    cVar2 = '\0';
    bVar3 = (bool)(bStack0000 >> 1 & 1);
    bStack0000 = bStack0000 & 0x80 | 0x20 | (bStack0000 >> 6 & 1) << 6 | (bStack0000 >> 4 & 1) << 4
                 | (bStack0000 >> 3 & 1) << 3 | (bStack0000 >> 2 & 1) << 2 | bVar3 << 1 | in_C & 1;
    if (!bVar3) {
      bVar1 = (bVar1 ^ 0xff) + 1;
    }
    if ((char)bVar1 < '\0') {
      cVar2 = -1;
    }
    bVar3 = CARRY1(bVar1,DAT_003e);
    DAT_003e = bVar1 + DAT_003e;
    DAT_003f = cVar2 + DAT_003f + bVar3;
  }
  bVar1 = _DAT_003c[0x14];
  if (bVar1 != 0) {
    cVar2 = '\0';
    if ((char)bStack0000 < '\0') {
      bVar1 = (bVar1 ^ 0xff) + 1;
    }
    if ((char)bVar1 < '\0') {
      cVar2 = -1;
    }
    bVar3 = CARRY1(bVar1,(byte)DAT_0040);
    DAT_0040._0_1_ = bVar1 + (byte)DAT_0040;
    DAT_0040._1_1_ = cVar2 + DAT_0040._1_1_ + bVar3;
  }
  return;
}



void FUN_PRG24__8053(void)

{
  if (DAT_05e3 == '\0') {
    return;
  }
  if (DAT_05e9 != '\0') {
    DAT_05e9 = DAT_05e9 + -1;
    return;
  }
                    // WARNING: Subroutine does not return
  FUN_c509(DAT_05e4);
}



void FUN_PRG24__8087(byte param_1)

{
                    // WARNING: Subroutine does not return
  FUN_c509(param_1 & 0xf);
}



void thunk_FUN_c509(void)

{
                    // WARNING: Subroutine does not return
  FUN_c509();
}



void FUN_PRG24__835e(char param_1)

{
                    // WARNING: Subroutine does not return
  FUN_c509(param_1 + ' ');
}



void FUN_PRG24__8513(void)

{
  byte bVar1;
  
  FUN_c50c();
  bVar1 = 0;
  do {
    if (*DAT_0034 == (&DAT_PRG24__852c)[bVar1]) {
      DAT_003d = bVar1;
      return;
    }
    bVar1 = bVar1 + 1;
  } while (bVar1 != 8);
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG24__8534(void)

{
  byte bVar1;
  char in_N;
  char in_V;
  char in_B;
  char in_D;
  char in_I;
  char in_Z;
  byte in_C;
  byte bStack0000;
  
  bStack0000 = in_N << 7 | 0x20U | in_V << 6 | in_B << 4 | in_D << 3 | in_I << 2 | in_Z << 1 | in_C;
  FUN_c50c();
  if ((bStack0000 & 1) != 0) {
    _DAT_003e = CONCAT11((&LAB_PRG24__8589_1)[(byte)(DAT_003d << 1)],
                         (&LAB_PRG24__8589)[(byte)(DAT_003d << 1)]);
    bVar1 = 0;
    while (*(char *)(_DAT_003e + (ushort)bVar1) != '\0') {
      if ((*DAT_0034 == *(char *)(_DAT_003e + (ushort)bVar1)) || (bVar1 = bVar1 + 1, bVar1 == 0)) {
        FUN_PRG24__863c(*DAT_0034);
        bStack0000 = (&LAB_PRG24__857a)[(byte)(DAT_003d << 1)];
        FUN_PRG24__8629((&LAB_PRG24__8579)[(byte)(DAT_003d << 1)]);
        FUN_PRG24__8629(bStack0000);
        return;
      }
    }
  }
  FUN_PRG24__863c(*DAT_0034);
  return;
}



void FUN_PRG24__8629(undefined param_1)

{
  undefined uVar1;
  
  uVar1 = FUN_c524();
  (&DAT_04a8)[DAT_0039._1_1_] = uVar1;
  (&DAT_04a8)[DAT_003b] = param_1;
  DAT_0039._1_1_ = DAT_0039._1_1_ + 1;
  DAT_003b = DAT_003b + 1;
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG24__863c(void)

{
  FUN_c53c();
  DAT_003c = 0;
  do {
    if (0xdf < *(byte *)(_DAT_0030 + (ushort)DAT_003c)) {
      return;
    }
    FUN_PRG24__8629();
    DAT_003c = DAT_003c + 1;
  } while (DAT_003c != 0);
  return;
}



void FUN_PRG24__8653(char param_1)

{
  byte bVar1;
  byte bVar2;
  
  DAT_003d = param_1;
  FUN_c50c();
  if (*DAT_0034 != '\0') {
    FUN_PRG24__863c();
    FUN_PRG24__8629(8);
    FUN_PRG24__8629(0x2e);
    return;
  }
  bVar1 = (DAT_003d + -0xb) * '\x04';
  bVar2 = 0;
  do {
    (&DAT_05ee)[bVar2] = (&DAT_PRG24__8686)[bVar1];
    bVar1 = bVar1 + 1;
    bVar2 = bVar2 + 1;
  } while (bVar2 != 4);
  FUN_PRG24__863c(0);
  return;
}



void FUN_PRG24__86b2(char param_1)

{
  FUN_PRG24__8629(param_1 + '3');
  return;
}



byte FUN_PRG24__88b9(byte param_1)

{
  undefined uVar1;
  byte bVar2;
  byte bVar3;
  char cVar4;
  
  DAT_0045 = -1;
  (&DAT_04a5)[param_1] = DAT_0050[2];
  DAT_003b = DAT_05c5 >> 3;
  bVar2 = (byte)((byte)(DAT_05c5 << 7) >> 1 | (DAT_05c5 >> 1) << 7) >> 1 | (DAT_05c5 >> 2) << 7;
  bVar3 = *DAT_0050;
  (&DAT_04a6)[param_1] = bVar3 + bVar2;
  bVar3 = DAT_0050[1] + DAT_003b + CARRY1(bVar3,bVar2);
  (&DAT_04a7)[param_1] = bVar3;
  if (bVar3 < 0x22) {
    (&DAT_04a7)[param_1] = DAT_05ce >> 4 | (&DAT_04a7)[param_1];
  }
  cVar4 = '\0';
  bVar3 = DAT_0050[5];
  DAT_0039._1_1_ = param_1;
  if (bVar3 != DAT_05c5) {
    if (DAT_05c5 <= bVar3) goto LAB_PRG24__8949;
    cVar4 = '\x06';
    if ((byte)(bVar3 + DAT_0050[7]) != DAT_05c5) {
      if ((byte)(bVar3 + DAT_0050[7]) < DAT_05c5) goto LAB_PRG24__8949;
      cVar4 = '\x03';
    }
  }
  DAT_003b = DAT_0050[6] - 2;
  bVar3 = DAT_0050[4];
  bVar2 = cVar4 + DAT_05c6;
  DAT_0045 = cVar4;
  (&DAT_04a8)[(byte)(param_1 + bVar3)] = (&DAT_PRG24__8d9e)[bVar2];
  uVar1 = (&LAB_PRG24__8d9f)[bVar2];
  bVar3 = param_1 + bVar3 + 1;
  do {
    (&DAT_04a8)[bVar3] = uVar1;
    bVar3 = bVar3 + 1;
    DAT_003b = DAT_003b - 1;
  } while (DAT_003b != 0);
  (&DAT_04a8)[bVar3] = (&LAB_PRG24__8da0)[bVar2];
LAB_PRG24__8949:
  if (DAT_0050[8] != 0) {
    bVar3 = 9;
    DAT_003b = DAT_0050[8];
    do {
      DAT_003c = 0;
      if ((DAT_0050[bVar3] == DAT_05c5) || (DAT_003c = 1, (byte)(DAT_0050[bVar3] - 1) == DAT_05c5))
      {
        DAT_0048 = bVar3;
        FUN_PRG24__8986();
        bVar3 = DAT_0048;
      }
      bVar3 = bVar3 + 4;
      DAT_003b = DAT_003b - 1;
    } while (DAT_003b != 0);
  }
  DAT_0515 = 0x80;
  bVar3 = DAT_05c5;
  DAT_05c5 = DAT_05c5 + 1;
  return bVar3;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG24__8986(char param_1)

{
  char cVar1;
  char cVar2;
  
  DAT_003d = *(char *)(DAT_0050 + (ushort)(byte)(param_1 + 1)) + DAT_0039._1_1_;
  _DAT_003e = CONCAT11(*(undefined *)(DAT_0050 + (ushort)(byte)(param_1 + 3)),
                       *(undefined *)(DAT_0050 + (ushort)(byte)(param_1 + 2)));
  DAT_0040._0_1_ = 0;
  do {
    while( true ) {
      cVar2 = *(byte *)(_DAT_003e + (ushort)(byte)DAT_0040) == 0xe0;
      if (*(byte *)(_DAT_003e + (ushort)(byte)DAT_0040) < 0xe0) break;
      DAT_0040._0_1_ = (byte)DAT_0040 + 1;
      FUN_PRG24__89b4();
    }
    DAT_0040._0_1_ = (byte)DAT_0040 + 1;
    FUN_c524();
    cVar1 = FUN_PRG24__8c9f();
  } while (cVar2 == '\0');
                    // WARNING: Subroutine does not return
  FUN_c509(cVar1 + ' ');
}



void FUN_PRG24__89b4(char param_1)

{
                    // WARNING: Subroutine does not return
  FUN_c509(param_1 + ' ');
}



void FUN_PRG24__8c55(byte param_1,char param_2)

{
  if (DAT_003c != '\x01') {
    DAT_0071._0_1_ = 10;
    DAT_0074 = 0;
    DAT_006f = param_1;
    SUB_0070 = param_2;
    do {
      do {
        FUN_c51e();
        FUN_PRG24__8c7a(DAT_0071._1_1_);
      } while (SUB_0070 != '\0');
      if (DAT_006f == 0) {
        return;
      }
    } while (9 < DAT_006f);
    FUN_PRG24__8c85(DAT_006f + 0x33,0);
    DAT_003d = DAT_003d + -1;
  }
  return;
}



void FUN_PRG24__8c7a(char param_1)

{
  FUN_PRG24__8c85(param_1 + '3',0);
  DAT_003d = DAT_003d + -1;
  return;
}



void FUN_PRG24__8c85(char param_1,char param_2)

{
  DAT_003c = DAT_003c + -1;
  if ((DAT_003c != '\0') ||
     ((param_2 != '\0' && ((param_1 = param_2, DAT_05c6 == '\x1b' || (DAT_0045 != '\0')))))) {
    (&DAT_04a8)[DAT_003d] = param_1;
  }
  DAT_003c = DAT_003c + '\x01';
  return;
}



void FUN_PRG24__8c9f(void)

{
  FUN_PRG24__8c85();
  DAT_003d = DAT_003d + '\x01';
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG24__8ca5(undefined param_1)

{
  byte bVar1;
  undefined uVar2;
  undefined uVar3;
  undefined uStack0000;
  
  uStack0000 = param_1;
  if (*(byte *)(_DAT_003e + (ushort)(byte)DAT_0040) == 0) {
    DAT_0040._0_1_ = (byte)DAT_0040 + 1;
    FUN_c50c(param_1);
    uVar2 = *(undefined *)(DAT_0034 + 1);
    uVar3 = *(undefined *)(DAT_0034 + 2);
  }
  else {
    bVar1 = *(byte *)(_DAT_003e + (ushort)(byte)DAT_0040) & 0x7f;
    if (((6 < bVar1) && (bVar1 < 0x18)) && (DAT_044e != '\x01')) {
      bVar1 = bVar1 + 8;
    }
    DAT_0040._0_1_ = (byte)DAT_0040 + 1;
    FUN_c527(param_1,bVar1);
    uVar2 = DAT_0032;
    uVar3 = DAT_0033;
  }
  FUN_PRG24__8c55(uVar2,uVar3);
  return;
}



void FUN_PRG24__8cdc(byte param_1)

{
  byte bVar1;
  byte bStack0000;
  
  bVar1 = param_1;
  if (param_1 >= 0xb) {
    bVar1 = (param_1 - 0xb) - (param_1 < 0xb);
  }
  bStack0000 = param_1;
  FUN_c524((&DAT_PRG24__8d04)[(byte)(bVar1 << 1)]);
  FUN_PRG24__8c9f();
  FUN_c524((&DAT_PRG24__8d05)[(byte)(bVar1 << 1)]);
  FUN_PRG24__8c9f();
  FUN_PRG24__8c9f(0);
  FUN_PRG24__8d1a(bStack0000);
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG24__8d1a(char param_1)

{
  byte bVar1;
  byte bVar2;
  
  DAT_0047 = param_1;
  FUN_c50c();
  if (*DAT_0034 == '\0') {
    bVar1 = (DAT_0047 + -0xb) * '\x04';
    bVar2 = 0;
    do {
      (&DAT_05ee)[bVar2] = (&DAT_PRG24__8d40)[bVar1];
      bVar1 = bVar1 + 1;
      bVar2 = bVar2 + 1;
    } while (bVar2 != 4);
    FUN_PRG24__8d6c(0);
    return;
  }
  FUN_c53c();
  bVar1 = 0;
  do {
    if (0xdf < *(byte *)(_DAT_0030 + (ushort)bVar1)) break;
    FUN_c524(*(undefined *)(_DAT_0030 + (ushort)bVar1));
    FUN_PRG24__8c9f();
    bVar1 = bVar1 + 1;
  } while (bVar1 != 0);
  if ((char)(bVar1 - 5) < '\0') {
    DAT_0047 = (bVar1 - 5 ^ 0xff) + 1;
    do {
      FUN_PRG24__8c9f(0);
      DAT_0047 = DAT_0047 + -1;
    } while (DAT_0047 != '\0');
  }
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG24__8d6c(void)

{
  byte bVar1;
  
  FUN_c53c();
  bVar1 = 0;
  do {
    if (0xdf < *(byte *)(_DAT_0030 + (ushort)bVar1)) break;
    FUN_c524(*(undefined *)(_DAT_0030 + (ushort)bVar1));
    FUN_PRG24__8c9f();
    bVar1 = bVar1 + 1;
  } while (bVar1 != 0);
  if ((char)(bVar1 - 5) < '\0') {
    DAT_0047 = (bVar1 - 5 ^ 0xff) + 1;
    do {
      FUN_PRG24__8c9f(0);
      DAT_0047 = DAT_0047 + -1;
    } while (DAT_0047 != '\0');
  }
  return;
}



void FUN_PRG26__8132(byte param_1)

{
  byte bVar1;
  char cVar2;
  byte bStack0000;
  
  bVar1 = DAT_043d << 2;
  cVar2 = '\0';
  do {
    if ((byte)(&LAB_PRG26__828c)[bVar1] <= param_1) break;
    cVar2 = cVar2 + '\x01';
    bVar1 = bVar1 + 1;
  } while (bVar1 != 0);
  bStack0000 = param_1;
  FUN_PRG26__8148(cVar2);
  return;
}



void FUN_PRG26__8148(undefined param_1)

{
  SUB_0612 = param_1;
  return;
}



void FUN_PRG26__814c(void)

{
  if ((DAT_0617 & 0x80) != 0x80) {
    FUN_PRG26__8e33();
  }
  FUN_c54e(0);
                    // WARNING: Subroutine does not return
  FUN_c509(SUB_0612);
}



void FUN_PRG26__8170(void)

{
  if ((DAT_0617 & 0x80) == 0x80) {
    return;
  }
  if (DAT_043b != 2) {
    DAT_062d = 0;
    FUN_c54e((&LAB_PRG26__8278)[DAT_043b]);
    DAT_044e = DAT_0444 & 3;
    FUN_c624();
    DAT_0617 = DAT_0617 | 0x80;
  }
  return;
}



void FUN_PRG26__8176(void)

{
  if (DAT_043b != 2) {
    DAT_062d = 0;
    FUN_c54e((&LAB_PRG26__8278)[DAT_043b]);
    DAT_044e = DAT_0444 & 3;
    FUN_c624();
    DAT_0617 = DAT_0617 | 0x80;
  }
  return;
}



void FUN_PRG26__81ed(void)

{
  if (((DAT_043b == '\0') && (DAT_043d == '\0')) && ((DAT_043e & 0x7f) == 1)) {
    FUN_c50c(DAT_0442);
    DAT_043f = 0x50;
    DAT_0440 = 0;
    FUN_PRG26__8ffb();
    SUB_0600 = 0;
    FUN_PRG26__8bdf(0x50);
    return;
  }
  return;
}



void FUN_PRG26__8223(void)

{
  undefined uVar1;
  byte bVar2;
  byte bVar3;
  
  bVar2 = 0;
  while( true ) {
    FUN_c50c((&DAT_0601)[bVar2]);
    if ((*DAT_0034 == '\x14') || (*DAT_0034 == 'I')) break;
    bVar2 = bVar2 + 1;
    if (bVar2 == SUB_0600) {
      return;
    }
  }
  if ((DAT_043b == '\0') && (((&DAT_060b)[bVar2] == '\0' && ((&DAT_0606)[bVar2] == '\x01')))) {
    uVar1 = (&DAT_0601)[bVar2];
    bVar3 = SUB_0600 - 1;
    (&DAT_0601)[bVar2] = (&DAT_0601)[bVar3];
    (&DAT_060b)[bVar2] = (&DAT_060b)[bVar3];
    (&DAT_0606)[bVar2] = (&DAT_0606)[bVar3];
    (&DAT_0606)[bVar3] = 1;
    (&DAT_060b)[bVar3] = 0;
    (&DAT_0601)[bVar3] = uVar1;
  }
  return;
}



void FUN_PRG26__847f(void)

{
  if (DAT_0617 == '\0') {
    return;
  }
  FUN_c551();
  *(undefined *)(DAT_0034 + 10) = 6;
  return;
}



void FUN_PRG26__8485(void)

{
  FUN_c551();
  *(undefined *)(DAT_0034 + 10) = 6;
  return;
}



void FUN_PRG26__848f(void)

{
  char cVar1;
  byte bVar2;
  byte bVar3;
  
  FUN_c551();
  if (*(char *)(DAT_0034 + 10) == '\0') {
    bVar3 = DAT_0635;
    if ((char)DAT_0635 < '\0') {
      bVar3 = (DAT_0635 ^ 0xff) + 1;
    }
    bVar2 = DAT_0637;
    if ((char)DAT_0637 < '\0') {
      bVar2 = (DAT_0637 ^ 0xff) + 1;
    }
    cVar1 = FUN_c539(bVar3,bVar2);
    bVar3 = 8;
    do {
      if (cVar1 == (&UNK_PRG26__84ef)[bVar3]) goto LAB_PRG26__84bd;
      bVar3 = bVar3 - 1;
    } while (-1 < (char)bVar3);
    if (-1 < (char)bVar3) {
LAB_PRG26__84bd:
      bVar2 = 0x33;
      if (5 < bVar3) {
        bVar2 = 0x55;
      }
      if (((DAT_00e2 <= bVar2) && (SUB_0600 < 5)) &&
         ((bVar3 = SUB_0600, DAT_05fb == 0 || (SUB_0600 < 4)))) {
        do {
          (&DAT_0601)[bVar3] = *(undefined *)(bVar3 + 0x600);
          bVar3 = bVar3 - 1;
        } while (-1 < (char)bVar3);
        DAT_0601 = DAT_05fb ^ 0xb;
        SUB_0600 = SUB_0600 + 1;
      }
    }
  }
  return;
}



void FUN_PRG26__84f8(void)

{
  char cVar1;
  byte bVar2;
  char in_V;
  byte bVar3;
  char in_B;
  byte bVar4;
  char in_D;
  byte bVar5;
  char in_I;
  byte bVar6;
  byte in_C;
  byte bStack0000;
  
  SUB_0600 = 1;
  bStack0000 = ((char)DAT_05fb < '\0') << 7 | 0x20U | in_V << 6 | in_B << 4 | in_D << 3 | in_I << 2
               | (DAT_05fb == 0) << 1 | in_C;
  DAT_0442 = DAT_05fb ^ 0xb;
  bVar3 = bStack0000 >> 6 & 1;
  bVar4 = bStack0000 >> 4 & 1;
  bVar5 = bStack0000 >> 3 & 1;
  bVar6 = bStack0000 >> 2 & 1;
  DAT_0601 = DAT_0442;
  if ((bStack0000 >> 1 & 1) == 0) {
    FUN_c515(0x14);
    DAT_0011._0_1_ = 0;
    DAT_0011._1_1_ = 0;
    FUN_c52d();
    FUN_c54e(0x32);
    DAT_0621 = 4;
    FUN_c600();
  }
  else {
    FUN_c54b(2);
  }
  FUN_c54b(8);
  FUN_PRG26__8ff3();
  FUN_c551();
  bVar2 = 0xf3;
  if ((*DAT_0034 == '!') || (*DAT_0034 == '@')) {
    bVar2 = 0xcd;
  }
  cVar1 = '\0';
  if (DAT_00e2 > bVar2) {
    cVar1 = -0x80;
  }
  DAT_003b = 0;
  bStack0000 = (cVar1 < '\0') << 7 | 0x20U | bVar3 << 6 | bVar4 << 4 | bVar5 << 3 | bVar6 << 2 |
               (cVar1 == '\0') << 1 | DAT_00e2 <= bVar2;
  bVar3 = FUN_PRG26__8f1f(3);
  bVar4 = 0;
  do {
    if (((byte)(&DAT_PRG26__86b9)[bVar4] <= bVar3) || (bVar3 == (&DAT_PRG26__86b9)[bVar4])) break;
    bVar4 = bVar4 + 1;
  } while (bVar4 != 0);
  if (((((DAT_05fb == 0) && (DAT_002b == '\x05')) && (DAT_0446 != 0)) &&
      ((DAT_043c != '\0' && ((DAT_043c == '\x03' || (DAT_0446 < 4)))))) &&
     (bVar4 = 2, (DAT_00e2 & 0x80) == 0x80)) {
    bVar4 = 3;
  }
  FUN_PRG26__8148(bVar4);
  DAT_0616 = 0;
  FUN_c54e(9);
                    // WARNING: Subroutine does not return
  FUN_c509(SUB_0612);
}



// WARNING: Control flow encountered bad instruction data

void FUN_PRG26__85ac(void)

{
  FUN_PRG26__8bd4(DAT_0441,0);
  FUN_PRG26__85e3();
  FUN_c54e(0x30);
  FUN_PRG26__987b();
  DAT_05fb = DAT_05fb ^ 0xb;
  FUN_c50c();
  *(undefined *)(DAT_0034 + 5) = 0;
  *(undefined *)(DAT_0034 + 7) = 0;
  *(undefined *)(DAT_0034 + 10) = 0;
  DAT_0629 = 4;
                    // WARNING: Bad instruction - Truncating control flow here
  halt_baddata();
}



void FUN_PRG26__85e3(void)

{
  byte bVar1;
  
  bVar1 = DAT_05fb;
  if (DAT_05fb != 0) {
    FUN_PRG26__904e();
    bVar1 = 1;
  }
  *(char *)(bVar1 + 0x28) = *(char *)(bVar1 + 0x28) + '\x01';
  FUN_c52a(1);
  return;
}



void FUN_PRG26__85f6(void)

{
  if ((DAT_063e & 0x80) == 0x80) {
    FUN_c55d(0x32);
    return;
  }
  FUN_c56f();
  return;
}



void FUN_PRG26__86bd(void)

{
  char cVar1;
  
  FUN_c551();
  cVar1 = '\a';
  if (1 < DAT_0443) {
    cVar1 = '\v';
  }
  *(char *)(DAT_0034 + 5) = cVar1 + *(char *)(DAT_0034 + 5);
  return;
}



void FUN_PRG26__86d3(void)

{
  byte bVar1;
  
  if (DAT_00e2 < 0x40) {
    FUN_c551();
    bVar1 = *(byte *)(DAT_0034 + 7);
    if (0x4f >= bVar1) {
      bVar1 = bVar1 + 0x4f + (0x4f < bVar1);
      if (0x7f < bVar1) {
        bVar1 = 0x7f;
      }
      *(byte *)(DAT_0034 + 7) = bVar1;
      *(undefined *)(DAT_0034 + 6) = 4;
    }
  }
  return;
}



// WARNING: Control flow encountered bad instruction data

void FUN_PRG26__86f6(void)

{
  byte bVar1;
  byte bVar2;
  
  DAT_0621 = 3;
  SUB_0600 = 1;
  DAT_0442 = DAT_05fb ^ 0xb;
  DAT_0601 = DAT_0442;
  FUN_c54b(2);
  FUN_c54e(0x31);
  FUN_c600();
  FUN_PRG26__8f72();
  if (DAT_043b == '\x01') {
    DAT_044e = 0;
    FUN_c54e(0x18);
                    // WARNING: Bad instruction - Truncating control flow here
    halt_baddata();
  }
  FUN_c54b(8);
  FUN_PRG26__8ff3();
  bVar1 = (DAT_043b * '\x02' + DAT_043d + -5) - (DAT_043b >> 7);
  DAT_003b = bVar1 * '\x02';
  DAT_0039._1_1_ = FUN_PRG26__8ee9(4,(&LAB_PRG26__87d7)[bVar1]);
  bVar2 = FUN_PRG26__8f59();
  bVar1 = (bVar2 >> 2) + DAT_0039._1_1_;
  if (CARRY1(bVar2 >> 2,DAT_0039._1_1_) != false) {
    bVar1 = 0xff;
  }
  bVar2 = 0;
  do {
    if (((byte)(&DAT_PRG26__87dd)[bVar2] <= bVar1) || (bVar1 == (&DAT_PRG26__87dd)[bVar2])) break;
    bVar2 = bVar2 + 1;
  } while (bVar2 != 0);
  FUN_PRG26__8148();
  FUN_PRG26__8e33();
  FUN_c54e(10);
                    // WARNING: Subroutine does not return
  FUN_c509(SUB_0612);
}



void FUN_PRG26__87e1(void)

{
  char cVar1;
  bool bVar2;
  
  DAT_0040._1_1_ = (DAT_05fb ^ 0xb) + 1;
  DAT_003b = '\n';
  do {
    FUN_c50c(DAT_0040._1_1_);
    if (*(char *)(DAT_0034 + 10) == '\0') {
      cVar1 = FUN_c539(*(undefined *)(DAT_0034 + 6),*(undefined *)(DAT_0034 + 8));
      if (cVar1 == DAT_05fe) {
        bVar2 = 4 < SUB_0600;
        if ((!bVar2) &&
           (((DAT_05fb == 0 || (bVar2 = 3 < SUB_0600, !bVar2)) &&
            ((byte)((DAT_00e2 - DAT_00e3) - !bVar2) < DAT_061a)))) {
          (&DAT_0601)[SUB_0600] = DAT_0040._1_1_;
          SUB_0600 = SUB_0600 + 1;
        }
      }
    }
    DAT_0040._1_1_ = DAT_0040._1_1_ + '\x01';
    DAT_003b = DAT_003b + -1;
  } while (DAT_003b != '\0');
  return;
}



void FUN_PRG26__8835(void)

{
  undefined uVar1;
  
  if (SUB_0600 == 0) {
    return;
  }
  DAT_0616 = 0;
  do {
    FUN_c515(1);
    uVar1 = DAT_044e;
    DAT_044e = 0;
    DAT_0442 = (&DAT_0601)[DAT_0616];
    DAT_043d = (&LAB_PRG26__888b)[DAT_061b];
    DAT_043e = 0;
    FUN_c54b(7);
    FUN_PRG26__888d();
    DAT_044e = uVar1;
    FUN_PRG26__88a8();
    DAT_0616 = DAT_0616 + 1;
  } while (DAT_0616 != SUB_0600);
  SUB_0600 = 0;
  DAT_05ff = 0;
  return;
}



void FUN_PRG26__888d(void)

{
  byte bVar1;
  
  DAT_0039._1_1_ = 0;
  bVar1 = (DAT_043b * '\x04' + DAT_043d) - ((char)(DAT_043b << 1) >> 7);
  DAT_003b = bVar1 * '\x02';
  FUN_PRG26__8ee9(5,(&DAT_PRG26__88eb)[bVar1]);
  FUN_PRG26__8132();
  return;
}



void FUN_PRG26__88a8(void)

{
  FUN_c54e(0xb);
                    // WARNING: Subroutine does not return
  FUN_c509(SUB_0612);
}



void FUN_PRG26__88f3(void)

{
  byte bVar1;
  
  DAT_043b = 0;
  DAT_0442 = DAT_05fb ^ 0xb;
  bVar1 = 0;
  do {
    if (((byte)(&DAT_PRG26__8928)[bVar1] <= DAT_00e2) || (DAT_00e2 == (&DAT_PRG26__8928)[bVar1]))
    break;
    bVar1 = bVar1 + 1;
  } while (bVar1 != 0);
  FUN_PRG26__8148();
  DAT_0616 = 0;
  FUN_c54e(0xc);
                    // WARNING: Subroutine does not return
  FUN_c509(SUB_0612);
}



void FUN_PRG26__8ab0(void)

{
  byte bVar1;
  byte bVar2;
  
  FUN_PRG26__8b3a(DAT_0441,2);
  bVar1 = DAT_00e2 & 3;
  if (bVar1 == 3) {
    bVar1 = 0;
  }
  DAT_0039._1_1_ = bVar1 + 3;
  DAT_0442 = (DAT_05fb ^ 0xb) + DAT_0039._1_1_;
  DAT_0601 = DAT_0442;
  FUN_PRG26__8b3a(3);
  DAT_043d = 0;
  DAT_043e = 0;
  DAT_044e = 0;
  FUN_PRG26__8f72();
  FUN_c54b(7);
  DAT_003b = 0;
  bVar1 = FUN_PRG26__8ee9(10,0x80);
  bVar2 = 0;
  if (SUB_0612 == '\0') {
    do {
      if ((byte)(&DAT_PRG26__8b46)[bVar2] <= bVar1) break;
      bVar2 = bVar2 + 1;
    } while (bVar2 != 0);
  }
  FUN_PRG26__8148();
  FUN_PRG26__8b3a(DAT_0441,0xfe);
  FUN_PRG26__8b3a(DAT_0442,0xfd);
  FUN_c54e(0x14);
  DAT_061a = 0;
  DAT_05ff = 2;
                    // WARNING: Subroutine does not return
  FUN_c509(SUB_0612);
}



void FUN_PRG26__8b3a(char param_1)

{
  FUN_c50c();
  *(char *)(DAT_0034 + 3) = param_1 + *(char *)(DAT_0034 + 3);
  return;
}



void FUN_PRG26__8b4a(char param_1)

{
  char cVar1;
  byte bVar2;
  undefined uVar3;
  byte bVar4;
  undefined *puVar5;
  undefined in_C;
  
  FUN_PRG26__8b9c();
  if (!(bool)in_C) {
    return;
  }
  FUN_c624();
  SUB_0600 = 0;
  DAT_0621 = '\x02';
  if (param_1 != DAT_05fb) {
    DAT_0621 = '\x01';
  }
  DAT_061a = 0xff;
  FUN_PRG26__87e1();
  puVar5 = (undefined *)CONCAT11((char)((ushort)&stack0x0000 >> 8),0x50);
  *(undefined2 *)(puVar5 + -1) = 0x8b78;
  FUN_c609(10);
  uVar3 = 0x3f;
  if (DAT_0621 != '\x02') {
    *(undefined2 *)(puVar5 + -1) = 0x8b84;
    FUN_PRG26__848f(0x3f);
    uVar3 = 0x2f;
  }
  *(undefined2 *)(puVar5 + -1) = 0x8b89;
  FUN_c54e(uVar3);
  *(undefined2 *)(puVar5 + -1) = 0x8b8c;
  FUN_PRG26__8e86();
  *(undefined2 *)(puVar5 + -1) = 0x8b8f;
  FUN_c600();
  if (DAT_0621 != '\x01') {
    *(undefined2 *)(puVar5 + -1) = 0x897d;
    FUN_c54b(2);
    *(undefined2 *)(puVar5 + -1) = 0x8980;
    FUN_PRG26__8f72();
    *(undefined2 *)(puVar5 + -1) = 0x8985;
    FUN_c54e(0xe);
    if (SUB_0600 == 0) {
      SUB_0612 = SUB_0600;
      *(undefined2 *)(puVar5 + -1) = 0x8990;
      FUN_PRG26__90dd();
    }
    else {
      DAT_0616 = 0;
      do {
        if ((&DAT_060b)[DAT_0616] != 6) {
          DAT_0442 = (&DAT_0601)[DAT_0616];
          DAT_043e = (&DAT_0606)[DAT_0616];
          DAT_043d = (&DAT_060b)[DAT_0616];
          *(undefined2 *)(puVar5 + -1) = 0x89b6;
          FUN_c54e(0xf);
          *(undefined2 *)(puVar5 + -1) = 0x89bb;
          FUN_c515(0x14);
        }
        DAT_0616 = DAT_0616 + 1;
      } while (DAT_0616 != SUB_0600);
      *(undefined2 *)(puVar5 + -1) = 0x89cb;
      FUN_c54e(4);
      DAT_0616 = 0;
      do {
        *(undefined2 *)(puVar5 + -1) = 0x89d5;
        FUN_c515(1);
        SUB_0612 = 0;
        DAT_0442 = (&DAT_0601)[DAT_0616];
        DAT_043e = (&DAT_0606)[DAT_0616];
        DAT_043d = (&DAT_060b)[DAT_0616];
        if ((DAT_043d != 6) && (DAT_043d != 5)) {
          *(undefined2 *)(puVar5 + -1) = 0x8a02;
          FUN_c54b(7);
          *(undefined2 *)(puVar5 + -1) = 0x8a05;
          FUN_PRG26__8ff3();
          bVar4 = ((&LAB_PRG26__8a63)[DAT_043b] * '\x04' + (&LAB_PRG26__8a6a)[DAT_043d]) -
                  ((char)((&LAB_PRG26__8a63)[DAT_043b] << 1) >> 7);
          DAT_003b = bVar4 * '\x02';
          cVar1 = (&LAB_PRG26__83e0_1)[bVar4];
          *(undefined2 *)(puVar5 + -1) = 0x8a1f;
          bVar2 = FUN_PRG26__8ee9(8);
          do {
            if ((byte)(&LAB_PRG26__8aac)[bVar4] <= bVar2) break;
            bVar4 = bVar4 + 1;
            cVar1 = cVar1 + '\x01';
          } while (cVar1 != '\0');
          *(undefined2 *)(puVar5 + -1) = 0x8a2b;
          FUN_PRG26__8148();
          uVar3 = 0x11;
          if (1 < SUB_0612) {
            uVar3 = 0x10;
          }
          *puVar5 = uVar3;
          *(undefined2 *)(puVar5 + -2) = 0x8a3f;
          FUN_PRG26__9095(0);
          *(undefined2 *)(puVar5 + -1) = 0x8a43;
          FUN_c54e(*puVar5);
          *(undefined2 *)(puVar5 + -1) = 0x8a48;
          FUN_c54e(0x12);
          if (1 < SUB_0612) goto LAB_PRG26__8a6f;
        }
        DAT_0616 = DAT_0616 + 1;
      } while (DAT_0616 != SUB_0600);
      *(undefined2 *)(puVar5 + -1) = 0x8a60;
      FUN_PRG26__9085();
    }
LAB_PRG26__8a6f:
    *(undefined2 *)(puVar5 + -1) = 0x8a72;
    FUN_c606();
    bVar4 = SUB_0612;
                    // WARNING: Subroutine does not return
    *(undefined **)(puVar5 + -1) = &UNK_PRG26__8a78;
    FUN_c509(bVar4);
  }
  *(undefined2 *)(puVar5 + -1) = 0x829d;
  FUN_c54b(2);
  *(undefined2 *)(puVar5 + -1) = 0x82a0;
  FUN_PRG26__8f72();
  *(undefined2 *)(puVar5 + -1) = 0x82a5;
  FUN_c54e(1);
  if (SUB_0600 == 0) {
    SUB_0612 = SUB_0600;
    DAT_0617 = SUB_0600;
    *(undefined2 *)(puVar5 + -1) = 0x82b3;
    FUN_PRG26__90dd();
  }
  else {
    DAT_0616 = 0;
    do {
      DAT_0442 = (&DAT_0601)[DAT_0616];
      if (((DAT_0442 == '\0') || (DAT_0442 == '\v')) || ((&DAT_060b)[DAT_0616] != 6)) {
        DAT_043e = (&DAT_0606)[DAT_0616];
        DAT_043d = (&DAT_060b)[DAT_0616];
        *(undefined2 *)(puVar5 + -1) = 0x82df;
        FUN_c54e(2);
        *(undefined2 *)(puVar5 + -1) = 0x82e4;
        FUN_c515(0x14);
      }
      DAT_0616 = DAT_0616 + 1;
    } while (DAT_0616 != SUB_0600);
    *(undefined2 *)(puVar5 + -1) = 0x82f4;
    FUN_c54e(4);
    DAT_0616 = 0;
    DAT_0617 = 0;
    do {
      *(undefined2 *)(puVar5 + -1) = 0x8301;
      FUN_c515(1);
      SUB_0612 = 0;
      DAT_043d = (&DAT_060b)[DAT_0616];
      DAT_043e = (&DAT_0606)[DAT_0616];
      DAT_0442 = (&DAT_0601)[DAT_0616];
      if ((DAT_0442 == '\0') || (DAT_0442 == '\v')) {
        if ((&DAT_060b)[DAT_0616] != '\x04') {
          *(undefined2 *)(puVar5 + -1) = 0x8330;
          FUN_c54b(8);
          goto LAB_PRG26__8349;
        }
      }
      else if (((&DAT_060b)[DAT_0616] != '\x06') && ((&DAT_060b)[DAT_0616] != '\x05')) {
        *(undefined2 *)(puVar5 + -1) = 0x8349;
        FUN_c54b(7);
LAB_PRG26__8349:
        *(undefined2 *)(puVar5 + -1) = 0x834c;
        FUN_PRG26__8ff3();
        cVar1 = '\x02';
        if ((DAT_0442 != '\0') && (DAT_0442 != '\v')) {
          cVar1 = (&LAB_PRG26__83dd)[DAT_043d];
        }
        bVar4 = cVar1 + (&DAT_PRG26__83d7)[DAT_043b] * '\x04';
        DAT_003b = bVar4 * '\x02';
        cVar1 = (&LAB_PRG26__83e0_1)[bVar4];
        *(undefined2 *)(puVar5 + -1) = 0x8376;
        bVar2 = FUN_PRG26__8ee9(1);
        do {
          if ((byte)(&LAB_PRG26__83f1)[bVar4] <= bVar2) break;
          bVar4 = bVar4 + 1;
          cVar1 = cVar1 + '\x01';
        } while (cVar1 != '\0');
        *(undefined2 *)(puVar5 + -1) = 0x8382;
        FUN_PRG26__8148();
        *(undefined2 *)(puVar5 + -1) = 0x8385;
        FUN_PRG26__8e33();
        uVar3 = 6;
        if (1 < SUB_0612) {
          uVar3 = 5;
        }
        *puVar5 = uVar3;
        *(undefined2 *)(puVar5 + -2) = 0x8399;
        FUN_PRG26__9095(0);
        *(undefined2 *)(puVar5 + -1) = 0x839d;
        FUN_c54e(*puVar5);
        *(undefined2 *)(puVar5 + -1) = 0x83a2;
        FUN_c54e(7);
      }
      if ((SUB_0612 < 3) && (((DAT_0442 == '\0' || (DAT_0442 == '\v')) && (DAT_043d == 3)))) {
        DAT_0617 = DAT_0617 + 1;
      }
      if (1 < SUB_0612) goto LAB_PRG26__83f5;
      DAT_0616 = DAT_0616 + 1;
    } while (DAT_0616 != SUB_0600);
    *(undefined2 *)(puVar5 + -1) = 0x83d4;
    FUN_PRG26__9085();
  }
LAB_PRG26__83f5:
  *(undefined2 *)(puVar5 + -1) = 0x83f8;
  FUN_c606();
  bVar4 = SUB_0612;
                    // WARNING: Subroutine does not return
  *(undefined2 *)(puVar5 + -1) = 0x83fe;
  FUN_c509(bVar4);
}



void FUN_PRG26__8b9c(void)

{
  if (((0x5f < DAT_0637) && (DAT_0637 < 0xa0)) && ((DAT_0635 < 0x50 || (0xaf < DAT_0635)))) {
    return;
  }
  return;
}



void FUN_PRG26__8bba(void)

{
  if (SUB_0600 != '\0') {
    FUN_PRG26__8bd4(DAT_0441,1);
    return;
  }
  return;
}



void FUN_PRG26__8bc8(void)

{
  undefined uVar1;
  
  uVar1 = 3;
  if ((DAT_0442 != '\0') && (DAT_0442 != '\v')) {
    uVar1 = 2;
  }
  FUN_c50c(uVar1);
  FUN_c4c8(*DAT_0034);
  return;
}



void FUN_PRG26__8bd4(void)

{
  FUN_c50c();
  FUN_c4c8(*DAT_0034);
  return;
}



// WARNING: Control flow encountered bad instruction data

void FUN_PRG26__8bdf(void)

{
  byte bVar1;
  undefined uVar2;
  undefined uVar3;
  undefined uVar4;
  undefined in_C;
  
  FUN_PRG26__9070();
  FUN_PRG26__8c6d();
  FUN_c606();
  uVar3 = FUN_PRG26__8c42();
  uVar2 = DAT_0039._1_1_;
  if (!(bool)in_C) {
    DAT_0039._1_1_ = FUN_c548(0);
    bVar1 = DAT_0047;
    uVar4 = FUN_c548(0xb);
    uVar3 = DAT_0039._1_1_;
    uVar2 = DAT_0039._1_1_;
    if (((DAT_0047 <= bVar1) && (uVar3 = uVar4, uVar2 = uVar4, bVar1 == DAT_0047)) &&
       (uVar3 = DAT_0039._1_1_, uVar2 = DAT_0039._1_1_, (DAT_00e2 & 0x80) == 0x80)) {
      uVar3 = uVar4;
      uVar2 = uVar4;
    }
  }
  DAT_0039._1_1_ = uVar2;
  FUN_PRG26__8e6e(uVar3);
  FUN_c50c(DAT_0441);
  *(undefined *)(DAT_0034 + 6) = DAT_0635;
  *(undefined *)(DAT_0034 + 8) = DAT_0637;
  DAT_043c = 0;
  FUN_c624();
  FUN_PRG26__8b4a();
  FUN_c54e(0x2c);
  FUN_PRG26__8e86();
                    // WARNING: Bad instruction - Truncating control flow here
  halt_baddata();
}



byte FUN_PRG26__8c42(void)

{
  byte bVar1;
  byte bVar2;
  
  bVar1 = SUB_0600;
  if (SUB_0600 != 0) {
    bVar2 = 0;
    do {
      bVar1 = (&DAT_0601)[bVar2];
      if (((bVar1 != 0) && (bVar1 != 0xb)) && (bVar1 = (&DAT_060b)[bVar2], bVar1 == 5)) {
        if (0x3f < DAT_00e2) {
          return DAT_00e2;
        }
        return (&DAT_0601)[bVar2];
      }
      bVar2 = bVar2 + 1;
    } while (bVar2 != SUB_0600);
  }
  return bVar1;
}



void FUN_PRG26__8c6d(void)

{
  DAT_0637 = FUN_PRG26__8c92(DAT_00e2 & 0x83,DAT_0637);
  DAT_062c = DAT_00e3 & 0x83;
  DAT_0635 = FUN_PRG26__8c92(DAT_0635);
  FUN_PRG26__8ca4(0);
  return;
}



char FUN_PRG26__8c92(char param_1,char param_2)

{
  DAT_0039._1_1_ = param_1 << 3;
  if ((char)-(param_1 >> 7) != '\0') {
    DAT_0039._1_1_ = (DAT_0039._1_1_ ^ 0xff) + -(param_1 >> 7);
  }
  return param_2 + DAT_0039._1_1_;
}



void FUN_PRG26__8ca4(byte param_1)

{
  byte bVar1;
  char in_V;
  char in_B;
  char in_D;
  char in_I;
  byte bStack0000;
  
  bStack0000 = in_V << 6 | 0x20U | in_B << 4 | in_D << 3 | in_I << 2 | (param_1 >> 1 == 0) << 1 |
               param_1 & 1;
  if ((0x2f < DAT_0635) && (DAT_0635 < 0xd0)) {
    if ((0x4f < DAT_0637) && (DAT_0637 < 0xb0)) {
      return;
    }
    FUN_PRG26__8cea();
    FUN_c55a();
    FUN_PRG26__911c(0x50);
    return;
  }
  FUN_PRG26__8cea();
  FUN_c55a();
  bVar1 = DAT_05fb;
  if (DAT_05fb != 0) {
    bVar1 = 0x80;
  }
  if ((char)(bVar1 ^ DAT_0635) < '\0') {
    FUN_PRG26__92ee(0x50);
    return;
  }
  FUN_PRG26__955e(0x50);
  return;
}



void FUN_PRG26__8cea(void)

{
  char in_C;
  
  if (in_C != '\0') {
    DAT_05fb = DAT_05fb ^ 0xb;
  }
  return;
}



void FUN_PRG26__8cf5(char param_1)

{
  char cStack0000;
  
  cStack0000 = param_1;
  FUN_c551();
  cStack0000 = cStack0000 + *(char *)(DAT_0034 + 7);
  if (cStack0000 < '\0') {
    cStack0000 = '\x7f';
  }
  *(char *)(DAT_0034 + 7) = cStack0000;
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG26__8d06(char param_1)

{
  byte bVar1;
  byte bVar2;
  byte bVar3;
  byte bVar4;
  char in_N;
  char in_V;
  char in_B;
  char in_D;
  char in_I;
  char in_Z;
  byte in_C;
  byte bStack0000;
  
  bStack0000 = in_N << 7 | 0x20U | in_V << 6 | in_B << 4 | in_D << 3 | in_I << 2 | in_Z << 1 | in_C;
  _DAT_003c = CONCAT11((&LAB_PRG26__8d93_1)[(byte)(param_1 << 1)],
                       (&LAB_PRG26__8d93)[(byte)(param_1 << 1)]);
  DAT_0067 = (byte)((DAT_00e2 + DAT_00e3) - (param_1 >> 7)) >> 1;
  bVar4 = DAT_0067 | CARRY1(DAT_00e2,DAT_00e3) << 7;
  if ((((char)bStack0000 < '\0') && ((DAT_0039._1_1_ & 0x80) != 0x80)) &&
     (((DAT_0621 == '\x04' && ((DAT_0442 == '\0' || (DAT_0442 == '\v')))) || (0xf7 < DAT_00e3)))) {
    DAT_0068 = 1;
    DAT_043e = DAT_043e | 0x80;
  }
  else {
    while( true ) {
      bVar1 = *(byte *)(_DAT_003c + (ushort)DAT_003b);
      if ((bVar4 < bVar1) || (bVar4 == bVar1)) break;
      bVar4 = (bVar4 - *(char *)(_DAT_003c + (ushort)DAT_003b)) - (bVar4 < bVar1);
    }
    DAT_0068 = 0;
    bVar1 = *(byte *)(_DAT_003c + (ushort)(byte)(DAT_003b + 1));
    DAT_0067 = bVar4 + bVar1;
    if (CARRY1(bVar4,bVar1) != false) {
      DAT_0068 = 1;
    }
  }
  if ((DAT_0039._1_1_ & 0x80) == 0x80) {
    bVar4 = DAT_0033 >> 1;
    bVar3 = DAT_0033 << 7;
    bVar1 = DAT_0033 >> 2;
    bVar2 = DAT_0033 >> 3;
    DAT_0033 = DAT_0033 >> 4;
    DAT_0032 = (byte)((byte)((byte)(DAT_0032 >> 1 | bVar3) >> 1 | bVar4 << 7) >> 1 | bVar1 << 7) >>
               1 | bVar2 << 7;
  }
  switchD_PRG12::8266::caseD_98 = DAT_0032;
  DAT_006a = DAT_0033;
  FUN_c521();
  DAT_0074 = 0;
  DAT_0071._0_1_ = DAT_006c;
  if (DAT_006d != '\0') {
    DAT_0071._0_1_ = 0xff;
  }
  return;
}



void FUN_PRG26__8e33(void)

{
  byte bVar1;
  bool bVar2;
  
  if (SUB_0600 == '\0') {
    return;
  }
  if ((DAT_0442 == '\0') || (DAT_0442 == '\v')) {
    bVar2 = 3 < DAT_043d;
    if (DAT_043d == 4) {
      return;
    }
    if (DAT_043d != 4) goto LAB_PRG26__8e52;
  }
  if (DAT_043d == 5) {
    return;
  }
  bVar2 = 5 < DAT_043d;
  if (DAT_043d == 6) {
    return;
  }
LAB_PRG26__8e52:
  FUN_PRG26__8b9c();
  if (SUB_0612 == '\0') {
    bVar1 = 0xf;
    if (!bVar2) {
      bVar1 = 0x3f;
    }
    if (DAT_00e2 <= bVar1) {
      SUB_0612 = '\x04';
      FUN_c55a();
    }
  }
  return;
}



void FUN_PRG26__8e6e(byte param_1)

{
  char cVar1;
  bool bVar2;
  
  cVar1 = '\0';
  if (10 < param_1) {
    cVar1 = '\v';
  }
  bVar2 = cVar1 != DAT_05fb;
  DAT_0441 = param_1;
  DAT_05fb = cVar1;
  if (bVar2) {
    FUN_c56f();
  }
  return;
}



void FUN_PRG26__8e86(void)

{
  char cVar1;
  undefined2 *puVar2;
  char cStack0000;
  undefined uStack_1;
  
  if (((DAT_0446 != '\x05') && (DAT_0446 == '\x04')) && (DAT_05fb == '\0')) {
    FUN_c50c(DAT_0441);
    if ((*DAT_0034 != '\x01') && (DAT_0034[6] < '\0')) {
      DAT_05fc = DAT_0441;
      cVar1 = '\x01';
      do {
        cStack0000 = cVar1;
        FUN_c50c();
        puVar2 = (undefined2 *)&uStack_1;
        if (*DAT_0034 == '\x01') break;
        cVar1 = cStack0000 + '\x01';
        puVar2 = (undefined2 *)register0x22;
      } while (cVar1 != '\0');
      DAT_0441 = *(undefined *)((short)puVar2 + 1);
      DAT_0446 = DAT_0446 + '\x01';
      DAT_0615 = 0;
      DAT_062d = 0;
      *puVar2 = 0x8ed8;
      FUN_c54e(0x17);
      DAT_043b = 0;
      DAT_043c = 4;
      FUN_PRG26__85ac(0x50);
      return;
    }
  }
  return;
}



char FUN_PRG26__8ee9(void)

{
  char cVar1;
  
  FUN_PRG26__8d06();
  DAT_0619 = (byte)DAT_0071 >> 2;
  DAT_006f = DAT_061c << 6;
  SUB_0070 = (((((DAT_061d << 1 | DAT_061c >> 7) << 1 | (byte)(DAT_061c << 1) >> 7) << 1 |
               (byte)(DAT_061c << 2) >> 7) << 1 | (byte)(DAT_061c << 3) >> 7) << 1 |
             (byte)(DAT_061c << 4) >> 7) << 1 | (byte)(DAT_061c << 5) >> 7;
  FUN_c51e();
  cVar1 = DAT_006f;
  if (SUB_0070 != 0) {
    cVar1 = -1;
  }
  return cVar1;
}



char FUN_PRG26__8f1f(void)

{
  byte bVar1;
  char cVar2;
  
  FUN_PRG26__8d06();
  DAT_0067 = DAT_061c;
  DAT_0068 = DAT_061d;
  switchD_PRG12::8266::caseD_98 = 0xc0;
  DAT_006a = 0;
  FUN_c521();
  DAT_006f = DAT_006b;
  SUB_0070 = DAT_006c;
  FUN_c51e();
  DAT_0039._1_1_ = DAT_006f;
  if (SUB_0070 != '\0') {
    DAT_0039._1_1_ = 0xff;
  }
  bVar1 = FUN_PRG26__8f59();
  cVar2 = bVar1 + DAT_0039._1_1_;
  if (CARRY1(bVar1,DAT_0039._1_1_) != false) {
    cVar2 = -1;
  }
  return cVar2;
}



char FUN_PRG26__8f59(void)

{
  byte bVar1;
  byte bVar2;
  char cVar3;
  
  FUN_c551();
  bVar2 = *(byte *)(DAT_0034 + 5) - DAT_062b;
  bVar1 = ~*(byte *)(DAT_0034 + 5);
  if (((DAT_062b & (bVar1 | bVar2) | bVar2 & bVar1) & 0x80) == 0) {
    bVar2 = 0;
  }
  cVar3 = bVar2 + *(byte *)(DAT_0034 + 7);
  if (CARRY1(bVar2,*(byte *)(DAT_0034 + 7)) != false) {
    cVar3 = -1;
  }
  return cVar3;
}



// WARNING: Removing unreachable block (RAM,0x8fc4)

void FUN_PRG26__8f72(void)

{
  byte bVar1;
  byte bVar2;
  byte bVar3;
  byte bVar4;
  char in_C;
  
  FUN_c54b(6);
  DAT_0039._1_1_ = 0;
  if (DAT_05fb == '\0') {
    in_C = 1 < DAT_043b;
    if ((DAT_043b == 2) && (SUB_0600 == '\0')) {
      DAT_043f = 0;
      DAT_0440 = 0;
    }
    FUN_PRG26__8ffb();
  }
  if (((DAT_0039._1_1_ & 0x80) != 0x80) && (in_C = 7 < DAT_00e2, !(bool)in_C)) {
    DAT_043c = DAT_043c | 0x80;
  }
  bVar3 = DAT_00e2 + DAT_00e3 + in_C;
  bVar2 = bVar3 >> 1;
  DAT_0068 = (DAT_043c & 0x80) == 0x80;
  bVar4 = bVar2 | CARRY1(DAT_00e2,DAT_00e3) << 7 | 0x80;
  if ((bool)DAT_0068) {
    bVar4 = bVar2;
  }
  DAT_0067 = bVar4 + (bVar3 & 1);
  if ((DAT_0039._1_1_ & 0x80) == 0x80) {
    bVar2 = DAT_0033 >> 1;
    bVar1 = DAT_0033 << 7;
    bVar4 = DAT_0033 >> 2;
    bVar3 = DAT_0033 >> 3;
    DAT_0033 = DAT_0033 >> 4;
    DAT_0032 = (byte)((byte)((byte)(DAT_0032 >> 1 | bVar1) >> 1 | bVar2 << 7) >> 1 | bVar4 << 7) >>
               1 | bVar3 << 7;
  }
  switchD_PRG12::8266::caseD_98 = DAT_0032;
  DAT_006a = DAT_0033;
  FUN_c521();
  DAT_061c = DAT_006c;
  DAT_061d = DAT_006d;
  return;
}



void FUN_PRG26__8ff3(void)

{
  byte bVar1;
  char cVar2;
  byte bVar3;
  bool bVar4;
  
  if (DAT_05fb == '\0') {
    DAT_0039._1_1_ = DAT_05fb;
    return;
  }
  DAT_0039._1_1_ = 0;
  if ((*DAT_0034 == ' ') && (((DAT_05fb != '\0' || (DAT_043b != '\0')) || (DAT_043c < 3)))) {
    bVar1 = DAT_043f >> 1 | DAT_0440 << 7;
    bVar4 = CARRY1(bVar1,DAT_043f);
    DAT_043f = bVar1 + DAT_043f;
    DAT_0440 = (DAT_0440 >> 1) + DAT_0440 + bVar4;
  }
  bVar3 = DAT_0034[1] - DAT_043f;
  bVar1 = ~DAT_0034[1];
  cVar2 = (DAT_0034[2] - DAT_0440) - (((DAT_043f & (bVar1 | bVar3) | bVar3 & bVar1) & 0x80) == 0);
  if (cVar2 < '\0') {
    bVar3 = 0;
    cVar2 = '\0';
    DAT_0039._1_1_ = 0x80;
  }
  DAT_0034[2] = cVar2;
  DAT_0034[1] = bVar3;
  return;
}



void FUN_PRG26__8ffb(void)

{
  byte bVar1;
  char cVar2;
  byte bVar3;
  bool bVar4;
  
  DAT_0039._1_1_ = 0;
  if ((*DAT_0034 == ' ') && (((DAT_05fb != '\0' || (DAT_043b != '\0')) || (DAT_043c < 3)))) {
    bVar1 = DAT_043f >> 1 | DAT_0440 << 7;
    bVar4 = CARRY1(bVar1,DAT_043f);
    DAT_043f = bVar1 + DAT_043f;
    DAT_0440 = (DAT_0440 >> 1) + DAT_0440 + bVar4;
  }
  bVar3 = DAT_0034[1] - DAT_043f;
  bVar1 = ~DAT_0034[1];
  cVar2 = (DAT_0034[2] - DAT_0440) - (((DAT_043f & (bVar1 | bVar3) | bVar3 & bVar1) & 0x80) == 0);
  if (cVar2 < '\0') {
    bVar3 = 0;
    cVar2 = '\0';
    DAT_0039._1_1_ = 0x80;
  }
  DAT_0034[2] = cVar2;
  DAT_0034[1] = bVar3;
  return;
}



void FUN_PRG26__904e(void)

{
  char cStack0000;
  
  if ((DAT_044b & 0x80) == 0x80) {
    DAT_044b = 0;
    DAT_002f = 0;
    cStack0000 = '\f';
    do {
      FUN_c50c();
      *(undefined *)(DAT_0034 + 1) = 0;
      cStack0000 = cStack0000 + '\x01';
    } while (cStack0000 != '\x16');
  }
  return;
}



void FUN_PRG26__9070(void)

{
  if (((DAT_044c & 0x80) == 0x80) && (DAT_0441 == '\x14')) {
    DAT_044c = 0;
    DAT_03f1 = 0;
  }
  return;
}



void FUN_PRG26__9085(void)

{
  FUN_c603((&DAT_PRG26__908e)[DAT_043b]);
  return;
}



void FUN_PRG26__9095(void)

{
  byte bVar1;
  undefined uVar2;
  char in_N;
  char in_V;
  char in_B;
  char in_D;
  char in_I;
  char in_Z;
  byte in_C;
  byte bStack0000;
  
  bVar1 = in_N << 7 | 0x20U | in_V << 6 | in_B << 4 | in_D << 3 | in_I << 2 | in_Z << 1 | in_C;
  bStack0000 = DAT_043d * '\x02';
  if ((in_C & 1) != 0) {
    bStack0000 = bStack0000 + 1;
  }
  uVar2 = (&LAB_PRG26__90f4)[bStack0000];
  if ((DAT_0442 != '\0') && (DAT_0442 != '\v')) {
    if ((bStack0000 & 1) == 0) {
      if ((DAT_0441 != '\0') && (DAT_0441 != '\v')) {
        FUN_c50c();
        *(undefined *)(DAT_0034 + 10) = 5;
      }
    }
    else {
      FUN_c50c(DAT_0442);
      *(undefined *)(DAT_0034 + 10) = (&LAB_PRG26__9102)[DAT_043d];
    }
    uVar2 = (&DAT_PRG26__90e6)[bStack0000];
    bVar1 = bStack0000;
  }
  bStack0000 = bVar1;
  FUN_c603(uVar2);
  return;
}



void FUN_PRG26__90dd(void)

{
  FUN_c603((&LAB_PRG26__9109)[DAT_043b]);
  return;
}



void FUN_PRG26__9110(char param_1,undefined param_2)

{
  DAT_05f9 = param_1 + DAT_05f9;
  FUN_c603(param_2);
  return;
}



// WARNING: Control flow encountered bad instruction data

void FUN_PRG26__911c(void)

{
  byte bVar1;
  char cVar2;
  undefined uVar3;
  byte bVar4;
  
  FUN_c54e(0x29);
  FUN_PRG26__987b();
  DAT_0635 = (DAT_0635 & 0xf8) + 4;
  bVar1 = 0x4c;
  if ((DAT_0637 & 0x80) == 0x80) {
    bVar1 = 0xb4;
  }
  bVar4 = (DAT_0635 & 0x80) == 0x80;
  if ((bVar1 & 0x80) == 0x80) {
    bVar4 = bVar4 + 2;
  }
  if (DAT_05fb != '\0') {
    bVar4 = bVar4 ^ 3;
  }
  DAT_0441 = (&LAB_PRG26__92ea)[bVar4] + DAT_05fb;
  DAT_0637 = bVar1;
  FUN_c50c();
  *(byte *)(DAT_0034 + 6) = DAT_0635;
  *(byte *)(DAT_0034 + 8) = DAT_0637;
  cVar2 = '\b';
  if ((DAT_0637 & 0x80) == 0x80) {
    cVar2 = -8;
  }
  cVar2 = cVar2 + DAT_0637;
  DAT_061e = FUN_c539(DAT_0635);
  DAT_0624 = DAT_061e;
  FUN_PRG26__91d2();
  FUN_c54e(0x2a);
  uVar3 = 10;
  FUN_PRG26__9110(2);
  FUN_PRG26__85f6();
  FUN_c50c(DAT_0441);
  DAT_05fe = DAT_061e;
  FUN_c536();
  *(char *)(DAT_0034 + 8) = cVar2;
  DAT_0637 = cVar2;
  *(undefined *)(DAT_0034 + 6) = uVar3;
  DAT_0638 = DAT_0624;
  DAT_043c = 0;
  DAT_061a = 0;
  DAT_061b = 1;
  DAT_0635 = uVar3;
  FUN_c60c();
                    // WARNING: Bad instruction - Truncating control flow here
  halt_baddata();
}



void FUN_PRG26__91d2(undefined param_1)

{
  char cVar1;
  byte bVar2;
  byte bVar3;
  undefined uVar4;
  undefined in_C;
  bool bVar5;
  
  DAT_0011._0_1_ = 0;
  DAT_0011._1_1_ = 0;
  if (DAT_05fb != '\0') {
    DAT_0039._1_1_ = '\f';
    do {
      FUN_c50c(DAT_0039._1_1_);
      uVar4 = 6;
      bVar3 = *(byte *)(DAT_0034 + 6) - DAT_0635;
      bVar2 = ~*(byte *)(DAT_0034 + 6);
      bVar5 = ((DAT_0635 & (bVar2 | bVar3) | bVar3 & bVar2) & 0x80) != 0;
      if (!bVar5) {
        bVar3 = (bVar3 ^ 0xff) + 1 + bVar5;
      }
      if (bVar3 < 0x20) {
        uVar4 = 8;
        bVar3 = *(byte *)(DAT_0034 + 8) - DAT_0637;
        bVar2 = ~*(byte *)(DAT_0034 + 8);
        bVar5 = ((DAT_0637 & (bVar2 | bVar3) | bVar3 & bVar2) & 0x80) != 0;
        if (!bVar5) {
          bVar3 = (bVar3 ^ 0xff) + 1 + bVar5;
        }
        if (bVar3 < 0x20) {
          DAT_05fc = DAT_0039._1_1_;
          return;
        }
      }
      DAT_0039._1_1_ = DAT_0039._1_1_ + '\x01';
      if (DAT_0039._1_1_ == '\x16') {
        DAT_0039._1_1_ = 0x14;
        FUN_c50c();
        FUN_c536(DAT_061e);
        *(undefined *)(DAT_0034 + 8) = uVar4;
        *(undefined *)(DAT_0034 + 6) = param_1;
        DAT_05fc = DAT_0039._1_1_;
        return;
      }
    } while( true );
  }
  FUN_c54e(0x38);
  DAT_062d = 0x81;
  DAT_0494 = 0x1f;
  FUN_c52a(0xf);
  DAT_0626 = 0;
  DAT_0627 = 0;
  do {
    FUN_c515(1);
    bVar2 = DAT_0626;
    if ((DAT_001c & 3) == 0) {
      if ((DAT_001c & 0xc) != 0) {
        bVar3 = 1;
        if (!(bool)((DAT_001c & 0xc) >> 2 & 1)) {
          bVar3 = 0xff;
        }
        if ((DAT_0637 & 0x80) == 0x80) {
          bVar3 = (bVar3 ^ 0xff) + 1;
        }
        DAT_0627 = bVar3 + DAT_0627;
        if ((char)DAT_0627 < '\0') {
          DAT_0627 = 0;
        }
        if (4 < DAT_0627) {
          DAT_0627 = 4;
        }
        goto LAB_PRG26__925f;
      }
    }
    else {
      cVar1 = '\f';
      if (!(bool)(DAT_001c & 1)) {
        cVar1 = -0xc;
      }
      bVar2 = cVar1 + DAT_0626;
      bVar3 = bVar2;
      if ((char)bVar2 < '\0') {
        bVar3 = (bVar2 ^ 0xff) + 1;
      }
      if (0x3b < bVar3) {
        bVar2 = DAT_0626;
      }
      if (0xef < (byte)(bVar2 + DAT_061e)) {
        bVar2 = DAT_0626;
      }
LAB_PRG26__925f:
      DAT_0626 = bVar2;
      bVar2 = DAT_0627;
      if ((DAT_0637 & 0x80) == 0x80) {
        bVar2 = (DAT_0627 ^ 0xff) + 1;
      }
      in_C = CARRY1(bVar2,DAT_061e + DAT_0626);
      DAT_0624 = bVar2 + DAT_061e + DAT_0626;
      FUN_c63f();
    }
    if (((SUB_001e & 0x80) != 0) && (FUN_c642(), (bool)in_C)) {
      DAT_062d = 0;
      return;
    }
  } while( true );
}



void FUN_PRG26__92ee(void)

{
  undefined in_C;
  
  FUN_c54e(0x24);
  DAT_044e = 0;
  FUN_PRG26__987b();
  DAT_061e = 6;
  if ((DAT_0637 & 0x80) == 0x80) {
    DAT_061e = 7;
  }
  if (DAT_05fb == '\0') goto LAB_PRG26__9313;
  FUN_c54b(9);
  while( true ) {
    FUN_PRG26__9e0d(DAT_061e);
    FUN_PRG26__9c0f();
    if (((bool)in_C) || (DAT_05fb != '\0')) break;
LAB_PRG26__9313:
    FUN_PRG26__9e5a(0x2e);
  }
  if (DAT_05fb == '\0') {
    DAT_0621 = 4;
    FUN_c600();
  }
  FUN_PRG26__8f72();
  FUN_PRG26__9110(1,0x12);
  FUN_PRG26__85f6();
                    // WARNING: Subroutine does not return
  FUN_c509(DAT_043b);
}



// WARNING: Control flow encountered bad instruction data

void FUN_PRG26__9366(char param_1)

{
  byte bVar1;
  bool bVar2;
  char in_C;
  
  DAT_044e = 0;
  FUN_PRG26__8b9c();
  if ((in_C != '\0') && (param_1 != DAT_05fb)) {
    FUN_PRG26__94cf();
    return;
  }
  FUN_c54e(0x2b);
  FUN_PRG26__987b();
  bVar1 = DAT_0635;
  if (DAT_05fb != '\0') {
    bVar1 = (DAT_0635 ^ 0xff) + 1;
  }
  if (0x9f < bVar1) {
    FUN_PRG26__93e4();
    return;
  }
  if (DAT_05fb != '\0') {
    bVar1 = DAT_00e2 & 0xf;
    if (9 < bVar1) {
      bVar1 = bVar1 - 10;
    }
    DAT_05fc = bVar1 + 0xc;
    bVar2 = DAT_05fc == DAT_0441;
    if (bVar2) {
      DAT_05fc = bVar1 + 0xd;
      bVar2 = DAT_05fc == 0x16;
      if (0x15 < DAT_05fc) {
        DAT_05fc = 0xc;
        bVar2 = false;
      }
    }
    if (!bVar2) goto LAB_PRG26__93bf;
  }
  FUN_PRG26__93de();
LAB_PRG26__93bf:
  DAT_043b = 1;
  DAT_043c = 0;
  FUN_c54e(0x18);
  FUN_PRG26__9110(4,0x12);
  FUN_PRG26__85f6();
                    // WARNING: Bad instruction - Truncating control flow here
  halt_baddata();
}



// WARNING: Control flow encountered bad instruction data

void FUN_PRG26__9395(void)

{
  byte bVar1;
  bool bVar2;
  
  if (DAT_05fb != '\0') {
    bVar1 = DAT_00e2 & 0xf;
    if (9 < bVar1) {
      bVar1 = bVar1 - 10;
    }
    DAT_05fc = bVar1 + 0xc;
    bVar2 = DAT_05fc == DAT_0441;
    if (bVar2) {
      DAT_05fc = bVar1 + 0xd;
      bVar2 = DAT_05fc == 0x16;
      if (0x15 < DAT_05fc) {
        DAT_05fc = 0xc;
        bVar2 = false;
      }
    }
    if (!bVar2) goto LAB_PRG26__93bf;
  }
  FUN_PRG26__93de();
LAB_PRG26__93bf:
  DAT_043b = 1;
  DAT_043c = 0;
  FUN_c54e(0x18);
  FUN_PRG26__9110(4,0x12);
  FUN_PRG26__85f6();
                    // WARNING: Bad instruction - Truncating control flow here
  halt_baddata();
}



void FUN_PRG26__93de(void)

{
  do {
    FUN_c648();
  } while( true );
}



// WARNING: Control flow encountered bad instruction data
// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG26__93e4(undefined param_1)

{
  byte bVar1;
  byte bVar2;
  undefined uVar3;
  byte bVar4;
  undefined2 *puVar5;
  char cVar6;
  byte bStack0000;
  undefined uStack_1;
  
  bVar2 = DAT_0637;
  if (DAT_05fb != '\0') {
    bVar2 = DAT_0637 ^ 0xff;
  }
  DAT_003b = FUN_c539(param_1,bVar2);
  bVar2 = 0;
  do {
    bStack0000 = bVar2;
    _DAT_003c = CONCAT11((&DAT_PRG26__9fba)[(byte)(bVar2 << 1)],
                         (&DAT_PRG26__9fb9)[(byte)(bVar2 << 1)]);
    bVar4 = 0;
    do {
      bVar1 = *(byte *)(_DAT_003c + (ushort)bVar4);
      if (bVar1 == 0xff) break;
      cVar6 = DAT_003b <= bVar1;
      puVar5 = (undefined2 *)&uStack_1;
      if (bVar1 == DAT_003b) goto LAB_PRG26__9420;
      bVar4 = bVar4 + 1;
    } while (bVar4 != 0);
    bVar2 = bVar2 + 1;
    cVar6 = 4 < bVar2;
    if (bVar2 == 5) {
      FUN_PRG26__9395();
      return;
    }
    puVar5 = (undefined2 *)register0x22;
    if (bVar2 == 5) {
LAB_PRG26__9420:
      SUB_0612 = *(undefined *)((short)puVar5 + 1);
      do {
        *puVar5 = 0x9429;
        FUN_PRG26__9e5a(0x27);
        *puVar5 = 0x942f;
        FUN_PRG26__9e0d(SUB_0612);
        *puVar5 = 0x9432;
        FUN_PRG26__9c0f();
      } while (cVar6 == '\0');
      do {
        if (DAT_05fb == '\0') {
          DAT_0621 = 4;
          *puVar5 = 0x9441;
          FUN_c600();
        }
        *puVar5 = 0x9444;
        FUN_PRG26__9470();
      } while (cVar6 == '\0');
      *puVar5 = 0x944b;
      FUN_c54b(0xe);
      uVar3 = 0x18;
      if (DAT_043b != '\x01') {
        uVar3 = 0x1d;
      }
      *puVar5 = 0x9459;
      FUN_c54e(uVar3);
      *puVar5 = 0x9460;
      FUN_PRG26__9110(4,0x12);
      *puVar5 = 0x9463;
      FUN_PRG26__85f6();
      if (DAT_043b == '\x01') {
                    // WARNING: Bad instruction - Truncating control flow here
        halt_baddata();
      }
      FUN_PRG26__8ab0();
      return;
    }
  } while( true );
}



void FUN_PRG26__9470(void)

{
  byte bVar1;
  
  bVar1 = 3;
  if ((DAT_05fb == '\0') && (bVar1 = 2, DAT_043b != '\0')) {
    return;
  }
  SUB_0612 = bVar1;
  FUN_c52a(bVar1 + 0x28);
  if (DAT_05fb == '\0') {
    FUN_c52a(3);
  }
  FUN_PRG26__9d1b(SUB_0612);
  while( true ) {
    FUN_c515(1);
    if ((SUB_001e & 0xc) != 0) {
      SUB_0612 = SUB_0612 ^ 0x40;
      FUN_PRG26__9d1b();
    }
    if ((SUB_001e & 0x40) != 0) break;
    if ((SUB_001e & 0x80) != 0) {
      SUB_0612 = (SUB_0612 & 0x40) == 0x40;
      return;
    }
  }
  return;
}



void FUN_PRG26__94cf(void)

{
  FUN_c54e(0x1f);
  FUN_PRG26__987b();
  FUN_PRG26__9e5a(0x2f);
  FUN_c54e(0x20);
  FUN_PRG26__9e0d(5);
  FUN_c645();
  FUN_PRG26__9509();
  FUN_c54e(0x21);
  FUN_PRG26__9110(5,0);
  DAT_0616 = 1;
                    // WARNING: Subroutine does not return
  FUN_c509(SUB_0612);
}



void FUN_PRG26__9509(void)

{
  char cVar1;
  byte bStack0000;
  
  DAT_043c = 0;
  DAT_043e = 0;
  DAT_044e = 0;
  DAT_0621 = 5;
  FUN_c600();
  FUN_c54b(0xd);
  FUN_PRG26__8f72();
  FUN_c54b(8);
  DAT_0039._1_1_ = 0;
  DAT_003b = 0;
  bStack0000 = FUN_PRG26__8f1f(9,0x80);
  cVar1 = '\0';
  if ((DAT_043b == DAT_043d) && (bStack0000 < 200)) {
    cVar1 = '\x01';
  }
  if (((cVar1 == '\0') && (DAT_043b != '\b')) && (DAT_00e2 < 0x1f)) {
    cVar1 = '\x02';
  }
  FUN_PRG26__8148(bStack0000,cVar1);
  return;
}



// WARNING: Control flow encountered bad instruction data

void FUN_PRG26__955e(void)

{
  byte bVar1;
  char cVar2;
  undefined uVar3;
  
  FUN_c50c(DAT_05fb);
  uVar3 = 10;
  *(undefined *)(DAT_0034 + 10) = 0;
  DAT_05fe = 5;
  DAT_0441 = DAT_05fb;
  if (DAT_05fb != '\0') {
    DAT_05fe = 0xe9;
  }
  cVar2 = DAT_05fb;
  FUN_c536();
  DAT_0635 = cVar2;
  DAT_0637 = uVar3;
  FUN_c54e(0x27);
  FUN_PRG26__987b();
  FUN_PRG26__9e0d(10);
  bVar1 = DAT_00e2 & 0xf;
  if (bVar1 >= 10) {
    bVar1 = (bVar1 - 10) - (bVar1 < 10);
  }
  DAT_05fc = bVar1 + DAT_05fb + '\x01';
  FUN_c56f();
  FUN_c61e();
  FUN_PRG26__8e6e(DAT_05fb);
  DAT_043b = 1;
  DAT_043c = 0;
  FUN_c54e(0x28);
  FUN_PRG26__9110(2,0xc);
  DAT_061a = 0x1a;
  DAT_061b = 1;
  FUN_c60c();
  DAT_0441 = DAT_05fc;
  FUN_c54e(0x1c);
                    // WARNING: Bad instruction - Truncating control flow here
  halt_baddata();
}



void FUN_PRG26__96a3(byte param_1)

{
  *(char *)(param_1 + 0x28) = (&SUB_0610)[param_1] + *(char *)(param_1 + 0x28);
  return;
}



void FUN_PRG26__96ae(void)

{
                    // WARNING: Subroutine does not return
  FUN_c509(SUB_0612);
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG26__96cc(void)

{
  FUN_c55d(1);
  DAT_0011._0_1_ = 0;
  DAT_0011._1_1_ = 0;
  DAT_0430 = 0;
  DAT_053c = 0;
  DAT_053a = 0x80;
  FUN_c530(0);
  FUN_c533();
                    // WARNING: Treating indirect jump as call
  (*_UNK_fffe)();
  return;
}



// WARNING: Removing unreachable block (RAM,0x982c)

void FUN_PRG26__9828(byte param_1)

{
  byte bVar1;
  undefined uVar2;
  byte bStack0000;
  
  uVar2 = 0xb1;
  bStack0000 = param_1;
  do {
    FUN_c515(1);
  } while (DAT_0515 != '\0');
  DAT_04a5 = 1;
  DAT_04a9 = 0;
  DAT_04a8 = uVar2;
  bVar1 = (byte)(bStack0000 << 7) >> 1 | (bStack0000 >> 1) << 7;
  DAT_04a6 = bVar1 + 2;
  DAT_04a7 = (bStack0000 >> 2) + 0x21 + (0xfd < bVar1);
  DAT_0515 = 0x80;
  return;
}



void FUN_PRG26__982c(byte param_1)

{
  byte bVar1;
  undefined uVar2;
  byte bStack0000;
  
  uVar2 = 0;
  bStack0000 = param_1;
  do {
    FUN_c515(1);
  } while (DAT_0515 != '\0');
  DAT_04a5 = 1;
  DAT_04a9 = 0;
  DAT_04a8 = uVar2;
  bVar1 = (byte)(bStack0000 << 7) >> 1 | (bStack0000 >> 1) << 7;
  DAT_04a6 = bVar1 + 2;
  DAT_04a7 = (bStack0000 >> 2) + 0x21 + (0xfd < bVar1);
  DAT_0515 = 0x80;
  return;
}



void FUN_PRG26__986b(void)

{
  DAT_0441 = 1;
  FUN_c52a(0x3f);
  FUN_c52a(0x40);
  return;
}



void FUN_PRG26__987b(void)

{
  byte bVar1;
  char in_C;
  
  FUN_c54e(0x37);
  DAT_0011._0_1_ = 0;
  DAT_0011._1_1_ = 0;
  FUN_c515(1);
  FUN_c52d();
  DAT_0087 = 0x2e;
  while( true ) {
    DAT_062d = 0;
    FUN_PRG26__990c();
    FUN_c52a(0x33);
    DAT_0624 = 4;
    FUN_PRG26__9d1b();
    do {
      FUN_c515(1);
      if ((SUB_001e & 0xc) != 0) {
        DAT_0624 = DAT_0624 ^ 0x40;
        FUN_PRG26__9d1b();
      }
    } while ((DAT_001c & 0x80) != 0x80);
    FUN_PRG26__990c();
    if ((DAT_0624 & 0x40) != 0x40) break;
    DAT_0624 = 0;
    FUN_c52a(0x34);
    DAT_063d = 3;
    FUN_c566();
    DAT_062d = 0x85;
    DAT_0622 = DAT_0624;
    bVar1 = FUN_c563(4);
    if ((in_C != '\0') && (in_C = 3 < bVar1, bVar1 != 4)) {
      DAT_0624 = bVar1;
                    // WARNING: Subroutine does not return
      thunk_FUN_c509();
    }
  }
  DAT_0087 = 2;
  return;
}



void thunk_FUN_c509(void)

{
                    // WARNING: Subroutine does not return
  FUN_c509();
}



void FUN_PRG26__990c(void)

{
  FUN_c52d();
  FUN_c52a(0);
  FUN_c52a(1);
  return;
}



void thunk_FUN_c509(void)

{
                    // WARNING: Subroutine does not return
  FUN_c509();
}



void FUN_PRG26__9aac(char param_1)

{
  byte bVar1;
  
  FUN_c50c(param_1 + '\x16');
  bVar1 = DAT_0450;
  while( true ) {
    if (bVar1 == 0) {
      return;
    }
    if (*DAT_0034 == (&DAT_0450)[bVar1]) break;
    bVar1 = bVar1 - 1;
  }
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG26__9ac7(byte param_1)

{
  byte bVar1;
  char in_C;
  
  do {
    DAT_062d = 0;
    FUN_c52a(0x39);
    DAT_0625 = 1;
    FUN_PRG26__9f37(0x16);
LAB_PRG26__9adb:
    while( true ) {
      FUN_c515(1);
      FUN_PRG26__9b90(DAT_0625);
      if (in_C != '\0') {
        bVar1 = (&DAT_PRG26__9eb7)[param_1];
        FUN_PRG26__9f3f(DAT_0625,0x16);
        DAT_0625 = bVar1;
        FUN_PRG26__9f37(0x16);
      }
      if ((SUB_001e & 0x80) != 0) break;
      if ((SUB_001e & 0x40) != 0) {
        FUN_PRG26__990c();
        return;
      }
    }
    DAT_0626 = 1;
    in_C = DAT_0625 < 2;
    if (DAT_0625 == 1) {
      DAT_0626 = 2;
    }
    FUN_PRG26__9f37(0x16);
    while( true ) {
      FUN_c515(1);
      FUN_PRG26__9b90(DAT_0626);
      if (in_C != '\0') {
        bVar1 = (&DAT_PRG26__9eb7)[param_1];
        in_C = DAT_0625 <= bVar1;
        if (bVar1 == DAT_0625) {
          param_1 = DAT_0039._1_1_;
          FUN_PRG26__9ba4();
          bVar1 = (&DAT_PRG26__9eb7)[param_1];
        }
        FUN_PRG26__9f3f(DAT_0626,0x16);
        DAT_0626 = bVar1;
        FUN_PRG26__9f37(0x16);
      }
      if ((SUB_001e & 0x80) != 0) break;
      if ((SUB_001e & 0x40) != 0) goto code_r0x9b5d;
    }
    FUN_c50c(DAT_0625);
    RAM0x003a = DAT_0034;
    FUN_c50c(DAT_0626);
    bVar1 = 0;
    do {
      param_1 = *(byte *)(RAM0x003a + (ushort)bVar1);
      *(undefined *)(RAM0x003a + (ushort)bVar1) = *(undefined *)(DAT_0034 + (ushort)bVar1);
      *(byte *)(DAT_0034 + (ushort)bVar1) = param_1;
      bVar1 = bVar1 + 1;
      in_C = 3 < bVar1;
    } while (bVar1 != 4);
  } while( true );
code_r0x9b5d:
  FUN_PRG26__9f3f(DAT_0626,0x16);
  goto LAB_PRG26__9adb;
}



char FUN_PRG26__9b90(char param_1)

{
  byte bVar1;
  bool bVar2;
  
  bVar1 = SUB_001e & 0xf;
  if (bVar1 == 0) {
    return param_1;
  }
  DAT_0039._1_1_ = '\0';
  do {
    bVar2 = (bool)(bVar1 & 1);
    bVar1 = bVar1 >> 1;
    if (bVar2) break;
    DAT_0039._1_1_ = DAT_0039._1_1_ + '\x01';
  } while (DAT_0039._1_1_ != '\0');
  return (param_1 * '\x04' + DAT_0039._1_1_) - ((char)(param_1 << 1) >> 7);
}



char FUN_PRG26__9ba4(char param_1,char param_2)

{
  DAT_0039._1_1_ = param_2;
  return (param_1 * '\x04' + param_2) - ((char)(param_1 << 1) >> 7);
}



void FUN_PRG26__9bee(char param_1,byte param_2,byte param_3)

{
  if (param_1 != -1) {
    FUN_c536();
    if (DAT_05fb != '\0') {
      param_3 = (param_3 ^ 0xff) + 1;
      param_2 = (param_2 ^ 0xff) + 1;
    }
    *(byte *)(DAT_0034 + 8) = param_3;
    *(byte *)(DAT_0034 + 6) = param_2;
  }
  return;
}



void FUN_PRG26__9c0f(void)

{
  DAT_0626 = DAT_05fc;
  FUN_PRG26__9c1f();
  DAT_05fc = DAT_0626;
  return;
}



void FUN_PRG26__9c1f(void)

{
  char cVar1;
  bool bVar2;
  
  FUN_c52a(0x28);
  DAT_0624 = 0;
  FUN_PRG26__9d1b();
  do {
    FUN_c515(1);
    if ((SUB_001e & 0xc) != 0) {
      DAT_0624 = DAT_0624 ^ 0x40;
      FUN_PRG26__9d1b();
    }
    if ((SUB_001e & 0x40) != 0) {
      return;
    }
  } while ((SUB_001e & 0x80) == 0);
  if ((DAT_0624 & 0x40) != 0x40) {
    return;
  }
  FUN_c54e(0x38);
  FUN_c52a(0x29);
  DAT_0625 = 1;
  FUN_PRG26__9d1b();
  DAT_0624 = DAT_05fe;
LAB_PRG26__9c72:
  do {
    do {
      FUN_c515(1);
      DAT_062d = 0x84;
      if ((SUB_001e & 0xc) != 0) {
        DAT_0625 = DAT_0625 ^ 0x40;
        FUN_PRG26__9d1b();
      }
    } while ((SUB_001e & 0x80) == 0);
    if ((DAT_0625 & 0x40) == 0x40) {
      DAT_062d = 0;
      return;
    }
    FUN_PRG26__9d1b(0x81);
    DAT_062d = 0x81;
    FUN_PRG26__9dd4();
    while( true ) {
      FUN_c515(1);
      cVar1 = FUN_PRG26__9d9b();
      bVar2 = cVar1 != DAT_0624;
      DAT_0624 = cVar1;
      if (bVar2) {
        FUN_PRG26__9dd4();
      }
      if ((SUB_001e & 0x40) != 0) break;
      if (((SUB_001e & 0x80) != 0) && (DAT_05fc != -1)) {
        DAT_0616 = DAT_0624;
        while( true ) {
          FUN_c515(1);
          cVar1 = FUN_PRG26__9d9b();
          bVar2 = cVar1 != DAT_0624;
          DAT_0624 = cVar1;
          if (bVar2) {
            FUN_PRG26__9dbd();
          }
          if ((SUB_001e & 0x40) != 0) break;
          if ((SUB_001e & 0x80) != 0) {
            FUN_PRG26__9d1b(DAT_0625);
            goto LAB_PRG26__9c72;
          }
        }
        DAT_0624 = DAT_0616;
        FUN_PRG26__9dbd();
      }
    }
    FUN_PRG26__9d1b(DAT_0625);
  } while( true );
}



void FUN_PRG26__9d1b(byte param_1)

{
  byte bVar1;
  byte bStack0000;
  
  bStack0000 = param_1;
  do {
    FUN_c515(1);
  } while (DAT_0515 != '\0');
  bVar1 = (bStack0000 & 0xf) << 2;
  DAT_04a6 = (&LAB_PRG26__9d82)[bVar1];
  DAT_04a7 = (&LAB_PRG26__9d82_1)[bVar1];
  DAT_04aa = (&LAB_PRG26__9d82_2)[bVar1];
  DAT_04ab = (&DAT_PRG26__9d85)[bVar1];
  DAT_04a8 = 0;
  if (((bStack0000 & 0x80) != 0x80) && ((bStack0000 & 0x40) != 0x40)) {
    DAT_04a8 = (&LAB_PRG26__9d96)[bStack0000 & 0xf];
  }
  DAT_04ac = 0;
  if (((bStack0000 & 0x80) != 0x80) && ((bStack0000 & 0x40) == 0x40)) {
    DAT_04ac = (&LAB_PRG26__9d96)[bStack0000 & 0xf];
  }
  DAT_04a5 = 1;
  DAT_04a9 = 1;
  DAT_04ad = 0;
  DAT_0515 = 0x80;
  return;
}



byte FUN_PRG26__9d9b(void)

{
  byte bVar1;
  byte bVar2;
  bool bVar3;
  
  bVar1 = SUB_001e & 0xf;
  if (bVar1 != 0) {
    bVar2 = 0;
    do {
      bVar3 = (bool)(bVar1 & 1);
      bVar1 = bVar1 >> 1;
      if (bVar3) break;
      bVar2 = bVar2 + 1;
    } while (bVar2 != 0);
    if ((byte)((&DAT_PRG26__9db9)[bVar2] + DAT_0624) < 0xf0) {
      return (&DAT_PRG26__9db9)[bVar2] + DAT_0624;
    }
  }
  return DAT_0624;
}



void FUN_PRG26__9dbd(undefined param_1,undefined param_2)

{
  FUN_c50c(DAT_05fc);
  FUN_c536(DAT_0624);
  *(undefined *)(DAT_0034 + 8) = param_2;
  *(undefined *)(DAT_0034 + 6) = param_1;
  return;
}



void FUN_PRG26__9dd4(void)

{
  char cVar1;
  undefined uVar2;
  
  DAT_0039._1_1_ = '\x01';
  do {
    if (DAT_0039._1_1_ != DAT_0441) {
      FUN_c50c();
      cVar1 = FUN_c539(*(undefined *)(DAT_0034 + 6),*(undefined *)(DAT_0034 + 8));
      if (cVar1 == DAT_0624) {
        uVar2 = 0x1d;
        DAT_05fc = DAT_0039._1_1_;
        goto LAB_PRG26__9e06;
      }
    }
    DAT_0039._1_1_ = DAT_0039._1_1_ + '\x01';
  } while (DAT_0039._1_1_ != '\v');
  uVar2 = 0x1c;
  DAT_05fc = -1;
LAB_PRG26__9e06:
  FUN_c52a(uVar2);
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG26__9e0d(byte param_1)

{
  byte bVar1;
  undefined uVar2;
  
  _DAT_003c = CONCAT11((&LAB_PRG26__9ff0_1)[(byte)(param_1 << 1)],
                       (&LAB_PRG26__9ff0)[(byte)(param_1 << 1)]);
  DAT_003b = 0;
  DAT_0039._1_1_ = param_1;
  do {
    FUN_c50c(DAT_003b);
    if (DAT_003b == DAT_0441) {
      uVar2 = (&DAT_a0f8)[DAT_0039._1_1_];
    }
    else {
      DAT_003e = DAT_003b;
      bVar1 = DAT_05fb;
      if (DAT_003b >= 0xb) {
        DAT_003e = (DAT_003b - 0xb) - (DAT_003b < 0xb);
        bVar1 = DAT_05fb ^ 0xb;
      }
      uVar2 = *(undefined *)(_DAT_003c + (ushort)(byte)(bVar1 + DAT_003e));
    }
    FUN_PRG26__9bee(uVar2);
    DAT_003b = DAT_003b + 1;
  } while (DAT_003b != 0x16);
  FUN_c645();
  return;
}



void FUN_PRG26__9e5a(char param_1)

{
  byte bVar1;
  bool bVar2;
  char cStack0000;
  
  cStack0000 = param_1;
  FUN_c515(1);
  FUN_c52d();
  if (DAT_05fb != '\0') {
    DAT_0441 = 0x14;
    return;
  }
  FUN_c52a(cStack0000);
  DAT_0441 = '\x01';
  FUN_PRG26__9f3b(0);
  do {
    FUN_c515(1);
    bVar1 = SUB_001e & 0xf;
    if (bVar1 != 0) {
      DAT_0039._1_1_ = '\0';
      do {
        bVar2 = (bool)(bVar1 & 1);
        bVar1 = bVar1 >> 1;
        if (bVar2) break;
        DAT_0039._1_1_ = DAT_0039._1_1_ + '\x01';
      } while (DAT_0039._1_1_ != '\0');
      cStack0000 = (&DAT_PRG26__9eb7)
                   [(byte)((DAT_0441 * '\x04' + DAT_0039._1_1_) - ((char)(DAT_0441 << 1) >> 7))];
      FUN_PRG26__9f3f(DAT_0441,0);
      DAT_0441 = cStack0000;
      FUN_PRG26__9f3b(0);
    }
    if ((SUB_001e & 0x80) != 0) {
      return;
    }
  } while( true );
}



// WARNING: Removing unreachable block (RAM,0x9f3b)
// WARNING: Removing unreachable block (RAM,0x9f3f)

void FUN_PRG26__9f37(char param_1,char param_2)

{
  byte bVar1;
  undefined uVar2;
  char cStack0000;
  
  uVar2 = 0xb1;
  cStack0000 = param_1;
  do {
    FUN_c515(1);
  } while (DAT_0515 != '\0');
  DAT_04a8 = uVar2;
  bVar1 = (cStack0000 * '\x02' + param_2) - (cStack0000 >> 7);
  DAT_04a5 = 1;
  DAT_04a6 = (&LAB_PRG26__9f79)[bVar1];
  DAT_04a7 = (&DAT_PRG26__9f7a)[bVar1];
  DAT_04a9 = 0;
  DAT_0515 = 0x80;
  return;
}



// WARNING: Removing unreachable block (RAM,0x9f3f)

void FUN_PRG26__9f3b(char param_1,char param_2)

{
  byte bVar1;
  undefined uVar2;
  char cStack0000;
  
  uVar2 = 0xf6;
  cStack0000 = param_1;
  do {
    FUN_c515(1);
  } while (DAT_0515 != '\0');
  DAT_04a8 = uVar2;
  bVar1 = (cStack0000 * '\x02' + param_2) - (cStack0000 >> 7);
  DAT_04a5 = 1;
  DAT_04a6 = (&LAB_PRG26__9f79)[bVar1];
  DAT_04a7 = (&DAT_PRG26__9f7a)[bVar1];
  DAT_04a9 = 0;
  DAT_0515 = 0x80;
  return;
}



void FUN_PRG26__9f3f(char param_1,char param_2)

{
  byte bVar1;
  undefined uVar2;
  char cStack0000;
  
  uVar2 = 0;
  cStack0000 = param_1;
  do {
    FUN_c515(1);
  } while (DAT_0515 != '\0');
  DAT_04a8 = uVar2;
  bVar1 = (cStack0000 * '\x02' + param_2) - (cStack0000 >> 7);
  DAT_04a5 = 1;
  DAT_04a6 = (&LAB_PRG26__9f79)[bVar1];
  DAT_04a7 = (&DAT_PRG26__9f7a)[bVar1];
  DAT_04a9 = 0;
  DAT_0515 = 0x80;
  return;
}



void FUN_PRG26__9f41(char param_1,undefined param_2,char param_3)

{
  byte bVar1;
  char cStack0000;
  
  cStack0000 = param_1;
  do {
    FUN_c515(1);
  } while (DAT_0515 != '\0');
  DAT_04a8 = param_2;
  bVar1 = (cStack0000 * '\x02' + param_3) - (cStack0000 >> 7);
  DAT_04a5 = 1;
  DAT_04a6 = (&LAB_PRG26__9f79)[bVar1];
  DAT_04a7 = (&DAT_PRG26__9f7a)[bVar1];
  DAT_04a9 = 0;
  DAT_0515 = 0x80;
  return;
}



void FUN_PRG27__884d(void)

{
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

byte FUN_PRG28__803a(char param_1,byte param_2)

{
  byte bVar1;
  byte bVar2;
  byte bVar3;
  undefined uVar4;
  bool bVar5;
  char cStack0000;
  byte unaff_retaddr;
  
  cStack0000 = param_1;
  FUN_c50c();
  bVar3 = *DAT_0034;
  if (bVar3 == 0) {
    bVar3 = *(byte *)(_DAT_0038 + (ushort)(byte)(&DAT_PRG28__818e)[(byte)(cStack0000 - 0xb)]);
  }
  bVar5 = 0x22 < bVar3;
  if (bVar5) {
    if ((char)DAT_0034[1] < '\0') {
      bVar3 = DAT_0034[2];
    }
    bVar3 = (bVar3 - 0x23) - !bVar5;
  }
  bVar2 = 0;
  DAT_0032 = bVar3 * '\x04';
  DAT_0033 = (bVar3 >> 7) << 1 | (byte)(bVar3 << 1) >> 7;
  if (bVar5) {
    bVar2 = DAT_0032 >> 7;
    bVar5 = CARRY1(bVar3 * '\b',DAT_0032);
    DAT_0032 = bVar3 * '\f';
    DAT_0033 = DAT_0033 + (DAT_0033 << 1 | bVar2) + bVar5;
    bVar2 = 2;
  }
  _DAT_0032 = (byte *)CONCAT11(DAT_0033 + (&DAT_PRG28__819a)[bVar2] +
                               CARRY1(DAT_0032,(&DAT_PRG28__8199)[bVar2]),
                               DAT_0032 + (&DAT_PRG28__8199)[bVar2]);
  if (param_2 < 0x1f) {
    bVar5 = cStack0000 == '\0';
    if (((!bVar5) && (bVar5 = cStack0000 == '\v', !bVar5)) && (bVar5 = cStack0000 == '\x1e', !bVar5)
       ) {
      bVar5 = cStack0000 == '\x1f';
    }
    bVar3 = *_DAT_0032;
    bVar2 = param_2;
    if (bVar5) {
      bVar1 = ((bVar3 >> 7) << 1 | (byte)(bVar3 << 1) >> 7) << 1 | (byte)(bVar3 << 2) >> 7;
      bVar5 = 0x51 < bVar1;
      _DAT_0032 = (byte *)CONCAT11(bVar1 + 0xae + (0x79 < (byte)(bVar3 * '\b')),bVar3 * '\b' + 0x86)
      ;
      if (param_2 != 0) {
        bVar2 = param_2 - 0x17;
        bVar5 = (bVar2 & ~param_2 & 0x80) != 0;
      }
    }
    else {
      bVar1 = ((bVar3 >> 7) << 1 | (byte)(bVar3 << 1) >> 7) << 1 | (byte)(bVar3 << 2) >> 7;
      bVar1 = bVar1 + (bVar1 << 1 | (byte)(bVar3 * '\b') >> 7) + CARRY1(bVar3 * '\x10',bVar3 * '\b')
      ;
      bVar5 = 0x60 < bVar1;
      _DAT_0032 = (byte *)CONCAT11(bVar1 + 0x9f + (0x31 < (byte)(bVar3 * '\x18')),
                                   bVar3 * '\x18' - 0x32);
    }
    if (param_2 != 0) {
      bVar2 = (*(char *)((short)_DAT_0032 + (ushort)bVar2) + DAT_0034[3] * '\x02') -
              ((char)DAT_0034[3] >> 7);
      bVar3 = bVar2;
      if (0xbf < bVar2) {
        bVar3 = 0xbf;
      }
      _DAT_0032 = (byte *)CONCAT11(DAT_0033,bVar3);
      return bVar2;
    }
    bVar3 = *(char *)((short)_DAT_0032 + (ushort)bVar2) + DAT_0034[3] + bVar5;
    if (0x5e < bVar3) {
      bVar3 = 0x5f;
    }
    uVar4 = 0x9f;
    if ((char)bVar3 < '\0') {
      uVar4 = 0xa0;
    }
    _DAT_0032 = (byte *)CONCAT11(uVar4,0xe);
    _DAT_0032 = (byte *)CONCAT11(*(undefined *)
                                  ((short)_DAT_0032 + (ushort)(byte)(bVar3 * '\x02' + 1)),
                                 *(undefined *)((short)_DAT_0032 + (ushort)(byte)(bVar3 * '\x02')));
  }
  else if (param_2 < 0x25) {
    bVar3 = _DAT_0032[1];
    bVar2 = (bVar3 >> 7) << 1 | (byte)(bVar3 << 1) >> 7;
    _DAT_0032 = (byte *)CONCAT11(bVar2 + (bVar2 << 1 | (byte)(bVar3 * '\x04') >> 7) +
                                 CARRY1(bVar3 * '\b',bVar3 * '\x04') + -0x51 +
                                 (0x51 < (byte)(bVar3 * '\f')),bVar3 * '\f' + 0xae);
    bVar3 = (param_2 - 0x1f) * '\x02';
    _DAT_0032 = (byte *)CONCAT11(*(undefined *)((short)_DAT_0032 + (ushort)(byte)(bVar3 + 1)),
                                 *(undefined *)((short)_DAT_0032 + (ushort)bVar3));
  }
  else {
    _DAT_0032 = (byte *)(ushort)_DAT_0032[(byte)(param_2 - 0x23)];
  }
  return unaff_retaddr;
}



void FUN_PRG28__830a(char param_1,byte param_2)

{
  byte bVar1;
  
  (&DAT_04a5)[param_2] = 0x18;
  (&DAT_04a6)[param_2] = 0x40;
  bVar1 = param_1 + 0x11;
  (&DAT_04a6)[param_2] = (byte)(&DAT_04a6)[param_2] >> 1 | bVar1 * -0x80;
  (&DAT_04a6)[param_2] = (byte)(&DAT_04a6)[param_2] >> 1 | (bVar1 >> 1) << 7;
  (&DAT_04a6)[param_2] = (byte)(&DAT_04a6)[param_2] >> 1 | (bVar1 >> 2) << 7;
  (&DAT_04a7)[param_2] = bVar1 >> 3 | 0x20;
  param_2 = param_2 + 3;
  bVar1 = 0;
  do {
    (&DAT_04a5)[param_2] = *(undefined *)(DAT_0061 + (ushort)bVar1);
    param_2 = param_2 + 1;
    bVar1 = bVar1 + 1;
  } while (bVar1 != 0x18);
  (&DAT_04a5)[param_2] = 0;
  if (0xe7 < (byte)DAT_0061) {
    DAT_0061._1_1_ = DAT_0061._1_1_ + '\x01';
  }
  DAT_0061 = CONCAT11(DAT_0061._1_1_,(byte)DAT_0061 + 0x18);
  return;
}



undefined FUN_PRG28__8499(byte param_1,byte param_2)

{
  char cVar1;
  byte bVar2;
  undefined unaff_retaddr;
  
  if (DAT_05fb == '\0') {
    param_1 = param_1 ^ 0xff;
  }
  if (0x5f < param_1) {
    return unaff_retaddr;
  }
  if ((char)param_2 < '\0') {
    param_2 = param_2 ^ 0xff;
  }
  cVar1 = FUN_c539(param_2);
  bVar2 = 0;
  do {
    if (cVar1 == (&DAT_PRG28__8bbe)[bVar2]) break;
    bVar2 = bVar2 + 2;
  } while (bVar2 != 0);
  return (&DAT_PRG28__8bbf)[bVar2];
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG28__85b5(void)

{
  byte bVar1;
  byte bVar2;
  
  DAT_003e = (&LAB_PRG28__8604)[DAT_0621] << 2;
  bVar1 = *(byte *)(RAM0x003a + (ushort)(byte)((&LAB_PRG28__8604)[DAT_0621] + 4));
  bVar2 = (bVar1 >> 7) << 1 | (byte)(bVar1 << 1) >> 7;
  DAT_003c = bVar1 * '\f' + 0x2e;
  DAT_003d = bVar2 + (bVar2 << 1 | (byte)(bVar1 * '\x04') >> 7) +
             CARRY1(bVar1 * '\b',bVar1 * '\x04') + -0x46 + (0xd1 < (byte)(bVar1 * '\f'));
  DAT_043d = FUN_PRG28__8b0b();
  FUN_PRG28__8da6(DAT_0442,DAT_043d);
  DAT_043e = DAT_0430;
  if (DAT_0430 != '\0') {
    DAT_043e = DAT_0431;
  }
  return;
}



void FUN_PRG28__863f(char param_1,byte param_2)

{
  undefined uVar1;
  byte bVar2;
  char cVar3;
  bool bVar4;
  
  DAT_0442 = param_1;
  FUN_PRG28__8a62();
  DAT_003c = 0;
  if (DAT_0442 == '\v') {
    FUN_PRG28__85b5();
    return;
  }
  DAT_003c = (&LAB_PRG28__86b5)[DAT_0621];
  if (DAT_003c == 0) {
    param_2 = DAT_0635 ^ 0xff;
    uVar1 = 0x14;
    if ((param_2 < 0xa0) && (uVar1 = 0x10, param_2 < 0x60)) {
      bVar2 = DAT_0637;
      if ((char)DAT_0637 < '\0') {
        bVar2 = DAT_0637 ^ 0xff;
      }
      cVar3 = FUN_c539(bVar2);
      param_2 = 0;
      do {
        if (cVar3 == (&DAT_PRG28__8bbe)[param_2]) break;
        param_2 = param_2 + 2;
      } while (param_2 != 0);
      uVar1 = (&DAT_PRG28__8bbf)[param_2];
    }
  }
  else {
    uVar1 = FUN_PRG28__8ab3();
  }
  FUN_PRG28__8ade(uVar1,7);
  bVar4 = 0x51 < DAT_003c;
  DAT_003c = DAT_003c + 0xae;
  DAT_003d = param_2 + 0xb8 + bVar4;
  DAT_043d = FUN_PRG28__8b0b();
  DAT_043e = 0;
                    // WARNING: Subroutine does not return
  FUN_c509(DAT_003f);
}



void FUN_PRG28__875d(byte param_1)

{
  byte bVar1;
  char cVar2;
  byte bVar3;
  bool bVar4;
  
  FUN_PRG28__8a62(DAT_0441);
  DAT_003c = (&LAB_PRG28__87c1_2)[DAT_0621];
  if (DAT_003c == 0) {
    bVar1 = 0x14;
    param_1 = DAT_0635;
    if ((DAT_0635 < 0xa0) && (bVar1 = 0x10, DAT_0635 < 0x60)) {
      bVar3 = DAT_0637;
      if ((char)DAT_0637 < '\0') {
        bVar1 = DAT_0637 ^ 0xff;
        bVar3 = bVar1;
      }
      cVar2 = FUN_c539(bVar1,bVar3);
      param_1 = 0;
      do {
        if (cVar2 == (&DAT_PRG28__8bbe)[param_1]) break;
        param_1 = param_1 + 2;
      } while (param_1 != 0);
      bVar1 = (&DAT_PRG28__8bbf)[param_1];
    }
  }
  else {
    bVar1 = FUN_PRG28__8ab3();
  }
  FUN_PRG28__8ade(bVar1,4);
  bVar4 = 0xd1 < DAT_003c;
  DAT_003c = DAT_003c + 0x2e;
  DAT_003d = param_1 + 0xb1 + bVar4;
  DAT_043b = FUN_PRG28__8b0b();
  DAT_043c = 0;
                    // WARNING: Subroutine does not return
  FUN_c509(DAT_003f);
}



void FUN_PRG28__8927(void)

{
  DAT_043b = 0;
  DAT_043c = DAT_044e;
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

undefined FUN_PRG28__895e(byte param_1)

{
  _DAT_003c = CONCAT11((((param_1 >> 7) << 1 | (byte)(param_1 << 1) >> 7) << 1 |
                       (byte)(param_1 << 2) >> 7) + 0xb7 + (0xd1 < (byte)(param_1 * '\b')),
                       param_1 * '\b' + 0x2e);
  return *(undefined *)(_DAT_003c + (ushort)(DAT_00e2 & 7));
}



byte FUN_PRG28__89b3(void)

{
  byte bVar1;
  byte unaff_retaddr;
  
  FUN_c50c(DAT_003c);
  bVar1 = DAT_0635 - *(byte *)(DAT_0034 + 6);
  if ((((*(byte *)(DAT_0034 + 6) & (~DAT_0635 | bVar1) | bVar1 & ~DAT_0635) & 0x80) == 0) &&
     (0x5f < DAT_0635)) {
    return DAT_0635;
  }
  FUN_PRG28__8a09(DAT_003c);
  DAT_043b = 1;
  FUN_PRG28__8a3f();
  return unaff_retaddr;
}



undefined FUN_PRG28__89da(void)

{
  undefined unaff_retaddr;
  
  DAT_003e = '\f';
  do {
    if (DAT_003e != DAT_0441) {
      FUN_c50c();
      if (*(byte *)(DAT_0034 + 6) < 0x60) {
        FUN_PRG28__8a09(DAT_003e);
        DAT_043b = 1;
        FUN_PRG28__8a3f();
        return unaff_retaddr;
      }
    }
    DAT_003e = DAT_003e + '\x01';
  } while (DAT_003e != '\x16');
  return 0x16;
}



void FUN_PRG28__8a09(undefined param_1)

{
  DAT_05fc = param_1;
  FUN_c50c();
  DAT_0638 = FUN_c539(*(undefined *)(DAT_0034 + 6),*(undefined *)(DAT_0034 + 8));
  return;
}



byte FUN_PRG28__8a20(void)

{
  byte bVar1;
  byte bVar2;
  char in_C;
  
  bVar1 = DAT_00e2 + DAT_00e3 + in_C & 0xf;
  if (bVar1 >= 10) {
    bVar1 = (bVar1 - 10) - (bVar1 < 10);
  }
  bVar2 = bVar1 + 0xc;
  if ((bVar2 == DAT_0441) && (bVar2 = bVar1 + 0xd + (DAT_0441 <= bVar2), 0x15 < bVar2)) {
    bVar2 = 0xc;
  }
  return bVar2;
}



void FUN_PRG28__8a3f(void)

{
  FUN_PRG28__8c06(DAT_0441,DAT_043b);
  DAT_043c = DAT_0430;
  if (DAT_0430 != '\0') {
    DAT_043c = DAT_0431;
  }
  if ((DAT_043c == '\0') && (DAT_043b == '\0')) {
    DAT_043c = DAT_044e;
  }
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

byte FUN_PRG28__8a62(byte param_1)

{
  byte bVar1;
  byte bVar2;
  char cVar3;
  byte bStack0000;
  
  bStack0000 = param_1;
  FUN_c50c();
  cVar3 = *DAT_0034;
  if (cVar3 == '\0') {
    cVar3 = *(char *)(_DAT_0038 + (ushort)*(byte *)(bStack0000 + 0x8a9d));
  }
  if (DAT_0034[1] < '\0') {
    cVar3 = DAT_0034[2];
  }
  bVar2 = cVar3 - 0x23;
  bVar1 = (bVar2 >> 7) << 1 | (byte)(bVar2 * '\x02') >> 7;
  DAT_0039._1_1_ = bVar2 * '\f' + 0x62;
  DAT_003b = bVar1 + (bVar1 << 1 | (byte)(bVar2 * '\x04') >> 7) +
             CARRY1(bVar2 * '\b',bVar2 * '\x04') + -0x6a + (0x9d < (byte)(bVar2 * '\f'));
  return bStack0000;
}



char FUN_PRG28__8ab3(void)

{
  byte bVar1;
  byte bVar2;
  char cVar3;
  
  bVar1 = DAT_0635;
  if ((char)DAT_0635 < '\0') {
    bVar1 = DAT_0635 ^ 0xff;
  }
  bVar2 = DAT_0637;
  if ((char)DAT_0637 < '\0') {
    bVar2 = DAT_0637 ^ 0xff;
  }
  cVar3 = FUN_c539(bVar1,bVar2);
  bVar1 = 0;
  do {
    if (cVar3 == (&DAT_PRG28__8b9e)[bVar1]) break;
    bVar1 = bVar1 + 2;
  } while (bVar1 != 0);
  cVar3 = (&DAT_PRG28__8b9f)[bVar1];
  if (DAT_003c != '\x01') {
    cVar3 = cVar3 + '\f';
  }
  return cVar3;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

char FUN_PRG28__8ade(undefined param_1,char param_2)

{
  byte bVar1;
  byte bVar2;
  
  DAT_003e = param_1;
  DAT_003f = DAT_003c;
  bVar1 = *(byte *)(RAM0x003a + (ushort)(byte)(param_2 + DAT_003c));
  bVar2 = (((bVar1 >> 7) << 1 | (byte)(bVar1 << 1) >> 7) << 1 | (byte)(bVar1 << 2) >> 7) << 1 |
          (byte)(bVar1 << 3) >> 7;
  DAT_003d = bVar2 << 1 | (byte)(bVar1 * '\x10') >> 7;
  DAT_003c = bVar1 * '0';
  return bVar2 + DAT_003d + CARRY1(bVar1 * ' ',bVar1 * '\x10');
}



char FUN_PRG28__8aeb(byte param_1)

{
  byte bVar1;
  
  bVar1 = (((param_1 >> 7) << 1 | (byte)(param_1 << 1) >> 7) << 1 | (byte)(param_1 << 2) >> 7) << 1
          | (byte)(param_1 << 3) >> 7;
  DAT_003d = bVar1 << 1 | (byte)(param_1 * '\x10') >> 7;
  DAT_003c = param_1 * '0';
  return bVar1 + DAT_003d + CARRY1(param_1 * ' ',param_1 * '\x10');
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

byte FUN_PRG28__8b0b(void)

{
  byte bVar1;
  
  bVar1 = *(byte *)(_DAT_003c + (ushort)(byte)(((DAT_00e2 & 7) >> 1) + DAT_003e));
  if (!(bool)(DAT_00e2 & 1)) {
    bVar1 = bVar1 >> 4;
  }
  return bVar1 & 0xf;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG28__8c06(byte param_1)

{
  char cVar1;
  char cVar2;
  byte bVar3;
  
  if ((param_1 < 4) && ((DAT_044e == '\0' || (param_1 < 2)))) {
    FUN_PRG28__8dc9();
    cVar2 = DAT_0430;
    cVar1 = *(char *)(_DAT_0048 + (ushort)(byte)(DAT_0430 * '\x02'));
    bVar3 = DAT_0430 * '\x02' + 1;
    if ((cVar1 != *(char *)(_DAT_0048 + (ushort)bVar3)) || (cVar1 != '\0')) {
      _DAT_0048 = CONCAT11(*(undefined *)(_DAT_0048 + (ushort)bVar3),cVar1);
      DAT_0430 = 0;
                    // WARNING: Subroutine does not return
      FUN_c509(cVar2);
    }
  }
  DAT_0430 = 0;
  return;
}



void FUN_PRG28__8c7f(void)

{
                    // WARNING: Subroutine does not return
  FUN_c509(DAT_0047 + -3);
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG28__8d58(char param_1,byte param_2)

{
  char cVar1;
  char cVar2;
  byte bVar3;
  
  if (param_1 == '\0') {
    FUN_PRG28__8da6();
    return;
  }
  if (param_1 == '\v') {
    FUN_PRG28__8da6();
    return;
  }
  if ((param_2 < 3) && ((DAT_044e == '\0' || (param_2 == 2)))) {
    FUN_PRG28__8dc9();
    cVar2 = DAT_0430;
    bVar3 = (DAT_0430 + '\x04') * '\x02';
    cVar1 = *(char *)(_DAT_0048 + (ushort)bVar3);
    bVar3 = bVar3 + 1;
    if ((cVar1 != *(char *)(_DAT_0048 + (ushort)bVar3)) || (cVar1 != '\0')) {
      _DAT_0048 = CONCAT11(*(undefined *)(_DAT_0048 + (ushort)bVar3),cVar1);
      DAT_0430 = 0;
                    // WARNING: Subroutine does not return
      FUN_c509(cVar2);
    }
  }
  DAT_0430 = 0;
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG28__8da6(char param_1)

{
  char cVar1;
  
  if (param_1 == '\0') {
    FUN_PRG28__8dc9();
    cVar1 = *_DAT_0048;
    if ((cVar1 != _DAT_0048[1]) || (cVar1 != '\0')) {
      DAT_0431 = cVar1;
      DAT_0430 = 1;
      return;
    }
  }
  DAT_0430 = 0;
  return;
}



void FUN_PRG28__8dc9(undefined param_1,undefined param_2)

{
  DAT_0047 = param_1;
  DAT_0430 = param_2;
  FUN_c50c();
  DAT_0048 = (&DAT_PRG28__8e1b)[(byte)(*DAT_0034 << 1)];
  DAT_0049 = (&DAT_PRG28__8e1c)[(byte)(*DAT_0034 << 1)];
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG30__8000(void)

{
                    // WARNING: Could not recover jumptable at 0x8001. Too many branches
                    // WARNING: Treating indirect jump as call
  (*_UNK_fffe)();
  return;
}



// WARNING: Control flow encountered bad instruction data

void FUN_PRG30__800c(void)

{
                    // WARNING: Bad instruction - Truncating control flow here
  halt_baddata();
}



// WARNING: Control flow encountered bad instruction data

void FUN_PRG30__8039(void)

{
                    // WARNING: Bad instruction - Truncating control flow here
  halt_baddata();
}



void FUN_PRG31__e059(void)

{
  if (DAT_05fc != -1) {
    FUN_cd7c();
    DAT_0638 = FUN_cde2(*(undefined *)(DAT_0034 + 6),*(undefined *)(DAT_0034 + 8));
  }
  return;
}



// WARNING: Control flow encountered bad instruction data

void FUN_PRG31__e0df(void)

{
  byte bVar1;
  byte bVar2;
  char cVar3;
  undefined uVar4;
  
  FUN_PRG31__ef7f(0);
  FUN_PRG31__ef7f(1);
  FUN_PRG31__e233();
  DAT_0614 = '\n';
  DAT_062a = 0xff;
  FUN_PRG31__e6ec();
  DAT_0517 = 0x40;
  DAT_05fb = '\0';
  DAT_044e = 0;
  SUB_0600 = 0;
  if (10 < DAT_0441) {
    DAT_05fb = '\v';
    DAT_0517 = 0;
  }
  if (DAT_05fb == '\0') {
    if ((DAT_044c & 0x80) == 0x80) {
      DAT_03f1 = 0;
      DAT_044c = 0;
    }
  }
  else {
    DAT_0442 = 0;
    DAT_05fd = FUN_ce99();
    FUN_cd7c(DAT_0441);
    *(undefined *)(DAT_0034 + 9) = 5;
    DAT_0617 = DAT_05fe;
  }
  FUN_PRG31__e267();
  do {
    while( true ) {
      FUN_cb0f(1);
      FUN_PRG31__e349();
      if (DAT_0614 == '\0') break;
      DAT_0614 = DAT_0614 + -1;
    }
    DAT_0614 = '\n';
    bVar1 = DAT_001c & 0xf;
    if (bVar1 != 0) {
      uVar4 = 0x20;
      bVar2 = DAT_0441;
      if (DAT_05fb != '\0') {
        uVar4 = 0x22;
        bVar2 = DAT_05fd;
      }
      FUN_ce08(bVar2,uVar4);
      FUN_PRG31__e8f5(5);
      FUN_PRG31__e8f5(bVar1 >> 2,7);
    }
    FUN_PRG31__e6ec();
    if ((10 < DAT_0441) && (DAT_05fe != DAT_0617)) {
      DAT_0617 = DAT_05fe;
      DAT_0621 = 0;
      DAT_0024 = 0x1c;
      DAT_0025 = 0x1d;
      FUN_ce2d();
      FUN_8006(0);
      cVar3 = DAT_043b;
      if (DAT_043b != '\x02') {
        DAT_0024 = 0x1a;
        DAT_0025 = 0x1b;
        FUN_ce2d();
        FUN_8021(cVar3);
        FUN_cc46();
        DAT_062d = 0;
        DAT_0615 = 0;
        DAT_0024 = 0x1a;
        DAT_0025 = 0x1b;
        FUN_ce2d();
                    // WARNING: Bad instruction - Truncating control flow here
        halt_baddata();
      }
    }
    DAT_05ff = 0;
    FUN_d193(1);
    FUN_PRG31__e27d();
    DAT_0613 = DAT_0613 + '\x01';
    FUN_PRG31__e2bc();
    cVar3 = FUN_PRG31__e407();
    if ((((DAT_044b & 0x80) == 0x80) && (cVar3 = DAT_05fb, DAT_05fb == '\0')) &&
       ((DAT_0635 & 0x80) == 0x80)) {
      DAT_0024 = 0x1a;
      DAT_0025 = 0x1b;
      FUN_ce2d();
      cVar3 = FUN_8039(0);
    }
    DAT_0024 = 0x1a;
    DAT_0025 = 0x1b;
    FUN_ce2d();
    FUN_8033(cVar3);
  } while( true );
}



void FUN_PRG31__e233(void)

{
  undefined uStack0000;
  
  uStack0000 = FUN_cbb0(0x1e);
  DAT_0024 = 0x1c;
  DAT_0025 = 0x1d;
  FUN_ce2d();
  FUN_8024(uStack0000);
  FUN_PRG31__e267();
  DAT_0615 = 0x80;
  DAT_062d = 0x80;
  SUB_0642 = 0;
  DAT_0643 = 0;
  DAT_008e = 2;
  DAT_0469 = 1;
  return;
}



void FUN_PRG31__e267(void)

{
  if (DAT_05fb != '\0') {
    FUN_PRG31__ef7f(0x31);
    FUN_PRG31__ef7f(0x32);
    return;
  }
  FUN_PRG31__ef7f(0x30);
  return;
}



void FUN_PRG31__e27d(void)

{
  byte bVar1;
  
  FUN_cd77();
  if (*(char *)(DAT_0034 + 10) == '\0') {
    bVar1 = DAT_0635;
    if (DAT_05fb != '\0') {
      bVar1 = (DAT_0635 ^ 0xff) + 1;
    }
    if (((0xc3 < bVar1) && (0x73 < DAT_0637)) && (DAT_0637 < 0x8c)) {
      DAT_062d = 0;
      DAT_0615 = 0;
      DAT_0024 = 0x1a;
      DAT_0025 = 0x1b;
      FUN_ce2d();
      FUN_8009(0x50);
      return;
    }
  }
  return;
}



void FUN_PRG31__e2bc(void)

{
  byte bVar1;
  byte bVar2;
  byte bVar3;
  byte bVar4;
  
  DAT_0618 = DAT_0618 + '\x01';
  if (DAT_0618 != '\0') {
    bVar1 = 0;
    DAT_0618 = '\0';
    do {
      if (bVar1 != DAT_0441) {
        FUN_ce08(0);
        bVar3 = 2;
        if ((*DAT_0034 != ' ') || (bVar3 = 1, (byte)(DAT_0034[1] | DAT_0034[2]) != 0)) {
          bVar4 = bVar3 + DAT_0034[1];
          bVar2 = DAT_0034[2] + CARRY1(bVar3,DAT_0034[1]);
          bVar3 = (bVar2 - DAT_0033) -
                  (((DAT_0032 & (~bVar4 | bVar4 - DAT_0032) | bVar4 - DAT_0032 & ~bVar4) & 0x80) ==
                  0);
          if (((DAT_0033 & (~bVar2 | bVar3) | bVar3 & ~bVar2) & 0x80) != 0) {
            bVar4 = DAT_0032;
            bVar2 = DAT_0033;
          }
          DAT_0034[2] = bVar2;
          DAT_0034[1] = bVar4;
        }
      }
      bVar1 = bVar1 + 1;
    } while (bVar1 != 0xb);
  }
  if (DAT_0441 < 0xb) {
    FUN_cd7c();
    DAT_0039._1_1_ = '\x03';
    if (*DAT_0034 == ' ') {
      DAT_0039._1_1_ = '\x05';
    }
    bVar1 = DAT_0034[1] - DAT_0039._1_1_;
    bVar3 = DAT_0034[2] - ((bVar1 & ~DAT_0034[1] & 0x80) == 0);
    if ((bVar3 & ~DAT_0034[2] & 0x80) == 0) {
      bVar1 = 0;
      bVar3 = 0;
    }
    DAT_0034[2] = bVar3;
    DAT_0034[1] = bVar1;
    FUN_PRG31__e267();
  }
  return;
}



void FUN_PRG31__e349(void)

{
  byte bVar1;
  char cVar2;
  
  DAT_0532 = 0;
  if (DAT_05fb == '\0') {
    if ((DAT_001c & 0x40) != 0) {
      SUB_0600 = 0;
      DAT_0615 = 0;
      FUN_cbb0(0x44);
      FUN_cb8b();
      DAT_0024 = 0x1a;
      DAT_0025 = 0x1b;
      FUN_ce2d();
      FUN_8003(0x50);
      return;
    }
    bVar1 = DAT_0615 | 0x40;
    if ((DAT_001c & 0xf) != 0) {
      DAT_0532 = 1;
      DAT_0517 = 0;
      if ((DAT_001c & 2) == 0) {
        DAT_0517 = 0x40;
      }
      bVar1 = DAT_0615 & 0xbf;
    }
  }
  else {
    DAT_0532 = 1;
    bVar1 = DAT_0615;
    if ((SUB_001e & 0xc0) != 0) {
      cVar2 = '\x01';
      if (-1 < (char)(SUB_001e & 0xc0)) {
        cVar2 = -1;
      }
      DAT_05fd = cVar2 + DAT_05fd;
      if (DAT_05fd == 0) {
        DAT_05fd = 10;
      }
      if (10 < DAT_05fd) {
        DAT_05fd = 1;
      }
      DAT_0532 = 1;
      FUN_PRG31__e267();
      bVar1 = DAT_0615;
    }
  }
  DAT_0615 = bVar1;
  return;
}



void FUN_PRG31__e407(void)

{
  byte bVar1;
  undefined uVar2;
  bool bVar3;
  byte bStack0000;
  
  FUN_PRG31__e709();
  bVar1 = 0;
  do {
    bStack0000 = bVar1;
    FUN_cb0f(1);
    FUN_PRG31__e349();
    bVar1 = bStack0000;
    if ((((bStack0000 != 0) && (bStack0000 != 0xb)) &&
        ((DAT_05fb == '\0' || (bStack0000 != DAT_05fd)))) &&
       ((bStack0000 != DAT_0441 || (10 < bStack0000)))) {
      if (((DAT_062a & 0x80) == 0x80) && (bStack0000 != DAT_0441)) {
        DAT_0024 = 0x1a;
        DAT_0025 = 0x1b;
        FUN_ce2d();
        BANK_SELECT(bVar1);
      }
      DAT_0040._1_1_ = bVar1;
      FUN_cd7c();
      bVar3 = 10 < DAT_0040._1_1_;
      if (DAT_05fb != '\0') {
        bVar3 = !bVar3;
      }
      uVar2 = 0x21;
      if ((bVar3) && (uVar2 = 0x22, *(char *)(DAT_0034 + 9) == -0x10)) {
        uVar2 = 0x1f;
      }
      if (DAT_0040._1_1_ == DAT_0441) {
        uVar2 = 0x20;
      }
      FUN_ce08(uVar2);
      if (*(char *)(DAT_0034 + 10) == '\0') {
        FUN_PRG31__e854();
      }
      else {
        *(char *)(DAT_0034 + 10) = *(char *)(DAT_0034 + 10) + -1;
      }
    }
    bVar1 = bStack0000 + 1;
  } while (bVar1 != 0x16);
  SUB_0600 = '\0';
  if (4 < DAT_0613) {
    DAT_0613 = 0;
    FUN_PRG31__e4d7(7);
  }
  if (SUB_0600 != '\0') {
    DAT_062d = 0;
    DAT_0615 = 0;
    FUN_cb8b();
    FUN_cbb0(0x2e);
    DAT_0024 = 0x1a;
    DAT_0025 = 0x1b;
    FUN_ce2d();
    FUN_8003(0x50);
    return;
  }
  return;
}



void FUN_PRG31__e4d7(undefined param_1)

{
  SUB_0600 = 0;
  DAT_0040._1_1_ = (DAT_05fb ^ 0xb) + 1;
  DAT_0042 = '\n';
  DAT_0043 = param_1;
  do {
    FUN_cd7c(DAT_0040._1_1_);
    if (*(char *)(DAT_0034 + 10) == '\0') {
      FUN_PRG31__e501();
    }
    DAT_0040._1_1_ = DAT_0040._1_1_ + '\x01';
    DAT_0042 = DAT_0042 + -1;
  } while (DAT_0042 != '\0');
  return;
}



void FUN_PRG31__e501(void)

{
  byte bVar1;
  byte bVar2;
  bool bVar3;
  
  bVar2 = *(byte *)(DAT_0034 + 6) - DAT_0635;
  bVar1 = ~*(byte *)(DAT_0034 + 6);
  bVar3 = ((DAT_0635 & (bVar1 | bVar2) | bVar2 & bVar1) & 0x80) != 0;
  if (!bVar3) {
    bVar2 = (bVar2 ^ 0xff) + 1 + bVar3;
  }
  DAT_0044 = bVar2 < DAT_0043;
  bVar2 = *(byte *)(DAT_0034 + 8) - DAT_0637;
  bVar1 = ~*(byte *)(DAT_0034 + 8);
  bVar3 = ((DAT_0637 & (bVar1 | bVar2) | bVar2 & bVar1) & 0x80) != 0;
  if (!bVar3) {
    bVar2 = (bVar2 ^ 0xff) + 1 + bVar3;
  }
  if (bVar2 < DAT_0043) {
    DAT_0044 = DAT_0044 + '\x01';
  }
  if (((DAT_0044 == '\x02') && (SUB_0600 < 5)) && ((DAT_05fb == '\0' || (SUB_0600 < 4)))) {
    (&DAT_0601)[SUB_0600] = DAT_0040._1_1_;
    SUB_0600 = SUB_0600 + 1;
  }
  return;
}



void FUN_PRG31__e616(byte param_1)

{
  bool bVar1;
  byte bStack0000;
  
  DAT_043b = 1;
  DAT_043c = 0;
  DAT_043d = 2;
  DAT_043e = 0;
  bStack0000 = (&DAT_0601)[param_1];
  if ((bStack0000 != '\0') && (bStack0000 != '\v')) {
    DAT_0024 = 0x1c;
    DAT_0025 = 0x1d;
    DAT_0442 = bStack0000;
    FUN_ce2d();
    FUN_8015(bStack0000);
    bVar1 = 0xfb < DAT_0032;
    DAT_0032 = DAT_0032 + 4;
    if (bVar1) {
      DAT_0032 = 0xff;
    }
    DAT_0024 = 0x1a;
    DAT_0025 = 0x1b;
    bStack0000 = DAT_0032;
    FUN_ce2d();
    bStack0000 = FUN_8012(bStack0000);
    DAT_0024 = 0x1a;
    DAT_0025 = 0x1b;
    FUN_ce2d();
    FUN_8015(bStack0000);
  }
  return;
}



void FUN_PRG31__e6ec(void)

{
  FUN_cd7c(DAT_0441);
  DAT_0635 = *(undefined *)(DAT_0034 + 6);
  DAT_0637 = *(undefined *)(DAT_0034 + 8);
  DAT_05fe = FUN_cde2(DAT_0635,DAT_0637);
  return;
}



void FUN_PRG31__e709(void)

{
  byte bVar1;
  
  DAT_062a = DAT_062a & 0x7f;
  DAT_0039._1_1_ = ((byte)(DAT_0637 + 0xb0U) >> 5) + ((DAT_0637 + 0xb0U & 0xe0) >> 3);
  bVar1 = ((byte)(DAT_0635 - 0x30U) >> 5) + DAT_0039._1_1_;
  if (bVar1 != DAT_062a) {
    DAT_062a = bVar1 | 0x80;
  }
  return;
}



void FUN_PRG31__e73e(byte param_1,char param_2)

{
  char cVar1;
  char cVar2;
  char cVar3;
  bool bVar4;
  undefined uStack0000;
  
  SUB_0600 = 0;
  DAT_05ff = 0;
  if (DAT_05fe != DAT_0638) {
    DAT_0034._0_1_ = 0x2f;
    DAT_0034._1_1_ = 6;
    DAT_062c = FUN_PRG31__e7d0();
    uStack0000 = DAT_062c;
    FUN_ce4a();
    DAT_0639 = param_1;
    DAT_063a = param_2;
    FUN_ce4d(uStack0000);
    DAT_063b = param_1;
    DAT_063c = param_2;
    while( true ) {
      FUN_cb0f(1);
      do {
        bVar4 = CARRY1(DAT_0639,DAT_0634);
        DAT_0634 = DAT_0639 + DAT_0634;
        cVar1 = DAT_063a + DAT_0635 + bVar4;
        bVar4 = CARRY1(DAT_063b,DAT_0636);
        DAT_0636 = DAT_063b + DAT_0636;
        cVar2 = DAT_063c + DAT_0637 + bVar4;
        DAT_0635 = cVar1;
        DAT_0637 = cVar2;
        cVar3 = FUN_cde2();
        if (cVar3 == -1) {
          DAT_05fe = DAT_0638;
          goto LAB_PRG31__e7c0;
        }
      } while (cVar3 == DAT_05fe);
      DAT_05fe = cVar3;
      if (cVar3 == DAT_0638) break;
      FUN_800f();
    }
LAB_PRG31__e7c0:
    FUN_cdc9(DAT_05fe);
    DAT_0635 = cVar1;
    DAT_0637 = cVar2;
    FUN_800c();
  }
  return;
}



byte FUN_PRG31__e7d0(void)

{
  byte bVar1;
  byte bVar2;
  char cVar3;
  byte bVar4;
  bool bVar5;
  
  bVar4 = *(byte *)(DAT_0034 + 6);
  bVar2 = FUN_cde2(*(undefined *)(DAT_0034 + 8));
  if (bVar2 == *(byte *)(DAT_0034 + 9)) {
    return bVar2;
  }
  bVar2 = 9;
  cVar3 = *(char *)(DAT_0034 + 9);
  if (*(char *)(DAT_0034 + 9) == -0x10) {
    cVar3 = DAT_05fe;
  }
  FUN_cdc9(cVar3);
  DAT_0071._0_1_ = *(byte *)(DAT_0034 + 6) - bVar4;
  bVar1 = ~*(byte *)(DAT_0034 + 6);
  bVar5 = ((bVar4 & (bVar1 | (byte)DAT_0071) | (byte)DAT_0071 & bVar1) & 0x80) != 0;
  DAT_003c = !bVar5;
  if ((bool)DAT_003c) {
    DAT_0071._0_1_ = ((byte)DAT_0071 ^ 0xff) + 1 + bVar5;
  }
  SUB_0070 = *(byte *)(DAT_0034 + 8) - bVar2;
  bVar1 = ~*(byte *)(DAT_0034 + 8);
  bVar5 = ((bVar2 & (bVar1 | SUB_0070) | SUB_0070 & bVar1) & 0x80) != 0;
  if (!bVar5) {
    SUB_0070 = (SUB_0070 ^ 0xff) + 1 + bVar5;
    DAT_003c = DAT_003c + 2;
  }
  DAT_006f = 0;
  DAT_0074 = 0;
  DAT_0039._1_1_ = bVar4;
  DAT_003b = bVar2;
  FUN_cd3c();
  bVar4 = 0;
  do {
    bVar5 = SUB_0070 <= (byte)(&DAT_PRG31__facd)[bVar4];
    if ((&DAT_PRG31__facd)[bVar4] == SUB_0070) {
LAB_PRG31__e836:
      bVar1 = ((&DAT_PRG31__facc)[bVar4] - DAT_006f) - !bVar5;
      bVar2 = ~(&DAT_PRG31__facc)[bVar4];
      if ((bVar1 == 0) || (((DAT_006f & (bVar2 | bVar1) | bVar1 & bVar2) & 0x80) != 0)) break;
    }
    else {
      if (bVar5) break;
      if (bVar5) goto LAB_PRG31__e836;
    }
    bVar4 = bVar4 + 2;
  } while (bVar4 != 0);
  bVar4 = bVar4 >> 1;
  bVar2 = DAT_003c >> 1;
  if (!(bool)(DAT_003c & 1)) {
    bVar4 = (bVar4 ^ 0xff) & 0x7f;
  }
  DAT_003c = DAT_003c >> 2;
  if (!(bool)(bVar2 & 1)) {
    bVar4 = bVar4 ^ 0xff;
  }
  return bVar4;
}



void FUN_PRG31__e854(void)

{
  char cVar1;
  
  if (*(char *)(DAT_0034 + 10) != '\0') {
    return;
  }
  DAT_0043 = DAT_05ff;
  DAT_0044 = FUN_PRG31__e7d0();
  do {
    cVar1 = FUN_cde2(*(undefined *)(DAT_0034 + 6),*(undefined *)(DAT_0034 + 8));
    if ((cVar1 == *(char *)(DAT_0034 + 9)) ||
       ((*(char *)(DAT_0034 + 9) == -0x10 && (cVar1 == DAT_05fe)))) break;
    FUN_PRG31__e8a0(DAT_0044,7);
    FUN_PRG31__e8a0(DAT_0044 + '@',5);
    DAT_0043 = DAT_0043 + -1;
  } while (DAT_0043 != '\0');
  *(undefined *)(DAT_0034 + 10) = 0;
  return;
}



void FUN_PRG31__e8a0(char param_1,undefined param_2)

{
  DAT_0047 = (&LAB_PRG31__e8ed)[(byte)(param_1 + 0x10U) >> 5] + -1;
  if (DAT_0047 < '\0') {
    DAT_0049 = 0;
    DAT_0048 = 0;
  }
  else {
    DAT_0047 = (&LAB_PRG31__e8ed)[(byte)(param_1 + 0x10U) >> 5] + -2;
    DAT_0049 = DAT_0033;
    DAT_0048 = DAT_0032;
    if (-1 < DAT_0047) {
      DAT_0049 = DAT_0033 ^ 0xff;
      DAT_0048 = (DAT_0032 ^ 0xff) + 1;
      if (DAT_0048 == 0) {
        DAT_0049 = DAT_0049 + 1;
      }
    }
  }
  DAT_0046 = param_2;
  if (((char)(*(char *)(DAT_0034 + 10) - DAT_05ff) < '\0') && (*(char *)(DAT_0034 + 10) != DAT_05ff)
     ) {
    FUN_PRG31__e912(DAT_0048,DAT_0049,param_2);
  }
  return;
}



void FUN_PRG31__e8f5(byte param_1,byte param_2)

{
  byte bVar1;
  byte bVar2;
  byte bVar3;
  
  DAT_0047 = param_2;
  if ((param_1 & 3) == 0) {
    return;
  }
  bVar2 = DAT_0033;
  bVar3 = DAT_0032;
  if (!(bool)(param_1 & 1)) {
    bVar2 = DAT_0033 ^ 0xff;
    bVar3 = (DAT_0032 ^ 0xff) + 1;
    if (bVar3 == 0) {
      bVar2 = bVar2 + 1;
    }
  }
  bVar1 = *(byte *)(DAT_0034 + (ushort)param_2);
  *(byte *)(DAT_0034 + (ushort)param_2) = bVar3 + bVar1;
  param_2 = param_2 + 1;
  bVar2 = bVar2 + *(char *)(DAT_0034 + (ushort)param_2) + CARRY1(bVar3,bVar1);
  if (param_2 == 6) {
LAB_PRG31__e92d:
    bVar3 = 0x30;
    if ((0x2f < bVar2) && (bVar3 = 0xcf, bVar2 < 0xd0)) goto LAB_PRG31__e93a;
  }
  else {
    bVar3 = 0x50;
    if (0x4f < bVar2) {
      bVar3 = 0xaf;
      if (bVar2 < 0xb0) {
        if (bVar2 < 0xb0) goto LAB_PRG31__e93a;
        goto LAB_PRG31__e92d;
      }
    }
  }
  bVar2 = bVar3;
LAB_PRG31__e93a:
  *(byte *)(DAT_0034 + (ushort)param_2) = bVar2;
  return;
}



void FUN_PRG31__e912(byte param_1,char param_2,byte param_3)

{
  byte bVar1;
  byte bVar2;
  
  bVar2 = *(byte *)(DAT_0034 + (ushort)param_3);
  *(byte *)(DAT_0034 + (ushort)param_3) = param_1 + bVar2;
  param_3 = param_3 + 1;
  bVar2 = param_2 + *(char *)(DAT_0034 + (ushort)param_3) + CARRY1(param_1,bVar2);
  if (param_3 == 6) {
LAB_PRG31__e92d:
    bVar1 = 0x30;
    if ((0x2f < bVar2) && (bVar1 = 0xcf, bVar2 < 0xd0)) goto LAB_PRG31__e93a;
  }
  else {
    bVar1 = 0x50;
    if (0x4f < bVar2) {
      bVar1 = 0xaf;
      if (bVar2 < 0xb0) {
        if (bVar2 < 0xb0) goto LAB_PRG31__e93a;
        goto LAB_PRG31__e92d;
      }
    }
  }
  bVar2 = bVar1;
LAB_PRG31__e93a:
  *(byte *)(DAT_0034 + (ushort)param_3) = bVar2;
  return;
}



byte FUN_PRG31__ee6d(void)

{
  byte bVar1;
  byte bVar2;
  
  bVar1 = DAT_05d2 & 2;
  if (bVar1 != 0) {
    bVar1 = DAT_05d4;
    bVar2 = DAT_05d5;
    if ((char)DAT_05d5 < '\0') {
      bVar2 = DAT_05d5 ^ 0xff;
      bVar1 = (DAT_05d4 ^ 0xff) + 1;
      if (bVar1 == 0) {
        bVar2 = bVar2 + 1;
      }
    }
    bVar1 = (bVar2 - DAT_05da) -
            (((DAT_05d9 & (~bVar1 | bVar1 - DAT_05d9) | bVar1 - DAT_05d9 & ~bVar1) & 0x80) == 0);
    if (((DAT_05da & (~bVar2 | bVar1) | bVar1 & ~bVar2) & 0x80) != 0) {
      DAT_05d2 = 0;
      bVar1 = 0;
      DAT_000d._0_1_ = 0;
      DAT_000d._1_1_ = 0;
    }
  }
  return bVar1;
}



void FUN_PRG31__ef7f(undefined param_1)

{
  undefined uVar1;
  undefined uStack0000;
  
  uVar1 = DAT_0025;
  uStack0000 = DAT_0024;
  DAT_0024 = 0x18;
  DAT_0025 = 0x19;
  FUN_ce2d();
  FUN_800c(param_1);
  DAT_0024 = uStack0000;
  DAT_0025 = uVar1;
  FUN_ce2d();
  return;
}



// WARNING: Globals starting with '_' overlap smaller symbols at the same address

void FUN_PRG31__f114(byte param_1)

{
  char cVar1;
  byte bVar2;
  byte bVar3;
  bool bVar4;
  
  bVar3 = 0;
  do {
    cVar1 = *(char *)(RAM0x003a + (ushort)bVar3);
    (&DAT_04a5)[param_1] = cVar1;
    if (cVar1 == '\0') {
      DAT_0515 = 0x80;
      return;
    }
    bVar2 = *(byte *)(RAM0x003a + (ushort)(byte)(bVar3 + 1));
    bVar4 = CARRY1(bVar2,DAT_003c);
    DAT_003e = cVar1;
    (&DAT_04a6)[param_1] = bVar2 + DAT_003c;
    if (DAT_003d < 0x22) {
      bVar2 = DAT_05ce >> 4;
    }
    else {
      bVar2 = 0;
    }
    (&DAT_04a7)[param_1] =
         (bVar2 | *(byte *)(RAM0x003a + (ushort)(byte)(bVar3 + 2))) + DAT_003d + bVar4;
    bVar3 = bVar3 + 3;
    param_1 = param_1 + 3;
    do {
      (&DAT_04a5)[param_1] = *(undefined *)(RAM0x003a + (ushort)bVar3);
      bVar3 = bVar3 + 1;
      param_1 = param_1 + 1;
      DAT_003e = DAT_003e + -1;
      bVar4 = DAT_003e == '\0';
    } while (!bVar4);
    DAT_003e = 0;
  } while (bVar4);
  DAT_003e = 0;
  DAT_0515 = 0x80;
  return;
}


