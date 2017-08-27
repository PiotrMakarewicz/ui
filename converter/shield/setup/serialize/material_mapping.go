package serialize

import "github.com/Palantir/palantir/model/simulation/setup/material"

var predefinedMaterialsToShieldICRU = map[string]int64{
	"hydrogen":  1,
	"helium":    2,
	"lithium":   3,
	"beryllium": 4,
	"boron":     5,
	"carbon, amorphous (density2.0 g/cm3)":      6,
	"graphite (density 1.7 g/cm3)":              906,
	"nitrogen":                                  7,
	"oxygen":                                    8,
	"fluorine":                                  9,
	"neon":                                      10,
	"sodium":                                    11,
	"magnesium":                                 12,
	"aluminum":                                  13,
	"silicon":                                   14,
	"phosphorus":                                15,
	"sulfur":                                    16,
	"chlorine":                                  17,
	"argon":                                     18,
	"potassium":                                 19,
	"calcium":                                   20,
	"scandium":                                  21,
	"titanium":                                  22,
	"vanadium":                                  23,
	"chromium":                                  24,
	"manganese":                                 25,
	"iron":                                      26,
	"cobalt":                                    27,
	"nickel":                                    28,
	"copper":                                    29,
	"zinc":                                      30,
	"gallium":                                   31,
	"germanium":                                 32,
	"arsenic":                                   33,
	"selenium":                                  34,
	"bromine":                                   35,
	"krypton":                                   36,
	"rubidium":                                  37,
	"strontium":                                 38,
	"yttrium":                                   39,
	"zirconium":                                 40,
	"niobium":                                   41,
	"molybdenum":                                42,
	"technetium":                                43,
	"ruthenium":                                 44,
	"rhodium":                                   45,
	"palladium":                                 46,
	"silver":                                    47,
	"cadmium":                                   48,
	"indium":                                    49,
	"tin":                                       50,
	"antimony":                                  51,
	"tellurium":                                 52,
	"iodine":                                    53,
	"xenon":                                     54,
	"cesium":                                    55,
	"barium":                                    56,
	"lanthanum":                                 57,
	"cerium":                                    58,
	"praseodymium":                              59,
	"neodymium":                                 60,
	"promethium":                                61,
	"samarium":                                  62,
	"europium":                                  63,
	"gadolinium":                                64,
	"terbium":                                   65,
	"dysprosium":                                66,
	"holmium":                                   67,
	"erbium":                                    68,
	"thulium":                                   69,
	"ytterbium":                                 70,
	"lutetium":                                  71,
	"hafnium":                                   72,
	"tantalum":                                  73,
	"tungsten":                                  74,
	"rhenium":                                   75,
	"osmium":                                    76,
	"iridium":                                   77,
	"platinum":                                  78,
	"gold":                                      79,
	"mercury":                                   80,
	"thallium":                                  81,
	"lead":                                      82,
	"bismuth":                                   83,
	"polonium":                                  84,
	"astatine":                                  85,
	"radon":                                     86,
	"francium":                                  87,
	"radium":                                    88,
	"actinium":                                  89,
	"thorium":                                   90,
	"protactinium":                              91,
	"uranium":                                   92,
	"neptunium":                                 93,
	"plutonium":                                 94,
	"americium":                                 95,
	"curium":                                    96,
	"berkelium":                                 97,
	"californium":                               98,
	"a-150 tissue-equivalent plastic":           99,
	"acetone":                                   100,
	"acetylene":                                 101,
	"adenine":                                   102,
	"adipose tissue (icrp)":                     103,
	"air, dry (near sea level)":                 104,
	"alanine":                                   105,
	"aluminum oxide":                            106,
	"amber":                                     107,
	"ammonia":                                   108,
	"aniline":                                   109,
	"anthracene":                                110,
	"b-100 bone-equivalent plastic":             111,
	"bakelite":                                  112,
	"barium fluoride":                           113,
	"barium sulfate":                            114,
	"benzene":                                   115,
	"beryllium oxide":                           116,
	"bismuth germanium oxide":                   117,
	"blood (icrp)":                              118,
	"bone, compact (icru)":                      119,
	"bone, cortical (icrp)":                     120,
	"boron carbide":                             121,
	"boron oxide":                               122,
	"brain (icrp)":                              123,
	"butane":                                    124,
	"n-butyl alcohol":                           125,
	"c-552 air-equivalent plastic":              126,
	"cadmium telluride":                         127,
	"cadmium tungstate":                         128,
	"calcium carbonate":                         129,
	"calcium fluoride":                          130,
	"calcium oxide":                             131,
	"calcium sulfate":                           132,
	"calcium tungstate":                         133,
	"carbon dioxide":                            134,
	"carbon tetrachloride":                      135,
	"cellulose acetate, cellophane":             136,
	"cellulose acetate butyrate":                137,
	"cellulose nitrate":                         138,
	"ceric sulfate dosimeter solution":          139,
	"cesium fluoride":                           140,
	"cesium iodide":                             141,
	"chlorobenzene":                             142,
	"chloroform":                                143,
	"concrete, portland":                        144,
	"cyclohexane":                               145,
	"1,2-ddihlorobenzene":                       146,
	"dichlorodiethyl ether":                     147,
	"1,2-dichloroethane":                        148,
	"diethyl ether":                             149,
	"n,n-dimethyl formamide":                    150,
	"dimethyl sulfoxide":                        151,
	"ethane":                                    152,
	"ethyl alcohol":                             153,
	"ethyl cellulose":                           154,
	"ethylene":                                  155,
	"eye lens (icrp)":                           156,
	"ferric oxide":                              157,
	"ferroboride":                               158,
	"ferrous oxide":                             159,
	"ferrous sulfate dosimeter solution":        160,
	"freon-12":                                  161,
	"freon-12b2":                                162,
	"freon-13":                                  163,
	"freon-13b1":                                164,
	"freon-13i1":                                165,
	"gadolinium oxysulfide":                     166,
	"gallium arsenide":                          167,
	"gel in photographic emulsion":              168,
	"glass, lead":                               169,
	"glass, plate":                              170,
	"glass, pyrex":                              171,
	"glucose":                                   172,
	"glutamine":                                 173,
	"glycerol":                                  174,
	"guanine":                                   175,
	"gypsum, plaster of paris":                  176,
	"n-heptane":                                 177,
	"n-hexane":                                  178,
	"kapton polyimide film":                     179,
	"lanthanum oxybromide":                      180,
	"lanthanum oxysulfide":                      181,
	"lead oxide":                                182,
	"lithium amide":                             183,
	"lithium carbonate":                         184,
	"lithium fluoride":                          185,
	"lithium hydride":                           186,
	"lithium iodide":                            187,
	"lithium oxide":                             188,
	"lithium tetraborate":                       189,
	"lung (icrp)":                               190,
	"m3 wax":                                    191,
	"magnesium carbonate":                       192,
	"magnesium fluoride":                        193,
	"magnesium oxide":                           194,
	"magnesium tetraborate":                     195,
	"mercuric iodide":                           196,
	"methane":                                   197,
	"methanol":                                  198,
	"mix d wax":                                 199,
	"ms20 tissue substitute":                    200,
	"muscle, skeletal":                          201,
	"muscle, striated":                          202,
	"muscle-equivalent liquid, with sucrose":    203,
	"muscle-equivalent liquid, without sucrose": 204,
	"naphthalene":                               205,
	"nitrobenzene":                              206,
	"nitrous oxide":                             207,
	"nylon, du pont elvamide 8062":              208,
	"nylon, type 6 and type 6/6":                209,
	"nylon, type 6/10":                          210,
	"nylon, type 11 (rilsan)":                   211,
	"octane, liquid":                            212,
	"paraffin wax":                              213,
	"n-pentane":                                 214,
	"photographic emulsion":                     215,
	"plastic scintillator (vinyltoluene based)": 216,
	"plutonium dioxide":                         217,
	"polyacrylonitrile":                         218,
	"polycarbonate (makrolon, lexan)":           219,
	"polychlorostyrene":                         220,
	"polyethylene":                              221,
	"polyethylene terephthalate (mylar)":        222,
	"polymethyl methacralate (lucite, perspex)": 223,
	"polyoxymethylene":                          224,
	"polypropylene":                             225,
	"polystyrene":                               226,
	"polytetrafluoroethylene (teflon)":          227,
	"polytrifluorochloroethylene":               228,
	"polyvinyl acetate":                         229,
	"polyvinyl alcohol":                         230,
	"polyvinyl butyral":                         231,
	"polyvinyl chloride":                        232,
	"polyvinylidene chloride, saran":            233,
	"polyvinylidene fluoride":                   234,
	"polyvinyl pyrrolidone":                     235,
	"potassium iodide":                          236,
	"potassium oxide":                           237,
	"propane":                                   238,
	"propane, liquid":                           239,
	"n-propyl alcohol":                          240,
	"pyridine":                                  241,
	"rubber, butyl":                             242,
	"rubber, natural":                           243,
	"rubber, neoprene":                          244,
	"silicon dioxide":                           245,
	"silver bromide":                            246,
	"silver chloride":                           247,
	"silver halides in photographic emulsion":   248,
	"silver iodide":                             249,
	"skin (icrp)":                               250,
	"sodium carbonate":                          251,
	"sodium iodide":                             252,
	"sodium monoxide":                           253,
	"sodium nitrate":                            254,
	"stilbene":                                  255,
	"sucrose":                                   256,
	"terphenyl":                                 257,
	"testes (icrp)":                             258,
	"tetrachloroethylene":                       259,
	"thallium chloride":                         260,
	"tissue, soft (icrp)":                       261,
	"tissue, soft (icru four-component)":        262,
	"tissue-equivalent gas (methane based)":     263,
	"tissue-equivalent gas (propane based)":     264,
	"titanium dioxide":                          265,
	"toluene":                                   266,
	"trichloroethylene":                         267,
	"triethyl phosphate":                        268,
	"tungsten hexafluoride":                     269,
	"uranium dicarbide":                         270,
	"uranium monocarbide":                       271,
	"uranium oxide":                             272,
	"urea":                                      273,
	"valine":                                    274,
	"viton fluoroelastomer":                     275,
	"water, liquid":                             276,
	"water vapor":                               277,
	"xylene":                                    278,
}

