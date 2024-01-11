import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


if (!"speechSynthesis" in window) {
alert("Sorry, your browser doesn't support text to speech!");
}

async function initModel() {
    if (isGenerating) {
        clearInterval(generationInterval);
        isGenerating = false;
    }
    modelPath = 'ONNX_saved/bpe/exported_model.quant.onnx';
    const list = ["<spkchg>", "something</w>", "different</w>", "including</w>", "because</w>", "through</w>", "ational</w>", "between</w>", "owever,</w>", "another</w>", "without</w>", "against</w>", "people</w>", "should</w>", "ations</w>", "before</w>", "you're</w>", "really</w>", "around</w>", "ation.</w>", "ation,</w>", "during</w>", "things</w>", "number</w>", "little</w>", "ation</w>", "about</w>", "their</w>", "which</w>", "would</w>", "other</w>", "there</w>", "don't</w>", "tions</w>", "could</w>", "first</w>", "after</w>", "thing</w>", "where</w>", "ating</w>", "right</w>", "aking</w>", "think</w>", "these</w>", "going</w>", "while</w>", "being</w>", "using</w>", "ement</w>", "might</w>", "still</w>", "ative</w>", "those</w>", "owing</w>", "ently</w>", "place</w>", "ready</w>", "tion.</w>", "years</w>", "great</w>", "There</w>", "until</w>", "three</w>", "under</w>", "every</w>", "since</w>", "start</w>", "uring</w>", "that</w>", "your</w>", "with</w>", "have</w>", "will</w>", "from</w>", "this</w>", "tion</w>", "they</w>", "ally</w>", "more</w>", "ting</w>", "like</w>", ".<begin>", "able</w>", "also</w>", "king</w>", "ment</w>", "ther</w>", "ated</w>", "This</w>", "ents</w>", "when</w>", "into</w>", "some</w>", "time</w>", "been</w>", "ding</w>", "what</w>", "make</w>", "them</w>", "just</w>", "than</w>", "were</w>", "ence</w>", "want</w>", "ing.</w>", "over</w>", "ing,</w>", "need</w>", "ance</w>", "most</w>", "very</w>", "only</w>", "said</w>", "sion</w>", "ning</w>", "ving</w>", "it's</w>", "work</w>", "then</w>", "know</w>", "sure</w>", "take</w>", "help</w>", "ough</w>", "good</w>", "at's</w>", "ound</w>", "used</w>", "tive</w>", "back</w>", "much</w>", "ates</w>", "such</w>", "many</w>", "even</w>", "It's</w>", "ying</w>", "ical</w>", "ties</w>", "down</w>", "port</w>", "side</w>", "each</w>", "find</w>", "come</w>", "ings</w>", "sing</w>", "last</w>", "What</w>", "well</w>", "look</w>", "ways</w>", "ited</w>", "self</w>", "same</w>", "dn't</w>", "made</w>", "When</w>", "They</w>", "akes</w>", "line</w>", "ower</w>", "less</w>", "on't</w>", "both</w>", "ends</w>", "best</w>", "next</w>", "ters</w>", "give</w>", "ular</w>", "lick</w>", "long</w>", "keep</w>", "part</w>", "ever</w>", "feel</w>", "year</w>", "here</w>", "ouse</w>", "ants</w>", "sive</w>", "form</w>", "lion</w>", "ause</w>", "ince</w>", "ould</w>", "fore</w>", "ttle</w>", "ween</w>", "the</w>", "and</w>", "ing</w>", "you</w>", "for</w>", "are</w>", "The</w>", "can</w>", "was</w>", "ent</w>", "ate</w>", "one</w>", "ers</w>", "all</w>", "not</w>", "has</w>", "but</w>", "ted</w>", "es.</w>", "ter</w>", "his</w>", "es,</w>", "ity</w>", "out</w>", "any</w>", "age</w>", "its</w>", "our</w>", "get</w>", "who</w>", "You</w>", "ght</w>", "est</w>", "ain</w>", "ure</w>", "ice</w>", "ely</w>", "ite</w>", "ect</w>", "ess</w>", "ard</w>", "new</w>", "end</w>", "ant</w>", "ase</w>", "day</w>", "had</w>", "her</w>", "der</w>", "old</w>", "use</w>", "own</w>", "ary</w>", "may</w>", "ame</w>", "how</w>", "ous</w>", "ast</w>", "er,</w>", "ome</w>", "er.</w>", "ver</w>", "see</w>", "ans</w>", "ed.</w>", "two</w>", "way</w>", "red</w>", "she</w>", "ong</w>", "le,</w>", "e's</w>", "ell</w>", "But</w>", "als</w>", "ace</w>", "ked</w>", "ber</w>", "ake</w>", "n't</w>", "ded</w>", "ust</w>", "ves</w>", "ed,</w>", "ble</w>", "ood</w>", "ine</w>", "ook</w>", "son</w>", "now</w>", "ack</w>", "ors</w>", "ile</w>", "ays</w>", "I'm</w>", "ave</w>", "For</w>", "try</w>", "<begin>", "ved</w>", "it.</w>", "him</w>", "ily</w>", "ill</w>", "ows</w>", "sts</w>", "off</w>", "tic</w>", "too</w>", "act</w>", "sed</w>", "ind</w>", "ore</w>", "ear</w>", "ven</w>", "ful</w>", "ool</w>", "ten</w>", "And</w>", "ese</w>", "ree</w>", "on,</w>", "ons</w>", "le.</w>", "set</w>", "'re</w>", "lic</w>", "few</w>", "on.</w>", "lot</w>", "ach</w>", "ick</w>", "man</w>", "ank</w>", "ond</w>", "top</w>", "did</w>", "ail</w>", "tor</w>", "put</w>", "les</w>", "develop", "en,</w>", "ass</w>", "say</w>", "ort</w>", "How</w>", "per</w>", "ade</w>", "ere</w>", "ink</w>", "t's</w>", "til</w>", "to</w>", "of</w>", "in</w>", "ed</w>", "es</w>", "is</w>", "on</w>", "al</w>", "er</w>", "an</w>", "it</w>", "or</w>", "as</w>", "be</w>", "s.</w>", "at</w>", "s,</w>", "e.</w>", "ly</w>", "e,</w>", "'s</w>", "by</w>", "ts</w>", "ve</w>", "en</w>", "se</w>", "le</w>", "y,</w>", "th</w>", "he</w>", "y.</w>", "up</w>", "if</w>", "ch</w>", "ad</w>", "ar</w>", "st</w>", "ow</w>", "et</w>", "If</w>", "so</w>", "ay</w>", "we</w>", "ic</w>", "do</w>", "ce</w>", "ds</w>", "t.</w>", ".:</w>", "ks</w>", "d.</w>", "de</w>", "am</w>", "my</w>", "t,</w>", "It</w>", "ll</w>", "ty</w>", "In</w>", "me</w>", "d,</w>", "ss</w>", "ge</w>", "ue</w>", "sh</w>", "us</w>", "el</w>", "om</w>", "no</w>", "go</w>", "a,</w>", "He</w>", "te</w>", "00</w>", "We</w>", "ey</w>", "ew</w>", "1.</w>", "ps</w>", "2.</w>", ").</w>", "ft</w>", "id</w>", "produc", "a.</w>", "'t</w>", "3.</w>", "ze</w>", "ry</w>", "Americ", "ms</w>", "4.</w>", "gn</w>", "5.</w>", "inform", "),</w>", "um</w>", "system", "ep</w>", "6.</w>", "As</w>", ".begin", "7.</w>", "re</w>", "govern", "8.</w>", "proble", "dy</w>", "import", "k,</w>", "ke</w>", "ut</w>", "ap</w>", "ld</w>", "person", "op</w>", "experi", "k.</w>", "dition", "ir</w>", "ul</w>", "differ", "owever", "a</w>", ".</w>", ",</w>", "s</w>", "y</w>", "t</w>", "e</w>", "I</w>", "d</w>", "k</w>", "o</w>", "l</w>", "p</w>", "n</w>", ")</w>", "m</w>", "-</w>", ":</w>", "?</w>", "!</w>", "g</w>", "A</w>", "inter", "0</w>", "r</w>", "h</w>", "x</w>", "f</w>", "5</w>", "ation", "2</w>", "'</w>", "chang", "i</w>", "1</w>", ";</w>", "w</w>", "S</w>", "speci", "3</w>", "4</w>", "provi", "6</w>", "under", "8</w>", "C</w>", "direc", "every", "consi", "7</w>", "possi", "appro", "gener", "struc", "examp", "stand", "progr", "incre", "busin", "inclu", "begin", "again", "devel", "gover", "</w>", "comp", "cont", "ther", "comm", "tion", "enti", "sion", "form", "pres", "ment", "coun", "stor", "high", "serv", "play", "poin", "year", "inst", "over", "requ", "you'", "poli", "them", "tran", "some", "work", "star", "resp", "part", "buil", "hand", "call", "cent", "curr", "chil", "ough", "Trum", "proc", "stud", "cour", "posi", "soci", "sear", "happ", "deci", "foll", "stre", "elec", "stat", "medi", "vers", "heal", "char", "rele", "grou", "lear", "plac", "mark", "writ", "your", "back", "issu", "port", "prof", "olog", "read", "with", "ener", "incl", "peri", "diff", "peop", "ever", "stem", "Amer", "con", "ent", "ter", "per", "pro", "ver", "all", "pre", "oun", "ain", "str", "for", "wor", "ing", "par", "end", "com", "min", "tic", "and", "ear", "est", "tim", "enc", "our", "rec", "ess", "ill", "ell", "off", "ail", "acc", "fin", "ali", "anc", "201", "mon", "lic", "app", "sec", "loc", "ast", "ang", "ati", "att", "cre", "sel", "por", "car", "der", "ori", "ach", "pri", "ass", "des", "tur", "fac", "ari", "gre", "man", "day", "ser", "lin", "own", "mar", "ani", "inv", "shi", "wat", "can", "mil", "cor", "fri", "oll", "rel", "ili", "you", "ack", "exp", "bas", "sur", "out", "ure", "sid", "tri", "wee", "sit", "ici", "Con", "fun", "sch", "amp", "sup", "ong", "dis", "cer", "pub", "cri", "loo", "mem", "mat", "war", "eas", "col", "arg", "emp", "cle", "ann", "the", "clo", "bre", "run", "any", "fam", "hel", "ful", "ant", "sub", "tre", "You", "leg", "bec", "dat", "tal", "dre", "lat", "ber", "ind", "ght", "sol", "ick", "lif", "fil", "ust", "int", "uni", "Mar", "Com", "mis", "lik", "ous", "pos", "sai", "reg", "fir", "tiv", "bet", "nec", "eng", "sul", "ist", "fic", "ide", "Pre", "gam", "gin", "ple", "dri", "mor", "air", "dec", "typ", "ven", "sti", "her", "get", "duc", "cas", "job", "nam", "let", "tor", "jec", "fer", "boo", "bor", "ash", "eff", "doc", "har", "cap", "aff", "sen", "new", "200", "sal", "Pro", "exc", "oul", "org", "foo", "pur", "lim", "dep", "vel", "son", "eci", "thr", "ble", "mer", "num", "tho", "cur", "bus", "kch", "whi", "som", "nex", "re", "in", "ar", "st", "en", "al", "er", "or", "li", "on", "an", "at", "ch", "th", "ad", "le", "as", "it", "di", "ac", "ic", "ri", "de", "ti", "es", "ro", "sh", "el", "un", "vi", "ag", "se", "em", "am", "si", "op", "ec", "om", "sp", "us", "tr", "ol", "ab", "ex", "ur", "ow", "ul", "lo", "ap", "ou", "ed", "et", "ne", "im", "qu", "pl", "te", "co", "su", "mo", "Th", "ir", "ci", "be", "il", "ai", "ut", "av", "ay", "to", "gr", "fi", "is", "oo", "sc", "um", "bo", "me", "do", "wh", "po", "ep", "bu", "no", "ha", "ni", "we", "dr", "cl", "pr", "br", "gi", "gh", "up", "oc", "aw", "he", "ak", "au", "Ch", "tu", "ph", "In", "bi", "ev", "fe", "mi", "St", "go", "tt", "wi", "so", "hi", "19", "fl", "ei", "pe", "fr", "Wh", "bl", "ef", "af", "gu", "ub", "ob", "gn", "sm", "cr", "sk", "ho", "du", "gg", "uc", "ge", "An", "ve", "id", "kn", "Al", "pp", "Re", "20", "ew", "ff", "I'", "En", "mp", "ud", "vo", "la", "e-", "ra", "10", "ea", "jo", "pi", "On", "Tr", "ma", "No", "Un", "ke", "Ac", "of", "ey", "Mo", "sl", "Ar", "Jo", "Ad", "eg", "wr", "tw", "Di", "sw", "Fr", "Li", "Po", ",0", "sy", "yp", "og", "mu", "t", "s", "c", "e", "p", "d", "i", "f", "b", "m", "S", "l", "h", "u", "o", "r", "g", "-", "n", "a", "y", "M", "C", "w", "v", "A", "B", "k", "D", "P", "T", "1", "R", "H", "N", "E", "F", "G", "W", "O", "L", "z", ".", "(", "I", "U", "2", "j", "J", "K", "x", "3", "V", "'", "0", "9", "5", "4", "Y", "8", "6", "7", "!", "X", "Q", ":", "Z", ",", ")", "?", "q", ";", "<unk>"];
    list.forEach((item, index) => {
            stoi[item] = index;
        });
        
// Create a dictionary (object) mapping integers to strings

    list.forEach((item, index) => {
        itos[index] = item;
    });
    contextMaxLength = 256;
}


