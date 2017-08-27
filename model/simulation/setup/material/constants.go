package material

import (
	"github.com/Palantir/palantir/model/color"
)

// PredefinedMaterialRecord contains data needed on frontend related to PredefinedMaterials.
type PredefinedMaterialRecord struct {
	Value string      `json:"value"`
	Name  string      `json:"name"`
	Color color.Color `json:"color"`
}

// IsotopeRecord contains data needed on frontend related to Isotopes.
type IsotopeRecord struct {
	Value string `json:"value"`
	Name  string `json:"name"`
}

const waterColor = "#0093DD"

var predefinedMaterials = []PredefinedMaterialRecord{
	PredefinedMaterialRecord{"hydrogen", "1: Hydrogen", color.White},
	PredefinedMaterialRecord{"helium", "2: Helium", color.Gray},
	PredefinedMaterialRecord{"lithium", "3: Lithium", color.Gray},
	PredefinedMaterialRecord{"beryllium", "4: Beryllium", color.Gray},
	PredefinedMaterialRecord{"boron", "5: Boron", color.Gray},
	PredefinedMaterialRecord{"carbon, amorphous (density2.0 g/cm3)", "6: Carbon, Amorphous (density2.0 g/cm3)", color.Gray},
	PredefinedMaterialRecord{"graphite (density 1.7 g/cm3)", "6: Graphite (density 1.7 g/cm3)", color.Gray},
	PredefinedMaterialRecord{"nitrogen", "7: Nitrogen", color.Gray},
	PredefinedMaterialRecord{"oxygen", "8: Oxygen", color.Gray},
	PredefinedMaterialRecord{"fluorine", "9: Fluorine", color.Gray},
	PredefinedMaterialRecord{"neon", "10: Neon", color.Gray},
	PredefinedMaterialRecord{"sodium", "11: Sodium", color.Gray},
	PredefinedMaterialRecord{"magnesium", "12: Magnesium", color.Gray},
	PredefinedMaterialRecord{"aluminum", "13: Aluminum", color.Gray},
	PredefinedMaterialRecord{"silicon", "14: Silicon", color.Gray},
	PredefinedMaterialRecord{"phosphorus", "15: Phosphorus", color.Gray},
	PredefinedMaterialRecord{"sulfur", "16: Sulfur", color.Gray},
	PredefinedMaterialRecord{"chlorine", "17: Chlorine", color.Gray},
	PredefinedMaterialRecord{"argon", "18: Argon", color.Gray},
	PredefinedMaterialRecord{"potassium", "19: Potassium", color.Gray},
	PredefinedMaterialRecord{"calcium", "20: Calcium", color.Gray},
	PredefinedMaterialRecord{"scandium", "21: Scandium", color.Gray},
	PredefinedMaterialRecord{"titanium", "22: Titanium", color.Gray},
	PredefinedMaterialRecord{"vanadium", "23: Vanadium", color.Gray},
	PredefinedMaterialRecord{"chromium", "24: Chromium", color.Gray},
	PredefinedMaterialRecord{"manganese", "25: Manganese", color.Gray},
	PredefinedMaterialRecord{"iron", "26: Iron", color.Gray},
	PredefinedMaterialRecord{"cobalt", "27: Cobalt", color.Gray},
	PredefinedMaterialRecord{"nickel", "28: Nickel", color.Gray},
	PredefinedMaterialRecord{"copper", "29: Copper", color.Gray},
	PredefinedMaterialRecord{"zinc", "30: Zinc", color.Gray},
	PredefinedMaterialRecord{"gallium", "31: Gallium", color.Gray},
	PredefinedMaterialRecord{"germanium", "32: Germanium", color.Gray},
	PredefinedMaterialRecord{"arsenic", "33: Arsenic", color.Gray},
	PredefinedMaterialRecord{"selenium", "34: Selenium", color.Gray},
	PredefinedMaterialRecord{"bromine", "35: Bromine", color.Gray},
	PredefinedMaterialRecord{"krypton", "36: Krypton", color.Gray},
	PredefinedMaterialRecord{"rubidium", "37: Rubidium", color.Gray},
	PredefinedMaterialRecord{"strontium", "38: Strontium", color.Gray},
	PredefinedMaterialRecord{"yttrium", "39: Yttrium", color.Gray},
	PredefinedMaterialRecord{"zirconium", "40: Zirconium", color.Gray},
	PredefinedMaterialRecord{"niobium", "41: Niobium", color.Gray},
	PredefinedMaterialRecord{"molybdenum", "42: Molybdenum", color.Gray},
	PredefinedMaterialRecord{"technetium", "43: Technetium", color.Gray},
	PredefinedMaterialRecord{"ruthenium", "44: Ruthenium", color.Gray},
	PredefinedMaterialRecord{"rhodium", "45: Rhodium", color.Gray},
	PredefinedMaterialRecord{"palladium", "46: Palladium", color.Gray},
	PredefinedMaterialRecord{"silver", "47: Silver", color.Gray},
	PredefinedMaterialRecord{"cadmium", "48: Cadmium", color.Gray},
	PredefinedMaterialRecord{"indium", "49: Indium", color.Gray},
	PredefinedMaterialRecord{"tin", "50: Tin", color.Gray},
	PredefinedMaterialRecord{"antimony", "51: Antimony", color.Gray},
	PredefinedMaterialRecord{"tellurium", "52: Tellurium", color.Gray},
	PredefinedMaterialRecord{"iodine", "53: Iodine", color.Gray},
	PredefinedMaterialRecord{"xenon", "54: Xenon", color.Gray},
	PredefinedMaterialRecord{"cesium", "55: Cesium", color.Gray},
	PredefinedMaterialRecord{"barium", "56: Barium", color.Gray},
	PredefinedMaterialRecord{"lanthanum", "57: Lanthanum", color.Gray},
	PredefinedMaterialRecord{"cerium", "58: Cerium", color.Gray},
	PredefinedMaterialRecord{"praseodymium", "59: Praseodymium", color.Gray},
	PredefinedMaterialRecord{"neodymium", "60: Neodymium", color.Gray},
	PredefinedMaterialRecord{"promethium", "61: Promethium", color.Gray},
	PredefinedMaterialRecord{"samarium", "62: Samarium", color.Gray},
	PredefinedMaterialRecord{"europium", "63: Europium", color.Gray},
	PredefinedMaterialRecord{"gadolinium", "64: Gadolinium", color.Gray},
	PredefinedMaterialRecord{"terbium", "65: Terbium", color.Gray},
	PredefinedMaterialRecord{"dysprosium", "66: Dysprosium", color.Gray},
	PredefinedMaterialRecord{"holmium", "67: Holmium", color.Gray},
	PredefinedMaterialRecord{"erbium", "68: Erbium", color.Gray},
	PredefinedMaterialRecord{"thulium", "69: Thulium", color.Gray},
	PredefinedMaterialRecord{"ytterbium", "70: Ytterbium", color.Gray},
	PredefinedMaterialRecord{"lutetium", "71: Lutetium", color.Gray},
	PredefinedMaterialRecord{"hafnium", "72: Hafnium", color.Gray},
	PredefinedMaterialRecord{"tantalum", "73: Tantalum", color.Gray},
	PredefinedMaterialRecord{"tungsten", "74: Tungsten", color.Gray},
	PredefinedMaterialRecord{"rhenium", "75: Rhenium", color.Gray},
	PredefinedMaterialRecord{"osmium", "76: Osmium", color.Gray},
	PredefinedMaterialRecord{"iridium", "77: Iridium", color.Gray},
	PredefinedMaterialRecord{"platinum", "78: Platinum", color.Gray},
	PredefinedMaterialRecord{"gold", "79: Gold", color.Gray},
	PredefinedMaterialRecord{"mercury", "80: Mercury", color.Gray},
	PredefinedMaterialRecord{"thallium", "81: Thallium", color.Gray},
	PredefinedMaterialRecord{"lead", "82: Lead", color.Gray},
	PredefinedMaterialRecord{"bismuth", "83: Bismuth", color.Gray},
	PredefinedMaterialRecord{"polonium", "84: Polonium", color.Gray},
	PredefinedMaterialRecord{"astatine", "85: Astatine", color.Gray},
	PredefinedMaterialRecord{"radon", "86: Radon", color.Gray},
	PredefinedMaterialRecord{"francium", "87: Francium", color.Gray},
	PredefinedMaterialRecord{"radium", "88: Radium", color.Gray},
	PredefinedMaterialRecord{"actinium", "89: Actinium", color.Gray},
	PredefinedMaterialRecord{"thorium", "90: Thorium", color.Gray},
	PredefinedMaterialRecord{"protactinium", "91: Protactinium", color.Gray},
	PredefinedMaterialRecord{"uranium", "92: Uranium", color.Gray},
	PredefinedMaterialRecord{"neptunium", "93: Neptunium", color.Gray},
	PredefinedMaterialRecord{"plutonium", "94: Plutonium", color.Gray},
	PredefinedMaterialRecord{"americium", "95: Americium", color.Gray},
	PredefinedMaterialRecord{"curium", "96: Curium", color.Gray},
	PredefinedMaterialRecord{"berkelium", "97: Berkelium", color.Gray},
	PredefinedMaterialRecord{"californium", "98: Californium", color.Gray},
	PredefinedMaterialRecord{"a-150 tissue-equivalent plastic", "A-150 Tissue-Equivalent Plastic", color.Gray},
	PredefinedMaterialRecord{"acetone", "Acetone", color.Gray},
	PredefinedMaterialRecord{"acetylene", "Acetylene", color.Gray},
	PredefinedMaterialRecord{"adenine", "Adenine", color.Gray},
	PredefinedMaterialRecord{"adipose tissue (icrp)", "Adipose Tissue (ICRP)", color.Gray},
	PredefinedMaterialRecord{"air, dry (near sea level)", "Air, Dry (near sea level)", color.Gray},
	PredefinedMaterialRecord{"alanine", "Alanine", color.Gray},
	PredefinedMaterialRecord{"aluminum oxide", "Aluminum Oxide", color.Gray},
	PredefinedMaterialRecord{"amber", "Amber", color.Gray},
	PredefinedMaterialRecord{"ammonia", "Ammonia", color.Gray},
	PredefinedMaterialRecord{"aniline", "Aniline", color.Gray},
	PredefinedMaterialRecord{"anthracene", "Anthracene", color.Gray},
	PredefinedMaterialRecord{"b-100 bone-equivalent plastic", "B-100 Bone-Equivalent Plastic", color.Gray},
	PredefinedMaterialRecord{"bakelite", "Bakelite", color.Gray},
	PredefinedMaterialRecord{"barium fluoride", "Barium Fluoride", color.Gray},
	PredefinedMaterialRecord{"barium sulfate", "Barium Sulfate", color.Gray},
	PredefinedMaterialRecord{"benzene", "Benzene", color.Gray},
	PredefinedMaterialRecord{"beryllium oxide", "Beryllium oxide", color.Gray},
	PredefinedMaterialRecord{"bismuth germanium oxide", "Bismuth Germanium oxide", color.Gray},
	PredefinedMaterialRecord{"blood (icrp)", "Blood (ICRP)", color.Gray},
	PredefinedMaterialRecord{"bone, compact (icru)", "Bone, Compact (ICRU)", color.Gray},
	PredefinedMaterialRecord{"bone, cortical (icrp)", "Bone, Cortical (ICRP)", color.Gray},
	PredefinedMaterialRecord{"boron carbide", "Boron Carbide", color.Gray},
	PredefinedMaterialRecord{"boron oxide", "Boron Oxide", color.Gray},
	PredefinedMaterialRecord{"brain (icrp)", "Brain (ICRP)", color.Gray},
	PredefinedMaterialRecord{"butane", "Butane", color.Gray},
	PredefinedMaterialRecord{"n-butyl alcohol", "N-Butyl Alcohol", color.Gray},
	PredefinedMaterialRecord{"c-552 air-equivalent plastic", "C-552 Air-Equivalent Plastic", color.Gray},
	PredefinedMaterialRecord{"cadmium telluride", "Cadmium Telluride", color.Gray},
	PredefinedMaterialRecord{"cadmium tungstate", "Cadmium Tungstate", color.Gray},
	PredefinedMaterialRecord{"calcium carbonate", "Calcium Carbonate", color.Gray},
	PredefinedMaterialRecord{"calcium fluoride", "Calcium Fluoride", color.Gray},
	PredefinedMaterialRecord{"calcium oxide", "Calcium Oxide", color.Gray},
	PredefinedMaterialRecord{"calcium sulfate", "Calcium Sulfate", color.Gray},
	PredefinedMaterialRecord{"calcium tungstate", "Calcium Tungstate", color.Gray},
	PredefinedMaterialRecord{"carbon dioxide", "Carbon Dioxide", color.Gray},
	PredefinedMaterialRecord{"carbon tetrachloride", "Carbon Tetrachloride", color.Gray},
	PredefinedMaterialRecord{"cellulose acetate, cellophane", "Cellulose Acetate, Cellophane", color.Gray},
	PredefinedMaterialRecord{"cellulose acetate butyrate", "Cellulose Acetate Butyrate", color.Gray},
	PredefinedMaterialRecord{"cellulose nitrate", "Cellulose Nitrate", color.Gray},
	PredefinedMaterialRecord{"ceric sulfate dosimeter solution", "Ceric Sulfate Dosimeter Solution", color.Gray},
	PredefinedMaterialRecord{"cesium fluoride", "Cesium Fluoride", color.Gray},
	PredefinedMaterialRecord{"cesium iodide", "Cesium Iodide", color.Gray},
	PredefinedMaterialRecord{"chlorobenzene", "Chlorobenzene", color.Gray},
	PredefinedMaterialRecord{"chloroform", "Chloroform", color.Gray},
	PredefinedMaterialRecord{"concrete, portland", "Concrete, Portland", color.Gray},
	PredefinedMaterialRecord{"cyclohexane", "Cyclohexane", color.Gray},
	PredefinedMaterialRecord{"1,2-ddihlorobenzene", "1,2-Ddihlorobenzene", color.Gray},
	PredefinedMaterialRecord{"dichlorodiethyl ether", "Dichlorodiethyl Ether", color.Gray},
	PredefinedMaterialRecord{"1,2-dichloroethane", "1,2-Dichloroethane", color.Gray},
	PredefinedMaterialRecord{"diethyl ether", "Diethyl Ether", color.Gray},
	PredefinedMaterialRecord{"n,n-dimethyl formamide", "N,N-Dimethyl Formamide", color.Gray},
	PredefinedMaterialRecord{"dimethyl sulfoxide", "Dimethyl Sulfoxide", color.Gray},
	PredefinedMaterialRecord{"ethane", "Ethane", color.Gray},
	PredefinedMaterialRecord{"ethyl alcohol", "Ethyl Alcohol", color.Gray},
	PredefinedMaterialRecord{"ethyl cellulose", "Ethyl Cellulose", color.Gray},
	PredefinedMaterialRecord{"ethylene", "Ethylene", color.Gray},
	PredefinedMaterialRecord{"eye lens (icrp)", "Eye Lens (ICRP)", color.Gray},
	PredefinedMaterialRecord{"ferric oxide", "Ferric Oxide", color.Gray},
	PredefinedMaterialRecord{"ferroboride", "Ferroboride", color.Gray},
	PredefinedMaterialRecord{"ferrous oxide", "Ferrous Oxide", color.Gray},
	PredefinedMaterialRecord{"ferrous sulfate dosimeter solution", "Ferrous Sulfate Dosimeter Solution", color.Gray},
	PredefinedMaterialRecord{"freon-12", "Freon-12", color.Gray},
	PredefinedMaterialRecord{"freon-12b2", "Freon-12B2", color.Gray},
	PredefinedMaterialRecord{"freon-13", "Freon-13", color.Gray},
	PredefinedMaterialRecord{"freon-13b1", "Freon-13B1", color.Gray},
	PredefinedMaterialRecord{"freon-13i1", "Freon-13I1", color.Gray},
	PredefinedMaterialRecord{"gadolinium oxysulfide", "Gadolinium Oxysulfide", color.Gray},
	PredefinedMaterialRecord{"gallium arsenide", "Gallium Arsenide", color.Gray},
	PredefinedMaterialRecord{"gel in photographic emulsion", "Gel in Photographic Emulsion", color.Gray},
	PredefinedMaterialRecord{"glass, lead", "Glass, Lead", color.Gray},
	PredefinedMaterialRecord{"glass, plate", "Glass, Plate", color.Gray},
	PredefinedMaterialRecord{"glass, pyrex", "Glass, Pyrex", color.Gray},
	PredefinedMaterialRecord{"glucose", "Glucose", color.Gray},
	PredefinedMaterialRecord{"glutamine", "Glutamine", color.Gray},
	PredefinedMaterialRecord{"glycerol", "Glycerol", color.Gray},
	PredefinedMaterialRecord{"guanine", "Guanine", color.Gray},
	PredefinedMaterialRecord{"gypsum, plaster of paris", "Gypsum, Plaster of Paris", color.Gray},
	PredefinedMaterialRecord{"n-heptane", "N-Heptane", color.Gray},
	PredefinedMaterialRecord{"n-hexane", "N-Hexane", color.Gray},
	PredefinedMaterialRecord{"kapton polyimide film", "Kapton Polyimide Film", color.Gray},
	PredefinedMaterialRecord{"lanthanum oxybromide", "Lanthanum Oxybromide", color.Gray},
	PredefinedMaterialRecord{"lanthanum oxysulfide", "Lanthanum Oxysulfide", color.Gray},
	PredefinedMaterialRecord{"lead oxide", "Lead Oxide", color.Gray},
	PredefinedMaterialRecord{"lithium amide", "Lithium Amide", color.Gray},
	PredefinedMaterialRecord{"lithium carbonate", "Lithium Carbonate", color.Gray},
	PredefinedMaterialRecord{"lithium fluoride", "Lithium Fluoride", color.Gray},
	PredefinedMaterialRecord{"lithium hydride", "Lithium Hydride", color.Gray},
	PredefinedMaterialRecord{"lithium iodide", "Lithium Iodide", color.Gray},
	PredefinedMaterialRecord{"lithium oxide", "Lithium Oxide", color.Gray},
	PredefinedMaterialRecord{"lithium tetraborate", "Lithium Tetraborate", color.Gray},
	PredefinedMaterialRecord{"lung (icrp)", "Lung (ICRP)", color.Gray},
	PredefinedMaterialRecord{"m3 wax", "M3 Wax", color.Gray},
	PredefinedMaterialRecord{"magnesium carbonate", "Magnesium Carbonate", color.Gray},
	PredefinedMaterialRecord{"magnesium fluoride", "Magnesium Fluoride", color.Gray},
	PredefinedMaterialRecord{"magnesium oxide", "Magnesium Oxide", color.Gray},
	PredefinedMaterialRecord{"magnesium tetraborate", "Magnesium Tetraborate", color.Gray},
	PredefinedMaterialRecord{"mercuric iodide", "Mercuric Iodide", color.Gray},
	PredefinedMaterialRecord{"methane", "Methane", color.Gray},
	PredefinedMaterialRecord{"methanol", "Methanol", color.Gray},
	PredefinedMaterialRecord{"mix d wax", "Mix D Wax", color.Gray},
	PredefinedMaterialRecord{"ms20 tissue substitute", "MS20 Tissue Substitute", color.Gray},
	PredefinedMaterialRecord{"muscle, skeletal", "Muscle, Skeletal", color.Gray},
	PredefinedMaterialRecord{"muscle, striated", "Muscle, Striated", color.Gray},
	PredefinedMaterialRecord{"muscle-equivalent liquid, with sucrose", "Muscle-Equivalent Liquid, with Sucrose", color.Gray},
	PredefinedMaterialRecord{"muscle-equivalent liquid, without sucrose", "Muscle-Equivalent Liquid, without Sucrose", color.Gray},
	PredefinedMaterialRecord{"naphthalene", "Naphthalene", color.Gray},
	PredefinedMaterialRecord{"nitrobenzene", "Nitrobenzene", color.Gray},
	PredefinedMaterialRecord{"nitrous oxide", "Nitrous Oxide", color.Gray},
	PredefinedMaterialRecord{"nylon, du pont elvamide 8062", "Nylon, Du Pont ELVAmide 8062", color.Gray},
	PredefinedMaterialRecord{"nylon, type 6 and type 6/6", "Nylon, type 6 and type 6/6", color.Gray},
	PredefinedMaterialRecord{"nylon, type 6/10", "Nylon, type 6/10", color.Gray},
	PredefinedMaterialRecord{"nylon, type 11 (rilsan)", "Nylon, type 11 (Rilsan)", color.Gray},
	PredefinedMaterialRecord{"octane, liquid", "Octane, Liquid", color.Gray},
	PredefinedMaterialRecord{"paraffin wax", "Paraffin Wax", color.Gray},
	PredefinedMaterialRecord{"n-pentane", "N-Pentane", color.Gray},
	PredefinedMaterialRecord{"photographic emulsion", "Photographic Emulsion", color.Gray},
	PredefinedMaterialRecord{"plastic scintillator (vinyltoluene based)", "Plastic Scintillator (Vinyltoluene based)", color.Gray},
	PredefinedMaterialRecord{"plutonium dioxide", "Plutonium Dioxide", color.Gray},
	PredefinedMaterialRecord{"polyacrylonitrile", "Polyacrylonitrile", color.Gray},
	PredefinedMaterialRecord{"polycarbonate (makrolon, lexan)", "Polycarbonate (Makrolon, Lexan)", color.Gray},
	PredefinedMaterialRecord{"polychlorostyrene", "Polychlorostyrene", color.Gray},
	PredefinedMaterialRecord{"polyethylene", "Polyethylene", color.Gray},
	PredefinedMaterialRecord{"polyethylene terephthalate (mylar)", "Polyethylene Terephthalate (Mylar)", color.Gray},
	PredefinedMaterialRecord{"polymethyl methacralate (lucite, perspex)", "Polymethyl Methacralate (Lucite, Perspex)", color.Gray},
	PredefinedMaterialRecord{"polyoxymethylene", "Polyoxymethylene", color.Gray},
	PredefinedMaterialRecord{"polypropylene", "Polypropylene", color.Gray},
	PredefinedMaterialRecord{"polystyrene", "Polystyrene", color.Gray},
	PredefinedMaterialRecord{"polytetrafluoroethylene (teflon)", "Polytetrafluoroethylene (Teflon)", color.Gray},
	PredefinedMaterialRecord{"polytrifluorochloroethylene", "Polytrifluorochloroethylene", color.Gray},
	PredefinedMaterialRecord{"polyvinyl acetate", "Polyvinyl Acetate", color.Gray},
	PredefinedMaterialRecord{"polyvinyl alcohol", "Polyvinyl Alcohol", color.Gray},
	PredefinedMaterialRecord{"polyvinyl butyral", "Polyvinyl Butyral", color.Gray},
	PredefinedMaterialRecord{"polyvinyl chloride", "Polyvinyl Chloride", color.Gray},
	PredefinedMaterialRecord{"polyvinylidene chloride, saran", "Polyvinylidene Chloride, Saran", color.Gray},
	PredefinedMaterialRecord{"polyvinylidene fluoride", "Polyvinylidene Fluoride", color.Gray},
	PredefinedMaterialRecord{"polyvinyl pyrrolidone", "Polyvinyl Pyrrolidone", color.Gray},
	PredefinedMaterialRecord{"potassium iodide", "Potassium Iodide", color.Gray},
	PredefinedMaterialRecord{"potassium oxide", "Potassium Oxide", color.Gray},
	PredefinedMaterialRecord{"propane", "Propane", color.Gray},
	PredefinedMaterialRecord{"propane, liquid", "Propane, Liquid", color.Gray},
	PredefinedMaterialRecord{"n-propyl alcohol", "N-Propyl Alcohol", color.Gray},
	PredefinedMaterialRecord{"pyridine", "Pyridine", color.Gray},
	PredefinedMaterialRecord{"rubber, butyl", "Rubber, Butyl", color.Gray},
	PredefinedMaterialRecord{"rubber, natural", "Rubber, Natural", color.Gray},
	PredefinedMaterialRecord{"rubber, neoprene", "Rubber, Neoprene", color.Gray},
	PredefinedMaterialRecord{"silicon dioxide", "Silicon Dioxide", color.Gray},
	PredefinedMaterialRecord{"silver bromide", "Silver Bromide", color.Gray},
	PredefinedMaterialRecord{"silver chloride", "Silver Chloride", color.Gray},
	PredefinedMaterialRecord{"silver halides in photographic emulsion", "Silver Halides in Photographic Emulsion", color.Gray},
	PredefinedMaterialRecord{"silver iodide", "Silver Iodide", color.Gray},
	PredefinedMaterialRecord{"skin (icrp)", "Skin (ICRP)", color.Gray},
	PredefinedMaterialRecord{"sodium carbonate", "Sodium Carbonate", color.Gray},
	PredefinedMaterialRecord{"sodium iodide", "Sodium Iodide", color.Gray},
	PredefinedMaterialRecord{"sodium monoxide", "Sodium Monoxide", color.Gray},
	PredefinedMaterialRecord{"sodium nitrate", "Sodium Nitrate", color.Gray},
	PredefinedMaterialRecord{"stilbene", "Stilbene", color.Gray},
	PredefinedMaterialRecord{"sucrose", "Sucrose", color.Gray},
	PredefinedMaterialRecord{"terphenyl", "Terphenyl", color.Gray},
	PredefinedMaterialRecord{"testes (icrp)", "Testes (ICRP)", color.Gray},
	PredefinedMaterialRecord{"tetrachloroethylene", "Tetrachloroethylene", color.Gray},
	PredefinedMaterialRecord{"thallium chloride", "Thallium Chloride", color.Gray},
	PredefinedMaterialRecord{"tissue, soft (icrp)", "Tissue, Soft (ICRP)", color.Gray},
	PredefinedMaterialRecord{"tissue, soft (icru four-component)", "Tissue, Soft (ICRU four-component)", color.Gray},
	PredefinedMaterialRecord{"tissue-equivalent gas (methane based)", "Tissue-Equivalent GAS (Methane based)", color.Gray},
	PredefinedMaterialRecord{"tissue-equivalent gas (propane based)", "Tissue-Equivalent GAS (Propane based)", color.Gray},
	PredefinedMaterialRecord{"titanium dioxide", "Titanium Dioxide", color.Gray},
	PredefinedMaterialRecord{"toluene", "Toluene", color.Gray},
	PredefinedMaterialRecord{"trichloroethylene", "Trichloroethylene", color.Gray},
	PredefinedMaterialRecord{"triethyl phosphate", "Triethyl Phosphate", color.Gray},
	PredefinedMaterialRecord{"tungsten hexafluoride", "Tungsten Hexafluoride", color.Gray},
	PredefinedMaterialRecord{"uranium dicarbide", "Uranium Dicarbide", color.Gray},
	PredefinedMaterialRecord{"uranium monocarbide", "Uranium Monocarbide", color.Gray},
	PredefinedMaterialRecord{"uranium oxide", "Uranium Oxide", color.Gray},
	PredefinedMaterialRecord{"urea", "Urea", color.Gray},
	PredefinedMaterialRecord{"valine", "Valine", color.Gray},
	PredefinedMaterialRecord{"viton fluoroelastomer", "Viton Fluoroelastomer", color.Gray},
	PredefinedMaterialRecord{"water, liquid", "Water, Liquid", waterColor},
	PredefinedMaterialRecord{"water vapor", "Water Vapor", waterColor},
	PredefinedMaterialRecord{"xylene", "Xylene", color.Gray},
}

