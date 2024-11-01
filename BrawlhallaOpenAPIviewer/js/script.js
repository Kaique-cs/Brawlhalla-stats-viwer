let brawlhallaId;

document.getElementById('submitButton').addEventListener('click', async function() {
    brawlhallaId = document.getElementById('idInput').value;
    console.log('ID inserido:', brawlhallaId);
    await fetchBrawlhallaData();
});

async function fetchBrawlhallaData() {
    const urlStats = `https://brawlhalla.fly.dev/v1/stats/id?brawlhalla_id=${brawlhallaId}`;
    const urlRanked = `https://brawlhalla.fly.dev/v1/ranked/id?brawlhalla_id=${brawlhallaId}`;

    try {
        const [statsResponse, rankedResponse] = await Promise.all([
            fetch(urlStats),
            fetch(urlRanked)
        ]);

        if (!statsResponse.ok || !rankedResponse.ok) {
            throw new Error(`Erro: ${statsResponse.status} ou ${rankedResponse.status}`);
        }

        const statsData = await statsResponse.json();
        const rankedData = await rankedResponse.json();

        displayCombinedStats(statsData, rankedData);
        displayStats(statsData);
        displayRanked(rankedData);
    } catch (error) {
        document.getElementById('stats').innerText = 'Erro ao buscar os dados.';
        console.error('Erro ao buscar os dados:', error);
    }
}

