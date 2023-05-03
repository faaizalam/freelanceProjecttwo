import puppeteer from 'puppeteer';
import { Acceptcookies, OpenWebsite, SearchName } from './helper.js';
const url = "https://www.joboo.de/de/jobs-finden/suchformular";
const company = "Kellner";

const city = [
  "Arnstein", "Freudenberg", "Lichtenfels", "Lorch", "Waldenburg",
  "Aach", "Aachen", "Aalen", "Abenberg", "Abensberg", "Achern", "Achim", "Adelsheim", "Adenau", "Adorf", "Vogtl",
  "Ahaus", "Ahlen", "Ahrensburg", "Aichach", "Aichtal", "Aken", "Albstadt", "Alfeld", "Allendorf", "Allstedt",
  "Alpirsbach", "Alsdorf", "Alsfeld", "Alsleben", "AltdorfbeiNürnberg", "Altena", "Altenberg", "Altenburg", "Altenkirchen", "Altensteig", "Altentreptow",
  "Altlandsberg", "Altötting", "Alzenau", "Alzey", "Amberg", "Amorbach", "AmtCreuzburg",
  "Amöneburg", "An der Schmücke", "Andernach", "Angermünde", "Anklam", "Annaberg-Buchholz",
  "Annaburg", "AnnweileramTrifels", "Ansbach", "Apolda", "Arendsee", "Arneburg", "Arnis",
  "Arnsberg", "Arnstadt", "Artern", "Arzberg", "Aschaffenburg", "Aschersleben", "Asperg",
  "Attendorn", "Aub", "Aue-BadSchlema", "Auerbach in der Oberpfalz", "Auerbach", "Vogtl",
  "Augsburg", "Augustusburg", "Aulendorf", "Auma-Weidatal", "Aurich", "Aßlar", "Babenhausen",
  "Bacharach", "Backnang", "BadAibling", "BadArolsen", "BadBelzig", "BadBentheim",
  "BadBergzabern", "BadBerka", "BadBerleburg", "BadBerneckimFichtelgebirge", "BadBevensen",
  "BadBibra", "BadBlankenburg", "BadBramstedt", "BadBreisig", "BadBrückenau", "BadBuchau",
  "BadCamberg", "BadDoberan", "BadDriburg", "BadDüben", "BadDürkheim", "BadDürrenberg", "BadDürrheim",
  "BadElster", "BadEms", "BadFallingbostel", "BadFrankenhausen", "Kyffhäuser", "BadFreienwalde",
  "BadFriedrichshall", "BadGandersheim", "BadGottleuba-Berggießhübel", "BadGriesbachimRottal",
  "BadHarzburg", "BadHerrenalb", "BadHersfeld", "BadHomburgvorderHöhe", "BadHonnef", "BadHönningen",
  "BadIburg", "BadKarlshafen", "BadKissingen", "BadKreuznach", "BadKrozingen", "BadKönig","Dahlen", "Dahme", "Mark", "Dahn", "Damme", "Dannenbe rg", "Dargun", "Darmstadt", "Dassel", "Dassow",
  "Datteln", "Daun", "Deggendorf", "Deidesheim", "Delbrück", "Delitzsch", "Delmenhorst", "Demmin",
  "Dessau-Roßlau", "Detmold", "Dettelbach","Dieburg", "Diemelstadt", "Diepholz", "Dierdorf", "Dietenheim",
  "DietfurtanderAltmühl", "Dietzenbach", "Diez", "Dillenburg", "Dillingen an derDonau", "Dillingen", "Saar", "Dingelstädt", "Dingolfing", "Dinkelsbühl", "Dinklage", "Dinslaken", "Dippoldiswalde",
  "Dissen am Teutoburger Wald", "Ditzingen", "Doberlug-Kirchhain", "Dohna", "Dommitzsch", "Donaueschingen",
  "Donauwörth", "Donz dorf", "Dorfen", "Dormagen", "Dornburg-Camburg", "Dornhan", "Dornstetten",
  "Dorsten", "Dortmund", "Dransfel d", "Drebkau", "Dreieich", "Drensteinfurt", "Dresden", "Drolshagen",
  "Forst", "Frankenau", "Frankenberg", "Frankenberg", "Sa.", "Frankenthal", "Frankfurt",
  "FrankfurtamMain", "Franzburg", "Frauenstein", "Frechen", "Freiberg", "Freiberg amNeckar", "FreiburgimBreisgau", "Freilassing", "Freinsheim", "Freising", "Freital", "Freren", "Freudenstadt", "Freyburg", "Freystadt", "Freyung", "Fridingen an der Donau", "Friedberg", "Friedberg", "Friedrichroda", "Friedrichsdorf", "Friedrichshafen", "Friedrichstadt", "Friedr ichsthal", "Friesack", "Friesoythe", "Fritzlar", "Frohburg", "Fröndenberg", "Ruhr", "Fulda", "FurthimWald", "FurtwangenimSchwarzwald", "Fürstenau", "Fürstenberg", "Havel", "Fürstenfeldbruck", "Fürstenwalde", "Spree", "Fürth", "Füssen", "Gadebusch", "Gaggenau", "Gaildorf", "Gammertingen", "Garbsen", "GarchingbeiMünchen", "Gardelegen", "Garding", "Gartz", "Garz",
  "Rügen", "Gau-Algesheim", "Gebesee", "Gedern", "Geestha cht", "Geestland", "Gefell", "Gefrees",
  "Gehrden", "Geilenkirchen", "Geisa", "Geiselhöring", "Geisenfeld", "Geisen heim", "Geisingen",
  "Geislingen", "GeislingenanderSteige", "Geithain", "Geldern", "Gelnhausen", "Gelsenkirchen", "Gemünden", "Gemünden am Main", "Gengenbach", "Genthin", "Georgsmarienhütte", "Gera", "Gerabronn",
  "Gerbstedt", "Geretsried", "Gerin gswalde", "Gerlingen", "Germering", "Germersheim", "Gernsbach",
  "Gernsheim", "Gerolstein", "Gerolzhofen", "Gersfeld", "Gersthofen", "Gescher", "Geseke", "Gevelsberg",
  "Geyer", "Giengen an der Brenz", "Gießen", "Gifhorn", "Ginsheim - Gustavsburg", "Gladbeck", "Gladenbach",
  "Glashütte", "Glauchau", "Gli nde", "Glücksburg", "Glückstadt", "Gnoien", "Goch", "Goldberg",
  "Goldkronach", "Golßen", "Gommern", "Goslar", "Gotha", "Grabow", "Grafenau", "Grafenwöhr",
  "GrafingbeiMünchen", "Gransee", "Grebenau", "Grebenstein", "Greding", "Greifswald", "Greiz",
  "Greußen", "Greven", "Greve nbroich", "Grevesmühlen", "Griesheim", "Grimma", "Grimmen",
  "Groitzsch", "Gronau", "Gronau", "Groß-Bieber au", "Groß-Gerau", "Groß-Umstadt", "Großalmerode",
  "Großbottwar", "Großbreitenbach", "Großenhain", "Gr oßräschen", "Großröhrsdorf", "Großschirma",
  "Pasewalk", "Passau", "Pattensen","Pausa - Mühltroff", "Pegau", "Pegnitz", "Peine", "Peitz", "Penig", "Penkun", "Penzberg", "Penzlin",
  "Perleberg", "Petershagen", "Pfaffenhofen an der Ilm", "Pfarrkirchen", "Pforzheim", "Pfreimd","Pfullendorf", "Pfullingen", "Pfungstadt", "Philippsburg", "Pinneberg", "Pirmasens", "Pirna",
  "Plattling", "Plaue", "Plauen", "Plettenberg", "Pleystein", "Plochingen", "Plön", "Pockau-Lengefeld",
  "Pocking", "Pohlhei m", "Polch", "Porta Westfalica", "Potsdam", "Pottenstein", "Preetz", "Premnitz", "Rochlitz", "Rockenhausen", "Rodalben", "Rodenberg", "Rodewisch", "R odgau", "Roding", "Romrod",
  "Ronneburg", "Ronnenberg", "Rosbach vor der Höhe", "Rosenfeld", "Rosenheim", "Rosenthal", "Rostock", "Rotenburg", "RotenburganderFulda", "Roth", "RothenburgobderTauber", "Rothenburg", "O.L.", "Rothenfels", "Rottenburga.d.Laaber", "Rottenburg am Neckar",
  "Rottweil", "Roßleben-Wiehe", "Roßwein", "Rudolstadt", "Ruhla", "Ruhland", "Runkel", "Rutesheim", "Rö bel", "Müritz", "Rödental", "Rödermark", "Römhild", "Rösrath", "Rötha", "RöthenbachanderPegnitz", "Röttingen", "Rötz", "RüdesheimamRhein", "Rüsselsheim am Main", "Rüthen", "Saalburg-Ebersdorf", "Saalfeld", "Saale", "Saarbrücken", "Saarburg", "Saarlouis", "Sachsenh agen", "Sachsenheim", "Salzgitter", "Salzkotten", "Salzwedel", "Sandau", "Sandersdorf-Brehna", "Sangerhau sen", "SanktAugustin", "Sankt Goar", "SanktGoarshausen",
  "Winsen", "Winterberg", "Wipperfürth", "Wirges", "Wismar", "Wissen", "Witten", "Wittenberg", "Wittenberge", "Wittenburg", "Wittichenau", "Wittingen", "Wittlich", "Wittmund", "Wittstock", "Dosse", "Witzenhausen", "Woldegk", "Wolfach", "Wolfenbüttel", "Wolfhagen", "Wolframs - Eschenbach", "Wol fratshausen", "Wolfsburg", "Wolfstein", "Wolgast", "Wolkenstein", "Wolmirstedt", "Worms", "Wriezen", "Wunsied el", "Wunstorf", "Wuppertal", "Wurzbach", "Wurzen", "Wustrow", "WykaufFöhr", "Wächtersbach", "Wörrstadt", "WörthamMain", "WörthamRhein", "WörthanderDonau", "Wülfrath", "Würselen", "Würzburg", "Xanten", "Zahna - Elster", "ZarrentinamSchaalsee", "Zehdenick", "ZeilamMain", "Zeitz", "Zell", "ZellamHarmersbach", "ZellimWiesental",
];
const pup = async () => {
  const browser = await puppeteer.launch({
    headless: false,

    defaultViewport: null,
    args: ["--start-maximized"]

  });

  const page = await browser.newPage();
  await page.setViewport({
    width: 1400,
    height: 900,
    deviceScaleFactor: 2,
  });
  try {
    await OpenWebsite(url, page)

    await Acceptcookies(url, page)
    // await gettingproductname(page)
    await SearchName(company, city, page, browser)
  } catch (error) {
    console.log(error.message, "your connection is not eligible to run this code try later")

  }
}
pup()