using BusinessObjectLayer;
using Car_Rent_App.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Car_Rent_App.Helper
{
    public class CarToCarHelper
    {
        public CarModel CarToCarMapping(Car cm)
        {
            CarModel c = new CarModel();
            c.CarId = cm.CarId;
            c.VehicleId = cm.VehicleId;
            c.Brand = cm.Brand;
            c.Model = cm.Model;
            c.RentalPrice = cm.RentalPrice;
            return c;
        }
    }
}
