module Distribution: {
  let toPdf: Types.distribution => Types.distribution;
  let findX: (float, Types.distribution) => float;
  let findY: (float, Types.distribution) => float;
  let integral: Types.distribution => float;
  let differentialEntropy:
    (int, Types.distribution) => float;
};

module PredictionResolutionGroup: {
  let logScoreNonMarketCdfCdf:
    (
      ~sampleCount: int,
      ~resolutionUniformAdditionWeight: float,
      ~agentPrediction: Types.distribution,
      ~resolution: Types.distribution
    ) =>
    float;
};