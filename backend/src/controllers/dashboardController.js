const { startOfYear, endOfYear } = require('date-fns');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { subMonths } = require('date-fns');

const dogStats = async (req, res) => {
  try {
    const now = new Date();

    const [totalDogs, cns, cnd, deadDogs, actualTotalDogs, deaths3m, deaths6m, deaths12m] = await Promise.all([
      prisma.dog.count({
        where: {
          isDeath: false,
          isLoan: false,
          isSold: false,
          isTransfer: false,
          CNS: false,
          CDN: false,
        },
      }),
      prisma.dog.count({
        where: {
          CNS: true,
          isDeath: false,
          isLoan: false,
          isSold: false,
          isTransfer: false,
        },
      }),
      prisma.dog.count({
        where: {
          CDN: true,
          isDeath: false,
          isLoan: false,
          isSold: false,
          isTransfer: false,
        },
      }),
      prisma.dog.count({ where: { isDeath: true } }),
      prisma.dog.count(), // Total dogs ever

      // Mortality in different periods
      prisma.dog.count({ where: { isDeath: true, deathDate: { gte: subMonths(now, 3).toISOString() } } }),
      prisma.dog.count({ where: { isDeath: true, deathDate: { gte: subMonths(now, 6).toISOString() } } }),
      prisma.dog.count({ where: { isDeath: true, deathDate: { gte: subMonths(now, 12).toISOString() } } }),
    ]);

    return res.json({
      totalDogs,
      cns,
      cnd,
      deadDogs,
      mortalityPercentage: ((deadDogs / actualTotalDogs) * 100).toFixed(2) + "%",
      mortality3Months: deaths3m,
      mortality6Months: deaths6m,
      mortality12Months: deaths12m,
    });
  } catch (error) {
    console.error("Error fetching dog stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Helper function to get month name from date
const getMonthName = (date) => date.toLocaleString('default', { month: 'short' });

const monthlyWhelpingState = async (req, res) => {
  try {
    // Get the year from query parameter
    const year = parseInt(req.query.year) || new Date().getFullYear();

    // Validate the year (between 1900 and the current year + 1)
    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear + 1) {
      return res.status(400).json({
        success: false,
        error: 'Invalid year parameter',
      });
    }

    // Get the start and end date for the requested year
    const startDate = startOfYear(new Date(year, 0, 1)); // January 1st of the given year
    const endDate = endOfYear(new Date(year, 11, 31)); // December 31st of the given year

    // Fetch all dogs born within the specified year
    const dogs = await prisma.dog.findMany({
      where: {
        dob: {
          gte: startDate,
          lte: endDate,
        },
      },
      select: {
        dob: true,
      },
      orderBy: {
        dob: 'asc',
      },
    });

    // Initialize an array for all 12 months of the given year
    const monthlyData = Array.from({ length: 12 }, (_, index) => {
      const date = new Date(year, index, 1); // First day of each month
      return {
        month: getMonthName(date),
        year: date.getFullYear(),
        count: 0,
      };
    });

    // Count whelping by month
    dogs.forEach(dog => {
      const dob = new Date(dog.dob);
      const month = getMonthName(dob);
      const dogYear = dob.getFullYear();

      if (dogYear === year) {
        const monthData = monthlyData.find(m => m.month === month && m.year === dogYear);
        if (monthData) {
          monthData.count++;
        }
      }
    });

    // Extract just the counts in chronological order for the chart
    const counts = monthlyData.map(month => month.count);

    // Send the result back
    res.json({
      success: true,
      data: {
        monthlyData,
        counts,
      },
    });
  } catch (error) {
    console.error('Error fetching monthly whelping data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch monthly whelping data',
    });
  }
};

module.exports = {
  dogStats,
  monthlyWhelpingState
}