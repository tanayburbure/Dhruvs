export const calculateGarmentTotal = (garments: any[]) => {
    return garments.reduce(
      (acc, item) => acc + item.quantity * item.stitchingCost,
      0
    );
  };
  
  export const calculateFabricTotal = (fabrics: any[]) => {
    return fabrics.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
  };