function softmax(logits) {
    const maxLogit = Math.max(...logits);
    const scores = logits.map(l => Math.exp(l - maxLogit));
    const sum = scores.reduce((a, b) => a + b, 0);
    return scores.map(s => s / sum);
}

// Multinomial sampling function
function multinomial(probs) {
    const r = Math.random();
    let cumSum = 0;
    for (let i = 0; i < probs.length; i++) {
        cumSum += probs[i];
        if (r < cumSum) {
            return i;
        }
    }
    return probs.length - 1;
}


async function generateText(input) {


    //console.log("input", input)
    const inputTensor = new ort.Tensor('int32', new Int32Array(input), [1, input.length]);

    // Model inference
    const output = await model.run({ 'input': inputTensor });

    logits = output['output'].data.slice(-1070);


    // const probs = softmax(logits);

    // // Sample the next token using multinomial sampling
    // const nextToken = multinomial(probs);
    let output_data = logits
   // const output_data = output.output.data;

    const sum = output_data.reduce((a, b) => a + Math.exp(b), 0);
    const normalized = output_data.map(x => Math.exp(x) / sum);
    

    //! Sampling from the distribution
    // Cumulative distribution function
    // console.log("CDF");
    const cdf = [];
    let sum2 = 0;
    for (let i = 0; i < normalized.length; i++) {
        sum2 += normalized[i];
        cdf.push(sum2);
    }

    // Sample from the CDF

    const r = Math.random();


    let nextCharId = 0;
    let speakerChange = false; // Flag to indicate a speaker change
    for (let i = 0; i < cdf.length; i++) {
        if (r < cdf[i]) {
            nextCharId = i;
            break;
        }
    }
    if (itos[nextCharId] === '<spkchg>') {
        speakerChange = true; // Set the flag for a speaker change
    }
  
    return { nextCharId, speakerChange };

    // output_data = softmax(output_data)

    // let nextCharId = multinomial(output_data)
    
    // console.log(itos[nextCharId], nextCharId)
    // // console.log("Next character id:");
    // // console.log(nextCharId);
    // return nextCharId;
    
    // //return nextToken;
}