function displayCombinedStats(statsData, rankedData) {
    const statsDiv = document.getElementById('carouselImages');
    statsDiv.innerHTML = ''; // Limpa o conteúdo antes de adicionar novas legendas

    const legendsMap = new Map();

    const imagens = {
        25: "image/BrawlhallaRenders/DIANA_Default_ClassicColors_Selected_Original_Original_80_238x362.png",
        35: "image/BrawlhallaRenders/MORDEX_Default_Classic Colors_Selected_Original_Original_93_267x241.png",
        18: "image/BrawlhallaRenders/EMBER_Default_Classic Colors_Selected_Original_Original_49_298x241.png",
        19: "image/BrawlhallaRenders/BRYNN_Default_Classic Colors_Selected_Original_Original_70_153x325.png",
        37: "image/BrawlhallaRenders/ARTEMIS_Default_Classic Colors_Selected_Original_Original_83_232x279.png",
        8: "image/BrawlhallaRenders/QUEEN NAI_Default_Classic Colors_Selected_Original_Original_50_377x326.png",
        5: "image/BrawlhallaRenders/ORION_Default_Classic Colors_Selected_Original_Original_77_157x332.png",
        4: "image/BrawlhallaRenders/CASSIDY_Default_Classic Colors_Selected_Original_Original_76_367x283.png",
        33: "image/BrawlhallaRenders/MIRAGE_Default_Classic Colors_Selected_Original_Original_75_379x307.png",
        46: "image/BrawlhallaRenders/RAYMAN_Default_Classic Colors_Selected_Original_Original_80_226x266.png",
        43: "image/BrawlhallaRenders/JIRO_Default_Classic Colors_Selected_Original_Original_125_380x295.png",
        10: "image/BrawlhallaRenders/HATTORI_Default_Classic Colors_Selected_Original_Original_70_244x285.png",
        48: "image/BrawlhallaRenders/FAIT_Default_Classic Colors_Selected_Original_Original_62_323x320.png",
        28: "image/BrawlhallaRenders/KOR_Default_Classic Colors_Selected_Original_Original_56_290x289.png",
        31: "image/BrawlhallaRenders/RAGNIR_Default_Classic Colors_Selected_Original_Original_68_268x278.png",
        6: "image/BrawlhallaRenders/LORD VRAXX_Default_Classic Colors_Selected_Original_Original_73_192x264.png",
        26: "image/BrawlhallaRenders/JHALA_Default_Classic Colors_Selected_Original_Original_80_267x304.png",
        39: "image/BrawlhallaRenders/SIDRA_Default_Classic Colors_Selected_Original_Original_97_294x280.png",
        42: "image/BrawlhallaRenders/KAYA_Default_Classic Colors_Selected_Original_Original_75_335x267.png",
        34: "image/BrawlhallaRenders/NIX_Default_Classic Colors_Selected_Original_Original_61_355x342.png",
        21: "image/BrawlhallaRenders/BARRAZA_Default_Classic Colors_Selected_Original_Original_62_190x299.png",
        30: "image/BrawlhallaRenders/VAL_Default_Classic Colors_Selected_Original_Original_56_364x293.png",
        50: "image/BrawlhallaRenders/PETRA_Default_Classic Colors_Selected_Original_Original_58_247x256.png",
        24: "image/BrawlhallaRenders/KOJI_Default_Classic Colors_Selected_Original_Original_58_201x381.png",
        41: "image/BrawlhallaRenders/ISAIAH_Default_Classic Colors_Selected_Original_Original_90_281x237.png",
        14: "image/BrawlhallaRenders/ADA_Default_Classic Colors_Selected_Original_Original_50_337x266.png",
        45: "image/BrawlhallaRenders/ZARIEL_Default_Classic Colors_Selected_Original_Original_74_300x300.png",
        49: "image/BrawlhallaRenders/THOR_Default_Classic Colors_Selected_Original_Original_102_303x328.png",
        9: "image/BrawlhallaRenders/LUCIEN_Default_Classic Colors_Selected_Original_Original_75_304x277.png",
        16: "image/BrawlhallaRenders/TEROS_Default_Classic Colors_Selected_Original_Original_94_353x283.png",
        12: "image/BrawlhallaRenders/SCARLET_Default_Classic Colors_Selected_Original_Original_88_136x299.png",
        38: "image/BrawlhallaRenders/CASPIAN_Default_Classic Colors_Selected_Original_Original_112_221x309.png",
        32: "image/BrawlhallaRenders/CROSS_Default_Classic Colors_Selected_Original_Original_65_227x289.png",
        40: "image/BrawlhallaRenders/XULL_Default_Classic Colors_Selected_Original_Original_100_405x256.png",
        51: "image/BrawlhallaRenders/VECTOR_Default_Classic Colors_Selected_Original_Original_73_411x283.png",
        47: "image/BrawlhallaRenders/DUSK_Default_Classic Colors_Selected_Original_Original_69_347x257.png",
        20: "image/BrawlhallaRenders/ASURI_Default_Classic Colors_Selected_Original_Original_61_279x250.png",
        29: "image/BrawlhallaRenders/WU SHANG_Default_Classic Colors_Selected_Original_Original_66_264x291.png",
        23: "image/BrawlhallaRenders/AZOTH_Default_Classic Colors_Selected_Original_Original_77_373x352.png",
        44: "image/BrawlhallaRenders/LIN FEI_Default_Classic Colors_Selected_Original_Original_78_230x257.png",
        3: "image/BrawlhallaRenders/BÖDVAR_Default_Classic Colors_Selected_Original_Original_84_326x297.png",
        36: "image/BrawlhallaRenders/YUMIKO_Default_Classic Colors_Selected_Original_Original_38_389x269.png",
        13: "image/BrawlhallaRenders/THATCH_Default_Classic Colors_Selected_Original_Original_75_230x308.png",
        22: "image/BrawlhallaRenders/ULGRIM_Default_Classic Colors_Selected_Original_Original_77_318x338.png",
        52: "image/BrawlhallaRenders/VOLKOV_Default_Classic Colors_Selected_Original_Original_102_141x284.png",
        15: "image/BrawlhallaRenders/SENTINEL_Default_Classic Colors_Selected_Original_Original_52_299x291.png",
        7: "image/BrawlhallaRenders/GNASH_Default_Classic Colors_Selected_Original_Original_79_221x254.png",
        11: "image/BrawlhallaRenders/SIR ROLAND_Default_Classic Colors_Selected_Original_Original_52_202x345.png",
        53: "image/BrawlhallaRenders/ONYX_Default_Classic Colors_Selected_Original_Original_91_437x378.png",
        54: "image/BrawlhallaRenders/JAEYUN_Default_Classic Colors_Selected_Original_Original_93_299x337.png",
        55: "image/BrawlhallaRenders/MAKO_Default_Classic Colors_Selected_Original_Original_73_399x253.png",
        56: "image/BrawlhallaRenders/MAGYAR_Default_Classic Colors_Selected_Original_Original_93_384x383.png",
        57: "image/BrawlhallaRenders/RENO_Default_Classic Colors_Selected_Original_Original_68_394x314.png",
        58: "image/BrawlhallaRenders/MUNIN_Default_Classic Colors_Selected_Original_Original_71_366x399.png",
        59: "image/BrawlhallaRenders/ARCADIA_Default_Classic Colors_Selected_Original_Original_89_400x407.png",
        60: "image/BrawlhallaRenders/EZIO_Default_Classic Colors_Selected_Original_Original_90_320x291.png",
        63: "image/BrawlhallaRenders/TEZCA_Default_Classic Colors_Selected_Original_Original_55_249x223.png",
        62: "image/BrawlhallaRenders/THEA_Default_Classic Colors_Selected_Original_Original_55_299x316.png",
        17: "image/BrawlhallaRenders/RED RAPTOR_Default_Classic Colors_Selected_Original_Original_78_338x242.png",
        27: "image/BrawlhallaRenders/LOKI_Default_Classic Colors_Selected_Original_Original_87_369x256.png",
        61: "image/BrawlhallaRenders/SEVEN_Default_Classic Colors_Selected_Original_Original_76_446x268.png",
        64: "image/BrawlhallaRenders/VIVI_Default_Classic Colors_Selected_Original_Original_161_413x327.png",
        65: "image/BrawlhallaRenders/IMUGI_Default_Classic Colors_Selected_Original_Original_130_391x410.png",
        66: "image/BrawlhallaRenders/KING ZUVA_Default_Classic Colors_Selected_Original_Original_116_289x419.png",
    };

    // Adiciona os dados do stats
    statsData.data.legends.forEach(legend => {
        legendsMap.set(legend.legend_id, {
            ...legend,
            rankedData: {}
        });
    });

    // Adiciona os dados do ranked
    rankedData.data.legends.forEach(legend => {
        if (legendsMap.has(legend.legend_id)) {
            legendsMap.get(legend.legend_id).rankedData = legend;
        }
    });

    // Exibe os dados combinados
    legendsMap.forEach(legend => {
        const legendHTML = `
            <div class="legend">
                <img src="${imagens[legend.legend_id]}" class="legend-image" alt="${legend.legend_name_key}">
                <h3>Lenda: ${legend.legend_name_key}</h3>
                <p>Dano Causado: ${legend.damagedealt}</p>
                <p>Dano Recebido: ${legend.damagetaken}</p>
                <p>Partidas: ${legend.games}</p>
                <p>Vitórias: ${legend.wins}</p>
                <p>KO's: ${legend.kos}</p>
                <p>Quedas: ${legend.falls}</p>
                <p>Suicídios: ${legend.suicides}</p>
                <p>Dano com arma 1: ${legend.damageweaponone}</p>
                <p>Dano com arma 2: ${legend.damageweapontwo}</p>
                <p>Ranked Partidas: ${legend.rankedData.games || 0}</p>
                <p>Elo mais alto: ${legend.rankedData.peak_rating || 0}</p>
                <p>Elo atual: ${legend.rankedData.rating || 0}</p>
                <p>Ranked Vitórias: ${legend.rankedData.wins || 0}</p>
                <p>Ranked tier: ${legend.rankedData.tier || 0}</p>
            </div>
        `;
        statsDiv.innerHTML += legendHTML;
    });

    // Inicializa a primeira lenda como ativa
    const firstLegend = statsDiv.querySelector('.legend');
    if (firstLegend) {
        firstLegend.classList.add('active');
    }
}
 