var isotopesToShieldNUCLID = map[string]int64{
	"h-1 - hydrogen":  1,
	"h-2 - deuterium": 101,
	"h-3 - tritium":   102,
	"he-3":            104,
	"he-4":            2,
	"li-6":            105,
	"li-7":            3,
	"be-9":            4,
	"b-10":            106,
	"b-11":            5,
	"c-*":             6,
	"n-*":             7,
	"o-*":             8,
	"f-19":            9,
	"na-23":           11,
	"mg-*":            12,
	"al-27":           13,
	"si-*":            14,
	"p-31":            15,
	"s-*":             16,
	"cl-*":            17,
	"ar-*":            18,
	"k-*":             19,
	"ca-*":            20,
	"ti-*":            22,
	"v-51":            23,
	"cr-*":            24,
	"mn-55":           25,
	"fe-*":            26,
	"co-59":           27,
	"ni-*":            28,
	"cu-*":            29,
	"zn-*":            30,
	"ga-*":            31,
	"ge-*":            32,
	"as-75":           33,
	"nb-93":           41,
	"mo-*":            42,
	"ag-*":            47,
	"cd-*":            48,
	"sn-*":            50,
	"eu-*":            63,
	"gd-*":            64,
	"er-*":            68,
	"ta-181":          73,
	"w-*":             74,
	"re-*":            75,
	"au-187":          79,
	"hg-*":            80,
	"pb-*":            82,
	"bi-209":          83,
	"th-232":          90,
	"u-235":           103,
	"u-238":           92,
	"pu-239":          94,
	"pu-240":          107,
}

var stateOfMatterToShield = map[material.StateOfMatter]int64{
	material.Solid:  0,
	material.Gas:    1,
	material.Liquid: 2,
}