"use strict";

const InterestModel = artifacts.require("./InterestModel.sol");
const utils = require('./utils');

contract('InterestModel', function(accounts) {
  var interestModel;

  before(async () => {
    interestModel = await InterestModel.deployed();
  });

  describe('#getScaledSupplyRatePerBlock', async () => {

    it('should return correct balance with utilization ratio of 1/3', async () => {
      const interestRateBPS = (await interestModel.getScaledSupplyRatePerBlock.call(150, 50));
      (await interestModel.getScaledSupplyRatePerBlock(150, 50));

      utils.validateRateWithMaxRatio(assert, 566.667, interestRateBPS.toNumber(), 2695332318, 0.00000999999, "1/3");
    });


    it('should return correct balance with utilization ratio of 1/150', async () => {
      const interestRateBPS = await interestModel.getScaledSupplyRatePerBlock.call(150, 0);

      utils.validateRate(assert, 0, interestRateBPS.toNumber(), 0, "1/150");
    });


    it('should return correct balance with utilization ratio of 1/100', async () => {
      const interestRateBPS = await interestModel.getScaledSupplyRatePerBlock.call(10000, 100);

      utils.validateRate(assert, 8.755, interestRateBPS.toNumber(), 41642884, "1/100");
    });

    it('should return correct balance with utilization ratio of 127/100', async () => {
      const interestRateBPS = await interestModel.getScaledSupplyRatePerBlock.call(100, 127);

      utils.validateRateWithMaxRatio(assert, 5192.395, interestRateBPS.toNumber(), 24697464802,  0.00007, "127/100");
    });

    it('should return correct balance with utilization ratio of 127000000000000000000/100000000000000000000', async () => {
      const interestRateBPS = await interestModel.getScaledSupplyRatePerBlock.call(100000000000000000000, 127000000000000000000);

      utils.validateRateWithMaxRatio(assert, 5192.395, interestRateBPS.toNumber(), 24697464802, 0.0004, "127000000000000000000/100000000000000000000");
    });


    it('should return correct rate with utilization ratio of 3/1', async () => {
      const interestRateBPS = await interestModel.getScaledSupplyRatePerBlock.call(50, 150);

      utils.validateRate(assert, 25500, interestRateBPS.toNumber(), 121289954337, "3/1");
    });

    it('should return correct rate with utilization ratio of 150/1', async () => {
      const interestRateBPS = await interestModel.getScaledSupplyRatePerBlock.call(0, 150);

      utils.validateRate(assert, 57502500, interestRateBPS.toNumber(), 273508847031963, "150/1");
    });

    it('should return correct rate with utilization ratio of 0', async () => {
      const interestRateBPS = await interestModel.getScaledSupplyRatePerBlock.call(50, 0);

      utils.validateRate(assert, 0, interestRateBPS.toNumber(), 0, "0%");
    });

    it('should return correct rate with utilization ratio of 1/1', async () => {
      const interestRateBPS = await interestModel.getScaledSupplyRatePerBlock.call(100, 100);

      utils.validateRate(assert, 3400, interestRateBPS.toNumber(), 16171993911, "1/1");
    });

    it('should return correct rate with utilization ratio of 100/1', async () => {
      const interestRateBPS = await interestModel.getScaledSupplyRatePerBlock.call(100, 10000);

      utils.validateRateWithMaxRatio(assert, 25585000, interestRateBPS.toNumber(), 121694254185692, 0.0011, "100/1");
    });

    it('should return correct rate with utilization ratio of 3/1 in large numbers', async () => {
      const interestRateBPS = await interestModel.getScaledSupplyRatePerBlock.call(500000000000000000000, 1500000000000000000000);

      utils.validateRate(assert, 25500, interestRateBPS.toNumber(), 121289954337, "3/1");
    });
  });

  describe('#getScaledBorrowRatePerBlock', async () => {

    it('should return correct balance with utilization ratio of 1/3', async () => {
      const interestRateBPS = (await interestModel.getScaledBorrowRatePerBlock.call(150, 50));
      (await interestModel.getScaledBorrowRatePerBlock(150, 50));

      utils.validateRate(assert, 2000, interestRateBPS.toNumber(), 9512937595, "1/3");
    });


    it('should return correct balance with utilization ratio of 1/150', async () => {
      const interestRateBPS = await interestModel.getScaledBorrowRatePerBlock.call(150, 0);

      utils.validateRate(assert, 1000, interestRateBPS.toNumber(), 4756468797, "1/150");
    });


    it('should return correct balance with utilization ratio of 1/100', async () => {
      const interestRateBPS = await interestModel.getScaledBorrowRatePerBlock.call(10000, 100);

      utils.validateRate(assert, 1030, interestRateBPS.toNumber(), 4899162861, "1/100");
    });

    it('should return correct balance with utilization ratio of 127/100', async () => {
      const interestRateBPS = await interestModel.getScaledBorrowRatePerBlock.call(100, 127);

      utils.validateRateWithMaxRatio(assert, 4810, interestRateBPS.toNumber(), 22878614916,  0.00007, "127/100");
    });

    it('should return correct balance with utilization ratio of 127000000000000000000/100000000000000000000', async () => {
      const interestRateBPS = await interestModel.getScaledBorrowRatePerBlock.call(100000000000000000000, 127000000000000000000);

      utils.validateRateWithMaxRatio(assert, 4810, interestRateBPS.toNumber(), 22878614916, 0.0004, "127000000000000000000/100000000000000000000");
    });

    it('should return correct balance with utilization ratio of 3/1', async () => {
      const interestRateBPS = (await interestModel.getScaledBorrowRatePerBlock.call(50, 150));
      (await interestModel.getScaledBorrowRatePerBlock(50, 150));

      utils.validateRate(assert, 10000, interestRateBPS.toNumber(), 47564687975, "3/1");
    });


    it('should return correct balance with utilization ratio of 150/1', async () => {
      const interestRateBPS = await interestModel.getScaledBorrowRatePerBlock.call(0, 150);

      utils.validateRate(assert, 451000, interestRateBPS.toNumber(), 2145167427701, "150/1");
    });

    it('should return correct balance with utilization ratio of 0', async () => {
      const interestRateBPS = await interestModel.getScaledBorrowRatePerBlock.call(50, 0);

      utils.validateRate(assert, 1000, interestRateBPS.toNumber(), 4756468797, "0");
    });

    it('should return correct balance with utilization ratio of 1/1', async () => {
      const interestRateBPS = await interestModel.getScaledBorrowRatePerBlock.call(100, 100);

      utils.validateRate(assert, 4000, interestRateBPS.toNumber(), 19025875190, "1/1");
    });

    it('should return correct balance with utilization ratio of 100/1', async () => {
      const interestRateBPS = await interestModel.getScaledBorrowRatePerBlock.call(100, 10000);

      utils.validateRate(assert, 301000, interestRateBPS.toNumber(), 1431697108066, "100/1");
    });

    it('should return correct balance with utilization ratio of 100/127', async () => {
      const interestRateBPS = await interestModel.getScaledBorrowRatePerBlock.call(127, 100);

      utils.validateRateWithMaxRatio(assert, 3362, interestRateBPS.toNumber(), 15992221862,  0.00007, "100/127");
    });

    it('should return correct balance with utilization ratio of 100000000000000000000/127000000000000000000', async () => {
      const interestRateBPS = await interestModel.getScaledBorrowRatePerBlock.call(127000000000000000000, 100000000000000000000);

      utils.validateRateWithMaxRatio(assert, 3362, interestRateBPS.toNumber(), 15992221862, 0.0004, "100000000000000000000/127000000000000000000");
    });
  });

});