startButton.addEventListener('click', function() {

    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();
    console.log(voices)
    msg.voice = voices[100]; 

    msg.volume = 1; // From 0 to 1
    msg.rate = 1; // From 0.1 to 10
    msg.pitch = 2; // From 0 to 2
    msg.text = "My name is Marine";
    msg.lang = 'en';
    speechSynthesis.speak(msg);
});

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 1.5
camera.position.x = 0
camera.position.y = 2



// let utterance = new SpeechSynthesisUtterance();
// speechSynthesis.speak(utterance);
// Fetch the canvas element created in index.html, replace 'canvas' with the id of your canvas
const canvas = document.getElementById('canvas');


//const controls = new OrbitControls(camera, canvas);

const loader = new GLTFLoader()

let model_man;
loader.load('hugo.glb', // .glb model
    function (gltf) { // callback
        model_man = gltf.scene
        model_man.position.set(0.5, 0, 0)
        model_man.rotateY(13.5 * Math.PI / 8)
        scene.add(model_man)
    })

let model_woman;
loader.load('marine.glb', // .glb model
    function (gltf) { // callback

        model_woman = gltf.scene

        model_woman.position.set(-0.5, 0, 0)
        model_woman.rotateY(2.5 * Math.PI / 8)
        model_woman.children[0].children[3].morphTargetInfluences[0] = 1
        model_woman.children[0].children[3].morphTargetInfluences[1] = 1
        // EYE
        //model_woman.children[0].children[0].children[0].children[0].children[0].children[0].children[0].position.set(0,0.5,0)
        //sconsole.log(model_woman.children[0].children[0].position.set(0,0.5,0))
   
    
        scene.add(model_woman)
    })