let currentIndex = 0;

function moveSlide(direction) {
    const legends = document.querySelectorAll('.legend');

    if (legends.length === 0) return;

    // Remove a classe 'active' da lenda atual
    legends[currentIndex].classList.remove("active");
    currentIndex += direction;

    // Verifica os limites
    if (currentIndex < 0) {
        currentIndex = legends.length - 1;
    } else if (currentIndex >= legends.length) {
        currentIndex = 0;
    }

    // Adiciona a classe 'active' à nova lenda
    legends[currentIndex].classList.add("active");
}

// Event listeners para os botões
document.getElementById('prevButton').addEventListener('click', () => moveSlide(-1));
document.getElementById('nextButton').addEventListener('click', () => moveSlide(1));

function displayStats(data) {
    const statsDiv = document.getElementById('stats');
    statsDiv.innerHTML = '';
    const statsHTML = `
        <h2>Estatísticas para ID: ${data.data.brawlhalla_id}</h2>
        <p>Nome: ${data.data.name}</p>
        <p>Experiência: ${data.data.xp}</p>
        <p>Nível: ${data.data.level}</p>
        <p>Partidas Jogadas: ${data.data.games}</p>
        <p>Vitórias: ${data.data.wins}</p>
        <p>Dano por Bombas: ${data.data.damagebomb}</p>
        <p>Dano por Minas: ${data.data.damagemine}</p>
        <p>Dano por Spike Ball: ${data.data.damagespikeball}</p>
        <p>Dano por Sidekick: ${data.data.damagesidekick}</p>
        <p>Hits de Snowball: ${data.data.hitsnowball}</p>
        <p>KOs por Bomba: ${data.data.kobomb}</p>
        <p>KOs por Mina: ${data.data.komine}</p>
        <p>KOs por Spike Ball: ${data.data.kospikeball}</p>
        <p>KOs por Sidekick: ${data.data.kosidekick}</p>
        <p>KOs por Snowball: ${data.data.kosnowball}</p>
    `;
    statsDiv.innerHTML = statsHTML;
}

