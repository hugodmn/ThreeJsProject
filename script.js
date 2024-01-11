import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const startButton = document.getElementById('startButton');
let isGenerating = false;
let speakerChange = false ;
let stoi = {};
let itos = {};
let model = null;
let contextMaxLength = 256 ;
let logits = [];
let modelPath = '';
let ReplyText = [];
let text = '';
let context ; 
let male_voice ; 
let female_voice; 
let woman_speaking_bool = true
let man_speaking_bool = false 
var msg = new SpeechSynthesisUtterance();
let generationInterval = null;

let is_speaking_bool = false;

let mouth_movement = 0.3 
let smile_movement = 0.1
let mouth_opening = 0.5
let smile_opening = 0.5

if (!"speechSynthesis" in window) {
alert("Sorry, your browser doesn't support text to speech!");
}

async function initModelAndVoices() {

    // ALL ABOUT MODEL INITIALIZATION
    if (isGenerating) {
        clearInterval(generationInterval);
        isGenerating = false;
    }
    
    modelPath = 'ONNX_saved/bpe/NOPT_exported_model.onnx';
    const list = ["<begin>","<spkchg>","<unk>","information</w>", "government</w>", "something</w>", "different</w>", "including</w>", "important</w>", "ational</w>", "because</w>", "through</w>", "between</w>", "owever,</w>", "without</w>", "against</w>", "another</w>", "ations</w>", "ation.</w>", "people</w>", "should</w>", "ation,</w>", "you're</w>", "before</w>", "tional</w>", "around</w>", "ording</w>", "really</w>", "ential</w>", "ending</w>", "during</w>", "ation</w>", "about</w>", "their</w>", "tions</w>", "which</w>", "ating</w>", "would</w>", "other</w>", "thing</w>", "ement</w>", "ative</w>", "tion.</w>", "aking</w>", "there</w>", "don't</w>", "could</w>", "first</w>", "after</w>", "where</w>", "ently</w>", "ility</w>", "ember</w>", "tion,</w>", "think</w>", "ities</w>", "these</w>", "right</w>", "ments</w>", "using</w>", "owing</w>", "tical</w>", "ether</w>", "while</w>", "being</w>", "going</w>", "ally,</w>", "ready</w>", "iting</w>", "might</w>", "ately</w>", "ually</w>", "still</w>", "ished</w>", "ment.</w>", "uring</w>", "that</w>", "your</w>", "tion</w>", "with</w>", "have</w>", "ally</w>", "will</w>", "ting</w>", "from</w>", "ated</w>", "able</w>", "this</w>", "ment</w>", "king</w>", "ing.</w>", "ing,</w>", "ence</w>", "ents</w>", "sion</w>", "they</w>", "ance</w>", "more</w>", "like</w>", "ther</w>", "ings</w>", "ning</w>", "tive</w>", "also</w>", "ical</w>", "This</w>", "when</w>", "time</w>", "ving</w>", "some</w>", "into</w>", "ates</w>", "been</w>", "what</w>", "make</w>", "just</w>", "ying</w>", "ough</w>", "ased</w>", "than</w>", "them</w>", "at's</w>", "ound</w>", "were</w>", "over</w>", "most</w>", "ding</w>", "ent.</w>", "want</w>", "only</w>", "ever</w>", "work</w>", "need</w>", "very</w>", "port</w>", "said</w>", "sive</w>", "ight</w>", "used</w>", "it's</w>", "side</w>", "ited</w>", "ship</w>", "ity.</w>", "self</w>", "ular</w>", "ers.</w>", "even</w>", "ers,</w>", "then</w>", "dn't</w>", "interest", "back</w>", "ters</w>", "take</w>", "ered</w>", "help</w>", "ress</w>", "sure</w>", "ent,</w>", "ency</w>", "ures</w>", "know</w>", "good</w>", "many</w>", "such</w>", "ince</w>", "It's</w>", "ways</w>", "ties</w>", "down</w>", "ants</w>", "come</w>", "ity,</w>", "less</w>", "much</w>", "line</w>", "on't</w>", "ause</w>", "ould</w>", "fore</w>", "ople</w>", "the</w>", "ing</w>", "and</w>", "you</w>", "for</w>", "ers</w>", "ate</w>", "ent</w>", "are</w>", "es.</w>", "es,</w>", "ted</w>", "ity</w>", "The</w>", "one</w>", "all</w>", "can</w>", "ter</w>", "est</w>", "ed.</w>", "was</w>", "ure</w>", "age</w>", "ary</w>", "not</w>", "ess</w>", "ies</w>", "ous</w>", "er.</w>", "ain</w>", "ely</w>", "ect</w>", "er,</w>", "ite</w>", "ed,</w>", "ice</w>", "but</w>", "has</w>", "ast</w>", "ard</w>", "out</w>", "ame</w>", "ase</w>", "ial</w>", "ant</w>", "le,</w>", "tic</w>", "its</w>", "any</w>", "le.</w>", "end</w>", "als</w>", "his</w>", "ans</w>", "ong</w>", "ors</w>", "our</w>", "e's</w>", "ose</w>", "old</w>", "day</w>", "ach</w>", "develop", "ory</w>", "ine</w>", "ere</w>", "get</w>", "ves</w>", "You</w>", "who</w>", "ome</w>", "ell</w>", "ick</w>", "ish</w>", "n't</w>", "on,</w>", "ist</w>", "ple</w>", "ree</w>", "ful</w>", "on.</w>", "ved</w>", "own</w>", "ade</w>", "ned</w>", "new</w>", "ise</w>", "use</w>", "ood</w>", "ily</w>", "her</w>", "had</w>", "ons</w>", "ly,</w>", "how</w>", "ile</w>", "ack</w>", "may</w>", "ake</w>", "ust</w>", "al.</w>", "al,</w>", "ear</w>", "it.</w>", "ows</w>", "ese</w>", "en,</w>", "red</w>", "ton</w>", "tly</w>", "'re</w>", "ked</w>", "en.</w>", "ver</w>", "way</w>", "ual</w>", "ly.</w>", "ore</w>", "ult</w>", "ministr", "organiz", "two</w>", "ave</w>", "ill</w>", "ost</w>", "ich</w>", "t's</w>", "ed</w>", "es</w>", "er</w>", "to</w>", "s.</w>", "e.</w>", "of</w>", "s,</w>", "al</w>", "in</w>", "on</w>", "e,</w>", "an</w>", "'s</w>", "ly</w>", "or</w>", "en</w>", "is</w>", "le</w>", "ve</w>", "at</w>", "it</w>", "ts</w>", "y.</w>", "ic</w>", "th</w>", "y,</w>", "as</w>", "be</w>", ".:</w>", "t.</w>", "se</w>", "ow</w>", "ch</w>", "t,</w>", "ad</w>", "el</w>", "ay</w>", "ar</w>", "et</w>", "by</w>", "ks</w>", "a,</w>", "am</w>", "ll</w>", "ce</w>", "ty</w>", "a.</w>", "ue</w>", "d.</w>", "ut</w>", "produc", "ey</w>", "up</w>", "he</w>", ").</w>", "id</w>", "Americ", "om</w>", "us</w>", "respon", "commun", "experi", "d,</w>", "provid", "if</w>", "um</w>", "ds</w>", "ep</w>", "friend", "),</w>", "possib", "includ", "partic", "If</w>", "so</w>", "proble", "o,</w>", "we</w>", "op</w>", "contin", "consid", "do</w>", "contro", "'t</w>", "system", "ew</w>", "ir</w>", "ession", "my</w>", "school", "person", "It</w>", "resear", "me</w>", "il</w>", "compan", "k.</w>", "e?</w>", "st</w>", "re</w>", "inform", "govern", "differ", "import", "owever", ".</w>", "s</w>", ",</w>", "e</w>", "t</w>", "a</w>", "y</w>", "d</w>", "k</w>", "?</w>", "o</w>", "n</w>", ")</w>", ":</w>", "ation", "!</w>", "inter", "m</w>", "l</w>", "p</w>", "I</w>", "chang", "under", "'</w>", "w</w>", "speci", "h</w>", "0</w>", ";</w>", "offic", "struc", "f</w>", "every", "i</w>", "appro", "x</w>", "direc", "stand", "gener", "incre", "progr", "busin", "resid", "avail", "techn", "minut", "secon", "examp", "estig", "small", "repor", "r</w>", "again", "overn", "organ", "chool", "betwe", "</w>", "comp", "ther", "tion", "pres", "form", "sion", "over", "year", "ment", "cont", "comm", "coun", "enti", "ough", "ound", "play", "serv", "tran", "star", "vers", "plac", "olog", "requ", "inst", "work", "high", "publ", "ligh", "some", "proc", "them", "plic", "prof", "posi", "cent", "elec", "port", "chil", "numb", "sist", "buil", "mark", "foll", "stat", "poin", ".com", "hand", "you'", "back", "medi", "stud", "righ", "curr", "tain", "cour", "happ", "trac", "self", "rele", "oper", "tern", "ustr", "ship", "ques", "your", "disc", "call", "read", "worl", "aliz", "empl", "char", "expl", "heal", "ight", "ever", "coll", "Trum", "down", "fort", "http", "ounc", "larg", "pers", "lear", "dist", "anti", "thor", "prom", "atur", "rest", "ener", "with", "diff", "prob", "thin", "peri", "resp", "istr", "stem", "clud", "elop", "esti", "Amer", "con", "ent", "ing", "per", "pro", "ter", "tic", "all", "rec", "ver", "est", "ain", "and", "pre", "res", "ear", "end", "par", "enc", "ess", "anc", "ell", "com", "str", "our", "ist", "tim", "fin", "dis", "acc", "ard", "for", "cre", "are", "ass", "ill", "ang", "ast", "att", "ail", "min", "ind", "wor", "ach", "ure", "fac", "ati", "mon", "day", "inv", "man", "oun", "ong", "ack", "rel", "des", "ore", "int", "mil", "fic", "der", "pol", "tiv", "sup", "tur", "ous", "app", "gre", "por", "sec", "eng", "ant", "201", "loo", "cri", "ann", "out", "ari", "ord", "pos", "row", "und", "ust", "let", "cer", "lin", "ish", "dec", "Con", "igh", "sid", "ali", "reg", "fer", "pri", "sub", "exp", "sur", "the", "leg", "cor", "loc", "ire", "ect", "amp", "you", "mar", "ser", "iti", "mis", "art", "ful", "mat", "ick", "ens", "rem", "sig", "arg", "Com", "eli", "wat", "sel", "ash", "boo", "any", "tri", "itt", "col", "eci", "nec", "bre", "ple", "det", "dep", "emb", "inc", "can", "vid", "sol", "but", "fam", "sit", "duc", "abl", "ock", "air", "adv", "car", "eff", "cle", "on-", "aff", "ort", "ber", "wee", "fir", "bec", "big", "hel", "oll", "cap", "add", "sti", "ven", "her", "ros", "ath", "ext", "Pro", "him", "lat", "arm", "oul", "ret", "adi", "lik", "doc", "vir", "dat", "off", "oci", "get", "urr", "pow", "pur", "exc", "fun", "bet", "nam", "run", "sib", "hol", "lif", "pop", "eas", "jec", "esp", "fil", "dri", "Rep", "Mar", "ici", "spe", "tre", "You", "uni", "own", "arr", "dem", "tal", "tog", "gam", "lim", "not", "tec", "say", "tor", "set", "ott", "foo", "bor", "er-", "mak", "erc", "ign", "Uni", "umb", "ubl", "dev", "mer", "way", "fri", "thr", "org", "cho", "shi", "bus", "som", "ttp", "in", "re", "al", "en", "er", "st", "or", "ic", "th", "an", "at", "on", "ar", "ch", "ac", "it", "el", "as", "ad", "is", "le", "ag", "di", "un", "am", "et", "es", "ec", "ul", "em", "id", "om", "ti", "ap", "ro", "sh", "ri", "ed", "li", "tr", "im", "ol", "ab", "us", "op", "ur", "il", "si", "ex", "pl", "ou", "se", "sp", "su", "ow", "qu", "vi", "Th", "ep", "gr", "ir", "ot", "ut", "cl", "oo", "mo", "oc", "um", "ne", "de", "av", "ev", "co", "St", "pr", "be", "ak", "fe", "ob", "In", "wh", "os", "ig", "Ch", "ay", "e-", "me", "bo", "te", "sc", "bl", "ph", "au", "dr", "Wh", "we", "gi", "fl", "of", "ha", "br", "up", "he", "00", "aw", "fi", "to", "do", "pe", "fr", "iz", "no", "ip", "po", "ni", "af", "uc", "tu", "lo", "An", "og", "ew", "ef", "eg", "yp", "cr", "gl", "wr", "19", "ra", "ff", "ud", "Al", "kn", "ei", "gh", "go", "ov", "ug", "En", "gu", "I'", "od", "sk", "oy", "sa", "ke", "mi", "cc", "y-", "bu", "Un", "ve", "sl", "ma", "sm", "sy", "wi", "ub", "Tr", "la", "Ad", "Re", "mp", "tw", "sw", "--", "ok", "ll", "bi", "dg", "Ex", "Ar", "20", "-1", "ey", "Sh", "a-", "Fr", "gg", "az", "s-", "..", "ww", "hn", "tt", "fu", "mu", "s", "t", "p", "e", "c", "m", "b", "-", "i", "f", "n", "h", "l", "d", "S", "r", "g", "a", "u", "o", "v", "w", "y", "M", "k", "C", "A", "P", "B", "D", "H", ".", "R", "T", "F", "W", "1", "L", "N", "G", "j", "2", "E", "O", "(", "I", "z", "3", "5", "J", "4", "x", "K", "6", "8", "0", "'", "U", "V", "7", ":", "9", ",", "Y", "Q", "Z", "!", "X", ")", "?", "q", ";"];
        
    list.forEach((item, index) => {
                stoi[item] = index;
            });
        


    list.forEach((item, index) => {
        itos[index] = item;
    });
    contextMaxLength = 256;
    context = [stoi['<begin>']];
    console.log("Loading model...");
    model = await ort.InferenceSession.create(modelPath, { executionProviders: ['wasm'], graphOptimizationLevel: 'all' });
    console.log("Model loaded");

    // ALL ABOUT VOICES INITIALIZATION
    // Opera 8.0+
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';

    // Safari 3.0+ "[object HTMLElementConstructor]" 
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));

    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/false || !!document.documentMode;

    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;

    // Chrome 1 - 79
    var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

    // Edge (based on chromium) detection
    var isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);


    
    console.log("isOpera", isOpera)
    console.log("isFirefox", isFirefox)
    console.log("isSafari", isSafari)
    console.log("isIE", isIE)
    console.log("isEdge", isEdge)
    console.log("isChrome", isChrome)
    console.log("isEdgeChromium", isEdgeChromium)

    var voices = window.speechSynthesis.getVoices();
    console.log(voices)

    if (isSafari){
        male_voice = voices[30],// Fred EN-US
        female_voice = voices[43] // Kathy EN-US
    }

    msg.voice = female_voice;
    // msg.volume = 1; // From 0 to 1
    // msg.rate = 1; // From 0.1 to 10
    // msg.pitch = 2; // From 0 to 2
    msg.lang = 'en';

}




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
loader.load('images/hugo.glb', // .glb model
    function (gltf) { // callback
        model_man = gltf.scene
        model_man.position.set(0.5, 0, 0)
        model_man.rotateY(13.5 * Math.PI / 8)
        scene.add(model_man)
    })