// Create a WebGLRenderer and set its width and height
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    // Antialiasing is used to smooth the edges of what is rendered
    antialias: true,
    // Activate the support of transparency
    // alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

window.addEventListener('resize', () => {
    // Update the camera
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Update the renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
});

const axesHelper = new THREE.AxesHelper(10);
axesHelper.setColors(0xff0000, 0x00ff00, 0x0000ff)
scene.add(axesHelper);

const geometry = new THREE.SphereGeometry( 0.1, 32, 16 ); 
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
const sphere = new THREE.Mesh( geometry, material ); scene.add( sphere );
sphere.position.set(0,1,0)


const textureLoader = new THREE.TextureLoader();
// Adding a background
let textureEquirec = textureLoader.load('poly_haven_studio.jpg');
textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
textureEquirec.colorSpace = THREE.SRGBColorSpace;

scene.background = textureEquirec;

const light = new THREE.DirectionalLight(0xffffff, 8);
const light_helper = new THREE.DirectionalLightHelper(light);
light.position.set(0, 10, 0);
scene.add(light);
//scene.add(light_helper);

const light_2 = new THREE.DirectionalLight(0xffffff, 8);
light_2.position.set(-10, 0, 0);
const light_helper_2 = new THREE.DirectionalLightHelper(light_2);
light_2.target = sphere 
scene.add(light_2);
scene.add(light_helper_2);