function displayRanked(data1) {
    const rankedDiv = document.getElementById('ranked');
    rankedDiv.innerHTML = '';
    const rankedHTML = `
        <p>2v2 id um: ${data1.data["2v2"][0].brawlhalla_id_one}</p>
        <p>2v2 id dois: ${data1.data["2v2"][0].brawlhalla_id_two}</p>
        <p>2v2 partidas ${data1.data["2v2"][0].games}</p>
        <p>2v2 rank global ${data1.data["2v2"][0].global_rank}</p>
        <p>2v2 elo maximo ${data1.data["2v2"][0].peak_rating}</p>
        <p>2v2 elo ${data1.data["2v2"][0].rating}</p>
        <p>2v2 região ${data1.data["2v2"][0].region}</p>
        <p>2v2 nome do time ${data1.data["2v2"][0].teamname}</p>
        <p>2v2 tier ${data1.data["2v2"][0].tier}</p>
        <p>2v2 vitorias ${data1.data["2v2"][0].wins}</p>
        <p>Nome: ${data1.data.name}</p>
        <p>rank global: ${data1.data.global_rank}</p>
        <p>Rank regional: ${data1.data.region_rank}</p>
        <p>Peak elo: ${data1.data.peak_rating}</p>
        <p>Elo atual: ${data1.data.rating}</p>
        <p>Região: ${data1.data.region}</p>
        <p>Tier: ${data1.data.tier}</p>
        <p>Partidas Jogadas: ${data1.data.games}</p>
        <p>Vitórias: ${data1.data.wins}</p>
    `;
    rankedDiv.innerHTML = rankedHTML;
}