var isotopes = []IsotopeRecord{
	IsotopeRecord{"h-1 - hydrogen", "H-1 - Hydrogen"},
	IsotopeRecord{"h-2 - deuterium", "H-2 - Deuterium"},
	IsotopeRecord{"h-3 - tritium", "H-3 - Tritium"},
	IsotopeRecord{"he-3", "He-3"},
	IsotopeRecord{"he-4", "He-4"},
	IsotopeRecord{"li-6", "Li-6"},
	IsotopeRecord{"li-7", "Li-7"},
	IsotopeRecord{"be-9", "Be-9"},
	IsotopeRecord{"b-10", "B-10"},
	IsotopeRecord{"b-11", "B-11"},
	IsotopeRecord{"c-*", "C-*"},
	IsotopeRecord{"n-*", "N-*"},
	IsotopeRecord{"o-*", "O-*"},
	IsotopeRecord{"f-19", "F-19"},
	IsotopeRecord{"na-23", "Na-23"},
	IsotopeRecord{"mg-*", "Mg-*"},
	IsotopeRecord{"al-27", "Al-27"},
	IsotopeRecord{"si-*", "Si-*"},
	IsotopeRecord{"p-31", "P-31"},
	IsotopeRecord{"s-*", "S-*"},
	IsotopeRecord{"cl-*", "Cl-*"},
	IsotopeRecord{"ar-*", "Ar-*"},
	IsotopeRecord{"k-*", "K-*"},
	IsotopeRecord{"ca-*", "Ca-*"},
	IsotopeRecord{"ti-*", "Ti-*"},
	IsotopeRecord{"v-51", "V-51"},
	IsotopeRecord{"cr-*", "Cr-*"},
	IsotopeRecord{"mn-55", "Mn-55"},
	IsotopeRecord{"fe-*", "Fe-*"},
	IsotopeRecord{"co-59", "Co-59"},
	IsotopeRecord{"ni-*", "Ni-*"},
	IsotopeRecord{"cu-*", "Cu-*"},
	IsotopeRecord{"zn-*", "Zn-*"},
	IsotopeRecord{"ga-*", "Ga-*"},
	IsotopeRecord{"ge-*", "Ge-*"},
	IsotopeRecord{"as-75", "As-75"},
	IsotopeRecord{"nb-93", "Nb-93"},
	IsotopeRecord{"mo-*", "Mo-*"},
	IsotopeRecord{"ag-*", "Ag-*"},
	IsotopeRecord{"cd-*", "Cd-*"},
	IsotopeRecord{"sn-*", "Sn-*"},
	IsotopeRecord{"eu-*", "Eu-*"},
	IsotopeRecord{"gd-*", "Gd-*"},
	IsotopeRecord{"er-*", "Er-*"},
	IsotopeRecord{"ta-181", "Ta-181"},
	IsotopeRecord{"w-*", "W-*"},
	IsotopeRecord{"re-*", "Re-*"},
	IsotopeRecord{"au-187", "Au-187"},
	IsotopeRecord{"hg-*", "Hg-*"},
	IsotopeRecord{"pb-*", "Pb-*"},
	IsotopeRecord{"bi-209", "Bi-209"},
	IsotopeRecord{"th-232", "Th-232"},
	IsotopeRecord{"u-235", "U-235"},
	IsotopeRecord{"u-238", "U-238"},
	IsotopeRecord{"pu-239", "Pu-239"},
	IsotopeRecord{"pu-240", "Pu-240"},
}

// PredefinedMaterials return list of all available material.Predefined and Colors assigned to them.
func PredefinedMaterials() []PredefinedMaterialRecord {
	return predefinedMaterials
}

// Isotopes return list of all available isotopes for material.Element.
func Isotopes() []IsotopeRecord {
	return isotopes
}