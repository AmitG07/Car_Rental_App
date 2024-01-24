using BusinessLayer.Interface;
using BusinessObjectLayer;
using DataAccessLayer.Interface;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLayer
{
    public class RentBL : IRentBL
    {
        private readonly IRentDAL _rentDAL;

        public RentBL(IRentDAL rentDal)
        {
            _rentDAL = rentDal;
        }

        public bool RentCar(Rent car)
        {
            return _rentDAL.RentCar(car);
        }

        public bool EditRent(Rent val)
        {
            var p = _rentDAL.EditRent(val);
            return p;
        }

        public bool DeleteRent(int val, int uId)
        {
            var p = _rentDAL.DeleteRent(val, uId);
            return p;
        }

        public IEnumerable<Rent> GetAllRents()
        {
            var p = _rentDAL.GetAllRents();
            return p;
        }

        public bool GetAvailableStatus(int CarId)
        {
            var p = _rentDAL.GetAvailableStatus(CarId);
            return p;
        }

        public Rent GetRentById(int id)
        {
            var product = _rentDAL.GetRentById(id);
            return product;
        }
    }
}
