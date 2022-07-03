type predictionGroupErrorType = [
  | `MarketScore(PredictionResolutionGroup.WithMarket.t)
  | `NonMarketScore(PredictionResolutionGroup.t)
];

let predictionGroupError:
  (
    ~scoringCombination: predictionGroupErrorType,
    ~sampleCount: int,
    ~scoreLimiter: float => float,
    unit
  ) =>
  Belt.Result.t(float, 'a);

let differentialEntropy:
  (int, MeasurementValue.t) => option(float);