const light_3 = new THREE.DirectionalLight(0xffffff, 8);
light_3.position.set(0, 0, -10);
const light_helper_3 = new THREE.DirectionalLightHelper(light_3);
light_3.target = sphere
scene.add(light_3);
scene.add(light_helper_3);


const light_4 = new THREE.DirectionalLight(0xffffff, 3);
light_4.position.set(0, 0, 10);
const light_helper_4 = new THREE.DirectionalLightHelper(light_3);
light_4.target = sphere
scene.add(light_4);
scene.add(light_helper_4);

camera.lookAt(sphere.position)


setInterval(() => {

    if (model_woman){

        
        //model_woman.children[0].children[3].morphTargetInfluences[0] = 1 - model_woman.children[0].children[3].morphTargetInfluences[0]
        // model_woman.children[0].children[3].morphTargetInfluences[1] = 1
       
        
    
        // model_woman.children[0].children[3].morphTargetInfluences[0] = 0
        // model_woman.children[0].children[3].morphTargetInfluences[1] = 0
    
        // model_woman.children[0].children[3].morphTargetInfluences[0] = 0
        // model_woman.children[0].children[3].morphTargetInfluences[1] = 0
        }
}, 1000)

// Call animate for the first time
const clock = new THREE.Clock()
let lastElapsedTime = 0 

let mouth_movement = 0.3 
let smile_movement = 0.1
let mouth_opening = 0.5
let smile_opening = 0.5
function speak() {
    if ((mouth_opening >= 1)||(mouth_opening <= 0)){mouth_movement = - mouth_movement}
    if ((smile_opening >= 1)||(smile_opening <= 0)){smile_movement = - smile_movement}
    
    mouth_opening = mouth_opening + mouth_movement
    smile_opening = smile_opening + smile_movement
    
  }

let woman_speaking_bool = true
let man_speaking_bool = true 


const animate = () => {
   
    if ((model_woman)&&(model_man)){
    speak()
    if (woman_speaking_bool) {
    model_woman.children[0].children[3].morphTargetInfluences[0] = mouth_opening
    model_woman.children[0].children[3].morphTargetInfluences[1] = smile_opening
    }
    if (man_speaking_bool) {
    model_man.children[0].children[3].morphTargetInfluences[0] = mouth_opening
    model_man.children[0].children[3].morphTargetInfluences[1] = smile_opening
    }
        }


    renderer.render(scene, camera);
    requestAnimationFrame(animate)
}

animate()

//animate();