let model_woman;
loader.load('images/marine.glb', // .glb model
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
let textureEquirec = textureLoader.load('images/poly_haven_studio.jpg');
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






function speak() {
    if ((mouth_opening >= 1)||(mouth_opening <= 0)){mouth_movement = - mouth_movement}
    if ((smile_opening >= 1)||(smile_opening <= 0)){smile_movement = - smile_movement}
    
    mouth_opening = mouth_opening + mouth_movement
    smile_opening = smile_opening + smile_movement
    
  }




const animate = () => {
   
    console.log("is speaking", is_speaking_bool)


    if (((model_woman)&&(model_man))&&(is_speaking_bool)){


    speak()


    if (!woman_speaking_bool) {
    model_man.children[0].children[3].morphTargetInfluences[0] = 0
    model_man.children[0].children[3].morphTargetInfluences[1] = 0
    model_woman.children[0].children[3].morphTargetInfluences[0] = mouth_opening
    model_woman.children[0].children[3].morphTargetInfluences[1] = smile_opening
    }
    if (!man_speaking_bool) {
    model_woman.children[0].children[3].morphTargetInfluences[0] = 0
    model_woman.children[0].children[3].morphTargetInfluences[1] = 0
    model_man.children[0].children[3].morphTargetInfluences[0] = mouth_opening
    model_man.children[0].children[3].morphTargetInfluences[1] = smile_opening
    }
        }


    renderer.render(scene, camera);
    requestAnimationFrame(animate)
}



//animate();






async function generateText(input) {


    //console.log("input", input)

    
    const inputTensor = new ort.Tensor('int32', new Int32Array(input), [1, input.length]);

    // Model inference
    const output = await model.run({ 'input': inputTensor });

    logits = output['output'].data.slice(-1076);


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
    speakerChange = false; // Flag to indicate a speaker change
    for (let i = 0; i < cdf.length; i++) {
        if (r < cdf[i]) {
            nextCharId = i;
            break;
        }
    }
    if (itos[nextCharId] === '<spkchg>') {
        console.log("Speaker change")
        speakerChange = true; // Set the flag for a speaker change
    }



  
    return nextCharId;


}




async function voice_speak() {
    if (is_speaking_bool || ReplyText.length === 0) {
        return;
    }

    is_speaking_bool = true;
    let textToSpeak = ReplyText.shift();

    // Switch speaking flags and set voice accordingly
    if (man_speaking_bool) {
        msg.voice = male_voice;
        //woman_speaking_bool = false;
    } else {
        msg.voice = female_voice;
       // woman_speaking_bool = true;
    }
    console.log(man_speaking_bool, woman_speaking_bool)
    man_speaking_bool = !man_speaking_bool;
    woman_speaking_bool = !woman_speaking_bool;

    // Setup msg
    msg.text = textToSpeak;

    return new Promise(resolve => {
        msg.onend = () => {
            is_speaking_bool = false;
            resolve();
            voice_speak(); // Process next in queue
        };

        window.speechSynthesis.speak(msg);
    });
}




async function displayGeneratedText() {
    //let context = stringToIntArray(displayedText);



    async function appendNextChar() {


        if (context.length >= contextMaxLength) {
            context.shift();
        }

    
        const nextCharId = await generateText(context);
        context.push(nextCharId);
        
        if (!speakerChange) {
        
        text += itos[nextCharId].replace('</w>', ' ');
        console.log("text", text)
        }
        else {
        if (text.length > 0) {
        ReplyText.push(text);
        text = '';

   
        voice_speak(); // Trigger speaking
        speakerChange = false;
        }

        }

    }
        generationInterval = setInterval(appendNextChar, 100);
        isGenerating = true;
    }
    

    
initModelAndVoices();
startButton.addEventListener('click', () => {
    displayGeneratedText();
    animate();
    voice_speak();
});

    

