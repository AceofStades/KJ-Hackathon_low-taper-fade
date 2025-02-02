document.addEventListener("DOMContentLoaded", function () {
    const customers=[

    {
        customerID: "7590-VHVEG",
        gender: "Female",
        tenure: 1,
        StreamingTV: "No",
        StreamingMovies: "No",
        PaymentMethod: "Electronic check",
        MonthlyCharges: 29.85,
        TotalCharges: 29.85,
        Churn: "No",
        ChurnProbability: 0.88913256
    },
    {
        customerID: "5575-GNVDE",
        gender: "Male",
        tenure: 34,
        StreamingTV: "No",
        StreamingMovies: "No",
        PaymentMethod: "Mailed check",
        MonthlyCharges: 56.95,
        TotalCharges: 1889.5,
        Churn: "No",
        ChurnProbability: 0.13471013
    },
    {
        customerID: "3668-QPYBK",
        gender: "Male",
        tenure: 2,
        StreamingTV: "No",
        StreamingMovies: "No",
        PaymentMethod: "Mailed check",
        MonthlyCharges: 53.85,
        TotalCharges: 108.15,
        Churn: "Yes",
        ChurnProbability: 0.7959531
    },
    {
        customerID: "7795-CFOCW",
        gender: "Male",
        tenure: 45,
        StreamingTV: "No",
        StreamingMovies: "No",
        PaymentMethod: "Bank transfer (automatic)",
        MonthlyCharges: 42.3,
        TotalCharges: 1840.75,
        Churn: "No",
        ChurnProbability: 0.12517418
    },
    {
        customerID: "9237-HQITU",
        gender: "Female",
        tenure: 2,
        StreamingTV: "No",
        StreamingMovies: "No",
        PaymentMethod: "Electronic check",
        MonthlyCharges: 70.7,
        TotalCharges: 151.65,
        Churn: "Yes",
        ChurnProbability: 0.93068075
    },
    {
        customerID: "9305-CDSKC",
        gender: "Female",
        tenure: 8,
        StreamingTV: "Yes",
        StreamingMovies: "Yes",
        PaymentMethod: "Electronic check",
        MonthlyCharges: 99.65,
        TotalCharges: 820.5,
        Churn: "Yes",
        ChurnProbability: 0.93919605
    },
    {
        customerID: "1452-KIOVK",
        gender: "Male",
        tenure: 22,
        StreamingTV: "Yes",
        StreamingMovies: "No",
        PaymentMethod: "Credit card (automatic)",
        MonthlyCharges: 89.1,
        TotalCharges: 1949.4,
        Churn: "No",
        ChurnProbability: 0.8104395
    },
    {
        customerID: "6713-OKOMC",
        gender: "Female",
        tenure: 10,
        StreamingTV: "No",
        StreamingMovies: "No",
        PaymentMethod: "Mailed check",
        MonthlyCharges: 29.75,
        TotalCharges: 301.9,
        Churn: "No",
        ChurnProbability: 0.60391396
    },
    {
        customerID: "7892-POOKP",
        gender: "Female",
        tenure: 28,
        StreamingTV: "Yes",
        StreamingMovies: "Yes",
        PaymentMethod: "Electronic check",
        MonthlyCharges: 104.8,
        TotalCharges: 3046.05,
        Churn: "Yes",
        ChurnProbability: 0.86195207
    },
    {
        customerID: "6388-TABGU",
        gender: "Male",
        tenure: 62,
        StreamingTV: "No",
        StreamingMovies: "No",
        PaymentMethod: "Bank transfer (automatic)",
        MonthlyCharges: 56.15,
        TotalCharges: 3487.95,
        Churn: "No",
        ChurnProbability: 0.13262203
    },
    {
        customerID: "9763-GRSKD",
        gender: "Male",
        tenure: 13,
        StreamingTV: "No",
        StreamingMovies: "No",
        PaymentMethod: "Mailed check",
        MonthlyCharges: 49.95,
        TotalCharges: 587.45,
        Churn: "No",
        ChurnProbability: 0.5865285
    },
    {
        customerID: "7469-LKBCI",
        gender: "Male",
        tenure: 16,
        StreamingTV: "No internet service",
        StreamingMovies: "No internet service",
        PaymentMethod: "Credit card (automatic)",
        MonthlyCharges: 18.95,
        TotalCharges: 326.8,
        Churn: "No",
        ChurnProbability: 0.09731816
    },
    {
        customerID: "8091-TTVAX",
        gender: "Male",
        tenure: 58,
        StreamingTV: "Yes",
        StreamingMovies: "Yes",
        PaymentMethod: "Credit card (automatic)",
        MonthlyCharges: 100.35,
        TotalCharges: 5681.1,
        Churn: "No",
        ChurnProbability: 0.58380264
    },
    {
        customerID: "0280-XJGEX",
        gender: "Male",
        tenure: 49,
        StreamingTV: "Yes",
        StreamingMovies: "Yes",
        PaymentMethod: "Bank transfer (automatic)",
        MonthlyCharges: 103.7,
        TotalCharges: 5036.3,
        Churn: "Yes",
        ChurnProbability: 0.823758
    },
    {
        customerID: "5129-JLPIS",
        gender: "Male",
        tenure: 25,
        StreamingTV: "Yes",
        StreamingMovies: "Yes",
        PaymentMethod: "Electronic check",
        MonthlyCharges: 105.5,
        TotalCharges: 2686.05,
        Churn: "No",
        ChurnProbability: 0.8031682
    },
    {
        customerID: "3655-SNQYZ",
        gender: "Female",
        tenure: 69,
        StreamingTV: "Yes",
        StreamingMovies: "Yes",
        PaymentMethod: "Credit card (automatic)",
        MonthlyCharges: 113.25,
        TotalCharges: 7895.15,
        Churn: "No",
        ChurnProbability: 0.214079
    },
    {
        customerID: "8191-XWSZG",
        gender: "Female",
        tenure: 52,
        StreamingTV: "No internet service",
        StreamingMovies: "No internet service",
        PaymentMethod: "Mailed check",
        MonthlyCharges: 20.65,
        TotalCharges: 1022.95,
        Churn: "No",
        ChurnProbability: 0.12664531
    },
    {
        customerID: "9959-WOFKT",
        gender: "Male",
        tenure: 71,
        StreamingTV: "Yes",
        StreamingMovies: "Yes",
        PaymentMethod: "Bank transfer (automatic)",
        MonthlyCharges: 106.7,
        TotalCharges: 7382.25,
        Churn: "No",
        ChurnProbability: 0.22577958
    },
    {
        customerID: "4190-MFLUW",
        gender: "Female",
        tenure: 10,
        StreamingTV: "No",
        StreamingMovies: "No",
        PaymentMethod: "Credit card (automatic)",
        MonthlyCharges: 55.2,
        TotalCharges: 528.35,
        Churn: "Yes",
        ChurnProbability: 0.53984237
    },
    {
        customerID: "4183-MYFRB",
        gender: "Female",
        tenure: 21,
        StreamingTV: "No",
        StreamingMovies: "Yes",
        PaymentMethod: "Electronic check",
        MonthlyCharges: 90.05,
        TotalCharges: 1862.9,
        Churn: "No",
        ChurnProbability: 0.8818462
    },
    {
        customerID: "8779-QRDMV",
        gender: "Male",
        tenure: 1,
        StreamingTV: "No",
        StreamingMovies: "Yes",
        PaymentMethod: "Electronic check",
        MonthlyCharges: 39.65,
        TotalCharges: 39.65,
        Churn: "Yes",
        ChurnProbability: 0.9069263
    },
    {
        customerID: "1680-VDCWW",
        gender: "Male",
        tenure: 12,
        StreamingTV: "No internet service",
        StreamingMovies: "No internet service",
        PaymentMethod: "Bank transfer (automatic)",
        MonthlyCharges: 19.8,
        TotalCharges: 202.25,
        Churn: "No",
        ChurnProbability: 0.15421368
    },
    {
        customerID: "1066-JKSGK",
        gender: "Male",
        tenure: 1,
        StreamingTV: "No internet service",
        StreamingMovies: "No internet service",
        PaymentMethod: "Mailed check",
        MonthlyCharges: 20.15,
        TotalCharges: 20.15,
        Churn: "Yes",
        ChurnProbability: 0.76032585
    },
    {
        customerID: "3638-WEABW",
        gender: "Female",
        tenure: 58,
        StreamingTV: "No",
        StreamingMovies: "No",
        PaymentMethod: "Credit card (automatic)",
        MonthlyCharges: 59.9,
        TotalCharges: 3505.1,
        Churn: "No",
        ChurnProbability: 0.10603732
    },
    {
        customerID: "6322-HRPFA",
        gender: "Male",
        tenure: 49,
        StreamingTV: "No",
        StreamingMovies: "No",
        PaymentMethod: "Credit card (automatic)",
        MonthlyCharges: 59.6,
        TotalCharges: 2970.3,
        Churn: "No",
        ChurnProbability: 0.26223025
    },
    {
        customerID: "6865-JZNKO",
        gender: "Female",
        tenure: 30,
        StreamingTV: "No",
        StreamingMovies: "No",
        PaymentMethod: "Bank transfer (automatic)",
        MonthlyCharges: 55.3,
        TotalCharges: 1530.6,
        Churn: "No",
        ChurnProbability: 0.4954941
    },
    {
        customerID: "6467-CHFZW",
        gender: "Male",
        tenure: 47,
        StreamingTV: "Yes",
        StreamingMovies: "Yes",
        PaymentMethod: "Electronic check",
        MonthlyCharges: 99.35,
        TotalCharges: 4749.15,
        Churn: "Yes",
        ChurnProbability: 0.84656906
    },
    {
        customerID: "8665-UTDHZ",
        gender: "Male",
        tenure: 1,
        StreamingTV: "No",
        StreamingMovies: "No",
        PaymentMethod: "Electronic check",
        MonthlyCharges: 30.2,
        TotalCharges: 30.2,
        Churn: "Yes",
        ChurnProbability: 0.8366837
    },
    {
        customerID: "5248-YGIJN",
        gender: "Male",
        tenure: 72,
        StreamingTV: "Yes",
        StreamingMovies: "Yes",
        PaymentMethod: "Credit card (automatic)",
        MonthlyCharges: 90.25,
        TotalCharges: 6369.45,
        Churn: "No",
        ChurnProbability: 0.09493618
    },
    {
        customerID: "8773-HHUOZ",
        gender: "Female",
        tenure: 17,
        StreamingTV: "Yes",
        StreamingMovies: "Yes",
        PaymentMethod: "Mailed check",
        MonthlyCharges: 64.7,
        TotalCharges: 1093.1,
        Churn: "Yes",
        ChurnProbability: 0.70105404
    },
    {
        customerID: "3841-NFECX",
        gender: "Female",
        tenure: 71,
        StreamingTV: "No",
        StreamingMovies: "No",
        PaymentMethod: "Credit card (automatic)",
        MonthlyCharges: 96.35,
        TotalCharges: 6766.95,
        Churn: "No",
        ChurnProbability: 0.13504492
    },
    {
        customerID: "4929-XIHVW",
        gender: "Male",
        tenure: 2,
        StreamingTV: "Yes",
        StreamingMovies: "Yes",
        PaymentMethod: "Credit card (automatic)",
        MonthlyCharges: 95.5,
        TotalCharges: 181.65,
        Churn: "No",
        ChurnProbability: 0.9191465
    },
    {
        customerID: "6827-IEAUQ",
        gender: "Female",
        tenure: 27,
        StreamingTV: "No",
        StreamingMovies: "No",
        PaymentMethod: "Mailed check",
        MonthlyCharges: 66.15,
        TotalCharges: 1874.45,
        Churn: "No",
        ChurnProbability: 0.13420655
    },
    {
        customerID: "7310-EGVHZ",
        gender: "Male",
        tenure: 1,
        StreamingTV: "No internet service",
        StreamingMovies: "No internet service",
        PaymentMethod: "Bank transfer (automatic)",
        MonthlyCharges: 20.2,
        TotalCharges: 20.2,
        Churn: "No",
        ChurnProbability: 0.75904703
    },
    {
        customerID: "3413-BMNZE",
        gender: "Male",
        tenure: 1,
        StreamingTV: "No",
        StreamingMovies: "No",
        PaymentMethod: "Bank transfer (automatic)",
        MonthlyCharges: 45.25,
        TotalCharges: 45.25,
        Churn: "No",
        ChurnProbability: 0.85553116
    },
    {
        customerID: "6234-RAAPL",
        gender: "Female",
        tenure: 72,
        StreamingTV: "Yes",
        StreamingMovies: "No",
        PaymentMethod: "Bank transfer (automatic)",
        MonthlyCharges: 99.9,
        TotalCharges: 7251.7,
        Churn: "No",
        ChurnProbability: 0.11936634
    },
    {
        customerID: "6047-YHPVI",
        gender: "Male",
        tenure: 5,
        StreamingTV: "No",
        StreamingMovies: "No",
        PaymentMethod: "Electronic check",
        MonthlyCharges: 69.7,
        TotalCharges: 316.9,
        Churn: "Yes",
        ChurnProbability: 0.9272509
    },
    {
        customerID: "6572-ADKRS",
        gender: "Female",
        tenure: 46,
        StreamingTV: "No",
        StreamingMovies: "No",
        PaymentMethod: "Credit card (automatic)",
        MonthlyCharges: 74.8,
        TotalCharges: 3548.3,
        Churn: "No",
        ChurnProbability: 0.7009226
    },
    {
        customerID: "5380-WJKOV",
        gender: "Male",
        tenure: 34,
        StreamingTV: "Yes",
        StreamingMovies: "Yes",
        PaymentMethod: "Electronic check",
        MonthlyCharges: 106.35,
        TotalCharges: 3549.25,
        Churn: "Yes",
        ChurnProbability: 0.87851155
    },
    {
        customerID: "8168-UQWWF",
        gender: "Female",
        tenure: 11,
        StreamingTV: "Yes",
        StreamingMovies: "Yes",
        PaymentMethod: "Bank transfer (automatic)",
        MonthlyCharges: 97.85,
        TotalCharges: 1105.4,
        Churn: "Yes",
        ChurnProbability: 0.908322
    },
    {
        customerID: "8865-TNMNX",
        gender: "Male",
        tenure: 10,
        StreamingTV: "No",
        StreamingMovies: "No",
        PaymentMethod: "Mailed check",
        MonthlyCharges: 49.55,
        TotalCharges: 475.7,
        Churn: "No",
        ChurnProbability: 0.2368049
    },
    {
        customerID: "9489-DEDVP",
        gender: "Female",
        tenure: 70,
        StreamingTV: "Yes",
        StreamingMovies: "No",
        PaymentMethod: "Credit card (automatic)",
        MonthlyCharges: 69.2,
        TotalCharges: 4872.35,
        Churn: "No",
        ChurnProbability: 0.09016752
    },
    {
        customerID: "9867-JCZSP",
        gender: "Female",
        tenure: 17,
        StreamingTV: "No internet service",
        StreamingMovies: "No internet service",
        PaymentMethod: "Mailed check",
        MonthlyCharges: 20.75,
        TotalCharges: 418.25,
        Churn: "No",
        ChurnProbability: 0.14571576
    },
    {
        customerID: "4671-VJLCL",
        gender: "Female",
        tenure: 63,
        StreamingTV: "Yes",
        StreamingMovies: "No",
        PaymentMethod: "Credit card (automatic)",
        MonthlyCharges: 79.85,
        TotalCharges: 4861.45,
        Churn: "No",
        ChurnProbability: 0.11998107
    },
    {
        customerID: "4080-IIARD",
        gender: "Female",
        tenure: 13,
        StreamingTV: "Yes",
        StreamingMovies: "No",
        PaymentMethod: "Electronic check",
        MonthlyCharges: 76.2,
        TotalCharges: 981.45,
        Churn: "No",
        ChurnProbability: 0.6632799
    },
    {
        customerID: "3714-NTNFO",
        gender: "Female",
        tenure: 49,
        StreamingTV: "No",
        StreamingMovies: "Yes",
        PaymentMethod: "Electronic check",
        MonthlyCharges: 84.5,
        TotalCharges: 3906.7,
        Churn: "No",
        ChurnProbability: 0.84892035
    },
    {
        customerID: "5948-UJZLF",
        gender: "Male",
        tenure: 2,
        StreamingTV: "No",
        StreamingMovies: "No",
        PaymentMethod: "Mailed check",
        MonthlyCharges: 49.25,
        TotalCharges: 97.0,
        Churn: "No",
        ChurnProbability: 0.79975104
    },
    {
        customerID: "7760-OYPDY",
        gender: "Female",
        tenure: 2,
        StreamingTV: "Yes",
        StreamingMovies: "No",
        PaymentMethod: "Electronic check",
        MonthlyCharges: 80.65,
        TotalCharges: 144.15,
        Churn: "Yes",
        ChurnProbability: 0.9342358
    },
    {
        customerID: "7639-LIAYI",
        gender: "Male",
        tenure: 52,
        StreamingTV: "Yes",
        StreamingMovies: "Yes",
        PaymentMethod: "Credit card (automatic)",
        MonthlyCharges: 79.75,
        TotalCharges: 4217.8,
        Churn: "No",
        ChurnProbability: 0.1589771
    },
    {
        customerID: "2954-PIBKO",
        gender: "Female",
        tenure: 69,
        StreamingTV: "No",
        StreamingMovies: "No",
        PaymentMethod: "Credit card (automatic)",
        MonthlyCharges: 64.15,
        TotalCharges: 4254.1,
        Churn: "No",
        ChurnProbability: 0.077770494
    },
    {
        customerID: "8012-SOUDQ",
        gender: "Female",
        tenure: 43,
        StreamingTV: "Yes",
        StreamingMovies: "No",
        PaymentMethod: "Electronic check",
        MonthlyCharges: 90.25,
        TotalCharges: 3838.75,
        Churn: "No",
        ChurnProbability: 0.84878594
    },
    {
        customerID: "9420-LOJKX",
        gender: "Female",
        tenure: 15,
        StreamingTV: "Yes",
        StreamingMovies: "Yes",
        PaymentMethod: "Credit card (automatic)",
        MonthlyCharges: 99.1,
        TotalCharges: 1426.4,
        Churn: "Yes",
        ChurnProbability: 0.84224504
    },
    {
        customerID: "6575-SUVOI",
        gender: "Female",
        tenure: 25,
        StreamingTV: "Yes",
        StreamingMovies: "No",
        PaymentMethod: "Credit card (automatic)",
        MonthlyCharges: 69.5,
        TotalCharges: 1752.65,
        Churn: "No",
        ChurnProbability: 0.5045397
    },
    {
        customerID: "7495-OOKFY",
        gender: "Female",
        tenure: 8,
        StreamingTV: "No",
        StreamingMovies: "No",
        PaymentMethod: "Credit card (automatic)",
        MonthlyCharges: 80.65,
        TotalCharges: 633.3,
        Churn: "Yes",
        ChurnProbability: 0.905174
    },
    {
        customerID: "4667-QONEA",
        gender: "Female",
        tenure: 60,
        StreamingTV: "No",
        StreamingMovies: "Yes",
        PaymentMethod: "Credit card (automatic)",
        MonthlyCharges: 74.85,
        TotalCharges: 4456.35,
        Churn: "No",
        ChurnProbability: 0.27654886
    },
    {
        customerID: "1658-BYGOY",
        gender: "Male",
        tenure: 18,
        StreamingTV: "Yes",
        StreamingMovies: "Yes",
        PaymentMethod: "Electronic check",
        MonthlyCharges: 95.45,
        TotalCharges: 1752.55,
        Churn: "Yes",
        ChurnProbability: 0.9189411
    },
    {
        customerID: "8769-KKTPH",
        gender: "Female",
        tenure: 63,
        StreamingTV: "Yes",
        StreamingMovies: "Yes",
        PaymentMethod: "Credit card (automatic)",
        MonthlyCharges: 99.65,
        TotalCharges: 6311.2,
        Churn: "No",
        ChurnProbability: 0.47741058
    },
    {
        customerID: "5067-XJQFU",
        gender: "Male",
        tenure: 66,
        StreamingTV: "Yes",
        StreamingMovies: "Yes",
        PaymentMethod: "Electronic check",
        MonthlyCharges: 108.45,
        TotalCharges: 7076.35,
        Churn: "No",
        ChurnProbability: 0.6009037
    },
    {
        customerID: "3957-SQXML",
        gender: "Female",
        tenure: 34,
        StreamingTV: "No internet service",
        StreamingMovies: "No internet service",
        PaymentMethod: "Credit card (automatic)",
        MonthlyCharges: 24.95,
        TotalCharges: 894.3,
        Churn: "No",
        ChurnProbability: 0.07996204
    },
    {
        customerID: "5954-BDFSG",
        gender: "Female",
        tenure: 72,
        StreamingTV: "Yes",
        StreamingMovies: "Yes",
        PaymentMethod: "Credit card (automatic)",
        MonthlyCharges: 107.5,
        TotalCharges: 7853.7,
        Churn: "No",
        ChurnProbability: 0.3470968
    },
    {
        customerID: "0434-CSFON",
        gender: "Female",
        tenure: 47,
        StreamingTV: "Yes",
        StreamingMovies: "Yes",
        PaymentMethod: "Electronic check",
        MonthlyCharges: 100.5,
        TotalCharges: 4707.1,
        Churn: "No",
        ChurnProbability: 0.8797428
    },
    {
        customerID: "1215-FIGMP",
        gender: "Male",
        tenure: 60,
        StreamingTV: "Yes",
        StreamingMovies: "No",
        PaymentMethod: "Bank transfer (automatic)",
        MonthlyCharges: 89.9,
        TotalCharges: 5450.7,
        Churn: "No",
        ChurnProbability: 0.66658306
    },
    {
        customerID: "0526-SXDJP",
        gender: "Male",
        tenure: 72,
        StreamingTV: "No",
        StreamingMovies: "No",
        PaymentMethod: "Bank transfer (automatic)",
        MonthlyCharges: 42.1,
        TotalCharges: 2962.0,
        Churn: "No",
        ChurnProbability: 0.08677761
    },
    {
        customerID: "0557-ASKVU",
        gender: "Female",
        tenure: 18,
        StreamingTV: "No",
        StreamingMovies: "No",
        PaymentMethod: "Credit card (automatic)",
        MonthlyCharges: 54.4,
        TotalCharges: 957.1,
        Churn: "No",
        ChurnProbability: 0.22942933
    },
    {
        customerID: "5698-BQJOH",
        gender: "Female",
        tenure: 9,
        StreamingTV: "Yes",
        StreamingMovies: "Yes",
        PaymentMethod: "Electronic check",
        MonthlyCharges: 94.4,
        TotalCharges: 857.25,
        Churn: "Yes",
        ChurnProbability: 0.89671034
    },
    {
        customerID: "5122-CYFXA",
        gender: "Female",
        tenure: 3,
        StreamingTV: "Yes",
        StreamingMovies: "Yes",
        PaymentMethod: "Electronic check",
        MonthlyCharges: 75.3,
        TotalCharges: 244.1,
        Churn: "No",
        ChurnProbability: 0.81410444
    },
    {
        customerID: "8627-ZYGSZ",
        gender: "Male",
        tenure: 47,
        StreamingTV: "No",
        StreamingMovies: "No",
        PaymentMethod: "Electronic check",
        MonthlyCharges: 78.9,
        TotalCharges: 3650.35,
        Churn: "No",
        ChurnProbability: 0.49692354
    },
    {
        customerID: "3410-YOQBQ",
        gender: "Female",
        tenure: 31,
        StreamingTV: "Yes",
        StreamingMovies: "Yes",
        PaymentMethod: "Mailed check",
        MonthlyCharges: 79.2,
        TotalCharges: 2497.2,
        Churn: "No",
        ChurnProbability: 0.12893349
    },
    {
        customerID: "3170-NMYVV",
        gender: "Female",
        tenure: 50,
        StreamingTV: "No internet service",
        StreamingMovies: "No internet service",
        PaymentMethod: "Bank transfer (automatic)",
        MonthlyCharges: 20.15,
        TotalCharges: 930.9,
        Churn: "No",
        ChurnProbability: 0.0708975
    },
    {
        customerID: "7410-OIEDU",
        gender: "Male",
        tenure: 10,
        StreamingTV: "No",
        StreamingMovies: "No",
        PaymentMethod: "Mailed check",
        MonthlyCharges: 79.85,
        TotalCharges: 887.35,
        Churn: "No",
        ChurnProbability: 0.8171058
    },
    {
        customerID: "2273-QCKXA",
        gender: "Male",
        tenure: 1,
        StreamingTV: "No",
        StreamingMovies: "No",
        PaymentMethod: "Mailed check",
        MonthlyCharges: 49.05,
        TotalCharges: 49.05,
        Churn: "No",
        ChurnProbability: 0.80436283
    },
    {
        customerID: "0731-EBJQB",
        gender: "Female",
        tenure: 52,
        StreamingTV: "No internet service",
        StreamingMovies: "No internet service",
        PaymentMethod: "Electronic check",
        MonthlyCharges: 20.4,
        TotalCharges: 1090.65,
        Churn: "No",
        ChurnProbability: 0.17794594
    },
    {
        customerID: "1891-QRQSA",
        gender: "Male",
        tenure: 64,
        StreamingTV: "Yes",
        StreamingMovies: "Yes",
        PaymentMethod: "Bank transfer (automatic)",
        MonthlyCharges: 111.6,
        TotalCharges: 7099.0,
        Churn: "No",
        ChurnProbability: 0.2884233
    },
    {
        customerID: "8028-PNXHQ",
        gender: "Male",
        tenure: 62,
        StreamingTV: "No internet service",
        StreamingMovies: "No internet service",
        PaymentMethod: "Bank transfer (automatic)",
        MonthlyCharges: 24.25,
        TotalCharges: 1424.6,
        Churn: "No",
        ChurnProbability: 0.075257234
    },
    {
        customerID: "5630-AHZIL",
        gender: "Female",
        tenure: 3,
        StreamingTV: "No",
        StreamingMovies: "Yes",
        PaymentMethod: "Bank transfer (automatic)",
        MonthlyCharges: 64.5,
        TotalCharges: 177.4,
        Churn: "No",
        ChurnProbability: 0.6981737
    },
    {
        customerID: "2673-CXQEU",
        gender: "Female",
        tenure: 56,
        StreamingTV: "Yes",
        StreamingMovies: "Yes",
        PaymentMethod: "Electronic check",
        MonthlyCharges: 110.5,
        TotalCharges: 6139.5,
        Churn: "No",
        ChurnProbability: 0.6225121
    },
    {
        customerID: "6416-JNVRK",
        gender: "Female",
        tenure: 46,
        StreamingTV: "No",
        StreamingMovies: "Yes",
        PaymentMethod: "Credit card (automatic)",
        MonthlyCharges: 55.65,
        TotalCharges: 2688.85,
        Churn: "No",
        ChurnProbability: 0.28721413
    },
    {
        customerID: "5590-ZSKRV",
        gender: "Female",
        tenure: 8,
        StreamingTV: "No",
        StreamingMovies: "No",
        PaymentMethod: "Mailed check",
        MonthlyCharges: 54.65,
        TotalCharges: 482.25,
        Churn: "No",
        ChurnProbability: 0.5192223
    },
    {
        customerID: "0191-ZHSKZ",
        gender: "Male",
        tenure: 30,
        StreamingTV: "Yes",
        StreamingMovies: "Yes",
        PaymentMethod: "Electronic check",
        MonthlyCharges: 74.75,
        TotalCharges: 2111.3,
        Churn: "No",
        ChurnProbability: 0.6996341
    },
    {
        customerID: "3887-PBQAO",
        gender: "Female",
        tenure: 45,
        StreamingTV: "No internet service",
        StreamingMovies: "No internet service",
        PaymentMethod: "Credit card (automatic)",
        MonthlyCharges: 25.9,
        TotalCharges: 1216.6,
        Churn: "No",
        ChurnProbability: 0.14865881
    },
    {
        customerID: "5919-TMRGD",
        gender: "Female",
        tenure: 1,
        StreamingTV: "Yes",
        StreamingMovies: "No",
        PaymentMethod: "Electronic check",
        MonthlyCharges: 79.35,
        TotalCharges: 79.35,
        Churn: "Yes",
        ChurnProbability: 0.9322358
    },
    {
        customerID: "8108-UXRQN",
        gender: "Female",
        tenure: 11,
        StreamingTV: "Yes",
        StreamingMovies: "Yes",
        PaymentMethod: "Electronic check",
        MonthlyCharges: 50.55,
        TotalCharges: 565.35,
        Churn: "No",
        ChurnProbability: 0.6473671
    },
    {
        customerID: "9191-MYQKX",
        gender: "Female",
        tenure: 7,
        StreamingTV: "No",
        StreamingMovies: "No",
        PaymentMethod: "Bank transfer (automatic)",
        MonthlyCharges: 75.15,
        TotalCharges: 496.9,
        Churn: "Yes",
        ChurnProbability: 0.8885853
    },
    {
        customerID: "9919-YLNNG",
        gender: "Female",
        tenure: 42,
        StreamingTV: "Yes",
        StreamingMovies: "Yes",
        PaymentMethod: "Bank transfer (automatic)",
        MonthlyCharges: 103.8,
        TotalCharges: 4327.5,
        Churn: "No",
        ChurnProbability: 0.7765389
    },
    {
        customerID: "0318-ZOPWS",
        gender: "Female",
        tenure: 49,
        StreamingTV: "No internet service",
        StreamingMovies: "No internet service",
        PaymentMethod: "Bank transfer (automatic)",
        MonthlyCharges: 20.15,
        TotalCharges: 973.35,
        Churn: "No",
        ChurnProbability: 0.09380954
    },
    {
        customerID: "4445-ZJNMU",
        gender: "Male",
        tenure: 9,
        StreamingTV: "Yes",
        StreamingMovies: "Yes",
        PaymentMethod: "Credit card (automatic)",
        MonthlyCharges: 99.3,
        TotalCharges: 918.75,
        Churn: "No",
        ChurnProbability: 0.9083569
    },
    {
        customerID: "4808-YNLEU",
        gender: "Female",
        tenure: 35,
        StreamingTV: "Yes",
        StreamingMovies: "No",
        PaymentMethod: "Bank transfer (automatic)",
        MonthlyCharges: 62.15,
        TotalCharges: 2215.45,
        Churn: "No",
        ChurnProbability: 0.22398075
    },
    {
        customerID: "1862-QRWPE",
        gender: "Female",
        tenure: 48,
        StreamingTV: "No internet service",
        StreamingMovies: "No internet service",
        PaymentMethod: "Bank transfer (automatic)",
        MonthlyCharges: 20.65,
        TotalCharges: 1057.0,
        Churn: "No",
        ChurnProbability: 0.0701667
    },
    {
        customerID: "2796-NNUFI",
        gender: "Female",
        tenure: 46,
        StreamingTV: "No internet service",
        StreamingMovies: "No internet service",
        PaymentMethod: "Mailed check",
        MonthlyCharges: 19.95,
        TotalCharges: 927.1,
        Churn: "No",
        ChurnProbability: 0.08113156
    },
    {
        customerID: "3016-KSVCP",
        gender: "Male",
        tenure: 29,
        StreamingTV: "Yes",
        StreamingMovies: "No",
        PaymentMethod: "Mailed check",
        MonthlyCharges: 33.75,
        TotalCharges: 1009.25,
        Churn: "No",
        ChurnProbability: 0.49265987
    },
    {
        customerID: "4767-HZZHQ",
        gender: "Male",
        tenure: 30,
        StreamingTV: "No",
        StreamingMovies: "No",
        PaymentMethod: "Bank transfer (automatic)",
        MonthlyCharges: 82.05,
        TotalCharges: 2570.2,
        Churn: "No",
        ChurnProbability: 0.5935339
    },
    {
        customerID: "2424-WVHPL",
        gender: "Male",
        tenure: 1,
        StreamingTV: "No",
        StreamingMovies: "No",
        PaymentMethod: "Electronic check",
        MonthlyCharges: 74.7,
        TotalCharges: 74.7,
        Churn: "No",
        ChurnProbability: 0.87514895
    },
    {
        customerID: "7233-PAHHL",
        gender: "Male",
        tenure: 66,
        StreamingTV: "Yes",
        StreamingMovies: "Yes",
        PaymentMethod: "Mailed check",
        MonthlyCharges: 84.0,
        TotalCharges: 5714.25,
        Churn: "No",
        ChurnProbability: 0.10193238
    },
    {
        customerID: "6067-NGCEU",
        gender: "Female",
        tenure: 65,
        StreamingTV: "Yes",
        StreamingMovies: "Yes",
        PaymentMethod: "Credit card (automatic)",
        MonthlyCharges: 111.05,
        TotalCharges: 7107.0,
        Churn: "No",
        ChurnProbability: 0.62068063
    },
    {
        customerID: "9848-JQJTX",
        gender: "Male",
        tenure: 72,
        StreamingTV: "Yes",
        StreamingMovies: "Yes",
        PaymentMethod: "Bank transfer (automatic)",
        MonthlyCharges: 100.9,
        TotalCharges: 7459.05,
        Churn: "No",
        ChurnProbability: 0.27202487
    },
    {
        customerID: "8637-XJIVR",
        gender: "Female",
        tenure: 12,
        StreamingTV: "No",
        StreamingMovies: "No",
        PaymentMethod: "Electronic check",
        MonthlyCharges: 78.95,
        TotalCharges: 927.35,
        Churn: "Yes",
        ChurnProbability: 0.8699652
    },
    {
        customerID: "9803-FTJCG",
        gender: "Male",
        tenure: 71,
        StreamingTV: "No",
        StreamingMovies: "No",
        PaymentMethod: "Credit card (automatic)",
        MonthlyCharges: 66.85,
        TotalCharges: 4748.7,
        Churn: "No",
        ChurnProbability: 0.13578397
    },
    {
        customerID: "0278-YXOOG",
        gender: "Male",
        tenure: 5,
        StreamingTV: "No internet service",
        StreamingMovies: "No internet service",
        PaymentMethod: "Mailed check",
        MonthlyCharges: 21.05,
        TotalCharges: 113.85,
        Churn: "Yes",
        ChurnProbability: 0.57693017
    },
    {
        customerID: "3212-KXOCR",
        gender: "Male",
        tenure: 52,
        StreamingTV: "No internet service",
        StreamingMovies: "No internet service",
        PaymentMethod: "Bank transfer (automatic)",
        MonthlyCharges: 21.0,
        TotalCharges: 1107.2,
        Churn: "No",
        ChurnProbability: 0.0817122
    },
    {
        customerID: "4598-XLKNJ",
        gender: "Female",
        tenure: 25,
        StreamingTV: "Yes",
        StreamingMovies: "Yes",
        PaymentMethod: "Electronic check",
        MonthlyCharges: 98.5,
        TotalCharges: 2514.5,
        Churn: "Yes",
        ChurnProbability: 0.8812193
    }
];


customers.forEach(customer => {
    if (customer.ChurnProbability > 0.7) {
        customer.risk = "High";
    } else if (customer.ChurnProbability > 0.4) {
        customer.risk = "Medium";
    } else {
        customer.risk = "Low";
    }
});

const riskCounts = { Low: 0, Medium: 0, High: 0 };
    customers.forEach(customer => {
        riskCounts[customer.risk]++;
    });

    // Update the risk counts in the UI
    document.getElementById("lowCount").innerText = riskCounts.Low;
    document.getElementById("mediumCount").innerText = riskCounts.Medium;
    document.getElementById("highCount").innerText = riskCounts.High;

    window.customersData = customers;
});


