// Genuine NASA Global Precipitation Measurement (GPM) dataset sample
// Product: GPM IMERG Early Precipitation L3 Half Hourly 0.1 degree x 0.1 degree V07 (GPM_3IMERGHHE)
// Source: NASA GES DISC (https://gis.earthdata.nasa.gov/portal/rest/services/GESDISC/GPM_3IMERGHHE/ImageServer)
// DOI: https://doi.org/10.5067/GPM/IMERG/3B-HH-E/07

export const gpmPrecipitationData = {
  "metadata": {
    "datasetName": "GPM IMERG Early Precipitation L3 Half Hourly 0.1 degree x 0.1 degree V07",
    "shortName": "GPM_3IMERGHHE",
    "version": "07",
    "mission": "NASA Global Precipitation Measurement (GPM)",
    "sourceAttribution": "NASA GES DISC (Goddard Earth Sciences Data and Information Services Center)",
    "dataSourceUrl": "https://gis.earthdata.nasa.gov/portal/rest/services/GESDISC/GPM_3IMERGHHE/ImageServer",
    "doi": "https://doi.org/10.5067/GPM/IMERG/3B-HH-E/07",
    "citation": "Huffman, G.J., et al., 2024: GPM IMERG Early Precipitation L3 Half Hourly 0.1 degree x 0.1 degree V07, Greenbelt, MD, Goddard Earth Sciences Data and Information Services Center (GES DISC).",
    "units": "mm/hr",
    "unitDescription": "Millimeters per hour (precipitation rate)",
    "spatialResolution": "0.1\u00b0 \u00d7 0.1\u00b0 (approx. 10 km \u00d7 10 km)",
    "temporalResolution": "Hourly sampling from half-hourly observations",
    "eventName": "Hurricane Ida Extratropical Passage (Historic Rainfall)",
    "location": {
      "name": "Central New Jersey / NYC Metropolitan Area",
      "latitude": 40.54,
      "longitude": -74.65
    },
    "period": {
      "start": "2021-09-01T12:00:00+00:00",
      "end": "2021-09-02T12:00:00+00:00",
      "duration": "24 hours",
      "sampleCount": 25
    },
    "summary": {
      "maxPrecipitationMmPerHour": 10.22,
      "maxPrecipitationTimestamp": "2021-09-01T23:00:00+00:00",
      "maxPrecipitationTimeDisplay": "Sep 01, 23:00 UTC",
      "averagePrecipitationMmPerHour": 2.67
    }
  },
  "valuesArray": [
    3.48,
    0.51,
    1.18,
    0.6,
    0.23,
    0.3,
    0.93,
    0.23,
    0.92,
    10.05,
    6.69,
    10.22,
    9.9,
    4.99,
    9.78,
    5.67,
    0.96,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0,
    0.0
  ],
  "measurements": [
    {
      "step": 0,
      "timestamp": "2021-09-01T12:00:00+00:00",
      "timeDisplay": "Sep 01, 12:00 UTC",
      "epochMs": 1630497600000,
      "precipitationRateMmPerHour": 3.48
    },
    {
      "step": 1,
      "timestamp": "2021-09-01T13:00:00+00:00",
      "timeDisplay": "Sep 01, 13:00 UTC",
      "epochMs": 1630501200000,
      "precipitationRateMmPerHour": 0.51
    },
    {
      "step": 2,
      "timestamp": "2021-09-01T14:00:00+00:00",
      "timeDisplay": "Sep 01, 14:00 UTC",
      "epochMs": 1630504800000,
      "precipitationRateMmPerHour": 1.18
    },
    {
      "step": 3,
      "timestamp": "2021-09-01T15:00:00+00:00",
      "timeDisplay": "Sep 01, 15:00 UTC",
      "epochMs": 1630508400000,
      "precipitationRateMmPerHour": 0.6
    },
    {
      "step": 4,
      "timestamp": "2021-09-01T16:00:00+00:00",
      "timeDisplay": "Sep 01, 16:00 UTC",
      "epochMs": 1630512000000,
      "precipitationRateMmPerHour": 0.23
    },
    {
      "step": 5,
      "timestamp": "2021-09-01T17:00:00+00:00",
      "timeDisplay": "Sep 01, 17:00 UTC",
      "epochMs": 1630515600000,
      "precipitationRateMmPerHour": 0.3
    },
    {
      "step": 6,
      "timestamp": "2021-09-01T18:00:00+00:00",
      "timeDisplay": "Sep 01, 18:00 UTC",
      "epochMs": 1630519200000,
      "precipitationRateMmPerHour": 0.93
    },
    {
      "step": 7,
      "timestamp": "2021-09-01T19:00:00+00:00",
      "timeDisplay": "Sep 01, 19:00 UTC",
      "epochMs": 1630522800000,
      "precipitationRateMmPerHour": 0.23
    },
    {
      "step": 8,
      "timestamp": "2021-09-01T20:00:00+00:00",
      "timeDisplay": "Sep 01, 20:00 UTC",
      "epochMs": 1630526400000,
      "precipitationRateMmPerHour": 0.92
    },
    {
      "step": 9,
      "timestamp": "2021-09-01T21:00:00+00:00",
      "timeDisplay": "Sep 01, 21:00 UTC",
      "epochMs": 1630530000000,
      "precipitationRateMmPerHour": 10.05
    },
    {
      "step": 10,
      "timestamp": "2021-09-01T22:00:00+00:00",
      "timeDisplay": "Sep 01, 22:00 UTC",
      "epochMs": 1630533600000,
      "precipitationRateMmPerHour": 6.69
    },
    {
      "step": 11,
      "timestamp": "2021-09-01T23:00:00+00:00",
      "timeDisplay": "Sep 01, 23:00 UTC",
      "epochMs": 1630537200000,
      "precipitationRateMmPerHour": 10.22
    },
    {
      "step": 12,
      "timestamp": "2021-09-02T00:00:00+00:00",
      "timeDisplay": "Sep 02, 00:00 UTC",
      "epochMs": 1630540800000,
      "precipitationRateMmPerHour": 9.9
    },
    {
      "step": 13,
      "timestamp": "2021-09-02T01:00:00+00:00",
      "timeDisplay": "Sep 02, 01:00 UTC",
      "epochMs": 1630544400000,
      "precipitationRateMmPerHour": 4.99
    },
    {
      "step": 14,
      "timestamp": "2021-09-02T02:00:00+00:00",
      "timeDisplay": "Sep 02, 02:00 UTC",
      "epochMs": 1630548000000,
      "precipitationRateMmPerHour": 9.78
    },
    {
      "step": 15,
      "timestamp": "2021-09-02T03:00:00+00:00",
      "timeDisplay": "Sep 02, 03:00 UTC",
      "epochMs": 1630551600000,
      "precipitationRateMmPerHour": 5.67
    },
    {
      "step": 16,
      "timestamp": "2021-09-02T04:00:00+00:00",
      "timeDisplay": "Sep 02, 04:00 UTC",
      "epochMs": 1630555200000,
      "precipitationRateMmPerHour": 0.96
    },
    {
      "step": 17,
      "timestamp": "2021-09-02T05:00:00+00:00",
      "timeDisplay": "Sep 02, 05:00 UTC",
      "epochMs": 1630558800000,
      "precipitationRateMmPerHour": 0.0
    },
    {
      "step": 18,
      "timestamp": "2021-09-02T06:00:00+00:00",
      "timeDisplay": "Sep 02, 06:00 UTC",
      "epochMs": 1630562400000,
      "precipitationRateMmPerHour": 0.0
    },
    {
      "step": 19,
      "timestamp": "2021-09-02T07:00:00+00:00",
      "timeDisplay": "Sep 02, 07:00 UTC",
      "epochMs": 1630566000000,
      "precipitationRateMmPerHour": 0.0
    },
    {
      "step": 20,
      "timestamp": "2021-09-02T08:00:00+00:00",
      "timeDisplay": "Sep 02, 08:00 UTC",
      "epochMs": 1630569600000,
      "precipitationRateMmPerHour": 0.0
    },
    {
      "step": 21,
      "timestamp": "2021-09-02T09:00:00+00:00",
      "timeDisplay": "Sep 02, 09:00 UTC",
      "epochMs": 1630573200000,
      "precipitationRateMmPerHour": 0.0
    },
    {
      "step": 22,
      "timestamp": "2021-09-02T10:00:00+00:00",
      "timeDisplay": "Sep 02, 10:00 UTC",
      "epochMs": 1630576800000,
      "precipitationRateMmPerHour": 0.0
    },
    {
      "step": 23,
      "timestamp": "2021-09-02T11:00:00+00:00",
      "timeDisplay": "Sep 02, 11:00 UTC",
      "epochMs": 1630580400000,
      "precipitationRateMmPerHour": 0.0
    },
    {
      "step": 24,
      "timestamp": "2021-09-02T12:00:00+00:00",
      "timeDisplay": "Sep 02, 12:00 UTC",
      "epochMs": 1630584000000,
      "precipitationRateMmPerHour": 0.0
    }
  ]
};

// Direct access array for Phase 4 sonification (rainfall rate values in mm/hr)
export const rainfallValues = gpmPrecipitationData.valuesArray;

export default gpmPrecipitationData;
