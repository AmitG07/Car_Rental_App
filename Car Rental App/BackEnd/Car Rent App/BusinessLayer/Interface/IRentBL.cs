using BusinessObjectLayer;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLayer.Interface
{
    public interface IRentBL
    {
        public bool RentCar(Rent car);
        public bool EditRent(Rent val);
        public bool DeleteRent(int val, int uId);
        public IEnumerable<Rent> GetAllRents();
        public bool GetAvailableStatus(int CarId);
        public Rent GetRentById(int id);
    }
}
