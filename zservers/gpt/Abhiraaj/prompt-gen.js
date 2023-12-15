const genPrompt = (tenderInfo) => {
  return (
    "Given tender information:" +
    tenderInfo +
    " \n, and categories that this tender must belong to (atleast one and upto 5) \n Here are the categories: FeasibilityStudies ElectricalMaintenance    InfrastructureMaintenance  SecurityInfrastructureConstruction  ResidentialConstruction  CivilAndHydroMechanicalWorks  SupplyAndEquipmentProcurement  MultifunctionalEquipmentSupply  RailAndCableProcurement  WaterPurificationSystemProcurement  CarAndTaxiHiringServices  FloorCoatingAndPaintingService  GabionWallConstruction  RenovationAndModernization  SurveyAndTopographicalServices \n m respond only with a json object {categories:[CategoryA,CategoryB,...]}"
  );
};
