import puppeteer from 'puppeteer';
import { Acceptcookies, OpenWebsite, SearchName } from './helper.js';
const url = "https://www.joboo.de/de/jobs-finden/suchformular";
const company = "Kellner";
const city = [
  "Arnstein","Freudenberg", "Lichtenfels", "Lorch", "Waldenburg",
  "Aach", "Aachen", "Aalen", "Abenberg", "Abensberg", "Achern", "Achim", "Adelsheim", "Adenau", "Adorf", "Vogtl",
  "Ahaus", "Ahlen", "Ahrensburg", "Aichach", "Aichtal", "Aken", "Albstadt", "Alfeld", "Allendorf", "Allstedt",
  "Alpirsbach", "Alsdorf", "Alsfeld", "Alsleben", "AltdorfbeiNürnberg", "Altena", "Altenberg",
  "Altenburg",
  "Altenkirchen", "Altensteig", "Altentreptow",
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
  "BadIburg", "BadKarlshafen", "BadKissingen", "BadKreuznach", "BadKrozingen", "BadKönig",
  "BadKönigshofenimGrabfeld", "BadKöstritz", "BadKötzting", "BadLaasphe", "BadLangensalza", "BadLauchstädt",
  "BadLausick", "BadLauterbergimHarz", "BadLiebenstein", "Bad Liebenwerda", "BadLiebenzell",
  "BadLippspringe", "BadLobenstein", "BadMarienberg", "BadMergentheim", "BadMuskau",
  "BadMünderamDeister", "BadMünstereifel", "BadNauheim", "BadNenndorf", "BadNeuenahr-Ahrweiler",
  "BadNeustadtanderSaale", "BadOeynhausen", "BadOldesloe", "BadOrb", "BadPyrmont", "BadRappenau",
  "BadReichenhall", "BadRodach", "BadSachsa", "BadSalzdetfurth", "BadSalzuflen", "BadSalzungen",
  "Bad Saulgau", "BadSchandau", "BadSchmiedeberg", "BadSchussenried", "BadSchwalbach", "BadSchwartau",
  "BadSegeberg", "BadSobernheim", "BadSodenamTaunus", "BadSoden-Salmünster", "BadSooden-Allendorf",
  "BadStaffelstein", "BadSulza", "BadSäckingen", "BadSülze", "BadTeinach-Zavelstein", "BadTennstedt",
  "BadTölz", "BadUrach", "BadVilbel", "BadWaldsee", "BadWildbad", "BadWildungen", "BadWilsnack",
  "BadWimpfen", "BadWindsheim", "BadWurzach", "BadWörishofen", "Bad Wünnenberg", "Baden-Baden",
  "Baesweiler", "Baiersdorf", "Balingen", "Ballenstedt", "Balve", "Bamberg", "Barby", "Bargteheide",
  "Barmstedt", "Barntrup", "Barsinghausen", "Barth", "Baruth", "Mark", "Bassum", "Battenberg",
  "Ba umholder", "Baunach", "Baunatal", "Bautzen", "Bayreuth", "Bebra", "Beckum", "Bedburg",
  "Beelitz", "Beeskow", "Be ilngries", "Beilstein", "Belgern-Schildau", "Bendorf", "Bensheim",
  "Berching", "Berga", "Elster", "Bergen", "BergenaufRügen", "Bergheim", "BergischGladbach",
  "Bergkamen", "Bergneustadt", "Berlin", "BernaubeiBerlin", "Bernburg", "Bernkastel-Kues",
  "Bernsdorf", "Bernstadt a. d. Eigen", "Bersenbrück", "Besigheim", "Betzdorf", "Betzenstein",
  "Beverungen", "Bexbach", "Biberach an der Riß", "Biedenkopf", "Bielefeld", "Biesenthal", "Bietigheim-Bissingen",
  "Bremen", "Bremerhaven", "Bremervörde", "Bretten", "Breuberg", "Brilon", "Brotterode-Trusetal", "Bruchköbel", "Bruchsal", "Brunsbüttel", "Bräunlingen", "Brück", "Brüel", "Brühl", "Brüssow",
  "Buchen", "BuchholzinderNordheide", "Buchloe", "Buckow", "Burg", "BurgStargard", "Burgau",
  "Burgbernheim", "Burgdorf", "Burghausen", "Burgkunstadt", "Burglengenfeld", "Burgstädt", "Burgwedel",
  "Burladingen", "Burscheid", "Butzbach", "Buxtehude", "Bärnau", "Böblingen", "Böhlen", "Bönnigheim",
  "Bückeburg", "Büdelsdorf", "Büdingen", "Bühl", "Bünde", "Büren", "Bürgel", "Bürstadt", "Bützow",
  "Calau", "Cal be", "Calw", "Castrop-Rauxel", "Celle", "Cham", "Chemnitz", "Clausthal-Zellerfeld",
  "Clingen", "Cloppenburg", "Coburg", "Cochem", "Coesfeld", "Colditz", "Coswig", "Coswig", "Cottbus",
  "Crailsheim", "Creglingen", "Creußen", , "Crimmitschau", "Crivitz", "Cuxhaven", "Daaden", "Dachau",
  "Dahlen", "Dahme", "Mark", "Dahn", "Damme", "Dannenbe rg", "Dargun", "Darmstadt", "Dassel", "Dassow",
  "Datteln", "Daun", "Deggendorf", "Deidesheim", "Delbrück", "Delitzsch", "Delmenhorst", "Demmin",
  "Dessau-Roßlau", "Detmold", "Dettelbach", "Dieburg", "Diemelstadt", "Diepholz", "Dierdorf", "Dietenheim",
  "DietfurtanderAltmühl", "Dietzenbach", "Diez", "Dillenburg", "Dillingen an derDonau", "Dillingen", "Saar", "Dingelstädt", "Dingolfing", "Dinkelsbühl", "Dinklage", "Dinslaken", "Dippoldiswalde",
  "Dissen am Teutoburger Wald", "Ditzingen", "Doberlug-Kirchhain", "Dohna", "Dommitzsch", "Donaueschingen",
  "Donauwörth", "Donz dorf", "Dorfen", "Dormagen", "Dornburg-Camburg", "Dornhan", "Dornstetten",
  "Dorsten", "Dortmund", "Dransfel d", "Drebkau", "Dreieich", "Drensteinfurt", "Dresden", "Drolshagen","Forst", "Frankenau", "Frankenberg", "Frankenberg", "Sa.", "Frankenthal", "Frankfurt",
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
  "Gräfenberg", "Gräfenhainichen", "Gräfenthal", "Gröditz", "Grö ningen", "Grünberg", "Grünhain-Beierfeld", "Grünsfeld", "Grünstadt", "Guben", "Gudensberg", "Gummersbach", "Gundelfingen an der Donau",
  "Gundelsheim", "Gunzenhausen", "Göppingen", "Görlitz", "Göttingen", "Gößnitz", "Güglingen",
  "Günzb urg", "Güsten", "Güstrow", "Gütersloh", "Gützkow", "Haan", "Hachenburg", "Hadamar",
  "Hagen", "Hagenbach", "Ha genow", "Haiger", "Haigerloch", "Hainichen", "Haiterbach", "Halberstadt",
  "Haldensleben", "Halle", "Halle", "Hallenberg", "Hallstadt", "Haltern am See", "Halver", "Hamburg",
  "Hameln", "Hamm", "Hammelburg", "Hamminkeln", "Hanau", "Hann. Münden", "Hannover", "Harburg", "Hardegsen", "Haren", "Harsewinkel", "Hartenstein", "Hartha", "Harzgerode", "Haselünne", "HaslachimKinzigtal", "HattersheimamMain", "Hattingen", "Hatzfeld", "Hausach", "Hauzenberg", "Havelberg", "Havelsee", "Hayingen", "Haßfurt", "Hechingen", "Hecklingen", "Heide", "Heideck", "Heidelberg", "Heidenau", "HeidenheimanderBrenz", "Heilbad Heiligenstadt", "Heilbronn", "Heiligenhafen", "Heiligenhaus", "Heilsbronn", "Heimbach", "Heimsheim", "Heins berg", "Heitersheim", "Heldburg", "Helmbrechts", "Helmstedt", "Hemau", "Hemer", "Hemmingen", "Hemmoor", "H emsbach", "Hennef", "Hennigsdorf", "Heppenheim", "Herbolzheim", "Herborn", "Herbrechtingen", "Herbstein", "Herdecke", "Herdorf", "Herford", "Heringen", "Heringen", "Helme", "Hermeskeil", "Hermsdorf", "Herne", "Herrenberg", "Herrieden", "Herrnhut", "Hersbruck", "Herten", "Herzberg", "HerzbergamHarz", "Herzogenaurach", "Herzogenrath", "HessischLichtenau", "HessischOldendorf", "Hettingen", "Hettstedt", "Heubach", "Heusenstamm", "Hilchenbach", "Hildburghausen", "Hilden", "Hildesheim", "Hillesheim", "Hilpoltstein", "Hirschau", "Hirschberg", "Hirschhorn", "Hitzacker", "HochheimamMain", "Hockenheim", "Hof", "Hofgeismar", "HofheimamTaunus", "HofheiminUnterfranken", "HohenNeuendorf", "Hohenberg an der Eger", "Hohenleuben", "Hohenmölsen", "Hohenstein-Ernstthal", "Hohnstein", "Hollfeld", "Holzgerlingen", "Holzminden", "Homberg", "Homberg", "Homburg", "HorbamNeckar", "Horn-BadMeinberg", "Hornbach", "Hornberg", "Horstmar", "Hoya", "Hoyerswerda", "Hungen", "Husum", "Höchstadt an derAisch", "Höchstädt an der Donau", "Höhr-Grenzhausen", "Hörstel", "Höxter", "Hückelhoven", "Hückeswagen", "Hüfingen", "Hünfeld", "Hür th", "Ibbenbüren", "Ichenhausen", "Idar-Oberstein", "Idstein", "Illertissen", "Ilmenau", "Ilsenburg", "Ilshofen", "Immenhausen", "ImmenstadtimAllgäu", "Ingelfingen", "IngelheimamRhein", "Ingolstadt", "Iphofen", "Iserlohn", "IsnyimAllgäu", "Isselburg", "Itzehoe", "Jarmen", "Jena", "Jerichow", "Jessen", "Jever", "Joachimsthal", "Johanngeorgenstadt", "Jöhstadt", "Jüchen", "Jülich", "Jüterbog", "Kaarst", "Kahla", "Kaisersesch", "Kaiserslautern", "Kalbe", "Kalkar", "Kaltenkirchen", "Kaltennordheim", "Kamen", "Kamenz", "Kamp - Lintfort", "Kandel", "Kandern", "Kappeln", "Karb en", "Karlsruhe", "Karlstadt", "Kassel", "Kastellaun", "Katzenelnbogen", "Kaub", "Kaufbeuren", "Kehl", "Kelbra", "Kel heim",
  "Kelkheim", "Kellinghusen", "Kelsterbach", "Kemberg", "Kemnath", "Kempen", "Kempten", "Kenzingen", "K erpen",
  "Ketzin", "Havel", "Kevelaer", "Kiel", "Kierspe", "Kirchberg", "Kirchberg", "KirchberganderJagst", "Kirchen",
  "Kirchenlamitz", "Kirchhain", "Kirchheim unterTeck", "Kirchheimbolanden", "Kirn", "Kirtorf", "Kitzingen",
  "Kitzscher", "Kleve", "Klingenberg am Main", "Klingenthal", "Klötze", "Klütz", "Knittlingen", "Koblenz",
  "Kolbermoor", "Konstanz", "Konz", "Korbach", "Korntal-Münchingen", "Kornwestheim", "Korschenbroich",
  "Kraichtal", "KrakowamSee", "Kranichfeld", "Krautheim", "Krefeld", "Kremmen", "Krempe", "Kreuztal",
  "Kronach", "KronbergimTaunus", "Kroppenstedt", "Krumbach", "Kröpelin", "Kulmbach", "Kupferberg",
  "Kuppenheim", "Kusel", "Kyllburg", "Kyritz", "Kölleda", "Köln", "KönigsWusterhausen", "KönigsberginBayern",
  "Königsbrunn", "Königsbrück", "Königsee", "KönigslutteramElm", "Königstein", "KönigsteinimTaunus", "Königswinter", "Könnern", "Köthen", "Kühlungsborn", "Külsheim", "Künzelsau", "Laage", "Laatzen", "Ladenburg", "Lage", "Lahnstein", "Lahr", "Schwarzwald", "Laichingen", "Lambrecht", "Lampertheim", "LandauanderIsar", "LandauinderPfalz", "Landsberg", "Landsberg am Lech", "Landshut", "Landstuhl", "Langelsheim", "Langen", "Langenau", "Langenburg", "Langenfeld", "Langenhagen",
  "Langenselbold", "Langenzenn", "Lassan", "Laubach", "Laucha an der Unstrut", "Lauchhammer", "Lauchheim", "Lauda-Königshofen", "Lauenburg", "Elbe", "LaufanderPegnitz", "Laufen", "Laufenburg", "Lauffen am Neckar", "Lauingen", "Laupheim", "Lauscha", "Lauta", "Lauter-Bernsbach", "Lauterbach", "Lauterecken", "Laut erstein", "Lebach", "Lebus", "Leer", "Lehesten", "Lehrte", "Leichlingen", "Leimen", "Leinefelde-Worbis", "Leinfelde n-Echterdingen", "Leingarten", "Leipheim", "Leipzig", "Leisnig", "Lemgo", "Lengenfeld", "Lengerich", "Lennesta dt", "Lenzen", "Leonberg", "Leun", "Leuna", "Leutenberg", "Leutershausen", "LeutkirchimAllgäu", "Leverkusen", "Lich", "Lichtenberg", "Lichtenstein", "Sa.", "Liebenau", "Liebenwalde", "Lieberose", "Liebstadt", "Limbach-Oberfrohna", "LimburganderLahn", "Lindau", "Linden", "LindenbergimAllgäu", "Lindenfels", "Lindow", "Lingen", "Linnich", "LinzamRhein", "Lippstadt", "Lohmar", "Lohne", "LohramMain", "Loitz", "Lollar", "Lommatzsch", "Lorsch", "Lucka", "Luckau", "Luckenwalde", "Ludwigsburg", "Ludwigsfelde", "Ludwigshafenam Rhein", "Ludwigslust", "Ludwigsstadt", "Lugau", "Lunzenau", "Lychen", "Löbau", "Löffingen", "Löhne", "Löningen", "Lörrach", "Löwenstein", "Lößnitz", "Lübbecke", "Lübben", "Lübbenau", "Spreewald", "Lübeck", "Lübtheen", "Lübz", "Lüchow", "Lüdenscheid", "Lüdinghausen", "Lügde", "Lüneburg", "Lünen", "Lütjenburg", "Lützen", "Magdala", "Ma gdeburg", "Mahlberg", "Mainbernheim", "Mainburg", "Maintal", "Mainz", "Malchin", "Malchow", "Manderscheid", "Mannheim", "Mansfeld", "MarbachamNeckar", "Marburg", "Marienberg", "Marienmünster", "Markdorf", "Markgröningen", "Markkleeberg", "Markneukirchen", "Markranstädt", "Marktbreit", "Marktheidenfeld", "Marktleuthen", "Marktoberdorf", "Marktredwitz", "Marktsteft", "Marl", "Marlow", "Marne", "Marsberg", "Maulbronn", "Maxhütte-Haidhof", "Mayen", "Mechernich", "Meckenheim", "Medebach", "Meerane", "Meerbusch", "Meersburg", "Meinerzhagen", "Meiningen", "Meisenhei m", "Meißen", "Meldorf", "Melle", "Mellrichstadt", "Melsungen",
  "Memmingen", "Menden", "Mendig", "M engen", "Me ppen", "Merkendorf", "Merseburg", "Merzig", "Meschede", "Mettmann", "Metzingen", "Meuselwitz", "Meyenburg",
  "Meßkirch", "Meßstetten", "Michelstadt", "Miesbach", "Miltenberg", "Mindelheim", "Minden", "Mirow", "Mittenwalde", "Mitterteich", "Mittweida", "Moers", "Monheim", "MonheimamRhein",
  "Monschau", "Montabaur", "MoosburganderIsar", "Moringen", "Mosbach", "Munderkingen", "Munster", "Murrhardt",
  "Märkisch Buchholz", "Möckern", "Möckmühl", "Mölln", "Mönchengladbach", "Mörfelden-Walldorf", "Mössingen",
  "Mücheln", "Mügeln", "Mühlacker", "Mühlberg", "Elbe", "MühldorfamInn", "Mühlhausen", "Thüringen",
  "MühlheimamMain", "MühlheimanderDonau", "Mülheim an der Ruhr", "Mülheim-Kärlich", "Müllheim", "Müllrose",
  "Münchberg", "Müncheberg", "München", "Münchenbernsd orf", "Münnerstadt", "Münsingen", "Münster",
  "Münstermaifeld", "Münzenberg", "Nabburg", "Nagold", "Naila", "Na ssau", "Nastätten", "Nauen", "Naumburg",
  "Naumburg", "Naunhof", "Nebra", "Neckarbischofsheim", "Neckarge münd", "Neckarsteinach", "Neckarsulm",
  "Neresheim", "Netphen", "Nettetal", "Netzschkau", "Neu-Anspach", "N eu-Isenburg", "Neu-Ulm",
  "Ob erwiesenthal", "Oberzent", "Ochsenfurt", "Ochsenhausen", "Ochtrup", "Oderberg", "Oebisfelde-Weferlinge n", "Oederan", "Oelde", "Oelsnitz", "Erzgeb.", "Oelsnitz", "Vogtl",
  "Oer-Erkenschwick", "Oerlinghausen", "Oestric h-Winkel", "Oettingen in Bayern", "Offenbach am Main",
  "Offenburg", "Ohrdruf", "Olbernhau", "Olching", "Oldenburg", "Oldenburg in Holstein", "Olfen", "Olpe",
  "Olsberg", "Oppenau", "Oppenheim", "Oranienbaum-Wörlitz", "Oranienburg", "Orlam ünde", "Ornbau",
  "Ortenberg", "Ortrand", "Oschatz", "Oschersleben", "Osnabrück", "Osterburg", "Osterburken", "Osterfeld",
  "Osterhofen", "Osterholz", "Scharmbeck", "Osterode am Harz", "Osterwieck", "Ostfildern",
  "Ostheim vor der Rhön", "Osthofen", "Ostritz", "Otterberg", "Otterndorf", "Ottweiler", "Overath", "Owen",
  "Paderborn", "Papenburg", "Pappenheim", "Parchim", "Parsberg", "Pasewalk", "Passau", "Pattensen",
  "Pausa - Mühltroff", "Pegau", "Pegnitz", "Peine", "Peitz", "Penig", "Penkun", "Penzberg", "Penzlin",
  "Perleberg", "Petershagen", "Pfaffenhofen an der Ilm", "Pfarrkirchen", "Pforzheim", "Pfreimd",
  "Pfullendorf", "Pfullingen", "Pfungstadt", "Philippsburg", "Pinneberg", "Pirmasens", "Pirna",
  "Plattling", "Plaue", "Plauen", "Plettenberg", "Pleystein", "Plochingen", "Plön", "Pockau-Lengefeld",
  "Pocking", "Pohlhei m", "Polch", "Porta Westfalica", "Potsdam", "Pottenstein", "Preetz", "Premnitz", "Rochlitz", "Rockenhausen", "Rodalben", "Rodenberg", "Rodewisch", "R odgau", "Roding", "Romrod",
  "Ronneburg", "Ronnenberg", "Rosbach vor der Höhe", "Rosenfeld", "Rosenheim", "Rosenthal", "Rostock", "Rotenburg", "RotenburganderFulda", "Roth", "RothenburgobderTauber", "Rothenburg", "O.L.", "Rothenfels", "Rottenburga.d.Laaber", "Rottenburg am Neckar",
  "Rottweil", "Roßleben-Wiehe", "Roßwein", "Rudolstadt", "Ruhla", "Ruhland", "Runkel", "Rutesheim", "Rö bel", "Müritz", "Rödental", "Rödermark", "Römhild", "Rösrath", "Rötha", "RöthenbachanderPegnitz", "Röttingen", "Rötz", "RüdesheimamRhein", "Rüsselsheim am Main", "Rüthen", "Saalburg-Ebersdorf", "Saalfeld", "Saale", "Saarbrücken", "Saarburg", "Saarlouis", "Sachsenh agen", "Sachsenheim", "Salzgitter", "Salzkotten", "Salzwedel", "Sandau", "Sandersdorf-Brehna", "Sangerhau sen", "SanktAugustin", "Sankt Goar", "SanktGoarshausen",
 "Winsen", "Winterberg", "Wipperfürth", "Wirges", "Wismar", "Wissen", "Witten", "Wittenberg", "Wittenberge", "Wittenburg", "Wittichenau", "Wittingen", "Wittlich", "Wittmund", "Wittstock", "Dosse", "Witzenhausen", "Woldegk", "Wolfach", "Wolfenbüttel", "Wolfhagen", "Wolframs - Eschenbach", "Wol fratshausen", "Wolfsburg", "Wolfstein", "Wolgast", "Wolkenstein", "Wolmirstedt", "Worms", "Wriezen", "Wunsied el", "Wunstorf", "Wuppertal", "Wurzbach", "Wurzen", "Wustrow", "WykaufFöhr", "Wächtersbach", "Wörrstadt", "WörthamMain", "WörthamRhein", "WörthanderDonau", "Wülfrath", "Würselen", "Würzburg", "Xanten", "Zahna - Elster", "ZarrentinamSchaalsee", "Zehdenick", "ZeilamMain", "Zeitz", "Zell", "ZellamHarmersbach", "ZellimWiesental",
];
const pup=async () => {
  const browser = await puppeteer.launch({
    headless: true,

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
    console.log(error.message)

  }
}
pup()