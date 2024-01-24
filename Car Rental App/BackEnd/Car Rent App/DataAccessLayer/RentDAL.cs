using BusinessObjectLayer;
using DataAccessLayer.Interface;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace DataAccessLayer
{
    public class RentDAL : IRentDAL
    {
        private readonly ApplicationDbContext _context;

        public RentDAL(ApplicationDbContext dbContext)
        {
            _context = dbContext;
        }
        public bool RentCar(Rent car)
        {
            try
            {
                var query = from rent in _context.Rents
                            where rent.CarId == car.CarId
                            select rent;
                foreach (var r in query)
                {
                    if (r.IsAccepted == true && r.IsReturned == false)
                    {
                        return false;
                    }
                }
                car.IsAccepted = false;
                car.IsReturned = false;
                car.ReturnRequest = false;
                _context.Rents.Add(car);
                _context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
            }
            return false;
        }

        public bool EditRent(Rent val)
        {
            try
            {
                _context.Rents.Update(val);
                _context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                //Console.WriteLine(ex);
            }
            return false;

        }
        public bool DeleteRent(int id, int uId)
        {
            var query = from r in _context.Rents
                        where r.RentId == id
                        select r;

            var rnt = query.ToList().FirstOrDefault();

            var u = (from us in _context.Users where us.UserId == uId select us).ToList().FirstOrDefault();

            if (rnt != null && (u.Isadmin == true || rnt.IsAccepted == false))
            {
                _context.Rents.Remove(rnt);
                _context.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        public IEnumerable<Rent> GetAllRents()
        {
            IEnumerable<Rent> rents = _context.Rents.ToList();
            return rents;
        }

        public bool GetAvailableStatus(int CarId)
        {
            var query = from rent in _context.Rents
                        where rent.CarId == CarId
                        select rent;

            foreach (var r in query)
            {
                if (r.IsAccepted == true && r.IsReturned == false)
                {
                    return false;
                }
            }
            return true;
        }

        public Rent GetRentById(int id)
        {
            var rent = _context.Rents.ToList().FirstOrDefault(r => r.RentId == id);
            return rent;
        }
    }
}
