/* ============================================================
   i18n.js — Shared multilingual engine for the Morocco tourism site
   ============================================================
   - Persists chosen language via localStorage ('mdLang')
   - Switches language on every page that includes this script
   - Sets <html lang> and dir="rtl" for Arabic
   - Wires .lang-btn click handlers
   - Dictionary keyed on the French source text (whitespace-normalized)
   ============================================================ */
(function () {
  'use strict';

  // ============================================================
  // === DICTIONARY ===
  // Each entry: French source → { en, ar }
  // ============================================================
  const DICT = {
    en: {
      /* === NAV === */
      "Accueil": "Home",
      "Villes": "Cities",
      "Plats": "Dishes",
      "Activités": "Activities",
      "Itinéraires": "Itineraries",
      "Guide": "Guide",
      "Explorez le Maroc": "Explore Morocco",
      "Gastronomie": "Gastronomy",
      "Expériences": "Experiences",
      "Découvrir les Itinéraires": "Discover the Itineraries",
      "Découvrez les Itinéraires": "Discover the Itineraries",
      "Couscous Royal": "Royal Couscous",
      "Harira": "Harira",
      "Pastilla au Poulet": "Chicken Pastilla",
      "Tanjia Marrakchia": "Marrakchi Tanjia",
      "Tagine Poulet & Citrons Confits": "Chicken Tagine with Preserved Lemons",
      "Voir tous les plats →": "See all dishes →",
      "Voir tous les plats ↑": "See all dishes ↑",
      "Animations": "Animations",
      "Langue / Language": "Language",

      /* === City names (kept as is for proper nouns) === */
      "Tanger": "Tangier",
      "Chefchaouen": "Chefchaouen",
      "Rabat": "Rabat",
      "Fès": "Fez",
      "Ifrane": "Ifrane",
      "Merzouga": "Merzouga",
      "Marrakech": "Marrakech",
      "Essaouira": "Essaouira",
      "Agadir": "Agadir",

      /* === Region eyebrows === */
      "Nord — Côte méditerranéenne": "North — Mediterranean Coast",
      "Nord — Rif": "North — Rif",
      "Nord — Montagnes du Rif": "North — Rif Mountains",
      "Côte atlantique — Capitale": "Atlantic Coast — Capital",
      "Centre — Capitale spirituelle": "Centre — Spiritual Capital",
      "Centre — Façade atlantique": "Centre — Atlantic Coast",
      "Centre-Sud — Cité ocre": "Centre-South — The Ochre City",
      "Côte atlantique": "Atlantic Coast",
      "Sud — Souss": "South — Souss",
      "Sud-Est — Sahara": "South-East — Sahara",
      "Moyen Atlas — Montagne": "Middle Atlas — Mountains",
      "Détroit de Gibraltar — Région Tanger-Tétouan-Al Hoceïma": "Strait of Gibraltar — Tangier-Tétouan-Al Hoceïma Region",
      "Vallée du Saïs — Région Fès-Meknès": "Saïs Valley — Fès-Meknès Region",
      "Plaine d'Haouz — Région Marrakech-Safi": "Haouz Plain — Marrakech-Safi Region",

      /* === Hero / homepage === */
      "Bienvenue au Royaume du Maroc": "Welcome to the Kingdom of Morocco",
      "Là où l'orient rencontre l'occident": "Where the East meets the West",
      "Des médinas millénaires aux dunes du Sahara, des sommets de l'Atlas aux rivages atlantiques — découvrez un pays aux mille visages.": "From ancient medinas to the dunes of the Sahara, from the peaks of the Atlas to the Atlantic shores — discover a country of a thousand faces.",
      "Villes à Découvrir": "Cities to Discover",
      "Sites UNESCO": "UNESCO Sites",
      "Plats Traditionnels": "Traditional Dishes",
      "Expériences Uniques": "Unique Experiences",
      "Faites défiler pour tracer votre voyage": "Scroll to trace your journey",

      /* === City descriptions on homepage map === */
      "Porte de l'Afrique, ville cosmopolite entre Atlantique et Méditerranée — un carrefour millénaire de cultures et de saveurs.": "Gateway to Africa, a cosmopolitan city between the Atlantic and the Mediterranean — a millennia-old crossroads of cultures and flavours.",
      "La perle bleue des montagnes : ruelles, escaliers et façades peints dans toutes les nuances d'azur.": "The blue pearl of the mountains: alleys, stairways and façades painted in every shade of azure.",
      "Capitale du royaume aux jardins andalous, à la kasbah des Oudayas et à la tour Hassan, face à l'océan.": "Kingdom's capital, home to Andalusian gardens, the Kasbah of the Udayas and the Hassan Tower, facing the ocean.",
      "Capitale spirituelle et intellectuelle, sa médina abrite la plus ancienne université du monde encore en activité.": "A spiritual and intellectual capital; its medina holds the oldest still-operating university in the world.",
      "Surnommée la « petite Suisse » du Maroc : chalets, lacs et cèdres, perchée à 1650 m d'altitude dans le Moyen Atlas.": "Nicknamed the “little Switzerland” of Morocco: chalets, lakes and cedars, perched at 1,650 m in the Middle Atlas.",
      "Porte des dunes dorées de l'erg Chebbi : nuits sous les étoiles, dromadaires et silence absolu du désert.": "Gateway to the golden dunes of Erg Chebbi: nights under the stars, dromedaries and the absolute silence of the desert.",
      "La cité ocre : la place Jemaa el-Fna, les souks parfumés, et les jardins de Majorelle.": "The ochre city: Jemaa el-Fna square, the fragrant souks, and the Majorelle gardens.",
      "Cité des vents, port de pêche animé et remparts portugais battus par l'océan Atlantique.": "City of winds: a lively fishing port and Portuguese ramparts battered by the Atlantic.",
      "Plages dorées de la côte atlantique, station balnéaire prisée pour son climat doux toute l'année.": "Golden Atlantic beaches; a seaside resort prized for its mild year-round climate.",
      "Voir la ville →": "See the city →",

      /* === Homepage sections === */
      "Explorez la Gastronomie Marocaine": "Explore Moroccan Cuisine",
      "Des saveurs uniques qui racontent l'histoire d'un peuple.": "Unique flavours that tell the story of a people.",
      "En savoir plus sur les plats marocains →": "Learn more about Moroccan dishes →",
      "Envie de découvrir de nouvelles expériences au Maroc ?": "Eager to discover new experiences in Morocco?",
      "Du hammam traditionnel aux treks dans l'Atlas, en passant par les riads authentiques et les cours de cuisine — vivez le Maroc autrement.": "From traditional hammams to treks in the Atlas, through authentic riads and cooking classes — experience Morocco differently.",
      "Voir tout": "View all",
      "Patrimoine": "Heritage",
      "Désert": "Desert",
      "Atlas": "Atlas",
      "Riads": "Riads",
      "Du sable de l'Erg Chebbi aux remparts d'Essaouira, en passant par les cités impériales et les sommets de l'Atlas — composez le voyage qui vous ressemble parmi nos itinéraires inspirants.": "From the sands of Erg Chebbi to the ramparts of Essaouira, by way of the imperial cities and the Atlas peaks — craft the journey that suits you among our inspiring itineraries.",
      "Explorer les Itinéraires →": "Explore the Itineraries →",
      "Villes impériales": "Imperial Cities",
      "Côte Atlantique": "Atlantic Coast",
      "© 2026 — Réalisé dans le cadre du module Développement Web | Encadré par Monsieur Reda Jourani | ENSA Tétouan 2026": "© 2026 — Created for the Web Development module | Supervised by Mr. Reda Jourani | ENSA Tétouan 2026",

      /* === Shared city-page UI === */
      "Destinations": "Destinations",
      "En un clin d'œil": "At a Glance",
      "Durée conseillée": "Suggested Duration",
      "Saison idéale": "Best Season",
      "Région": "Region",
      "DÉCOUVERTES": "DISCOVERIES",
      "ADRESSES": "ADDRESSES",
      "SÉJOURS": "STAYS",
      "CONSEILS": "TIPS",
      "Hébergements d'exception": "Exceptional Stays",
      "Culture & Conseils de Voyage": "Culture & Travel Tips",
      "Planifier mon voyage": "Plan my trip",
      "Toutes les destinations": "All destinations",

      /* === Tanger labels === */
      "La Porte de l'Afrique": "The Gateway to Africa",
      "Là où l'Atlantique embrasse la Méditerranée — carrefour millénaire des civilisations": "Where the Atlantic meets the Mediterranean — a millennia-old crossroads of civilizations",
      "Cosmopolite et insaisissable": "Cosmopolitan and elusive",
      "Perchée à la pointe nord-ouest du Maroc, Tanger s'ouvre tout à la fois sur l'Atlantique et la Méditerranée, à seulement 14 kilomètres des côtes espagnoles. Sa position stratégique en a fait depuis l'Antiquité un point de passage entre l'Afrique et l'Europe, un comptoir convoité par les Phéniciens, les Romains, les Portugais, les Anglais puis les Espagnols.": "Perched at the north-western tip of Morocco, Tangier opens onto both the Atlantic and the Mediterranean, just 14 kilometres from the Spanish coast. Its strategic position has made it, since Antiquity, a crossing between Africa and Europe — a trading post coveted by the Phoenicians, Romans, Portuguese, English and Spanish.",
      "Pendant la première moitié du XXe siècle, Tanger jouit d'un statut international unique qui attira écrivains, artistes et espions du monde entier. Paul Bowles, William Burroughs, Tennessee Williams ou Henri Matisse y ont laissé leurs traces, faisant de la cité un mythe littéraire et bohème.": "During the first half of the 20th century, Tangier enjoyed a unique international status that drew writers, artists and spies from around the world. Paul Bowles, William Burroughs, Tennessee Williams and Henri Matisse left their mark there, turning the city into a literary and bohemian myth.",
      "Aujourd'hui, Tanger se réinvente. Sa médina blanche descend en cascade vers le port, la nouvelle marina côtoie les palais ottomans restaurés, et la corniche allongée offre des couchers de soleil mémorables sur le détroit. C'est une ville en mouvement, où chaque ruelle raconte une histoire différente.": "Today, Tangier is reinventing itself. Its white medina cascades down towards the port, the new marina sits beside restored Ottoman palaces, and the long corniche offers memorable sunsets over the strait. It is a city in motion, where every alley tells a different story.",
      "2 à 3 jours": "2 to 3 days",
      "Avril-Juin et Septembre-Octobre": "April–June and September–October",
      "Tanger-Tétouan-Al Hoceïma": "Tangier-Tétouan-Al Hoceïma",
      "À ne pas manquer à Tanger": "Don't miss in Tangier",
      "Kasbah de Tanger": "Kasbah of Tangier",
      "Ancienne forteresse perchée au sommet de la médina, elle abrite le palais du Sultan transformé en musée et offre une vue spectaculaire sur le détroit de Gibraltar.": "An ancient fortress perched atop the medina, home to the Sultan's palace turned museum and offering spectacular views over the Strait of Gibraltar.",
      "Café Hafa": "Café Hafa",
      "Fondé en 1921 et perché sur des terrasses face à la mer, ce café légendaire a vu défiler les Rolling Stones, Bowles et Burroughs. Un thé à la menthe au coucher du soleil y devient inoubliable.": "Founded in 1921 and perched on terraces facing the sea, this legendary café has hosted the Rolling Stones, Bowles and Burroughs. A mint tea at sunset becomes unforgettable here.",
      "Grottes d'Hercule": "Caves of Hercules",
      "À 14 km de la ville, ces grottes marines mythiques ouvrent sur l'océan par une ouverture en forme d'Afrique inversée. Selon la légende, Hercule s'y reposa avant de séparer les deux continents.": "14 km from the city, these legendary sea caves open onto the ocean through an opening shaped like an inverted Africa. According to legend, Hercules rested here before separating the two continents.",
      "Cap Spartel": "Cape Spartel",
      "Point le plus nord-ouest du continent africain, surmonté d'un phare emblématique de 1864. C'est ici que l'océan Atlantique rencontre la mer Méditerranée — un spectacle saisissant.": "The north-westernmost point of the African continent, crowned by an iconic lighthouse from 1864. This is where the Atlantic Ocean meets the Mediterranean Sea — a striking sight.",
      "Médina blanche": "White Medina",
      "Labyrinthe de ruelles aux façades chaulées qui dévale vers le port. Souks, ateliers d'artisans, petites mosquées et passages voûtés — l'âme historique de la ville s'y dévoile pas à pas.": "A labyrinth of whitewashed alleys cascading down to the port. Souks, artisan workshops, small mosques and vaulted passageways — the historic soul of the city unfolds step by step.",
      "American Legation Museum": "American Legation Museum",
      "Seul monument historique américain situé hors des États-Unis. Ce musée raconte deux siècles d'amitié maroco-américaine et expose une collection rare consacrée à Paul Bowles.": "The only American historical monument located outside the United States. This museum tells two centuries of Moroccan-American friendship and houses a rare collection dedicated to Paul Bowles.",
      "Où manger à Tanger": "Where to eat in Tangier",
      "El Morocco Club": "El Morocco Club",
      "Cuisine raffinée méditerranéenne et marocaine dans un cadre élégant de la Kasbah, ancien repaire des artistes internationaux.": "Refined Mediterranean and Moroccan cuisine in an elegant Kasbah setting, a former haunt of international artists.",
      "Le Saveur de Poisson": "Le Saveur de Poisson",
      "Institution légendaire où l'on déguste les poissons du jour grillés à la berbère, accompagnés du fameux jus de l'amitié aux 12 fruits secs.": "A legendary institution serving the catch of the day grilled Berber-style, accompanied by the famous 12-dried-fruit “friendship juice”.",
      "Café Tingis": "Café Tingis",
      "Café-restaurant emblématique du Petit Socco, idéal pour observer la vie de la médina autour d'un thé à la menthe et de pâtisseries traditionnelles.": "An iconic café-restaurant on the Petit Socco, perfect for watching medina life over a mint tea and traditional pastries.",
      "Salon Bleu": "Salon Bleu",
      "Terrasse haut perchée dans la médina, où l'on savoure un tagine de poisson en contemplant le détroit de Gibraltar et la côte espagnole.": "A high-perched terrace in the medina, where one savours a fish tagine while gazing over the Strait of Gibraltar and the Spanish coast.",
      "Hôtel Continental": "Hôtel Continental",
      "Édifié en 1870 face au port, le plus ancien hôtel de la ville a hébergé Degas, Churchill et de nombreuses têtes couronnées. Décor d'époque préservé.": "Built in 1870 facing the port, the city's oldest hotel has hosted Degas, Churchill and many crowned heads. Period decor preserved.",
      "La Tangerina": "La Tangerina",
      "Maison d'hôtes raffinée perchée sur les remparts de la Kasbah. Toit-terrasse panoramique et déco mêlant artisanat marocain et touches scandinaves.": "A refined guesthouse perched on the Kasbah walls. Panoramic rooftop and decor blending Moroccan craftsmanship with Scandinavian touches.",
      "Nord-Pinus Tanger": "Nord-Pinus Tangier",
      "Boutique-hôtel iconique installé dans un ancien palais de la Kasbah. Vue plongeante sur la baie, chambres uniques signées d'un mobilier d'artistes.": "An iconic boutique hotel set in a former Kasbah palace. Sweeping bay views, unique rooms furnished with artist-signed pieces.",
      "Ville multilingue": "A multilingual city",
      "À Tanger, l'arabe, l'espagnol et le français se mêlent dans les conversations quotidiennes. Un peu d'espagnol facilite grandement les échanges dans les souks.": "In Tangier, Arabic, Spanish and French intermingle in everyday conversation. A little Spanish goes a long way in the souks.",
      "Climat venteux": "Windy climate",
      "Le détroit canalise les vents toute l'année. Prévoyez une veste coupe-vent même en été, surtout pour les balades en bord de mer ou au Cap Spartel.": "The strait channels winds all year round. Pack a windbreaker even in summer, especially for seaside walks or Cape Spartel.",
      "Train à grande vitesse": "High-speed train",
      "Le LGV Al Boraq relie Tanger à Casablanca en 2h10. Idéal pour combiner la ville avec Rabat ou Casablanca dans un même itinéraire de voyage.": "The Al Boraq high-speed line connects Tangier to Casablanca in 2 h 10. Ideal for pairing the city with Rabat or Casablanca on the same trip.",
      "Marchandage modéré": "Moderate bargaining",
      "Dans la médina, la négociation est de rigueur mais reste plus douce qu'à Marrakech ou Fès. Comptez 30 à 50 % de marge sur les prix de départ annoncés.": "In the medina, bargaining is expected but gentler than in Marrakech or Fez. Expect a 30–50 % margin off the opening price.",
      "Héritage littéraire": "Literary heritage",
      "Bowles, Burroughs, Genet, Choukri… Tanger est une ville d'écrivains. Visitez la Librairie des Colonnes, refuge des amoureux des lettres depuis 1949.": "Bowles, Burroughs, Genet, Choukri… Tangier is a city of writers. Visit the Librairie des Colonnes, a haven for book lovers since 1949.",
      "Sécurité urbaine": "Urban safety",
      "Tanger est globalement sûre, mais restez vigilant dans les zones touristiques très fréquentées comme le Petit Socco et la gare. Évitez les ruelles isolées la nuit.": "Tangier is broadly safe, but stay alert in busy tourist areas such as the Petit Socco and the station. Avoid isolated alleys at night.",
      "Entre deux mers, entre deux mondes": "Between two seas, between two worlds",
      "Tanger vous attend avec ses terrasses, ses cafés mythiques et ses couchers de soleil sur le détroit. Réservez votre escapade au confluent de l'Atlantique et de la Méditerranée.": "Tangier awaits you with its terraces, legendary cafés and sunsets over the strait. Book your escape at the meeting point of the Atlantic and the Mediterranean.",

      /* === Fès labels === */
      "La Capitale Spirituelle": "The Spiritual Capital",
      "Berceau de la civilisation marocaine, gardienne de la plus ancienne médina vivante au monde": "Cradle of Moroccan civilization, guardian of the oldest living medina in the world",
      "La cité millénaire des savoirs": "The thousand-year city of knowledge",
      "Fondée en 789 par Idriss Ier puis agrandie par son fils Idriss II, Fès est considérée comme la capitale spirituelle, culturelle et intellectuelle du Maroc. Première des quatre villes impériales, elle a vu naître la dynastie idrisside puis prospérer sous les Almoravides, les Mérinides et les Saadiens.": "Founded in 789 by Idris I and expanded by his son Idris II, Fez is considered the spiritual, cultural and intellectual capital of Morocco. The first of the four imperial cities, it saw the birth of the Idrisid dynasty and prospered under the Almoravids, Marinids and Saadians.",
      "Sa médina, Fès el-Bali, classée au patrimoine mondial de l'UNESCO depuis 1981, est l'une des plus grandes zones piétonnes urbaines du monde. Ses 9 000 ruelles labyrinthiques abritent l'université Al Quaraouiyine — fondée en 859 par Fatima al-Fihri, c'est la plus ancienne université encore en activité, attestée par le Guinness et l'UNESCO.": "Its medina, Fès el-Bali — a UNESCO World Heritage Site since 1981 — is one of the largest urban pedestrian zones in the world. Its 9,000 labyrinthine alleys shelter the Al Quaraouiyine University — founded in 859 by Fatima al-Fihri, the oldest still-operating university, recognized by Guinness and UNESCO.",
      "Ville d'artisans par excellence, Fès vit encore au rythme des dinandiers, des teinturiers, des tanneurs et des céramistes. La célèbre tannerie Chouara, avec ses cuves colorées vues depuis les terrasses des marchands de cuir, reste l'image-emblème d'un savoir-faire transmis depuis le Moyen-Âge.": "A craftsman's city par excellence, Fez still beats to the rhythm of coppersmiths, dyers, tanners and ceramists. The famous Chouara tannery, with its coloured vats viewed from the leather merchants' terraces, remains the emblematic image of a craft handed down since the Middle Ages.",
      "Mars-Mai et Septembre-Novembre": "March–May and September–November",
      "Fès-Meknès": "Fès-Meknès",
      "À ne pas manquer à Fès": "Don't miss in Fez",
      "Médina de Fès el-Bali": "Medina of Fès el-Bali",
      "Classée à l'UNESCO et fondée au IXe siècle, c'est la plus grande zone piétonne médiévale au monde. 9 000 ruelles, 350 mosquées et un labyrinthe vivant qui n'a pas changé depuis mille ans.": "UNESCO-listed and founded in the 9th century, it is the largest medieval pedestrian zone in the world. 9,000 alleys, 350 mosques and a living labyrinth unchanged for a thousand years.",
      "Al Quaraouiyine": "Al Quaraouiyine",
      "Fondée en 859 par Fatima al-Fihri, c'est la plus ancienne université encore en activité au monde. Sa bibliothèque conserve plus de 4 000 manuscrits, dont certains datent du IXe siècle.": "Founded in 859 by Fatima al-Fihri, this is the oldest still-operating university in the world. Its library holds over 4,000 manuscripts, some dating back to the 9th century.",
      "Tannerie Chouara": "Chouara Tannery",
      "Cuves colorées en activité depuis le XIe siècle où l'on teint encore le cuir selon les méthodes ancestrales. Observation depuis les terrasses des marchands — un brin de menthe sous le nez aide à supporter l'odeur.": "Colourful vats in operation since the 11th century, where leather is still dyed by ancestral methods. View from the merchants' terraces — a sprig of mint under the nose helps with the smell.",
      "Médersa Bou Inania": "Medersa Bou Inania",
      "Chef-d'œuvre de l'architecture mérinide du XIVe siècle. Ses zelliges, ses stucs ciselés et son plafond en bois de cèdre sculpté en font l'une des plus belles médersas du Maroc.": "A 14th-century Marinid architectural masterpiece. Its zelliges, chiselled stuccoes and carved cedar ceiling make it one of the finest medersas in Morocco.",
      "Bab Boujloud": "Bab Boujloud",
      "Porte monumentale bleue et verte, principale entrée de la médina depuis 1913. Côté médina, elle est ornée de zelliges verts ; côté ville nouvelle, de zelliges bleus — le bleu de Fès.": "Monumental blue-and-green gate, the main entrance to the medina since 1913. Green zelliges face the medina; blue ones — the famous Fez blue — face the new city.",
      "Palais Royal & Mellah": "Royal Palace & Mellah",
      "Les sept portes monumentales en bronze du Palais Royal ouvrent sur Fès Jdid. À côté, l'ancien quartier juif (Mellah) conserve ses balcons en bois ouvragé et son cimetière historique.": "The seven monumental bronze doors of the Royal Palace open onto Fès Jdid. Beside it, the old Jewish quarter (Mellah) preserves its carved wooden balconies and historic cemetery.",
      "Où manger à Fès": "Where to eat in Fez",
      "Dar Roumana": "Dar Roumana",
      "Riad-restaurant raffiné dans la médina. Cuisine marocaine moderne par un chef formé en France, dans un cadre intime aux zelliges anciens.": "Refined riad-restaurant in the medina. Modern Moroccan cuisine from a France-trained chef in an intimate setting with antique zelliges.",
      "Restaurant Numéro 7": "Restaurant Number 7",
      "Table d'auteur installée dans une maison de la médina. Menu unique du chef invité, renouvelé chaque saison, accord parfait avec les vins marocains.": "A signature table set in a medina house. A single guest-chef menu, renewed each season, paired beautifully with Moroccan wines.",
      "Café Clock": "Café Clock",
      "Institution culturelle autant que restaurant. Le fameux camel burger, les soirées contes berbères et les cours de cuisine en font un passage obligé.": "A cultural institution as much as a restaurant. The famous camel burger, Berber storytelling nights and cooking classes make it unmissable.",
      "The Ruined Garden": "The Ruined Garden",
      "Dans le jardin d'une demeure en ruines magnifiquement préservée, on déguste tagines lents et mezzés marocains, à l'ombre des bougainvilliers centenaires.": "In the garden of a beautifully preserved ruined mansion, you'll enjoy slow tagines and Moroccan mezze under century-old bougainvilleas.",
      "Riad Fès": "Riad Fès",
      "Relais & Châteaux installé dans plusieurs demeures andalouses fusionnées. Patios, piscine intérieure et spa hammam — le luxe au cœur de la médina.": "Relais & Châteaux property combining several Andalusian mansions. Patios, indoor pool and hammam spa — luxury at the heart of the medina.",
      "Palais Faraj": "Palais Faraj",
      "Palais du XIXe siècle restauré avec splendeur, perché en surplomb de la médina. Vue plongeante sur la cité depuis le toit-terrasse et son restaurant gastronomique.": "A 19th-century palace splendidly restored, perched above the medina. Sweeping city views from the rooftop and its gastronomic restaurant.",
      "Riad Le Calife": "Riad Le Calife",
      "Riad familial intimiste au cœur de Fès el-Bali. Petit-déjeuner traditionnel servi sous l'oranger du patio, accueil chaleureux et conseils précieux des hôtes.": "Intimate family-run riad at the heart of Fès el-Bali. Traditional breakfast served under the patio's orange tree, with warm hospitality and excellent local tips.",
      "Se perdre est inévitable": "Getting lost is inevitable",
      "Avec ses 9 000 ruelles, la médina de Fès défie tous les GPS. Un guide local est précieux pour la première journée — au-delà, accepter de se perdre fait partie de l'expérience.": "With its 9,000 alleys, the Fez medina defies any GPS. A local guide is invaluable on the first day — beyond that, embracing getting lost is part of the experience.",
      "Brin de menthe à la tannerie": "Mint at the tannery",
      "Acceptez le brin de menthe offert à l'entrée des terrasses de la tannerie Chouara : l'odeur du tannage à l'ancienne est intense, surtout en été.": "Accept the sprig of mint offered at the entrance to the Chouara tannery terraces: the smell of traditional tanning is intense, especially in summer.",
      "Lieux de culte": "Places of worship",
      "Mosquées et zaouïas sont strictement réservées aux fidèles musulmans. On peut néanmoins admirer les portails ouvragés et les médersas, ouvertes à toutes et tous.": "Mosques and zawiyas are strictly reserved for Muslim worshippers. You can still admire the ornate portals and the medersas, which are open to everyone.",
      "Marchandage prononcé": "Strong bargaining",
      "Dans les souks de Fès, la négociation est intense. Les premiers prix annoncés sont souvent 3 à 4 fois supérieurs à la valeur réelle. Restez courtois et souriant.": "In the souks of Fez, bargaining is intense. Opening prices are often 3 to 4 times the real value. Stay polite and smiling.",
      "Pas de voitures": "No cars",
      "La médina est une zone 100 % piétonne. Marchandises et bagages y sont transportés à dos d'âne ou de mulet — gardez l'œil et l'oreille attentive en marchant.": "The medina is a 100 % pedestrian zone. Goods and luggage are carried by donkey or mule — stay watchful and listen carefully as you walk.",
      "Artisanat de qualité": "Quality craftsmanship",
      "Fès est la capitale incontestée de la céramique bleue, du cuir tanné à l'ancienne et de la dinanderie. Les ateliers du quartier As-Seffarine valent à eux seuls le détour.": "Fez is the undisputed capital of blue ceramics, traditional leather tanning and coppersmithing. The As-Seffarine quarter workshops alone are worth the visit.",
      "Mille ans de savoir, à un battement d'ailes": "A thousand years of knowledge, a wingbeat away",
      "Fès vous attend avec sa médina millénaire, ses tanneries colorées et ses ateliers d'artisans. Préparez votre immersion au cœur de la capitale spirituelle du Maroc.": "Fez awaits you with its thousand-year-old medina, its colourful tanneries and craftsmen's workshops. Prepare to immerse yourself in the spiritual capital of Morocco.",

      /* === Marrakech === */
      "La Ville Rouge": "The Red City",
      "Où l'histoire almohade rencontre la magie des mille et une nuits": "Where Almohad history meets the magic of the Arabian nights",
      "La perle ocre du sud marocain": "The ochre pearl of southern Morocco",
      "3 à 4 jours": "3 to 4 days",
      "Mars-Mai et Octobre-Novembre": "March–May and October–November",
      "Marrakech-Safi": "Marrakech-Safi",
      "À ne pas manquer à Marrakech": "Don't miss in Marrakech",
      "Où manger à Marrakech": "Where to eat in Marrakech",
      "Prêt à plonger dans l'ocre et l'or ?": "Ready to dive into ochre and gold?",
      "Marrakech vous attend avec ses palais millénaires, ses souks envoûants et ses nuits étoilées sur les toits de riads. Planifiez dès maintenant votre séjour.": "Marrakech awaits you with its ancient palaces, enchanting souks and starry nights on rooftop riads. Plan your stay right now.",

      /* === Chefchaouen === */
      "La Perle Bleue": "The Blue Pearl",

      /* === Common buttons / actions === */
      "Réserver un Vol": "Book a Flight",
      "Guide Pratique": "Practical Guide",
      "Voir plus": "See more",
      "Voir moins": "See less",

      /* === Footer (alternative wordings) === */
      "© 2026 — Tous droits réservés.": "© 2026 — All rights reserved."
    },

    ar: {
      /* === NAV === */
      "Accueil": "الرئيسية",
      "Villes": "المدن",
      "Plats": "الأطباق",
      "Activités": "الأنشطة",
      "Itinéraires": "المسارات",
      "Guide": "الدليل",
      "Explorez le Maroc": "استكشف المغرب",
      "Gastronomie": "فنّ الطهي",
      "Expériences": "تجارب",
      "Découvrir les Itinéraires": "اكتشف المسارات السياحية",
      "Découvrez les Itinéraires": "اكتشف المسارات السياحية",
      "Couscous Royal": "كسكس ملكي",
      "Harira": "حريرة",
      "Pastilla au Poulet": "بسطيلة بالدجاج",
      "Tanjia Marrakchia": "طنجية مراكشية",
      "Tagine Poulet & Citrons Confits": "طاجين الدجاج بالليمون المصبّر",
      "Voir tous les plats →": "عرض جميع الأطباق →",
      "Voir tous les plats ↑": "عرض جميع الأطباق ↑",
      "Animations": "الحركات",
      "Langue / Language": "اللغة",

      /* === City names === */
      "Tanger": "طنجة",
      "Chefchaouen": "شفشاون",
      "Rabat": "الرباط",
      "Fès": "فاس",
      "Ifrane": "إفران",
      "Merzouga": "مرزوقة",
      "Marrakech": "مراكش",
      "Essaouira": "الصويرة",
      "Agadir": "أكادير",

      /* === Region eyebrows === */
      "Nord — Côte méditerranéenne": "الشمال — الساحل المتوسطي",
      "Nord — Rif": "الشمال — الريف",
      "Nord — Montagnes du Rif": "الشمال — جبال الريف",
      "Côte atlantique — Capitale": "الساحل الأطلسي — العاصمة",
      "Centre — Capitale spirituelle": "الوسط — العاصمة الروحية",
      "Centre — Façade atlantique": "الوسط — الواجهة الأطلسية",
      "Centre-Sud — Cité ocre": "الوسط الجنوبي — المدينة الحمراء",
      "Côte atlantique": "الساحل الأطلسي",
      "Sud — Souss": "الجنوب — سوس",
      "Sud-Est — Sahara": "الجنوب الشرقي — الصحراء",
      "Moyen Atlas — Montagne": "الأطلس المتوسط — الجبال",
      "Détroit de Gibraltar — Région Tanger-Tétouan-Al Hoceïma": "مضيق جبل طارق — جهة طنجة-تطوان-الحسيمة",
      "Vallée du Saïs — Région Fès-Meknès": "وادي سايس — جهة فاس-مكناس",
      "Plaine d'Haouz — Région Marrakech-Safi": "سهل الحوز — جهة مراكش-آسفي",

      /* === Hero / homepage === */
      "Bienvenue au Royaume du Maroc": "مرحبًا بكم في المملكة المغربية",
      "Là où l'orient rencontre l'occident": "حيث يلتقي الشرق بالغرب",
      "Des médinas millénaires aux dunes du Sahara, des sommets de l'Atlas aux rivages atlantiques — découvrez un pays aux mille visages.": "من المدن العتيقة إلى كثبان الصحراء، ومن قمم الأطلس إلى السواحل الأطلسية — اكتشفوا بلدًا بألف وجه.",
      "Villes à Découvrir": "مدن لاكتشافها",
      "Sites UNESCO": "مواقع اليونسكو",
      "Plats Traditionnels": "أطباق تقليدية",
      "Expériences Uniques": "تجارب فريدة",
      "Faites défiler pour tracer votre voyage": "مرّر لرسم رحلتك",

      /* === City descriptions on homepage map === */
      "Porte de l'Afrique, ville cosmopolite entre Atlantique et Méditerranée — un carrefour millénaire de cultures et de saveurs.": "بوابة إفريقيا، مدينة كوزموبوليتية بين الأطلسي والمتوسط — ملتقى حضارات ونكهات منذ آلاف السنين.",
      "La perle bleue des montagnes : ruelles, escaliers et façades peints dans toutes les nuances d'azur.": "لؤلؤة الجبال الزرقاء: أزقّة ودرجات وواجهات مطليّة بكل درجات الأزرق.",
      "Capitale du royaume aux jardins andalous, à la kasbah des Oudayas et à la tour Hassan, face à l'océan.": "عاصمة المملكة بحدائقها الأندلسية وقصبة الأوداية وصومعة حسان، في مواجهة المحيط.",
      "Capitale spirituelle et intellectuelle, sa médina abrite la plus ancienne université du monde encore en activité.": "عاصمة روحية وفكرية، تضمّ مدينتها العتيقة أقدم جامعة لا تزال تعمل في العالم.",
      "Surnommée la « petite Suisse » du Maroc : chalets, lacs et cèdres, perchée à 1650 m d'altitude dans le Moyen Atlas.": "تُلقَّب بـ«سويسرا الصغيرة» للمغرب: شاليهات وبحيرات وأرز، على ارتفاع 1650 م في الأطلس المتوسط.",
      "Porte des dunes dorées de l'erg Chebbi : nuits sous les étoiles, dromadaires et silence absolu du désert.": "بوابة كثبان عرق الشبي الذهبية: ليالٍ تحت النجوم، جِمال، وصمت الصحراء المطلق.",
      "La cité ocre : la place Jemaa el-Fna, les souks parfumés, et les jardins de Majorelle.": "المدينة الحمراء: ساحة جامع الفنا، الأسواق العطرة، وحدائق ماجوريل.",
      "Cité des vents, port de pêche animé et remparts portugais battus par l'océan Atlantique.": "مدينة الرياح، ميناء صيد نابض بالحياة وأسوار برتغالية تلاطمها أمواج الأطلسي.",
      "Plages dorées de la côte atlantique, station balnéaire prisée pour son climat doux toute l'année.": "شواطئ ذهبية على الساحل الأطلسي، ومنتجع بحري مرغوب لمناخه المعتدل طوال العام.",
      "Voir la ville →": "اكتشف المدينة →",

      /* === Homepage sections === */
      "Explorez la Gastronomie Marocaine": "اكتشف المطبخ المغربي",
      "Des saveurs uniques qui racontent l'histoire d'un peuple.": "نكهات فريدة تروي تاريخ شعب.",
      "En savoir plus sur les plats marocains →": "اعرف المزيد عن الأطباق المغربية →",
      "Envie de découvrir de nouvelles expériences au Maroc ?": "متشوّق لاكتشاف تجارب جديدة في المغرب؟",
      "Du hammam traditionnel aux treks dans l'Atlas, en passant par les riads authentiques et les cours de cuisine — vivez le Maroc autrement.": "من الحمّام التقليدي إلى رحلات الأطلس، مرورًا بالرياضات الأصيلة ودروس الطبخ — عش المغرب بطريقة مختلفة.",
      "Voir tout": "عرض الكل",
      "Patrimoine": "التراث",
      "Désert": "الصحراء",
      "Atlas": "الأطلس",
      "Riads": "الرياضات",
      "Du sable de l'Erg Chebbi aux remparts d'Essaouira, en passant par les cités impériales et les sommets de l'Atlas — composez le voyage qui vous ressemble parmi nos itinéraires inspirants.": "من رمال عرق الشبي إلى أسوار الصويرة، مروراً بالمدن الإمبراطورية وقمم الأطلس — صمّم رحلتك التي تشبهك من بين مساراتنا الملهمة.",
      "Explorer les Itinéraires →": "استكشف المسارات →",
      "Villes impériales": "المدن الإمبراطورية",
      "Côte Atlantique": "الساحل الأطلسي",
      "© 2026 — Réalisé dans le cadre du module Développement Web | Encadré par Monsieur Reda Jourani | ENSA Tétouan 2026": "© 2026 — أُنجز في إطار وحدة تطوير الويب | تأطير الأستاذ رضا جوراني | المدرسة الوطنية للعلوم التطبيقية تطوان 2026",

      /* === Shared city-page UI === */
      "Destinations": "الوجهات",
      "En un clin d'œil": "في لمحة",
      "Durée conseillée": "المدّة المقترحة",
      "Saison idéale": "أفضل موسم",
      "Région": "الجهة",
      "DÉCOUVERTES": "اكتشافات",
      "ADRESSES": "عناوين",
      "SÉJOURS": "إقامات",
      "CONSEILS": "نصائح",
      "Hébergements d'exception": "إقامات استثنائية",
      "Culture & Conseils de Voyage": "الثقافة ونصائح السفر",
      "Planifier mon voyage": "خطّط لرحلتي",
      "Toutes les destinations": "جميع الوجهات",

      /* === Tanger labels === */
      "La Porte de l'Afrique": "بوابة إفريقيا",
      "Là où l'Atlantique embrasse la Méditerranée — carrefour millénaire des civilisations": "حيث يعانق المحيط الأطلسي البحر الأبيض المتوسط — ملتقى الحضارات منذ آلاف السنين",
      "Cosmopolite et insaisissable": "كوزموبوليتية ومراوغة",
      "Perchée à la pointe nord-ouest du Maroc, Tanger s'ouvre tout à la fois sur l'Atlantique et la Méditerranée, à seulement 14 kilomètres des côtes espagnoles. Sa position stratégique en a fait depuis l'Antiquité un point de passage entre l'Afrique et l'Europe, un comptoir convoité par les Phéniciens, les Romains, les Portugais, les Anglais puis les Espagnols.": "تطلّ طنجة من الطرف الشمالي الغربي للمغرب على المحيط الأطلسي والبحر الأبيض المتوسط معًا، على بُعد 14 كيلومترًا فقط من السواحل الإسبانية. جعل موقعها الاستراتيجي منها منذ العصور القديمة معبرًا بين إفريقيا وأوروبا، ومرفأً تنافست عليه الفينيقيون والرومان والبرتغاليون والإنجليز ثم الإسبان.",
      "Pendant la première moitié du XXe siècle, Tanger jouit d'un statut international unique qui attira écrivains, artistes et espions du monde entier. Paul Bowles, William Burroughs, Tennessee Williams ou Henri Matisse y ont laissé leurs traces, faisant de la cité un mythe littéraire et bohème.": "خلال النصف الأول من القرن العشرين، تمتّعت طنجة بمكانة دولية فريدة استقطبت الكتّاب والفنانين والجواسيس من جميع أنحاء العالم. ترك بول بولز ووليام بوروز وتينيسي ويليامز وهنري ماتيس بصماتهم فيها، فجعلوا منها أسطورة أدبية بوهيمية.",
      "Aujourd'hui, Tanger se réinvente. Sa médina blanche descend en cascade vers le port, la nouvelle marina côtoie les palais ottomans restaurés, et la corniche allongée offre des couchers de soleil mémorables sur le détroit. C'est une ville en mouvement, où chaque ruelle raconte une histoire différente.": "تتجدّد طنجة اليوم. تنحدر مدينتها العتيقة البيضاء كشلال نحو الميناء، وتجاور المرسى الجديد قصورًا عثمانية مرمّمة، وتقدّم كورنيشها الممتدّة مغيبات شمس لا تُنسى فوق المضيق. إنّها مدينة في حركة دائمة، حيث كلّ زقاق يروي حكاية مختلفة.",
      "2 à 3 jours": "يومان إلى ثلاثة أيام",
      "Avril-Juin et Septembre-Octobre": "أبريل-يونيو وسبتمبر-أكتوبر",
      "Tanger-Tétouan-Al Hoceïma": "طنجة-تطوان-الحسيمة",
      "À ne pas manquer à Tanger": "ما لا يفوّت في طنجة",
      "Kasbah de Tanger": "قصبة طنجة",
      "Ancienne forteresse perchée au sommet de la médina, elle abrite le palais du Sultan transformé en musée et offre une vue spectaculaire sur le détroit de Gibraltar.": "حصن قديم يعتلي المدينة العتيقة، يضمّ قصر السلطان الذي تحوّل إلى متحف، ويطلّ بإطلالة خلّابة على مضيق جبل طارق.",
      "Café Hafa": "مقهى الحافة",
      "Fondé en 1921 et perché sur des terrasses face à la mer, ce café légendaire a vu défiler les Rolling Stones, Bowles et Burroughs. Un thé à la menthe au coucher du soleil y devient inoubliable.": "أُسّس عام 1921 ويتربّع على شرفات تطلّ على البحر، وقد استقبل هذا المقهى الأسطوري فرقة الرولينغ ستونز وبولز وبوروز. كأس شاي بالنعناع عند الغروب تجربة لا تُنسى.",
      "Grottes d'Hercule": "مغارة هرقل",
      "À 14 km de la ville, ces grottes marines mythiques ouvrent sur l'océan par une ouverture en forme d'Afrique inversée. Selon la légende, Hercule s'y reposa avant de séparer les deux continents.": "على بعد 14 كلم من المدينة، تنفتح هذه المغاور البحرية الأسطورية على المحيط من فتحة تشبه قارة إفريقيا مقلوبة. تقول الأسطورة إنّ هرقل استراح فيها قبل أن يفصل القارتين.",
      "Cap Spartel": "رأس سبارطيل",
      "Point le plus nord-ouest du continent africain, surmonté d'un phare emblématique de 1864. C'est ici que l'océan Atlantique rencontre la mer Méditerranée — un spectacle saisissant.": "أقصى نقطة في الشمال الغربي للقارة الإفريقية، تعلوها منارة شهيرة تعود إلى 1864. هنا يلتقي المحيط الأطلسي بالبحر الأبيض المتوسط — مشهد آسر.",
      "Médina blanche": "المدينة البيضاء",
      "Labyrinthe de ruelles aux façades chaulées qui dévale vers le port. Souks, ateliers d'artisans, petites mosquées et passages voûtés — l'âme historique de la ville s'y dévoile pas à pas.": "متاهة من الأزقّة بواجهات بيضاء تنحدر نحو الميناء. أسواق، ورشات صنّاع تقليديين، مساجد صغيرة وممرّات مقنطرة — تكتشف روح المدينة التاريخية خطوة بخطوة.",
      "American Legation Museum": "متحف المفوضية الأمريكية",
      "Seul monument historique américain situé hors des États-Unis. Ce musée raconte deux siècles d'amitié maroco-américaine et expose une collection rare consacrée à Paul Bowles.": "المعلم التاريخي الأمريكي الوحيد خارج الولايات المتحدة. يروي هذا المتحف قرنين من الصداقة المغربية-الأمريكية ويعرض مجموعة نادرة مكرّسة لبول بولز.",
      "Où manger à Tanger": "أين تأكل في طنجة",
      "El Morocco Club": "إل موروكو كلوب",
      "Cuisine raffinée méditerranéenne et marocaine dans un cadre élégant de la Kasbah, ancien repaire des artistes internationaux.": "مطبخ متوسّطي ومغربي راقٍ في إطار أنيق بالقصبة، كان مأوى الفنانين العالميين سابقًا.",
      "Le Saveur de Poisson": "لو ساڤور دو بواسون",
      "Institution légendaire où l'on déguste les poissons du jour grillés à la berbère, accompagnés du fameux jus de l'amitié aux 12 fruits secs.": "مؤسسة أسطورية يُذوَّق فيها صيد اليوم مشويًّا على الطريقة الأمازيغية، مع عصير الصداقة الشهير من 12 نوعًا من الفواكه المجفّفة.",
      "Café Tingis": "مقهى تنجيس",
      "Café-restaurant emblématique du Petit Socco, idéal pour observer la vie de la médina autour d'un thé à la menthe et de pâtisseries traditionnelles.": "مقهى-مطعم مميّز في السوق الصغير، مثالي لمشاهدة الحياة في المدينة العتيقة مع شاي بالنعناع وحلويات تقليدية.",
      "Salon Bleu": "الصالون الأزرق",
      "Terrasse haut perchée dans la médina, où l'on savoure un tagine de poisson en contemplant le détroit de Gibraltar et la côte espagnole.": "شرفة مرتفعة في المدينة العتيقة، يُتذوَّق فيها طاجين السمك أمام مضيق جبل طارق والساحل الإسباني.",
      "Hôtel Continental": "فندق كونتيننتال",
      "Édifié en 1870 face au port, le plus ancien hôtel de la ville a hébergé Degas, Churchill et de nombreuses têtes couronnées. Décor d'époque préservé.": "بُني عام 1870 في مواجهة الميناء، أقدم فنادق المدينة استقبل ديغا وتشرشل وعديدًا من رؤساء الدول. الديكور التاريخي محفوظ.",
      "La Tangerina": "لا تانجيرينا",
      "Maison d'hôtes raffinée perchée sur les remparts de la Kasbah. Toit-terrasse panoramique et déco mêlant artisanat marocain et touches scandinaves.": "دار ضيافة راقية تطلّ من أسوار القصبة. سطح بانورامي وديكور يمزج الصناعة التقليدية المغربية بلمسات إسكندنافية.",
      "Nord-Pinus Tanger": "نور-بينوس طنجة",
      "Boutique-hôtel iconique installé dans un ancien palais de la Kasbah. Vue plongeante sur la baie, chambres uniques signées d'un mobilier d'artistes.": "فندق بوتيك مميّز في قصر قديم بالقصبة. إطلالة شاملة على الخليج، غرف فريدة بأثاث وقّع عليه فنانون.",
      "Ville multilingue": "مدينة متعدّدة اللغات",
      "À Tanger, l'arabe, l'espagnol et le français se mêlent dans les conversations quotidiennes. Un peu d'espagnol facilite grandement les échanges dans les souks.": "في طنجة تتداخل العربية والإسبانية والفرنسية في الحديث اليومي. القليل من الإسبانية يسهّل كثيرًا التفاعل في الأسواق.",
      "Climat venteux": "مناخ عاصف",
      "Le détroit canalise les vents toute l'année. Prévoyez une veste coupe-vent même en été, surtout pour les balades en bord de mer ou au Cap Spartel.": "يصرّف المضيق الرياح طوال السنة. خذ سترة ضد الريح حتى في الصيف، خاصّة لنزهات الساحل أو رأس سبارطيل.",
      "Train à grande vitesse": "قطار فائق السرعة",
      "Le LGV Al Boraq relie Tanger à Casablanca en 2h10. Idéal pour combiner la ville avec Rabat ou Casablanca dans un même itinéraire de voyage.": "يربط قطار البراق الفائق السرعة طنجة بالدار البيضاء في ساعتين وعشر دقائق. مثالي لدمج المدينة مع الرباط أو الدار البيضاء في الرحلة نفسها.",
      "Marchandage modéré": "مساومة معتدلة",
      "Dans la médina, la négociation est de rigueur mais reste plus douce qu'à Marrakech ou Fès. Comptez 30 à 50 % de marge sur les prix de départ annoncés.": "المساومة في المدينة العتيقة ضرورية لكنّها ألطف من مراكش أو فاس. توقّع هامش 30 إلى 50 % عن السعر الأوّلي.",
      "Héritage littéraire": "إرث أدبي",
      "Bowles, Burroughs, Genet, Choukri… Tanger est une ville d'écrivains. Visitez la Librairie des Colonnes, refuge des amoureux des lettres depuis 1949.": "بولز وبوروز وجينيه وشكري… طنجة مدينة الكتّاب. زر مكتبة الأعمدة، ملاذ عشّاق الأدب منذ 1949.",
      "Sécurité urbaine": "الأمن الحضري",
      "Tanger est globalement sûre, mais restez vigilant dans les zones touristiques très fréquentées comme le Petit Socco et la gare. Évitez les ruelles isolées la nuit.": "طنجة آمنة عمومًا، لكن ابقَ يقظًا في المناطق السياحية المكتظّة كالسوق الصغير والمحطة. تجنّب الأزقّة المعزولة ليلًا.",
      "Entre deux mers, entre deux mondes": "بين بحرين، بين عالمين",
      "Tanger vous attend avec ses terrasses, ses cafés mythiques et ses couchers de soleil sur le détroit. Réservez votre escapade au confluent de l'Atlantique et de la Méditerranée.": "تنتظركم طنجة بشرفاتها ومقاهيها الأسطورية ومغيبات شمسها فوق المضيق. احجزوا مغامرتكم عند ملتقى الأطلسي والمتوسط.",

      /* === Fès labels === */
      "La Capitale Spirituelle": "العاصمة الروحية",
      "Berceau de la civilisation marocaine, gardienne de la plus ancienne médina vivante au monde": "مهد الحضارة المغربية، حارسة أقدم مدينة عتيقة حيّة في العالم",
      "La cité millénaire des savoirs": "مدينة العلوم منذ ألف عام",
      "Fondée en 789 par Idriss Ier puis agrandie par son fils Idriss II, Fès est considérée comme la capitale spirituelle, culturelle et intellectuelle du Maroc. Première des quatre villes impériales, elle a vu naître la dynastie idrisside puis prospérer sous les Almoravides, les Mérinides et les Saadiens.": "أسّسها إدريس الأوّل سنة 789 ثم وسّعها ابنه إدريس الثاني، وتُعدّ فاس العاصمة الروحية والثقافية والفكرية للمغرب. أوّل المدن الإمبراطورية الأربع، شهدت ميلاد الدولة الإدريسية ثم ازدهرت في عهود المرابطين والمرينيين والسعديين.",
      "Sa médina, Fès el-Bali, classée au patrimoine mondial de l'UNESCO depuis 1981, est l'une des plus grandes zones piétonnes urbaines du monde. Ses 9 000 ruelles labyrinthiques abritent l'université Al Quaraouiyine — fondée en 859 par Fatima al-Fihri, c'est la plus ancienne université encore en activité, attestée par le Guinness et l'UNESCO.": "مدينتها العتيقة، فاس البالي، المسجّلة في التراث العالمي لليونسكو منذ 1981، هي من أكبر المناطق الحضرية الراجلة في العالم. تحتضن أزقّتها التسعة آلاف جامعة القرويين — التي أسّستها فاطمة الفهرية سنة 859، وهي أقدم جامعة لا تزال تعمل، كما تشهد بذلك موسوعة غينيس واليونسكو.",
      "Ville d'artisans par excellence, Fès vit encore au rythme des dinandiers, des teinturiers, des tanneurs et des céramistes. La célèbre tannerie Chouara, avec ses cuves colorées vues depuis les terrasses des marchands de cuir, reste l'image-emblème d'un savoir-faire transmis depuis le Moyen-Âge.": "مدينة الحِرَفيّين بامتياز، لا تزال فاس تنبض بإيقاع النحاسين والصبّاغين والدبّاغين والخزّافين. تبقى دباغة الشوارة الشهيرة، بأحواضها الملوّنة التي تُرى من شرفات تجّار الجلود، الصورة الرمزية لمهارة تنتقل منذ العصور الوسطى.",
      "Mars-Mai et Septembre-Novembre": "مارس-ماي وسبتمبر-نونبر",
      "Fès-Meknès": "فاس-مكناس",
      "À ne pas manquer à Fès": "ما لا يفوّت في فاس",
      "Médina de Fès el-Bali": "مدينة فاس البالي",
      "Classée à l'UNESCO et fondée au IXe siècle, c'est la plus grande zone piétonne médiévale au monde. 9 000 ruelles, 350 mosquées et un labyrinthe vivant qui n'a pas changé depuis mille ans.": "مسجّلة في اليونسكو ومؤسّسة في القرن التاسع، وهي أكبر منطقة راجلة في العصور الوسطى في العالم. 9000 زقاق، 350 مسجدًا، ومتاهة حيّة لم تتغيّر منذ ألف عام.",
      "Al Quaraouiyine": "القرويين",
      "Fondée en 859 par Fatima al-Fihri, c'est la plus ancienne université encore en activité au monde. Sa bibliothèque conserve plus de 4 000 manuscrits, dont certains datent du IXe siècle.": "أسّستها فاطمة الفهرية سنة 859، وهي أقدم جامعة لا تزال تعمل في العالم. تحتفظ مكتبتها بأكثر من 4000 مخطوط، بعضها يعود إلى القرن التاسع.",
      "Tannerie Chouara": "دباغة الشوارة",
      "Cuves colorées en activité depuis le XIe siècle où l'on teint encore le cuir selon les méthodes ancestrales. Observation depuis les terrasses des marchands — un brin de menthe sous le nez aide à supporter l'odeur.": "أحواض ملوّنة تعمل منذ القرن الحادي عشر، حيث لا يزال الجلد يُصبَغ بالطرق التقليدية. تُشاهَد من شرفات التجّار — غصن نعناع تحت الأنف يساعد على تحمّل الرائحة.",
      "Médersa Bou Inania": "مدرسة بوعنانية",
      "Chef-d'œuvre de l'architecture mérinide du XIVe siècle. Ses zelliges, ses stucs ciselés et son plafond en bois de cèdre sculpté en font l'une des plus belles médersas du Maroc.": "تحفة العمارة المرينية من القرن الرابع عشر. زلّيجها وزخارفها الجصّية المنحوتة وسقفها من خشب الأرز المنقوش تجعلها من أجمل المدارس في المغرب.",
      "Bab Boujloud": "باب بوجلود",
      "Porte monumentale bleue et verte, principale entrée de la médina depuis 1913. Côté médina, elle est ornée de zelliges verts ; côté ville nouvelle, de zelliges bleus — le bleu de Fès.": "باب ضخم باللونين الأزرق والأخضر، المدخل الرئيسي للمدينة العتيقة منذ 1913. من جهة المدينة العتيقة، زلّيج أخضر ؛ من جهة المدينة الجديدة، زلّيج أزرق — أزرق فاس.",
      "Palais Royal & Mellah": "القصر الملكي والملاح",
      "Les sept portes monumentales en bronze du Palais Royal ouvrent sur Fès Jdid. À côté, l'ancien quartier juif (Mellah) conserve ses balcons en bois ouvragé et son cimetière historique.": "تفتح أبواب القصر الملكي السبعة الضخمة من البرونز على فاس الجديد. بجواره، يحافظ الحيّ اليهودي القديم (الملاح) على شرفاته الخشبية المنحوتة ومقبرته التاريخية.",
      "Où manger à Fès": "أين تأكل في فاس",
      "Dar Roumana": "دار الرّمّانة",
      "Riad-restaurant raffiné dans la médina. Cuisine marocaine moderne par un chef formé en France, dans un cadre intime aux zelliges anciens.": "رياض-مطعم راقٍ في المدينة العتيقة. مطبخ مغربي عصري على يد طاهٍ تكوّن في فرنسا، في إطار حميمي بزلّيج قديم.",
      "Restaurant Numéro 7": "مطعم رقم 7",
      "Table d'auteur installée dans une maison de la médina. Menu unique du chef invité, renouvelé chaque saison, accord parfait avec les vins marocains.": "مائدة مميّزة في منزل بالمدينة العتيقة. قائمة واحدة من الطاهي الضيف، تتجدّد كلّ موسم، بمواءمة رائعة مع النبيذ المغربي.",
      "Café Clock": "كافي كلوك",
      "Institution culturelle autant que restaurant. Le fameux camel burger, les soirées contes berbères et les cours de cuisine en font un passage obligé.": "مؤسّسة ثقافية بقدر ما هي مطعم. برغر الجمل الشهير، أمسيات الحكايات الأمازيغية ودروس الطبخ تجعله محطّة لا غنى عنها.",
      "The Ruined Garden": "ذا روِند غاردِن",
      "Dans le jardin d'une demeure en ruines magnifiquement préservée, on déguste tagines lents et mezzés marocains, à l'ombre des bougainvilliers centenaires.": "في حديقة دار خربة محفوظة بأبدع شكل، تتذوّق الطاجين البطيء والمزّات المغربية في ظلّ الجهنميات المعمّرة.",
      "Riad Fès": "رياض فاس",
      "Relais & Châteaux installé dans plusieurs demeures andalouses fusionnées. Patios, piscine intérieure et spa hammam — le luxe au cœur de la médina.": "فندق Relais & Châteaux في عدّة دور أندلسية مدمجة. صحون داخلية، مسبح داخلي وسبا بحمّام — الفخامة في قلب المدينة العتيقة.",
      "Palais Faraj": "قصر فرج",
      "Palais du XIXe siècle restauré avec splendeur, perché en surplomb de la médina. Vue plongeante sur la cité depuis le toit-terrasse et son restaurant gastronomique.": "قصر من القرن التاسع عشر رُمِّم بفخامة، يطلّ على المدينة العتيقة من أعلى. إطلالة شاملة على المدينة من السطح ومطعمه الراقي.",
      "Riad Le Calife": "رياض الخليفة",
      "Riad familial intimiste au cœur de Fès el-Bali. Petit-déjeuner traditionnel servi sous l'oranger du patio, accueil chaleureux et conseils précieux des hôtes.": "رياض عائلي حميمي في قلب فاس البالي. فطور تقليدي تحت شجرة البرتقال في الصحن، استقبال حارّ ونصائح ثمينة من المضيفين.",
      "Se perdre est inévitable": "الضياع لا مفرّ منه",
      "Avec ses 9 000 ruelles, la médina de Fès défie tous les GPS. Un guide local est précieux pour la première journée — au-delà, accepter de se perdre fait partie de l'expérience.": "بـ 9000 زقاق، تتحدّى مدينة فاس العتيقة كلّ أنظمة الـ GPS. الدليل المحلي ثمين في اليوم الأول — بعد ذلك، قبول الضياع جزء من التجربة.",
      "Brin de menthe à la tannerie": "غصن نعناع في الدباغة",
      "Acceptez le brin de menthe offert à l'entrée des terrasses de la tannerie Chouara : l'odeur du tannage à l'ancienne est intense, surtout en été.": "اقبل غصن النعناع الذي يُقدَّم عند مدخل شرفات دباغة الشوارة: رائحة الدباغة القديمة قويّة، خاصّة في الصيف.",
      "Lieux de culte": "أماكن العبادة",
      "Mosquées et zaouïas sont strictement réservées aux fidèles musulmans. On peut néanmoins admirer les portails ouvragés et les médersas, ouvertes à toutes et tous.": "المساجد والزوايا مخصّصة حصرًا للمسلمين. مع ذلك يمكن إعجاب الجميع بالأبواب المزخرفة والمدارس المفتوحة للجميع.",
      "Marchandage prononcé": "مساومة قوية",
      "Dans les souks de Fès, la négociation est intense. Les premiers prix annoncés sont souvent 3 à 4 fois supérieurs à la valeur réelle. Restez courtois et souriant.": "في أسواق فاس، المساومة شديدة. الأسعار الأولى تكون عادة 3 إلى 4 أضعاف القيمة الحقيقية. ابقَ مهذّبًا ومبتسمًا.",
      "Pas de voitures": "بلا سيارات",
      "La médina est une zone 100 % piétonne. Marchandises et bagages y sont transportés à dos d'âne ou de mulet — gardez l'œil et l'oreille attentive en marchant.": "المدينة العتيقة منطقة راجلة 100 %. تُنقَل البضائع والأمتعة على ظهر الحمير أو البغال — حافظ على يقظتك أثناء السير.",
      "Artisanat de qualité": "حرف عالية الجودة",
      "Fès est la capitale incontestée de la céramique bleue, du cuir tanné à l'ancienne et de la dinanderie. Les ateliers du quartier As-Seffarine valent à eux seuls le détour.": "فاس عاصمة الخزف الأزرق والجلد المدبوغ على الطريقة القديمة وفنّ النحاس بلا منازع. ورشات حيّ الصفّارين وحدها تستحقّ الزيارة.",
      "Mille ans de savoir, à un battement d'ailes": "ألف عام من العلم، على بُعد رفّة جناح",
      "Fès vous attend avec sa médina millénaire, ses tanneries colorées et ses ateliers d'artisans. Préparez votre immersion au cœur de la capitale spirituelle du Maroc.": "تنتظركم فاس بمدينتها العتيقة الألفية ودباغاتها الملوّنة وورشات صنّاعها. استعدّوا لانغماس في قلب العاصمة الروحية للمغرب.",

      /* === Marrakech === */
      "La Ville Rouge": "المدينة الحمراء",
      "Où l'histoire almohade rencontre la magie des mille et une nuits": "حيث يلتقي تاريخ الموحّدين بسحر ألف ليلة وليلة",
      "La perle ocre du sud marocain": "اللؤلؤة الحمراء للجنوب المغربي",
      "3 à 4 jours": "ثلاثة إلى أربعة أيام",
      "Mars-Mai et Octobre-Novembre": "مارس-ماي وأكتوبر-نونبر",
      "Marrakech-Safi": "مراكش-آسفي",
      "À ne pas manquer à Marrakech": "ما لا يفوّت في مراكش",
      "Où manger à Marrakech": "أين تأكل في مراكش",
      "Prêt à plonger dans l'ocre et l'or ?": "هل أنت مستعدّ للغوص في الأحمر والذهبي؟",
      "Marrakech vous attend avec ses palais millénaires, ses souks envoûants et ses nuits étoilées sur les toits de riads. Planifiez dès maintenant votre séjour.": "تنتظركم مراكش بقصورها الألفية وأسواقها الساحرة وليالٍ مرصّعة بالنجوم فوق أسطح الرياضات. خطّط الآن لإقامتك.",

      /* === Chefchaouen === */
      "La Perle Bleue": "اللؤلؤة الزرقاء",

      /* === Common === */
      "Réserver un Vol": "حجز رحلة",
      "Guide Pratique": "الدليل العملي",
      "Voir plus": "المزيد",
      "Voir moins": "أقلّ",
      "© 2026 — Tous droits réservés.": "© 2026 — جميع الحقوق محفوظة."
    }
  };

  // ============================================================
  // === SELECTORS ===
  // Every element matched here gets its leading text node translated.
  // ============================================================
  const SEL = [
    // --- Generic ---
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p',
    'a',
    'button',
    'span',
    'li',
    'figcaption',
    'blockquote',
    // --- Nav (specific overrides) ---
    '#siteMenu .menu-head', '#siteMenu .menu-sub-list a',
    '.menu-label', '.motion-label',
    // --- Homepage ---
    '.hero h1', '.hero .sous-titre', '.hero p.desc',
    '.stat-label',
    '.map-intro h2', '.map-intro .section-subtitle',
    '.city-info-item .city-eyebrow', '.city-info-item h3',
    '.city-info-item p', '.city-info-item a',
    '.dish-side .eyebrow', '.dish-side h2', '.dish-side p', '.dish-side .btn-maroc',
    '.exp-side .eyebrow', '.exp-side h2', '.exp-side p', '.exp-see-all',
    '.guide-teaser h2', '.guide-teaser p', '.guide-teaser .btn-maroc',
    '.guide-icon-card span',
    '.footer-maroc', '.footer-simple',
    // --- City pages ---
    '.city-eyebrow',
    '.city-hero-content h1', '.city-tagline',
    '.city-breadcrumb a', '.city-breadcrumb span',
    '.intro-sub',
    '.intro-meta-title', '.intro-meta-item h5', '.intro-meta-item p',
    '.section-title-wrap h2', '.section-eyebrow',
    '.city-card-title', '.city-card-desc',
    '.culture-grid-card h3', '.culture-grid-card p',
    '.culture-card-title', '.culture-card-desc',
    '.city-cta h2', '.city-cta p',
    '.btn-maroc-primary', '.btn-maroc-outline',
    // --- Dishes ---
    '.dishes-hero .eyebrow', '.dishes-hero h1', '.dishes-hero p.lead',
    '.dish-card-body h3', '.dish-card-body .desc',
    '.search-wrap input',
    // --- Activities ---
    '.hero-act h1', '.hero-eyebrow', '.hero-desc', '.hero-cta',
    '.act-item h3', '.act-item p', '.act-item .act-title', '.act-item .act-desc',
    '.filter-tab', '.label',
    // --- Team / Equip ---
    '.equipe-title', '.equipe-eyebrow span',
    '.membre-role', '.membre-ville',
    // --- Itinerary ---
    '.menu-item', '.section-title', '.section-subtitle',
    '.itinerary-title', '.itinerary-desc'
  ].join(',');

  // ============================================================
  // === ENGINE ===
  // ============================================================
  const norm = s => s.replace(/\s+/g, ' ').trim();

  function labelNode(el) {
    for (const n of el.childNodes) {
      if (n.nodeType === 3 && n.nodeValue.trim()) return n;
    }
    return null;
  }

  // Build a registry of every translatable text node on the page.
  const registry = [];
  function buildRegistry() {
    registry.length = 0;
    const seen = new WeakSet();
    document.querySelectorAll(SEL).forEach(el => {
      const node = labelNode(el);
      if (!node || seen.has(node)) return;
      seen.add(node);
      registry.push({ node, fr: node.nodeValue, key: norm(node.nodeValue) });
    });
  }

  function applyLang(lang) {
    const table = DICT[lang];
    registry.forEach(({ node, fr, key }) => {
      if (lang === 'fr' || !table || !table[key]) {
        node.nodeValue = fr;
        return;
      }
      const lead = (fr.match(/^\s*/) || [''])[0];
      const trail = (fr.match(/\s*$/) || [''])[0];
      node.nodeValue = lead + table[key] + trail;
    });
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
  }

  function wireButtons(setLang) {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });
  }

  function syncButtonState(lang) {
    document.querySelectorAll('.lang-btn').forEach(btn =>
      btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false'));
  }

  function init() {
    buildRegistry();

    let stored = 'fr';
    try { stored = localStorage.getItem('mdLang') || 'fr'; } catch (e) {}
    if (!DICT[stored] && stored !== 'fr') stored = 'fr';

    function setLang(lang) {
      if (!DICT[lang] && lang !== 'fr') lang = 'fr';
      syncButtonState(lang);
      applyLang(lang);
      try { localStorage.setItem('mdLang', lang); } catch (e) {}
    }

    wireButtons(setLang);
    setLang(stored);

    // Expose for other scripts if needed
    window.MDI18N = { setLang, getLang: () => {
      try { return localStorage.getItem('mdLang') || 'fr'; } catch (e) { return 'fr'; }
    }};
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
