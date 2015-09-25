/ *!
 * JQuery Cycle Plugin (com Transição Definições)
 * Exemplos e documentação em: http://jquery.malsup.com/cycle/
 * Copyright (c) 2007-2013 M. Alsup
 * Versão: 3.0.3 (11-JUL-2013)
 * Dupla licenciado sob as licenças MIT e GPL.
 * Http://jquery.malsup.com/license.html
 * Requer: v1.7.1 jQuery ou mais tarde
 * /
; (Function ($, indefinido) {
"Use strict";

var ver = '3 .0.3 ';

função debug (s) {
	if ($. fn.cycle.debug)
		log (s);
}		
log function () {
	/ * Consola globais * /
	if (window.console && console.log)
		console.log ('[ciclo]' + Array.prototype.join.call (argumentos, ''));
}
$ Expr [':'].. Pausa = function (el) {
	voltar el.cyclePause;
};


/ / O arg opções pode ser ...
/ / Um número - indica uma transição imediata deve ocorrer com o índice de slides dada
/ / A string - 'pause', 'currículo', 'alternância', 'próximo', 'prev', 'stop', 'destruir' ou o nome de um efeito de transição (ou seja, 'desaparecer', 'zoom', etc)
/ / objeto - propriedades para controlar a apresentação de diapositivos
/ /
/ / O arg arg2 pode ser ...
/ / O nome de um fx (só utilizado em conjunto com um valor numérico para "opções")
/ / O valor verdadeiro (só utilizado em primeiro arg == 'currículo') e indica
/ / Que o currículo deve ocorrer imediatamente (não esperar para o próximo timeout)

$. Fn.cycle = function (opções, arg2) {
	var o = {s: this.selector, c: this.Context};

	/ / Em 1,3 + podemos corrigir erros com o estado de prontidão
	if (this.length === 0 && opções! = "stop") {
		if (! $. isReady && os) {
			log ("DOM não está pronto, filas slideshow ');
			$ (Function () {
				. $ (Os, oc) ciclo (opções, arg2);
			});
			devolver este;
		}
		/ / É o seu DOM está pronto? http://docs.jquery.com/Tutorials:Introducing_ $ (document). ready ()
		log ("terminação; zero elementos encontrados por seletor '+ ($ isReady'':.?" (DOM não está pronto)'));
		devolver este;
	}

	/ / Iterar o nodeset correspondida
	voltar this.each (function () {
		var opta = handleArguments (isso, opções, arg2);
		if (opta === false)
			retorno;

		opts.updateActivePagerLink = opts.updateActivePagerLink | | $ fn.cycle.updateActivePagerLink.;
		
		/ / Parar slideshow existente para esse recipiente (se houver)
		if (this.cycleTimeout)
			clearTimeout (this.cycleTimeout);
		this.cycleTimeout = this.cyclePause = 0;
		this.cycleStop = 0; / / A edição # 108

		var $ cont = $ (this);
		var $ lâminas = opts.slideExpr? $ (Opts.slideExpr, this): $ cont.children ();
		var els = $ slides.get ();

		if (els.length <2) {
			log ("terminação; também alguns slides: '+ els.length);
			retorno;
		}

		var opts2 = buildOptions ($ cont, $ slides, els, opta, o);
		if (opts2 === false)
			retorno;

		var startTime = opts2.continuous? 10: getTimeout (! Els [opts2.currSlide], els [opts2.nextSlide], opts2, opts2.backwards);

		/ / Se for um slideshow auto, chutá-la fora
		if (startTime) {
			startTime + = (opts2.delay | | 0);
			if (startTime <10)
				startTime = 10;
			debug ('primeiro timeout:' + startTime);
			this.cycleTimeout = setTimeout (function () {ir (ELS, opts2, 0, opts.backwards);!}, startTime);
		}
	});
};

função triggerPause (cont, byHover, onPager) {
	var opta = $ (cont) de dados ('cycle.opts').;
	if (! opta)
		retorno;
	var pausa = cont.cyclePause!;
	if (pausa && opts.paused)
		opts.paused (cont, opta, byHover, onPager);
	else if (! parou && opts.resumed)
		opts.resumed (cont, opta, byHover, onPager);
}

/ / Processar os argumentos que foram passados ​​para o plugin do fn
handleArguments função (cont, Opções, arg2) {
	if (cont.cycleStop === indefinido)
		cont.cycleStop = 0;
	if (opções === indefinido | | opções === null)
		options = {};
	if (options.constructor == String) {
		interruptor (opções) {
		case 'destruir':
		caso 'stop':
			var opta = $ (cont) de dados ('cycle.opts').;
			if (! opta)
				return false;
			cont.cycleStop + +; / / callbacks olhar para a mudança
			if (cont.cycleTimeout)
				clearTimeout (cont.cycleTimeout);
			cont.cycleTimeout = 0;
			if (opts.elements)
				. $ (opts.elements) stop ();
			. $ (Cont) removeData ('cycle.opts');
			if (opções == 'destruir')
				destruir (cont, opta);
			return false;
		case 'alternância':
			cont.cyclePause = (cont.cyclePause === 1)? 0: 1;
			checkInstantResume (cont.cyclePause, arg2, cont);
			triggerPause (cont);
			return false;
		caso 'pause':
			cont.cyclePause = 1;
			triggerPause (cont);
			return false;
		case 'currículo':
			cont.cyclePause = 0;
			checkInstantResume (false, arg2, cont);
			triggerPause (cont);
			return false;
		caso 'prev':
		caso 'next':
			opta = $ (cont) de dados ('cycle.opts').;
			if (!) {opta
				log ("opções não encontrado", prev / next "ignorado");
				return false;
			}
			if (typeof arg2 == 'string') 
				opts.oneTimeFx = arg2;
			. $ Fn.cycle [opções] (opta);
			return false;
		default:
			options = {fx: opções};
		}
		opções de retorno;
	}
	else if (options.constructor == Number) {
		/ / Ir para o slide solicitado
		var num = opções;
		Opções = $ (cont) de dados ('cycle.opts').;
		if (! opções) {
			log ("opções não encontrado, não pode avançar slides ');
			return false;
		}
		if (num <0 | | num> = options.elements.length) {
			log ("índice de slide inválido:" + num);
			return false;
		}
		options.nextSlide = num;
		if (cont.cycleTimeout) {
			clearTimeout (cont.cycleTimeout);
			cont.cycleTimeout = 0;
		}
		if (typeof arg2 == 'string')
			options.oneTimeFx = arg2;
		go (options.elements, opções, 1, num> = options.currSlide);
		return false;
	}
	opções de retorno;
	
	função checkInstantResume (isPaused, arg2, cont) {
		if (! isPaused && arg2 === true) {/ / retomar agora!
			var options = $ (cont) de dados ('cycle.opts').;
			if (! opções) {
				log ("opções não encontradas, não pode continuar ');
				return false;
			}
			if (cont.cycleTimeout) {
				clearTimeout (cont.cycleTimeout);
				cont.cycleTimeout = 0;
			}
			ir (options.elements, opções, 1, options.backwards!);
		}
	}
}

função RemoveFilter (el, opta) {
	if (! $. support.opacity && opts.cleartype && el.style.filter) {
		try {el.style.removeAttribute ("filtro"); }
		catch (sufocar) {} / / lidar com versões antigas de ópera
	}
}

Handlers / / evento desvincular
função destruir (cont, opta) {
	if (opts.next)
		. $ (Opts.next) desvincular (opts.prevNextEvent);
	if (opts.prev)
		. $ (Opts.prev) desvincular (opts.prevNextEvent);
	
	if (opts.pager | | opts.pagerAnchorBuilder)
		$ Cada (opts.pagerAnchors |. |, A função [] () {
			. this.unbind () remove ();
		});
	opts.pagerAnchors = null;
	. $ (Cont) desvincular ('mouseenter.cycle mouseleave.cycle');
	if (opts.destroy) / / callback
		opts.destroy (opta);
}

/ / Inicialização única
buildOptions função ($ cont, $ escorregas, els, Opções, o) {
	var startingSlideSpecified;
	/ / Suporte a metadados plugin (v1.0 e v2.0)
	var opts = $ estender ({}, $ fn.cycle.defaults, opções | | {}, $ metadata $ cont.metadata (): $ $ meta cont.data ():..?. {}).;
	var meta = $. isFunction ($ cont.data)? $ Cont.data (opts.metaAttr): null;
	se (meta)
		. opta = $ estender (opta, meta);
	if (opts.autostop)
		opts.countdown = opts.autostopCount | | els.length;

	var cont = $ cont [0];
	$ Cont.data ('cycle.opts', opta);
	opta $ cont = $ cont.;
	opts.stopCount = cont.cycleStop;
	opts.elements = els;
	opts.before = opts.before? [Opts.before]: [];
	opts.after = opts.after? [Opts.after]: [];

	/ / Empurrar alguns depois callbacks
	if (support.opacity && opts.cleartype! $.)
		opts.after.push (function () {RemoveFilter (este, opta);});
	if (opts.continuous)
		opts.after.push (function () {ir (ELS, opta, 0, opts.backwards);!});

	saveOriginalOpts (opta);

	Correções / / ClearType
	if (opts.cleartypeNoBg! $. support.opacity && opts.cleartype &&!)
		clearTypeFix ($ slides);

	/ / Container exige posição não-estático, de modo que as lâminas podem ser posição dentro
	if ($ cont.css ('position') == 'estático')
		$ Cont.css ('posição', 'parente');
	if (opts.width)
		$ Cont.width (opts.width);
	if (opts.height && opts.height! = 'auto')
		$ Cont.height (opts.height);

	if (opts.startingSlide! == indefinido) {
		opts.startingSlide = parselnt (opts.startingSlide, 10);
		if (opts.startingSlide> = els.length | | opts.startSlide <0)
			opts.startingSlide = 0; / / Catch entrada falsa
		outro 
			startingSlideSpecified = true;
	}
	else if (opts.backwards)
		opts.startingSlide = els.length - 1;
	outro
		opts.startingSlide = 0;

	/ / Se aleatória, misturar-se a matriz de slides
	if (opts.random) {
		opts.randomMap = [];
		for (var i = 0; i <els.length; i + +)
			opts.randomMap.push (i);
		opts.randomMap.sort (function (a, b) {return Math.random () - 0,5;});
		if (startingSlideSpecified) {
			/ / Tenta encontrar o slide inicial especificado e se encontrou índice de slide de início definida no mapa de acordo
			for (var cnt = 0; cnt <els.length; cnt + +) {
				if (opts.startingSlide == opts.randomMap [CNT]) {
					opts.randomIndex = cnt;
				}
			}
		}
		else {
			opts.randomIndex = 1;
			opts.startingSlide = opts.randomMap [1];
		}
	}
	else if (opts.startingSlide> = els.length)
		opts.startingSlide = 0; / / Catch entrada falsa
	opts.currSlide = opts.startingSlide | | 0;
	var primeiro = opts.startingSlide;

	/ / Posição e zIndex definido em todos os slides
	$ Slides.css ({position: "absoluta", top: 0, restam: 0}).. Hide () cada (function (i) {
		var z;
		if (opts.backwards)
			z = primeiro? i <= em primeiro lugar? els.length + (i-em primeiro lugar): primeiro-i: els.length-i;
		outro
			z = primeiro? i> = em primeiro lugar? els.length - (i-em primeiro lugar): primeiro-i: els.length-i;
		. $ (This) css ('z-index', z);
	});

	/ / Certifique-se primeiro slide é visível
	$ (ELS [primeiro]) css ('opacidade', 1) show ()..; / / Bit opacidade necessária para lidar com casos de uso restart
	RemoveFilter (ELS [primeiro], opta);

	Lâminas / / estiramento
	if (opts.fit) {
		if (opts.aspect!) {
	        if (opts.width)
	            $ Slides.width (opts.width);
	        if (opts.height && opts.height! = 'auto')
	            $ Slides.height (opts.height);
		} Else {
			Slides.each $ (function () {
				var $ slide = $ (this);
				proporção = var (opts.aspect === verdadeiro)? Slide.width $ () / $ slide.height (): opts.aspect;
				if ($ slide.width opts.width && ()! = opts.width) {
					$ Slide.width (opts.width);
					$ Slide.height (opts.width / ratio);
				}

				if (opts.height && $ slide.height () <opts.height) {
					$ Slide.height (opts.height);
					$ Slide.width (opts.height * ratio);
				}
			});
		}
	}

	if (opts.center && ((opts.fit) | | opts.aspect)) {
		Slides.each $ (function () {
			var $ slide = $ (this);
			$ Slide.css ({
				"Margin-left": opts.width?
					((Opts.width - $ slide.width ()) / 2) + "px":
					0,
				"Margin-top": opts.height?
					((Opts.height - $ slide.height ()) / 2) + "px":
					0
			});
		});
	}

	if (opts.center &&! opts.fit &&! opts.slideResize) {
		Slides.each $ (function () {
			var $ slide = $ (this);
			$ Slide.css ({
				"Margin-left": opts.width? ((Opts.width - $ slide.width ()) / 2) + "px": 0,
				"Margin-top": opts.height? ((Opts.height - $ slide.height ()) / 2) + "px": 0
			});
		});
	}
		
	/ Container / trecho
	var remodelar = (opts.containerResize | | opts.containerResizeHeight) && $ cont.innerHeight () <1;
	if (reformular) {/ / fazer isso somente se recipiente não tem tamanho http://tinyurl.com/da2oa9
		var maxw = 0, maxh = 0;
		for (var j = 0, j <els.length; j + +) {
			var $ e $ = (els [j]), e = $ e [0], w = $ e.outerWidth (), $ h = e.outerHeight ();
			se w = e.offsetWidth | | e.width | | $ e.attr ("largura") (w!);
			se h = e.offsetHeight | | e.height | | $ e.attr ('altura') (h!);
			maxw = w> maxw? w: maxw;
			maxh = h> maxh? h: maxh;
		}
		if (opts.containerResize && maxw> 0 && maxh> 0)
			$ Cont.css ({width: maxw + 'px', altura: maxh + 'px'});
		if (opts.containerResizeHeight && maxh> 0)
			$ Cont.css ({height: maxh + 'px'});
	}

	var pauseFlag = false; / / Https://github.com/malsup/cycle/issues/44
	if (opts.pause)
		$ Cont.bind ('mouseenter.cycle', function () {
			pauseFlag = true;
			this.cyclePause + +;
			triggerPause (cont, true);
		}). Ligar ('mouseleave.cycle', function () {
				if (pauseFlag)
					this.cyclePause--;
				triggerPause (cont, true);
		});

	if (supportMultiTransitions (opts) === false)
		return false;

	/ / Aparentemente um monte de pessoas usam slideshows de imagem sem atributos altura / largura nas imagens.
	/ / Ciclo 2,50 + requer a informação de dimensionamento para cada slide; este bloco tenta lidar com isso.
	var requeue = false;
	options.requeueAttempts = options.requeueAttempts | | 0;
	Slides.each $ (function () {
		/ / Tenta obter altura / largura de cada slide
		var $ el = $ (this);
		this.cycleH = (opts.fit && opts.height)? opts.height: ($ el.height () | | this.offsetHeight | | This.Height | | $ el.attr ('altura') | | 0);
		this.cycleW = (opts.fit && opts.width)? opts.width: ($ el.width () | | this.offsetWidth | | this.width | | $ el.attr ("largura") | | 0);

		if ($ el.is ("img")) {
			var carregamento = (this.cycleH === 0 && this.cycleW === 0 && this.complete!);
			/ / Não requeue para as imagens que ainda estão sendo carregados, mas tem um tamanho válido
			if (carregamento) {
				if (OS && opts.requeueOnImageNotLoaded && options.requeueAttempts + + <100) {/ / faixa de contagem de repetição para que não malha para sempre
					log (options.requeueAttempts, '- slides img não carregados, requeuing slideshow:', this.src, this.cycleW, this.cycleH);
					setTimeout (function () {$ (os, oc) ciclo (opções);.}, opts.requeueTimeout);
					requeue = true;
					return false; / / Quebrar cada loop
				}
				else {
					log ("não foi possível determinar o tamanho da imagem: '+ this.src, this.cycleW, this.cycleH);
				}
			}
		}
		return true;
	});

	if (requeue)
		return false;

	opts.cssBefore = opts.cssBefore | | {};
	opts.cssAfter = opts.cssAfter | | {};
	opts.cssFirst = opts.cssFirst | | {};
	opts.animIn = opts.animIn | | {};
	opts.animOut = opts.animOut | | {};

	. $ Slides.not (': eq (' + primeiro + ')') css (opts.cssBefore);
	. $ ($ Lâminas [primeiro]) css (opts.cssFirst);

	if (opts.timeout) {
		opts.timeout = parselnt (opts.timeout, 10);
		/ / Garantir que as configurações de tempo de espera e de velocidade são sane
		if (opts.speed.constructor == String)
			. opts.speed = $ fx.speeds [opts.speed] | | parseInt (opts.speed, 10);
		if (! opts.sync)
			opts.speed = opts.speed / 2;
		
		var buffer = opts.fx == 'none'? 0: opts.fx == 'Shuffle'? 500: 250;
		while ((opts.timeout - opts.speed) <buffer) / / higienizar tempo limite
			opts.timeout + = opts.speed;
	}
	if (opts.easing)
		opts.easeIn = opts.easeOut = opts.easing;
	if (! opts.speedIn)
		opts.speedIn = opts.speed;
	if (! opts.speedOut)
		opts.speedOut = opts.speed;

	opts.slideCount = els.length;
	opts.currSlide = opts.lastSlide = primeiro;
	if (opts.random) {
		if (+ + == opts.randomIndex els.length)
			opts.randomIndex = 0;
		opts.nextSlide = opts.randomMap [opts.randomIndex];
	}
	else if (opts.backwards)
		opts.nextSlide = opts.startingSlide === 0? (Els.length-1): opts.startingSlide-1;
	outro
		opts.nextSlide opts.startingSlide => = (els.length-1)? 0: opts.startingSlide +1;

	/ / Executar o init transição fn
	if (opts.multiFx!) {
		var o init = $ fn.cycle.transitions [opts.fx].;
		if ($. isFunction (init))
			init ($ cont, $ slides, opta);
		else if (opts.fx! = 'custom' &&! opts.multiFx) {
			log ("transição desconhecido: '+ opts.fx,'; terminação slideshow ');
			return false;
		}
	}

	Eventos artificiais / / fogo
	var e0 = $ lâminas [primeiro];
	if (!) {opts.skipInitializationCallbacks
		if (opts.before.length)
			. opts.before [0] se aplicam (e0, [e0, e0, opta, true]);
		if (opts.after.length)
			. opts.after [0] se aplicam (e0, [e0, e0, opta, true]);
	}
	if (opts.next)
		. $ (Opts.next) bind (opts.prevNextEvent, function () {return antecedência (opta, 1);});
	if (opts.prev)
		. $ (Opts.prev) bind (opts.prevNextEvent, function () {return antecedência (opta, 0);});
	if (opts.pager | | opts.pagerAnchorBuilder)
		buildPager (ELS, opta);

	exposeAddSlide (opta, els);

	voltar opta;
}

/ / Salva off opta originais para que possamos restaurar depois de limpar estado
saveOriginalOpts função (opts) {
	opts.original = {antes: [], depois de: []};
	. opts.original.cssBefore = $ estender ({}, opts.cssBefore);
	. opts.original.cssAfter = $ estender ({}, opts.cssAfter);
	. opts.original.animIn = $ estender ({}, opts.animIn);
	. opts.original.animOut = $ estender ({}, opts.animOut);
	. $ Cada (opts.before, function () {opts.original.before.push (this);});
	. $ Cada (opts.after, function () {opts.original.after.push (this);});
}

supportMultiTransitions função (opts) {
	var i, TX, txs = $ fn.cycle.transitions.;
	/ / Olhar para vários efeitos
	if (opts.fx.indexOf (',')> 0) {
		opts.multiFx = true;
		opts.fxs = opts.fx.replace (/ \ s * / g,'') split (',').;
		/ / Descartar quaisquer nomes efeito falsos
		for (i = 0; i <opts.fxs.length; i + +) {
			var fx = opts.fxs [i];
			tx = txs [fx];
			if (tx | |! txs.hasOwnProperty (fx) | |!. $ isFunction (tx)) {
				log ("descartando transição desconhecido: ', fx);
				opts.fxs.splice (i, 1);
				i -;
			}
		}
		/ / Se temos uma lista vazia, então jogamos tudo fora!
		if (opts.fxs.length!) {
			log ("Não há transições válidas nomeados,. slideshow terminação ');
			return false;
		}
	}
	else if (opts.fx == 'all') {/ / auto-gen a lista de transições
		opts.multiFx = true;
		opts.fxs = [];
		for (var p em txs) {
			if (txs.hasOwnProperty (p)) {
				tx = txs [p];
				if (txs.hasOwnProperty (p) && $. isFunction (TX))
					opts.fxs.push (p);
			}
		}
	}
	if (opts.multiFx && opts.randomizeEffects) {
		/ / Munge a matriz FXS para fazer a seleção de efeitos aleatórios
		var r1 = Math.floor (Math.random () * 20) + 30;
		for (i = 0; i <r1; i + +) {
			var r2 = Math.floor (Math.random () * opts.fxs.length);
			opts.fxs.push (opts.fxs.splice (r2, 1) [0]);
		}
		debug ('sequência aleatória fx:', opts.fxs);
	}
	return true;
}

/ / Fornecer um mecanismo para adicionar os slides após a apresentação começou
função exposeAddSlide (opta ELS) {
	opts.addSlide = function (newSlide, preceder) {
		var $ s = $ (newSlide), s = $ s [0];
		if (! opts.autostopCount)
			opts.countdown + +;
		els [? preceder 'unshift': 'push'] (s);
		if (opts.els)
			opts.els [? preceder 'unshift': 'push'] (s); / / Aleatório precisa deste
		opts.slideCount = els.length;

		/ / Adiciona o slide para o mapa aleatório e recorrer
		if (opts.random) {
			opts.randomMap.push (opts.slideCount-1);
			opts.randomMap.sort (function (a, b) {return Math.random () - 0,5;});
		}

		$ S.css ('posição', 'absoluto');
		$ S [preceder 'prependTo':? AppendTo '] (opts. $ cont);

		if (preceder) {
			opts.currSlide + +;
			opts.nextSlide + +;
		}

		if (opts.cleartypeNoBg! $. support.opacity && opts.cleartype &&!)
			clearTypeFix ($ s);

		if (opts.fit && opts.width)
			$ S.width (opts.width);
		if (opts.fit && opts.height && opts.height! = 'auto')
			$ S.height (opts.height);
		s.cycleH = (opts.fit && opts.height)? opts.height: $ s.height ();
		s.cycleW = (opts.fit && opts.width)? opts.width: $ s.width ();

		$ S.css (opts.cssBefore);

		if (opts.pager | | opts.pagerAnchorBuilder)
			$ Fn.cycle.createPagerAnchor (els.length-1, s, $ (opts.pager), els, opta).;

		if ($. isFunction (opts.onAddSlide))
			opts.onAddSlide ($ s);
		outro
			S.hide $ (); / Comportamento / default
	};
}

/ / Reset estado interno; fazemos isso em cada passagem, a fim de oferecer suporte a vários efeitos
$. Fn.cycle.resetState = function (opta, fx) {
	fx = fx | | opts.fx;
	opts.before = []; opts.after = [];
	. opts.cssBefore = $ estender ({}, opts.original.cssBefore);
	. opts.cssAfter = $ estender ({}, opts.original.cssAfter);
	. opts.animIn = $ estender ({}, opts.original.animIn);
	. opts.animOut = $ estender ({}, opts.original.animOut);
	opts.fxFn = null;
	. $ Cada (opts.original.before, function () {opts.before.push (this);});
	. $ Cada (opts.original.after, function () {opts.after.push (this);});

	/ / Re-init
	var o init = $ fn.cycle.transitions [fx].;
	if ($. isFunction (init))
		init (opts. $ cont, $ (opts.elements), opta);
};

/ / Esta é a principal fn motor, ele lida com o tempo limite, as chamadas de retorno e índice de slide mgmt
função go (ELS, opta, manual, fwd) {
	. var p = opta $ cont [0], curr = els [opts.currSlide], ao lado = els [opts.nextSlide];

	/ / Opts.busy é verdade se estamos no meio de uma animação
	if (Manual opts.busy && && opts.manualTrump) {
		/ / Vamos transições manuais solicita trunfo ativas
		debug ('manualTrump em movimento (), parando transição ativo');
		. $ (ELS) parar (true, true);
		opts.busy = 0;
		clearTimeout (p.cycleTimeout);
	}

	/ / Não começar outra transição à base de tempo de espera, se houver um ativo
	if (opts.busy) {
		debug ('transição ativa, ignorando novo pedido tx');
		retorno;
	}


	/ / Parar de andar de bicicleta, se temos um pedido de parada excelente
	if (p.cycleStop = opts.stopCount | |! p.cycleTimeout === 0 && manual)
		retorno;

	/ / Verifica para ver se devemos parar de andar de bicicleta com base em opções de autostop
	if (! Manual &&! p.cyclePause &&! opts.bounce &&
		((Opts.autostop && (- opta contagem regressiva <= 0)) | |.
		(Opts.nowrap &&! Opts.random && opts.nextSlide <opts.currSlide))) {
		if (opts.end)
			opts.end (opta);
		retorno;
	}

	/ / Se slideshow estiver em pausa, apenas a transição em um disparo manual
	var mudou = false;
	if ((Manual | |! p.cyclePause) && (opts.nextSlide = opts.currSlide!)) {
		mudou = true;
		var fx = opts.fx;
		/ / Continuar a tentar obter o tamanho do slide, se não tem ainda
		curr.cycleH = curr.cycleH | | $ (curr) Altura ().;
		curr.cycleW = curr.cycleW | | $ (curr) largura ().;
		next.cycleH = next.cycleH | | $ (próxima) Altura ().;
		next.cycleW = next.cycleW | | $ (próxima) largura ().;

		/ / Suporte tipos de transição múltipla
		if (opts.multiFx) {
			if (fwd && (opts.lastFx === indefinido | | + + opts.lastFx> = opts.fxs.length))
				opts.lastFx = 0;
			else if (fwd && (opts.lastFx === indefinido | | -. opta lastFx <0))
				opts.lastFx = opts.fxs.length - 1;
			fx = opts.fxs [opts.lastFx];
		}

		/ / Substitui fx de uma só vez se aplica:. $ ('Div') ciclo (3, 'zoom');
		if (opts.oneTimeFx) {
			fx = opts.oneTimeFx;
			opts.oneTimeFx = null;
		}

		. $ Fn.cycle.resetState (opta, fx);

		/ / Executar o antes callbacks
		if (opts.before.length)
			$. Cada (opts.before, function (i, o) {
				if (p.cycleStop = opts.stopCount!) return;
				o.apply (ao lado, [curr, em seguida, opta, fwd]);
			});

		/ / Depois de encenar a callacks
		var depois = function () {
			opts.busy = 0;
			$. Cada (opts.after, function (i, o) {
				if (p.cycleStop = opts.stopCount!) return;
				o.apply (ao lado, [curr, em seguida, opta, fwd]);
			});
			if (p.cycleStop!) {
				/ / Fila próxima transição
				queueNext ();
			}
		};

		debug ('TX disparar (' + fx + '); currSlide:' + opts.currSlide + '; nextSlide:' + opts.nextSlide);
		
		/ / Prepare-se para realizar a transição
		opts.busy = 1;
		if (opts.fxFn) / / função fx fornecido?
			opts.fxFn (curr, em seguida, opta, depois, fwd, manual opts.fastOnEvent &&);
		else if ($. isFunction ($. fn.cycle [opts.fx])) / / plugin fx?
			$ Fn.cycle [opts.fx] (curr, em seguida, opta, depois, fwd, manual opts.fastOnEvent &&).;
		outro
			$ Fn.cycle.custom (curr, em seguida, opta, depois, fwd, manual opts.fastOnEvent &&).;
	}
	else {
		queueNext ();
	}

	if (mudou | | opts.nextSlide == opts.currSlide) {
		/ / Calcula o próximo slide
		var rolo;
		opts.lastSlide = opts.currSlide;
		if (opts.random) {
			opts.currSlide = opts.nextSlide;
			if (+ + == opts.randomIndex els.length) {
				opts.randomIndex = 0;
				opts.randomMap.sort (function (a, b) {return Math.random () - 0,5;});
			}
			opts.nextSlide = opts.randomMap [opts.randomIndex];
			if (opts.nextSlide opts.currSlide ==)
				opts.nextSlide = (opts.currSlide == opts.slideCount - 1)? 0: opts.currSlide + 1;
		}
		else if () {opts.backwards
			rolo = (opts.nextSlide - 1) <0;
			if (rolo && opts.bounce) {
				! opts.backwards = opts.backwards;
				opts.nextSlide = 1;
				opts.currSlide = 0;
			}
			else {
				opts.nextSlide = rolo? (Els.length-1): opts.nextSlide-1;
				opts.currSlide = rolo? 0: opts.nextSlide +1;
			}
		}
		else {/ / seqüência
			rolo = (opts.nextSlide + 1) == els.length;
			if (rolo && opts.bounce) {
				! opts.backwards = opts.backwards;
				opts.nextSlide = els.length-2;
				opts.currSlide = els.length-1;
			}
			else {
				opts.nextSlide = rolo? 0: opts.nextSlide +1;
				opts.currSlide = rolo? els.length-1: opts.nextSlide-1;
			}
		}
	}
	if (mudou && opts.pager)
		opts.updateActivePagerLink (opts.pager, opts.currSlide, opts.activePagerClass);
	
	funcionar queueNext () {
		/ / Encenar a próxima transição
		var ms = 0, timeout = opts.timeout;
		if (opts.timeout &&! opts.continuous) {
			ms = getTimeout (ELS [opts.currSlide], els [opts.nextSlide], opta, fwd);
         if (opts.fx == 'Shuffle')
            ms - = opts.speedOut;
      }
		else if (p.cyclePause && opts.continuous) / / mostras contínuas trabalhar fora um após retorno de chamada, não esta lógica temporizador
			ms = 10;
		if (ms> 0)
			p.cycleTimeout = setTimeout (function () {ir (ELS, opta, 0, opts.backwards);!}, ms);
	}
}

/ / Invocado após a transição
$. Fn.cycle.updateActivePagerLink = function (pager, currSlide, clsName) {
   $ (Pager). Cada (function () {
       ... $ (This) crianças () removeClass (clsName) eq (currSlide) addClass (clsName).;
   });
};

/ / Valor de tempo limite para calcular a transição atual
função getTimeout (curr, em seguida, opta, fwd) {
	if (opts.timeoutFn) {
		/ / User chamada fornecido fn calc
		var t = opts.timeoutFn.call (curr, curr, em seguida, opta, fwd);
		while (opts.fx = 'none' && (t - opts.speed) <250) / / higienizar tempo limite
			t + = opts.speed;
		debug ('tempo limite calculado: "+ t +'; velocidade: '+ opts.speed);
		if (t! == false)
			retornar t;
	}
	voltar opts.timeout;
}

/ / Expor próxima função / prev, chamador deve passar no estado
. $ Fn.cycle.next = function () {opta antecedência (opta, 1); };
. $ Fn.cycle.prev = function () {opta antecedência (opta, 0);};

/ / Slide avanço para a frente ou para trás
função de avanço (opta, moveForward) {
	var val = moveForward? 1: 1;
	var els = opts.elements;
	. var p = opta $ cont [0], timeout = p.cycleTimeout;
	if (timeout) {
		clearTimeout (timeout);
		p.cycleTimeout = 0;
	}
	if (opts.random && val <0) {
		/ / Voltar para a exibição de slides previamente
		opts.randomIndex--;
		if (-. opta randomIndex == -2)
			opts.randomIndex = els.length-2;
		else if (opts.randomIndex == -1)
			opts.randomIndex = els.length-1;
		opts.nextSlide = opts.randomMap [opts.randomIndex];
	}
	else if (opts.random) {
		opts.nextSlide = opts.randomMap [opts.randomIndex];
	}
	else {
		opts.nextSlide = opts.currSlide + val;
		if (opts.nextSlide <0) {
			if (opts.nowrap) return false;
			opts.nextSlide = els.length - 1;
		}
		else if (opts.nextSlide> = els.length) {
			if (opts.nowrap) return false;
			opts.nextSlide = 0;
		}
	}

	var cb = opts.onPrevNextEvent | | opts.prevNextClick; / / PrevNextClick está obsoleto
	if ($. isFunction (cb))
		cb (val> 0, opts.nextSlide, els [opts.nextSlide]);
	go (els, opta, 1, moveForward);
	return false;
}

função buildPager (ELS, opta) {
	var $ p = $ (opts.pager);
	$. Cada (ELS, function (i, o) {
		$ Fn.cycle.createPagerAnchor (i, o, $ p, els, opta).;
	});
	opts.updateActivePagerLink (opts.pager, opts.startingSlide, opts.activePagerClass);
}

$. Fn.cycle.createPagerAnchor = function (i, el, $ p, els, opta) {
	var um;
	if ($. isFunction (opts.pagerAnchorBuilder)) {
		a = opts.pagerAnchorBuilder (i, el);
		debug ('pagerAnchorBuilder (' + i + ', el) retornou:' + a);
	}
	outro
		a = '<a href="#">' + (i +1) + '</ a>';
		
	if (! um)
		retorno;
	var $ a = $ (a);
	/ / Não se reparent âncora está no dom
	if ($ a.parents ('corpo'). comprimento === 0) {
		var arr = [];
		if ($ p.length> 1) {
			P.each $ (function () {
				var $ clone = $ a.clone (true);
				. $ (This) append ($ clone);
				arr.push ($ clone [0]);
			});
			$ A = $ (arr);
		}
		else {
			$ A.appendTo ($ p);
		}
	}

	opts.pagerAnchors = opts.pagerAnchors | | [];
	opts.pagerAnchors.push ($ a);
	
	var pagerFn = function (e) {
		e.preventDefault ();
		opts.nextSlide = i;
		. var p = opta $ cont [0], timeout = p.cycleTimeout;
		if (timeout) {
			clearTimeout (timeout);
			p.cycleTimeout = 0;
		}
		var cb = opts.onPagerEvent | | opts.pagerClick; / / PagerClick está obsoleto
		if ($. isFunction (cb))
			cb (opts.nextSlide, els [opts.nextSlide]);
		go (els, opta, 1, opts.currSlide <i); / / Disparar o trans
/ / Return false; / / <== Permitir bolha
	};
	
	if (/ mouseenter | mouseover / i.test (opts.pagerEvent)) {
		$ A.hover (pagerFn, function () {/ * não-op * /});
	}
	else {
		$ A.bind (opts.pagerEvent, pagerFn);
	}
	
	if (! / ^ clique / .test (opts.pagerEvent) &&! opts.allowPagerClickBubble)
		$ A.bind ('click.cycle', function () {return false;}); / / Suprimir clique
	
	. var cont = opta $ cont [0];
	var pauseFlag = false; / / Https://github.com/malsup/cycle/issues/44
	if (opts.pauseOnPagerHover) {
		$ A.hover (
			function () { 
				pauseFlag = true;
				cont.cyclePause + +; 
				triggerPause (cont, verdade, verdade);
			}, Function () { 
				if (pauseFlag)
					cont.cyclePause--; 
				triggerPause (cont, verdade, verdade);
			} 
		);
	}
};

/ / Ajudante fn para calcular o número de slides entre o atual eo próximo
$. Fn.cycle.hopsFromLast = function (opta, fwd) {
	lúpulo var, l = opts.lastSlide, c = opts.currSlide;
	if (fwd)
		lúpulo = c> l? c - l: opts.slideCount - l;
	outro
		lúpulo = c <L? l - c: l + opts.slideCount - c;
	voltar lúpulo;
};

Problemas / / fix ClearType no IE6, definindo uma cor bg explícita
/ / (Caso contrário, slides de texto olhar horrível durante uma transição fade)
função clearTypeFix ($ lâminas) {
	debug ('aplicar o ClearType background-color hack');
	função hex (s) {
		s = parselnt (s, 10) toString (16).;
		voltar s.length <2? '0 '+ S: s;
	}
	função getBg (e) {
		for (; e && e.nodeName.toLowerCase () = 'html';! e = e.parentNode) {
			var v = $ css (e, 'background-color').;
			if (v.indexOf ('RGB')> = 0 && v) {
				var rgb = v.match (/ \ d + / g);
				retorno '#' + hex (rgb [0]) + hex (rgb [1]) + hex (rgb [2]);
			}
			if (v && v! = 'transparente')
				retornar v;
		}
		retorno '# ffffff';
	}
	Slides.each $ (function () {. $ (This) css ('background-color', getBg (this));});
}

/ / Reset adereços comuns antes da próxima transição
$. Fn.cycle.commonReset = function (curr, em seguida, opta, w, h, rev) {
	.. $ (Opts.elements) não (curr) hide ();
	if (typeof opts.cssBefore.opacity == 'indefinido')
		opts.cssBefore.opacity = 1;
	opts.cssBefore.display = 'block';
	if (opts.slideResize && w! == false && next.cycleW> 0)
		opts.cssBefore.width = next.cycleW;
	if (opts.slideResize && h! == false && next.cycleH> 0)
		opts.cssBefore.height = next.cycleH;
	opts.cssAfter = opts.cssAfter | | {};
	opts.cssAfter.display = 'none';
	. $ (Curr) css ('zIndex', opts.slideCount + (rev === verdadeiro 1: 0));
	$ (Próxima) css ('zIndex', opts.slideCount + (rev === true 0: 1)).;
};

/ / O fn real para efetuar uma transição
$. Fn.cycle.custom = function (curr, em seguida, opta, cb, fwd, speedOverride) {
	var $ l = $ (curr), $ n = $ (próxima);
	var Speedin = opts.speedIn, speedOut = opts.speedOut, easeIn = opts.easeIn, easeOut = opts.easeOut, animInDelay = opts.animInDelay, animOutDelay = opts.animOutDelay;
	$ N.css (opts.cssBefore);
	if (speedOverride) {
		if (typeof speedOverride == 'número')
			Correndo = speedOut = speedOverride;
		outro
			Correndo = speedOut = 1;
		easeIn = easeOut = null;
	}
	var fn = function () {
		$ N.delay (animInDelay). Animar (opts.animIn, Speedin, easeIn, function () {
			cb ();
		});
	};
	$ L.delay (animOutDelay). Animar (opts.animOut, speedOut, easeOut, function () {
		$ L.css (opts.cssAfter);
		if (! opts.sync) 
			fn ();
	});
	if (opts.sync) fn ();
};

Definições / / transição - apenas desaparecer é definido aqui, pacote de transição define o resto
$. Fn.cycle.transitions = {
	desaparecer: function ($ cont, $ slides, opta) {
		$ Slides.not (': eq (' + opts.currSlide + ')'). Css ('opacidade', 0);
		opts.before.push (function (curr, em seguida, opta) {
			. $ Fn.cycle.commonReset (curr, em seguida, opte);
			opts.cssBefore.opacity = 0;
		});
		opts.animIn = {opacidade: 1};
		opts.animOut = {opacidade: 0};
		opts.cssBefore = {top: 0; esquerda: 0};
	}
};

. $ Fn.cycle.ver = function () {return ver; };

/ / Substituir estes globalmente, se quiser (eles são todos opcionais)
$. Fn.cycle.defaults = {
    activePagerClass:, nome / / class 'ActiveSlide' usado para o link ativo pager
    depois: null, / / ​​callback transição (escopo definido para elemento que foi mostrado): function (currSlideElement, nextSlideElement, opções, forwardFlag)
    allowPagerClickBubble: false, / / ​​permite ou impede clique evento em âncoras de pager de borbulhamento
    animIn: null, / / ​​propriedades que definem como o slide anima em
    animInDelay: 0, / / ​​permite atraso antes próximas transições de slides em	
    animOut: null, / / ​​propriedades que definem como o slide anima fora
    animOutDelay: 0, / / ​​permite atraso antes slide atual transições para fora
    aspecto: false, / / ​​preservar a relação de aspecto durante o ajuste de redimensionamento, recorte, se necessário (deve ser usado com a opção fit)
    autostop: 0, / / ​​true para acabar slideshow após transições X (onde X == contagem slide)
    autostopCount: 0, / / ​​número de transições (opcionalmente usado com autostop para definir X)
    para trás: false, / / ​​true para iniciar o slideshow no último slide e mover-se para trás através da pilha
    antes: null, / / ​​callback transição (escopo definido para elemento a ser mostrado): function (currSlideElement, nextSlideElement, opções, forwardFlag)
    Centro: null, / / ​​definido como true para ter ciclo de adicionar margem superior / esquerda a cada slide (uso com opções de altura e largura)
    ClearType:. $ support.opacity, / / ​​true se correções ClearType deve ser aplicado (para IE)
    cleartypeNoBg: false, / / ​​definida como true para desabilitar fixação cleartype extras (deixe em falso para forçar configuração de cores de fundo em slides)
    containerResize: 1, / / ​​redimensionar recipiente para caber maior deslizamento
    containerResizeHeight: 0, / / ​​redimensionar altura recipientes para acomodar o maior slide, mas deixar a dinâmica de largura
    contínuo: 0, / / ​​true para começar a próxima transição logo após a atual completa
    cssAfter: null, / / ​​propriedades que definem o estado do slide após a transição para fora
    cssBefore: null, / / ​​propriedades que definem o estado inicial do slide antes da transição em
    delay: 0, / / ​​atraso adicional (em ms) para a primeira transição (dica: pode ser negativo)
    easeIn: null, / / ​​facilitando para "em" transição
    easeOut: null, / / ​​facilitando para "fora" transição
    easing: null, / / ​​método para aliviar tanto dentro como fora transições
    final: null, / / ​​callback chamado quando o termina slideshow (uso com autostop ou opções nowrap): function (opções)
    fastOnEvent: 0, / / ​​forçar transições rápidas quando acionado manualmente (via pager ou anterior / seguinte); valor == tempo em ms
    caber: 0, slides / / força para caber recipiente
    fx: 'desaparecer', / / ​​nome de efeito de transição (ou nomes separados por vírgula, ex: 'fade, scrollUp, Shuffle')
    fxFn: null, / / ​​função usada para controlar a transição: function (currSlideElement, nextSlideElement, opções, afterCalback, forwardFlag)
    height: 'auto', / / ​​altura do recipiente (se a opção 'fit' é verdade, os slides serão definidos para esta altura também)
    manualTrump: true, / / ​​faz com que a transição manual para parar uma transição ativa em vez de ser ignorado
    metaAttr: 'ciclo', / /-atributo de dados que contém os dados de opção para o slideshow
    seguinte: null, / / ​​elemento, objeto jQuery, ou jQuery selector string para o elemento para usar como disparador do evento para o próximo slide
    nowrap: 0, / / ​​true para evitar a apresentação de slides a partir de embrulho
    onPagerEvent: null, / / ​​callback fn para eventos pager: function (zeroBasedSlideIndex, slideElement)
    onPrevNextEvent: null, / / ​​callback fn para Prev / Next eventos: function (isNext, zeroBasedSlideIndex, slideElement)
    pager: null, / / ​​elemento, objeto jQuery, ou jQuery selector string para o elemento para usar como recipiente pager
    pagerAnchorBuilder: null, / / ​​callback fn para a construção de links âncora: function (index, DomElement)
    pagerEvent: "click.cycle", / / ​​nome do evento que impulsiona a navegação pager
    pausar: 0, / / ​​true para permitir "pausar em foco"
    pauseOnPagerHover: 0, / / ​​true para pausar quando pairando sobre ligação pager
    prev: null, / / ​​elemento, objeto jQuery, ou jQuery selector string para o elemento para usar como gatilho evento para slide anterior
    prevNextEvent: 'click.cycle', / / ​​evento que impulsiona a transição manual para o diapositivo anterior ou seguinte
    aleatória: 0, / / ​​true para aleatório, falsa para a sequência (não aplicável para baralhar fx)
    randomizeEffects: 1, / / ​​válida quando vários efeitos são utilizados; verdadeiro para fazer a seqüência de efeitos aleatórios
    requeueOnImageNotLoaded: true, / / ​​requeue o slideshow se alguma imagem desliza ainda não são carregados
    requeueTimeout: 250, / / ​​delay ms para requeue
    rev: 0, / / ​​faz com que as animações de transição no sentido inverso (para efeitos que o suportam, como scrollHorz / scrollVert / aleatório)
    Shuffle: null, / / ​​coordenadas para animação shuffle, ex: {top: 15, deixou: 200}
    skipInitializationCallbacks: false, / / ​​definido como true para desabilitar o primeiro antes / depois callback que ocorre antes de qualquer transição
    slideExpr: null, / / ​​expressão para a seleção de lâminas (se algo diferente de todas as crianças é necessário)
    slideResize: 1, largura de slides / / force / altura de tamanho fixo antes de cada transição
    Velocidade: 1000, / / ​​velocidade da transição (qualquer valor de velocidade fx válido)
    Correndo: null, / / ​​velocidade da 'em' transição
    speedOut: null, / / ​​velocidade da transição 'out'
    startingSlide: undefined, / / ​​índice baseado em zero do primeiro slide a ser exibido
    sync: 1, / / ​​true se in / out transições devem ocorrer simultaneamente
    timeout: 4000, / / ​​milissegundos entre transições de slides (0 para desativar auto antecedência)
    timeoutFn: null, / / ​​callback para determinar o valor de tempo limite por slide: function (currSlideElement, nextSlideElement, opções, forwardFlag)
    updateActivePagerLink: null, / / ​​callback fn invocado para atualizar o vínculo pager ativa (adiciona / remove estilo activePagerClass)
    width: / / largura recipiente nulo (se a opção 'fit' é verdade, os slides serão definidos para essa largura também)
};

}) (JQuery);


/ *!
 * JQuery Cycle Plugin Transição Definições
 * Este script é um plugin para o Ciclo Plugin jQuery
 * Exemplos e documentação em: http://malsup.com/jquery/cycle/
 * Copyright (c) 2007-2010 M. Alsup
 * Versão: 2.73
 * Dupla licenciado sob as licenças MIT e GPL:
 * Http://www.opensource.org/licenses/mit-license.php
 * Http://www.gnu.org/licenses/gpl.html
 * /
(Function ($) {
"Use strict";

/ /
/ / Estas funções definem a inicialização de slides e propriedades para o nome
/ / transições. Para salvar o tamanho do arquivo fique à vontade para remover qualquer um desses que você
/ / Não precisa.
/ /
$. Fn.cycle.transitions.none = function ($ cont, $ slides, opta) {
	opts.fxFn = function (curr, em seguida, opta, depois) {
		. $ (Próxima) show ();
		. $ (Curr) hide ();
		depois ();
	};
};

/ / Não um cross-fade, fadeout só desaparece do topo de slides
$. Fn.cycle.transitions.fadeout = function ($ cont, $ slides, opta) {
	$ Slides.not (': eq (' + opts.currSlide + ')') css. ({Display: 'block', 'opacidade': 1});
	opts.before.push (function (curr, em seguida, opta, w, h, rev) {
		. $ (Curr) css ('zIndex', opts.slideCount + (rev == true 1:? 0));
		$ (Próxima) css ('zIndex', opts.slideCount + (rev == true 0:? 1)).;
	});
	opts.animIn.opacity = 1;
	opts.animOut.opacity = 0;
	opts.cssBefore.opacity = 1;
	opts.cssBefore.display = 'block';
	opts.cssAfter.zIndex = 0;
};

/ / ScrollUp / Baixo / Esquerda / Direita
$. Fn.cycle.transitions.scrollUp = function ($ cont, $ slides, opta) {
	$ Cont.css ('estouro', 'escondido');
	opts.before.push (. $ fn.cycle.commonReset);
	var h = $ cont.height ();
	opts.cssBefore.top = h;
	opts.cssBefore.left = 0;
	opts.cssFirst.top = 0;
	opts.animIn.top = 0;
	opts.animOut.top =-h;
};
$. Fn.cycle.transitions.scrollDown = function ($ cont, $ slides, opta) {
	$ Cont.css ('estouro', 'escondido');
	opts.before.push (. $ fn.cycle.commonReset);
	var h = $ cont.height ();
	opts.cssFirst.top = 0;
	opts.cssBefore.top =-h;
	opts.cssBefore.left = 0;
	opts.animIn.top = 0;
	opts.animOut.top = h;
};
$. Fn.cycle.transitions.scrollLeft = function ($ cont, $ slides, opta) {
	$ Cont.css ('estouro', 'escondido');
	opts.before.push (. $ fn.cycle.commonReset);
	var w = $ cont.width ();
	opts.cssFirst.left = 0;
	opts.cssBefore.left = w;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.left = 0-w;
};
$. Fn.cycle.transitions.scrollRight = function ($ cont, $ slides, opta) {
	$ Cont.css ('estouro', 'escondido');
	opts.before.push (. $ fn.cycle.commonReset);
	var w = $ cont.width ();
	opts.cssFirst.left = 0;
	opts.cssBefore.left =-w;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.left = w;
};
$. Fn.cycle.transitions.scrollHorz = function ($ cont, $ slides, opta) {
	. $ Cont.css ('estouro', 'escondido') largura ();
	opts.before.push (function (curr, em seguida, opta, fwd) {
		if (opts.rev)
			fwd = fwd!;
		. $ Fn.cycle.commonReset (curr, em seguida, opte);
		opts.cssBefore.left = fwd? (Next.cycleW-1): (1-next.cycleW);
		opts.animOut.left = fwd? -Curr.cycleW: curr.cycleW;
	});
	opts.cssFirst.left = 0;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.top = 0;
};
$. Fn.cycle.transitions.scrollVert = function ($ cont, $ slides, opta) {
	$ Cont.css ('estouro', 'escondido');
	opts.before.push (function (curr, em seguida, opta, fwd) {
		if (opts.rev)
			fwd = fwd!;
		. $ Fn.cycle.commonReset (curr, em seguida, opte);
		opts.cssBefore.top = fwd? (1-next.cycleH): (next.cycleH-1);
		opts.animOut.top = fwd? curr.cycleH:-curr.cycleH;
	});
	opts.cssFirst.top = 0;
	opts.cssBefore.left = 0;
	opts.animIn.top = 0;
	opts.animOut.left = 0;
};

/ / SLIDEX / slidey
$. Fn.cycle.transitions.slideX = function ($ cont, $ slides, opta) {
	opts.before.push (function (curr, em seguida, opta) {
		.. $ (Opts.elements) não (curr) hide ();
		. $ Fn.cycle.commonReset (curr, em seguida, opta, false, true);
		opts.animIn.width = next.cycleW;
	});
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
	opts.animIn.width = 'show';
	opts.animOut.width = 0;
};
$. Fn.cycle.transitions.slideY = function ($ cont, $ slides, opta) {
	opts.before.push (function (curr, em seguida, opta) {
		.. $ (Opts.elements) não (curr) hide ();
		. $ Fn.cycle.commonReset (curr, em seguida, opta, true, false);
		opts.animIn.height = next.cycleH;
	});
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.height = 0;
	opts.animIn.height = 'show';
	opts.animOut.height = 0;
};

/ / Aleatório
$. Fn.cycle.transitions.shuffle = function ($ cont, $ slides, opta) {
	var i, w = $ cont.css ('estouro', 'visível') largura ().;
	$ Slides.css ({left: 0, top: 0});
	opts.before.push (function (curr, em seguida, opta) {
		. $ Fn.cycle.commonReset (curr, em seguida, opta, verdade, verdade, true);
	});
	/ / Só ajustar a velocidade de uma vez!
	if (opts.speedAdjusted!) {
		opts.speed = opts.speed / 2; / / Shuffle tem duas transições
		opts.speedAdjusted = true;
	}
	opts.random = 0;
	opts.shuffle = opts.shuffle | | {left:-w, superior: 15};
	opts.els = [];
	for (i = 0; i <$ slides.length; i + +)
		opts.els.push ($ lâminas [i]);

	for (i = 0; i <opts.currSlide; i + +)
		opts.els.push (opts.els.shift ());

	/ / Custom fn transição (ponta chapéu para Benjamin Sterling para este pouco de doçura!)
	opts.fxFn = function (curr, em seguida, opta, cb, fwd) {
		if (opts.rev)
			fwd = fwd!;
		var $ el = fwd? $ (Curr): $ (próxima);
		. $ (Próxima) css (opts.cssBefore);
		contagem var = opts.slideCount;
		$ El.animate (opts.shuffle, opts.speedIn, opts.easeIn, function () {
			var pula = $ fn.cycle.hopsFromLast (opta, fwd).;
			for (var k = 0; k <lúpulo; k + +) {
				if (fwd)
					opts.els.push (opts.els.shift ());
				outro
					opts.els.unshift (opts.els.pop ());
			}
			if (fwd) {
				for (var i = 0, len = opts.els.length; i <len; i + +)
					$ (Opts.els [i]) css ('z-index', len-i + count).;
			}
			else {
				var z = $ (curr) css ('z-index').;
				$ El.css ('z-index', parseInt (z, 10) +1 + count);
			}
			$ El.animate ({left: 0, top: 0}, opts.speedOut, opts.easeOut, function () {
				. $ (? Fwd isto: curr) hide ();
				if (cb) cb ();
			});
		});
	};
	. $ Estender (opts.cssBefore, {display: 'block', a opacidade: 1, top: 0, restam: 0});
};

/ / Redobra / Baixo / Esquerda / Direita
$. Fn.cycle.transitions.turnUp = function ($ cont, $ slides, opta) {
	opts.before.push (function (curr, em seguida, opta) {
		. $ Fn.cycle.commonReset (curr, em seguida, opta, true, false);
		opts.cssBefore.top = next.cycleH;
		opts.animIn.height = next.cycleH;
		opts.animOut.width = next.cycleW;
	});
	opts.cssFirst.top = 0;
	opts.cssBefore.left = 0;
	opts.cssBefore.height = 0;
	opts.animIn.top = 0;
	opts.animOut.height = 0;
};
$. Fn.cycle.transitions.turnDown = function ($ cont, $ slides, opta) {
	opts.before.push (function (curr, em seguida, opta) {
		. $ Fn.cycle.commonReset (curr, em seguida, opta, true, false);
		opts.animIn.height = next.cycleH;
		opts.animOut.top = curr.cycleH;
	});
	opts.cssFirst.top = 0;
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.height = 0;
	opts.animOut.height = 0;
};
$. Fn.cycle.transitions.turnLeft = function ($ cont, $ slides, opta) {
	opts.before.push (function (curr, em seguida, opta) {
		. $ Fn.cycle.commonReset (curr, em seguida, opta, false, true);
		opts.cssBefore.left = next.cycleW;
		opts.animIn.width = next.cycleW;
	});
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
	opts.animIn.left = 0;
	opts.animOut.width = 0;
};
$. Fn.cycle.transitions.turnRight = function ($ cont, $ slides, opta) {
	opts.before.push (function (curr, em seguida, opta) {
		. $ Fn.cycle.commonReset (curr, em seguida, opta, false, true);
		opts.animIn.width = next.cycleW;
		opts.animOut.left = curr.cycleW;
	});
	. $ Estender (opts.cssBefore, {top: 0, esquerda: 0, width: 0});
	opts.animIn.left = 0;
	opts.animOut.width = 0;
};

/ / Zoom
$. Fn.cycle.transitions.zoom = function ($ cont, $ slides, opta) {
	opts.before.push (function (curr, em seguida, opta) {
		. $ Fn.cycle.commonReset (curr, em seguida, opta, falso, falso, true);
		opts.cssBefore.top = next.cycleH / 2;
		opts.cssBefore.left = next.cycleW / 2;
		. $ Estender (opts.animIn, {top: 0, esquerda: 0, width: next.cycleW, altura: next.cycleH});
		. $ Estender (opts.animOut, {width: 0, height: 0, top: curr.cycleH / 2, à esquerda: curr.cycleW / 2});
	});
	opts.cssFirst.top = 0;
	opts.cssFirst.left = 0;
	opts.cssBefore.width = 0;
	opts.cssBefore.height = 0;
};

/ / FadeZoom
$. Fn.cycle.transitions.fadeZoom = function ($ cont, $ slides, opta) {
	opts.before.push (function (curr, em seguida, opta) {
		. $ Fn.cycle.commonReset (curr, em seguida, opta, false, false);
		opts.cssBefore.left = next.cycleW / 2;
		opts.cssBefore.top = next.cycleH / 2;
		. $ Estender (opts.animIn, {top: 0, esquerda: 0, width: next.cycleW, altura: next.cycleH});
	});
	opts.cssBefore.width = 0;
	opts.cssBefore.height = 0;
	opts.animOut.opacity = 0;
};

/ / BlindX
$. Fn.cycle.transitions.blindX = function ($ cont, $ slides, opta) {
	. var w = $ cont.css ('estouro', 'escondido') largura ();
	opts.before.push (function (curr, em seguida, opta) {
		. $ Fn.cycle.commonReset (curr, em seguida, opte);
		opts.animIn.width = next.cycleW;
		opts.animOut.left = curr.cycleW;
	});
	opts.cssBefore.left = w;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
	opts.animOut.left = w;
};
/ / Blindy
$. Fn.cycle.transitions.blindY = function ($ cont, $ slides, opta) {
	var h = $ cont.css ('estouro', 'escondido') height ().;
	opts.before.push (function (curr, em seguida, opta) {
		. $ Fn.cycle.commonReset (curr, em seguida, opte);
		opts.animIn.height = next.cycleH;
		opts.animOut.top = curr.cycleH;
	});
	opts.cssBefore.top = h;
	opts.cssBefore.left = 0;
	opts.animIn.top = 0;
	opts.animOut.top = h;
};
/ / BlindZ
$. Fn.cycle.transitions.blindZ = function ($ cont, $ slides, opta) {
	var h = $ cont.css ('estouro', 'escondido') height ().;
	var w = $ cont.width ();
	opts.before.push (function (curr, em seguida, opta) {
		. $ Fn.cycle.commonReset (curr, em seguida, opte);
		opts.animIn.height = next.cycleH;
		opts.animOut.top = curr.cycleH;
	});
	opts.cssBefore.top = h;
	opts.cssBefore.left = w;
	opts.animIn.top = 0;
	opts.animIn.left = 0;
	opts.animOut.top = h;
	opts.animOut.left = w;
};

/ / GrowX - crescer horizontalmente da centrado 0 Largura
$. Fn.cycle.transitions.growX = function ($ cont, $ slides, opta) {
	opts.before.push (function (curr, em seguida, opta) {
		. $ Fn.cycle.commonReset (curr, em seguida, opta, false, true);
		opts.cssBefore.left = this.cycleW / 2;
		opts.animIn.left = 0;
		opts.animIn.width = this.cycleW;
		opts.animOut.left = 0;
	});
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
};
/ / GrowY - crescer verticalmente a partir centrado 0 altura
$. Fn.cycle.transitions.growY = function ($ cont, $ slides, opta) {
	opts.before.push (function (curr, em seguida, opta) {
		. $ Fn.cycle.commonReset (curr, em seguida, opta, true, false);
		opts.cssBefore.top = this.cycleH / 2;
		opts.animIn.top = 0;
		opts.animIn.height = this.cycleH;
		opts.animOut.top = 0;
	});
	opts.cssBefore.height = 0;
	opts.cssBefore.left = 0;
};

/ / CurtainX - aperto em ambas as bordas horizontal
$. Fn.cycle.transitions.curtainX = function ($ cont, $ slides, opta) {
	opts.before.push (function (curr, em seguida, opta) {
		. $ Fn.cycle.commonReset (curr, em seguida, opta, falso, verdadeiro, true);
		opts.cssBefore.left = next.cycleW / 2;
		opts.animIn.left = 0;
		opts.animIn.width = this.cycleW;
		opts.animOut.left = curr.cycleW / 2;
		opts.animOut.width = 0;
	});
	opts.cssBefore.top = 0;
	opts.cssBefore.width = 0;
};
/ / CurtainY - aperto em ambas as bordas verticalmente
$. Fn.cycle.transitions.curtainY = function ($ cont, $ slides, opta) {
	opts.before.push (function (curr, em seguida, opta) {
		. $ Fn.cycle.commonReset (curr, em seguida, opta, true, false, true);
		opts.cssBefore.top = next.cycleH / 2;
		opts.animIn.top = 0;
		opts.animIn.height = next.cycleH;
		opts.animOut.top = curr.cycleH / 2;
		opts.animOut.height = 0;
	});
	opts.cssBefore.height = 0;
	opts.cssBefore.left = 0;
};

/ / Difusor - curr slides coberto por slide seguinte
$. Fn.cycle.transitions.cover = function ($ cont, $ slides, opta) {
	var d = opts.direction | | 'esquerda';
	. var w = $ cont.css ('estouro', 'escondido') largura ();
	var h = $ cont.height ();
	opts.before.push (function (curr, em seguida, opta) {
		. $ Fn.cycle.commonReset (curr, em seguida, opte);
		opts.cssAfter.display ='';
		if (d == 'direito')
			opts.cssBefore.left =-w;
		else if (d == 'up')
			opts.cssBefore.top = h;
		else if (d == 'down')
			opts.cssBefore.top =-h;
		outro
			opts.cssBefore.left = w;
	});
	opts.animIn.left = 0;
	opts.animIn.top = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.left = 0;
};

/ / Descobrir - curr slides se afasta próximo slide
$. Fn.cycle.transitions.uncover = function ($ cont, $ slides, opta) {
	var d = opts.direction | | 'esquerda';
	. var w = $ cont.css ('estouro', 'escondido') largura ();
	var h = $ cont.height ();
	opts.before.push (function (curr, em seguida, opta) {
		. $ Fn.cycle.commonReset (curr, em seguida, opta, verdade, verdade, true);
		if (d == 'direito')
			opts.animOut.left = w;
		else if (d == 'up')
			opts.animOut.top =-h;
		else if (d == 'down')
			opts.animOut.top = h;
		outro
			opts.animOut.left =-w;
	});
	opts.animIn.left = 0;
	opts.animIn.top = 0;
	opts.cssBefore.top = 0;
	opts.cssBefore.left = 0;
};

/ / Atirar - move cursor superior e desaparecer
$. Fn.cycle.transitions.toss = function ($ cont, $ slides, opta) {
	. var w = $ cont.css ('estouro', 'visível') largura ();
	var h = $ cont.height ();
	opts.before.push (function (curr, em seguida, opta) {
		. $ Fn.cycle.commonReset (curr, em seguida, opta, verdade, verdade, true);
		/ / Fornecer configurações lance padrão se animOut não fornecido
		if (! opts.animOut.left &&! opts.animOut.top)
			. $ Estender (opts.animOut, {left: w * 2, top:-h / 2, opacidade: 0});
		outro
			opts.animOut.opacity = 0;
	});
	opts.cssBefore.left = 0;
	opts.cssBefore.top = 0;
	opts.animIn.left = 0;
};

/ / Limpar - animação clipe
$. Fn.cycle.transitions.wipe = function ($ cont, $ slides, opta) {
	. var w = $ cont.css ('estouro', 'escondido') largura ();
	var h = $ cont.height ();
	opts.cssBefore = opts.cssBefore | | {};
	var clipe;
	if (opts.clip) {
		if (/ l2r/.test (opts.clip))
			clipe = 'rect (0px 0px' + h + 'px 0px)';
		else if (/ r2l/.test (opts.clip))
			'(+ h 0px rect' + w + 'px' + 'px' + w + clipe = 'px)';
		else if (/ t2b/.test (opts.clip))
			clipe = 'rect (0px' + w + 'px 0px 0px)';
		else if (/ b2t/.test (opts.clip))
			clipe = 'rect (' + h + 'px' + w + 'px' + h + 'px 0px)';
		else if (/ zoom / .test (opts.clip)) {
			var top = parseInt (h / 2,10);
			var esquerda = parseInt (w / 2,10);
			clipe = 'rect (' + top + 'px' + esquerda + 'px' + top + 'px' + esquerda + 'px)';
		}
	}

	opts.cssBefore.clip = opts.cssBefore.clip | | clipe | | 'rect (0px 0px 0px 0px)';

	var d = opts.cssBefore.clip.match (/ (\ d +) / g);
	var t = parselnt (d [0], 10), r = parselnt (d [1], 10), b = parselnt (d [2], 10), l = parselnt (d [3], 10);

	opts.before.push (function (curr, em seguida, opta) {
		if (curr == seguinte) return;
		var $ curr = $ (curr), $ next = $ (ao lado);
		$ Fn.cycle.commonReset (curr, em seguida, opta, verdadeiro, verdadeiro, falso).;
		opts.cssAfter.display = 'block';

		var step = 1, count = parseInt ((opts.speedIn / 13), 10) - 1;
		(Função f () {
			var tt = t? t - parseInt (passo * (t / count), 10): 0;
			var ll = l? l - parseInt (passo * (l / count), 10): 0;
			var BB = b <h? b + parseInt (passo * ((hb) / count | | 1), 10): h;
			var rr = r <w? r + parseInt (passo * ((wr) / count | | 1), 10): w;
			$ Next.css ({clipe: "rect ('+ tt +' px '+ rr +' px '+ bb +' px '+ ll +' px) '});
			(Passo + + <= count)? setTimeout (f, 13): $ curr.css ('display', 'none');
		}) ();
	});
	. $ Estender (opts.cssBefore, {display: 'block', a opacidade: 1, top: 0, restam: 0});
	opts.animIn = {left: 0};
	opts.animOut = {left: 0};
};

}) (JQuery);