function showCategory(riskLevel) {
    const customers = window.customersData || [];
    const tableBody = document.getElementById("customerTableBody");
    tableBody.innerHTML = "";

    // Filter customers by risk level and display them in the table
    customers.filter(customer => customer.risk === riskLevel).forEach(customer => {
        let row = `<tr onclick="redirectToCustomerDetails('${customer.customerID}')">
            <td>${customer.customerID}</td>
            <td>${customer.gender}</td>
            <td>${customer.PaymentMethod}</td>
            <td>${customer.tenure}</td>
            <td>${customer.StreamingTV}</td>
            <td>${customer.StreamingMovies}</td>
            <td>${customer.MonthlyCharges}</td>
            <td>${customer.TotalCharges}</td>
            <td>${customer.Churn}</td>
            <td>${customer.ChurnProbability}</td>
            <td>${customer.risk}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });

    // Update the table title
    document.getElementById("tableTitle").innerText = `${riskLevel} Risk Customers`;
}

function redirectToCustomerDetails(customerID) {
    window.location.href = `individual_customer.html?customerID=${encodeURIComponent(customerID)}`;
}

function showHighRiskCategory() {
    showCategory('High');
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('discountToast').style.display = 'flex';
}

function applyDiscount() {
    hideToast();
    const successToast = document.getElementById('successToast');
    successToast.style.display = 'flex';

    setTimeout(() => {
        successToast.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            successToast.style.display = 'none';
            successToast.style.animation = '';
        }, 500);
    }, 5000);
}

function hideToast() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('discountToast').style.display = 'none';
}
