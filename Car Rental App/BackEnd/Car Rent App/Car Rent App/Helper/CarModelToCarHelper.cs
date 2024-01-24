using BusinessObjectLayer;
using Car_Rent_App.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Car_Rent_App.Helper
{
    public class CarModelToCarHelper
    {
        public Car CarModelToCarMapping(CarModel cm)
        {
            Car c = new Car();
            c.CarId = cm.CarId;
            c.VehicleId = cm.VehicleId;
            c.Brand = cm.Brand;
            c.Model = cm.Model;
            c.RentalPrice = cm.RentalPrice;
            c.Image = cm.Image;
            return c;
        }
    }
}
