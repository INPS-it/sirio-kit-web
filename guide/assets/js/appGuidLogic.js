class GuideApp {
    static openCollapse($this){
        let id = $this.attr("href").replace("components","nav")
        $(id).slideToggle('slow');
        $this.toggleClass("guide-collapsed");
    }

    static closeCollapse($this){
        let id = $this.attr("href").replace("components","nav")
        $(id).hide(0);
        $this.toggleClass("guide-collapsed");
    }

    copyHtmlExample(from, to) {
        const HTMLCode = document.getElementById(from).innerHTML;
        document.getElementById(to).innerText = HTMLCode.toString();
    }

    formatHTML(html) {
        let indent = '\n';
        let tab = '\t';
        let i = 0;
        let pre = [];

        html = html
            .replace(new RegExp('<pre>((.|\\t|\\n|\\r)+)?</pre>'), function (x) {
                pre.push({ indent: '', tag: x });
                return '<--TEMPPRE' + i++ + '/-->'
            })
            .replace(new RegExp('<[^<>]+>[^<]?', 'g'), function (x) {
                let ret;
                let tag = /<\/?([^\s/>]+)/.exec(x)[1];
                let p = new RegExp('<--TEMPPRE(\\d+)/-->').exec(x);

                if (p)
                    pre[p[1]].indent = indent;

                if (['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr'].indexOf(tag) >= 0) // self closing tag
                    ret = indent + x;
                else {
                    if (x.indexOf('</') < 0) { //open tag
                        if (x.charAt(x.length - 1) !== '>')
                            ret = indent + x.substr(0, x.length - 1) + indent + tab + x.substr(x.length - 1, x.length);
                        else
                            ret = indent + x;
                        !p && (indent += tab);
                    }
                    else {//close tag
                        indent = indent.substr(0, indent.length - 1);
                        if (x.charAt(x.length - 1) !== '>')
                            ret = indent + x.substr(0, x.length - 1) + indent + x.substr(x.length - 1, x.length);
                        else
                            ret = indent + x;
                    }
                }
                return ret;
            });

        for (i = pre.length; i--;) {
            html = html.replace('<--TEMPPRE' + i + '/-->', pre[i].tag.replace('<pre>', '<pre>\n').replace('</pre>', pre[i].indent + '</pre>'));
        }

        return html.charAt(0) === '\n' ? html.substr(1, html.length - 1) : html;
    }

    highlightAuto(htmlValue) {
        try {
            return guideApp.formatHTML('<pre><code class="hljs xml">'+hljs.highlightAuto(htmlValue).value + '</code></pre>');
        } catch {
            return "";
        }
    }

    addBlurListener(element, resultHtmlComponent, id) {
        element.addEventListener('blur', async (e) => {
            {
                resultHtmlComponent.innerHTML = e.target.value;
                await document.getElementById(id).updateComplete;
                try {
                    document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById(id).outerHTML);
                } catch (error) {
                    return;
                }
            }
        });
    }
}

const guideApp = new GuideApp();

class SirioAccordionDemo {
    async init(run) {
        const editor = document.querySelector('#editor');
        const switchBtn = document.querySelector('#switch-mode-button');
        const divProp = document.querySelector('#viewProp');
        const viewHtml = document.querySelector('#viewHtml');
        const resultHtmlComponent = document.querySelector('#resultHtmlComponent');
        const actionButton = document.querySelector('#btnAction');
        const codeStandard = document.querySelector('#code-tab-object');
        const codeComposed = document.querySelector('#code-tabc-object');
        this.firstRun = run ?? true;

        const initialTemplate =`<sirio-accordion sirio-runtime="angular-dev" id="accordion-object-html">
        <sirio-accordion-item title="Accordion Title#1" active>
            Il componente fisarmonica fornisce grandi quantità di contenuto in un piccolo spazio
            attraverso la divulgazione progressiva. L'utente ottiene dettagli chiave sul contenuto
            sottostante e può scegliere di espandere quel contenuto entro i vincoli
            della fisarmonica. Le fisarmoniche funzionano particolarmente bene sulle interfacce mobili
            o quando lo spazio verticale è un premio.
        </sirio-accordion-item>
        <sirio-accordion-item title="Accordion Title#2">
            Il componente fisarmonica fornisce grandi quantità di contenuto in un piccolo spazio
            attraverso la divulgazione progressiva. L'utente ottiene dettagli chiave sul contenuto
            sottostante e può scegliere di espandere quel contenuto entro i vincoli
            della fisarmonica. Le fisarmoniche funzionano particolarmente bene sulle interfacce mobili
            o quando lo spazio verticale è un premio.
        </sirio-accordion-item>
        <sirio-accordion-item title="Accordion Title#3">
            Il componente fisarmonica fornisce grandi quantità di contenuto in un piccolo spazio
            attraverso la divulgazione progressiva. L'utente ottiene dettagli chiave sul contenuto
            sottostante e può scegliere di espandere quel contenuto entro i vincoli
            della fisarmonica. Le fisarmoniche funzionano particolarmente bene sulle interfacce mobili
            o quando lo spazio verticale è un premio.
        </sirio-accordion-item>
        </sirio-accordion>`

        editor.value = initialTemplate;
        resultHtmlComponent.innerHTML = initialTemplate;

        guideApp.addBlurListener(editor, resultHtmlComponent, "accordion-object-html");

        codeComposed.style.display = 'none';
        viewHtml.style.display = 'none';
        resultHtmlComponent.style.display = 'none';

        switchBtn.addEventListener('click',(e) => {
            const val = e.currentTarget.text;
            e.currentTarget.text = val === 'HTML' ? 'Standard' : 'HTML';
            divProp.style.display = val === 'Standard' ? '' : 'none';
            viewHtml.style.display = val === 'HTML' ? '' : 'none';
            resultPropComponent.style.display = val === 'Standard' ? '' : 'none';
            resultHtmlComponent.style.display = val === 'HTML' ? '' : 'none';
            codeStandard.style.display = val === 'Standard' ? 'block' : 'none';
            codeComposed.style.display = val === 'HTML' ? 'block' : 'none';

            if(val === 'HTML') {
                actionButton.setAttribute("disabled", "disabled");
                editor.value = initialTemplate;
                resultHtmlComponent.innerHTML = initialTemplate;

                document.getElementById("accordion-object-html")?.updateComplete?.then(() => {
                    document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("accordion-object-html")?.outerHTML);
                    return;
                });
            }

            document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("accordion-object-prop")?.outerHTML);

            actionButton.removeAttribute("disabled");
        });

        await this.apply();
    }

    async apply() {
        let accordion1 = document.getElementById("accordion-object-prop");
        if(!this.firstRun){
            let item = document.getElementById("itemsInput").getValue();
            accordion1.setAttribute("item", item);

            let btnDark = document.getElementById("btnDark").getSelectedValues();
            if (btnDark) {
                accordion1.setAttribute("dark", "");
            } else {
                accordion1.removeAttribute("dark");
            }
        }else{ this.firstRun = false; }
        const container = document.getElementById("codeView")
        await accordion1.updateComplete;
        container.innerHTML = guideApp.highlightAuto(accordion1.outerHTML);
    }
}

class SirioAlertDemo {
    async init(run) {
        const editor = document.querySelector('#editor');
        const switchBtn = document.querySelector('#switch-mode-button');
        const divProp = document.querySelector('#viewProp');
        const viewHtml = document.querySelector('#viewHtml');
        const resultHtmlComponent = document.querySelector('#resultHtmlComponent');
        const actionButton = document.querySelector('#btnAction');
        const demoButton = document.querySelector('#btnDemo');
        this.firstRun = run ?? true;

        const initialTemplate = `<sirio-alert type="error" title="Titolo alert" text="Testo alert" id="alert-example-html" link-text="Testo link" link-url="#" visible></sirio-alert>`;

        editor.value = initialTemplate;
        resultHtmlComponent.innerHTML = initialTemplate;

        guideApp.addBlurListener(editor, resultHtmlComponent, "alert-example-html");

        viewHtml.style.display = 'none';
        resultHtmlComponent.style.display = 'none';

        switchBtn.addEventListener('click', (e) => {
            const val = e.currentTarget.text;
            e.currentTarget.text = val === 'HTML' ? 'Standard' : 'HTML';
            divProp.style.display = val === 'Standard' ? '' : 'none';
            viewHtml.style.display = val === 'HTML' ? '' : 'none';
            resultPropComponent.style.display = val === 'Standard' ? '' : 'none';
            resultHtmlComponent.style.display = val === 'HTML' ? '' : 'none';

            if(val === 'HTML') {
                actionButton.setAttribute("disabled", "disabled");
                demoButton.setAttribute("disabled", "disabled");
                resultHtmlComponent.children[0].remove();
                editor.value = initialTemplate;
                resultHtmlComponent.innerHTML = initialTemplate;

                document.getElementById("alert-example-html")?.updateComplete?.then(() => {
                    try {
                        document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("alert-example-html")?.outerHTML);
                        return;
                    } catch (e) {
                        return;
                    }
                });
            }
            actionButton.removeAttribute("disabled");
            demoButton.removeAttribute("disabled");
            document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("alert-example-prop")?.outerHTML);
        });

        let color = document.getElementById("btnColor");
        color.disabled = true;

        await this.apply();
    }

    async apply() {
        let resultProp = document.querySelector('#resultPropComponent');
        let alertComponent = document.getElementById("alert-example-prop");
        if(!this.firstRun) {
            let liveDemo;

            let title = document.getElementById("title").getValue();
            alertComponent.title = title;

            let text = document.getElementById("text").getValue();
            alertComponent.text = text;

            let type = document.getElementById("type").getSelectedValues()[0];
            alertComponent.type = type;

            let linkText = document.getElementById("linkText").getValue();
            if (linkText != '') {
                alertComponent.linkText = linkText;
            } else {
                alertComponent.removeAttribute("link-text");
            }

            let linkUrl = document.getElementById("linkUrl").getValue();
            if (linkUrl != '') {
                alertComponent.linkUrl = linkUrl;
            } else {
                alertComponent.removeAttribute("link-url");
            }

            let toast = document.getElementById("toast").getSelectedValues();
            alertComponent.toast = toast;

            let delay = document.getElementById("delay").getValue();
            if (toast) alert.delay = delay;

            if (toast) {
                liveDemo = document.getElementById("toast-live-demo");
                resultProp.classList.add("guide-col-auto");
                resultProp.classList.remove("guide-col-12");
                liveDemo.delay = delay;
            } else {
                liveDemo = document.getElementById("alert-live-demo");
                resultProp.classList.add("guide-col-12");
                resultProp.classList.remove("guide-col-auto");
            }

            let btnAction = document.getElementById("btnAlert").getSelectedValues();
            let btnText = document.getElementById("btnText").getValue();
            let btnColor = document.getElementById("btnColor").getSelectedValues()[0];
            let btnIcon = document.getElementById("icon").getValue();

            liveDemo.title = title;
            liveDemo.text = text;
            liveDemo.type = type;
            liveDemo.linkText = linkText;
            liveDemo.linkUrl = linkUrl;

            let btnComponent = document.getElementById("button-example-prop");
            let btnDemo = document.getElementById("button-demo-prop");
            if (btnAction) {
                if (!btnComponent) { btnComponent = document.createElement("sirio-button"); }
                if (!btnDemo) { btnDemo = document.createElement("sirio-button") };

                btnComponent.setAttribute("id", "button-example-prop");
                btnComponent.setAttribute("text", btnText);
                btnComponent.setAttribute("color", btnColor);
                btnComponent.setAttribute("icon", btnIcon);
                btnComponent.firstRender = false;
                this.alertComponent?.prepend(btnComponent);

                btnDemo.setAttribute("id", "button-demo-prop");
                btnDemo.setAttribute("text", btnText);
                btnDemo.setAttribute("color", btnColor);
                btnDemo.setAttribute("icon", btnIcon);
                btnDemo.firstRender = false;
                liveDemo?.prepend(btnDemo);
            } else {
                let btnContainer = document.querySelectorAll(".sirio-alert-btn");
                if (btnContainer) btnContainer.forEach((e) => e.remove());
                if (btnComponent) { btnComponent.remove(); }
                if (btnDemo) { btnDemo.remove(); }
            }

            alertComponent.requestUpdate();
            liveDemo.requestUpdate();
        } else { this.firstRun = false; }

        const container = document.getElementById("codeView");
        await alertComponent.updateComplete;
        container.innerHTML = guideApp.highlightAuto(alertComponent.outerHTML);
    }

    delayInput() {
        let toast = document.getElementById("toast").getSelectedValues();
        let delay = document.getElementById("delay");
        delay.disabled = !toast;
    }

    btnActionInput() {
        let btnAction = document.getElementById("btnAlert").getSelectedValues();
        let btnText = document.getElementById("btnText");
        let btnColor = document.getElementById("btnColor");
        let btnIcon = document.getElementById("icon");
        btnText.disabled = !btnAction;
        btnColor.disabled = !btnAction;
        btnIcon.disabled = !btnAction;
    }

    liveDemo() {
        let toast = document.getElementById("toast").getSelectedValues();
        let alertConID = document.querySelector("#alert-live-demo");
        let toastConID = document.querySelector("#toast-live-demo");
        if (toast) {
            toastConID.SirioToast();
        } else {
            alertConID.SirioAlert();
        }
    }
}

class SirioBreadcrumbDemo {
    async init(run) {
        this.firstRun = run ?? true;

        await this.apply();
    }

    async apply() {
        var obj = document.getElementById("sirio-breadcrumb");
        if(!this.firstRun) {
            var itemsInput = document.getElementById("itemsInput").getValue();

            obj.setAttribute("items", itemsInput);

        } else { this.firstRun = false; }

        const container = document.getElementById("codeView")
        await obj.updateComplete;
		container.innerHTML = guideApp.highlightAuto(obj.outerHTML);
    }
}

class SirioButtonDemo {
    async init(run) {
        const itemControl = document.querySelector('#item-control');
        const editor = document.querySelector('#editor');
        const switchBtn = document.querySelector('#switch-mode-button');
        const divProp = document.querySelector('#viewProp');
        const viewHtml = document.querySelector('#viewHtml');
        const resultProp = document.querySelector('#resultPropComponent');
        const resultHtmlComponent = document.querySelector('#resultHtmlComponent');
        const actionButton = document.querySelector('#btnAction');
        this.firstRun = run ?? true;

        const initialTemplate =
        `<sirio-button sirio-runtime="angular-dev" id="button-example-html"
            type="button" text="Primario" 
            color="primary">
        </sirio-button>
        <div id="collapseID-1" role="region" data-sirio-visible="false">
            <div>
                Il componente fisarmonica fornisce grandi quantità di contenuto 
                in un piccolo spazio attraverso la divulgazione progressiva. 
                L'utente ottiene dettagli chiave sul contenuto sottostante e può scegliere 
                di espandere quel contenuto entro i vincoli della fisarmonica. 
                Le fisarmoniche funzionano particolarmente bene sulle interfacce mobili 
                o quando lo spazio verticale è un premio.
            </div>
        </div>`

        editor.value = initialTemplate;
        resultHtmlComponent.innerHTML = initialTemplate;

        guideApp.addBlurListener(editor, resultHtmlComponent, "button-example-html");

        viewHtml.style.display = 'none';
        resultHtmlComponent.style.display = 'none';

        switchBtn.addEventListener('click', (e) => {
            const val = e.currentTarget.text;
            e.currentTarget.text = val === 'HTML' ? 'Standard' : 'HTML';
            divProp.style.display = val === 'Standard' ? '' : 'none';
            viewHtml.style.display = val === 'HTML' ? '' : 'none';
            resultPropComponent.style.display = val === 'Standard' ? '' : 'none';
            resultHtmlComponent.style.display = val === 'HTML' ? '' : 'none';

            if(val === 'HTML') {
                actionButton.setAttribute("disabled", "disabled");
                editor.value = initialTemplate;
                resultHtmlComponent.innerHTML = initialTemplate;

                document.getElementById("button-example-html")?.updateComplete?.then(() => {
                    try {
                        document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("button-example-html")?.outerHTML);
                        return;
                    } catch (e) {
                        return;
                    }
                });
            }
            document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("button-example-prop")?.outerHTML);
            actionButton.removeAttribute("disabled");
        });

        await this.apply();
    }

    async apply() {
        var btn = document.getElementById("button-example-prop");
        if(!this.firstRun) {
            let buttonType = document.getElementById("buttonType").getSelectedValues();
            if(buttonType==='collapse'){
                btn.setAttribute("target","collapseID-1");
                btn.setAttribute("toggle",buttonType);
            }else{
                if (buttonType !== '-') {
                    btn.setAttribute("type", buttonType);
                } else {
                    btn.setAttribute("type", "");
                }
            }

            let titleInput = document.getElementById("titleInput").getValue();

            btn.setAttribute("text", titleInput);

            let buttonColor = document.getElementById("buttonColor").getSelectedValues();
            if (buttonColor !== '-') {
                btn.setAttribute("color", buttonColor);
            }

            let buttonSize = document.getElementById("buttonSize")?.getSelectedValues?.();
            if (buttonSize && buttonSize !== '-') {
                btn.setAttribute("padding-size", buttonSize);
            }

            let inputIcon = document.getElementById("inputIcon").getValue();
            if (inputIcon) {
                btn.setAttribute("icon", inputIcon);
            }

            let iconPlacement = document.getElementById("icon-placement").getSelectedValues();
            btn.setAttribute("icon-placement", iconPlacement);

            let inputEvent = document.getElementById("inputEvent").getSelectedValues();
            btn.setAttribute("event-enabled", !inputEvent);

            let inputDebug = document.getElementById("inputDebug").getSelectedValues();
            btn.setAttribute("debug", !inputDebug);

            let forMobile = document.getElementById("for-mobile").getSelectedValues();
            if (forMobile) {
                btn.setAttribute("for-mobile", "");
            } else {
                btn.removeAttribute("for-mobile");
            }

            let inputDisabled = document.getElementById("inputDisable").getSelectedValues();
            if (inputDisabled) {
                btn.setAttribute("disabled", "");
            } else {
                btn.removeAttribute("disabled");
            }
        } else { this.firstRun = false; }

        const container = document.getElementById("codeView")
        await btn.updateComplete;
        container.innerHTML = guideApp.highlightAuto(btn.outerHTML);
    }
}

class SirioCardDemo {
    async init() {
        const editor = document.querySelector('#editor');
        const resultHtmlComponent = document.querySelector('#resultHtmlComponent');

        const initialTemplate = `  
                <sirio-card id="card-example-html">
                    <sirio-card-header tag="Categoria" date="13 Nov 2021"></sirio-card-header>
                    <sirio-card-body 
                        title="<a href='#'>Titolo lorem ipsum dolor consectetur adipisci eli</a>"
                        subtitle="Lorem ipsum dolor sit amet consectetur adipisci eli"
                        signature="Firma autore">
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisci elit,
                            sed do eiusmod tempor incidunt ut labore et dolore magna aliqua
                        </p>
                    </sirio-card-body>
                    <sirio-card-footer>
                        <sirio-card-action type="link" url="#" icon="fas fa-share-alt"></sirio-card-action>
                        <sirio-card-action type="link" url="#" icon="fas fa-heart"></sirio-card-action>
                    </sirio-card-footer>
                </sirio-card>
        `;

        editor.value = initialTemplate;
        resultHtmlComponent.innerHTML = initialTemplate;

        guideApp.addBlurListener(editor, resultHtmlComponent, "card-example-html");

        document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("card-example-html")?.outerHTML);
    }
}

class SirioChipDemo {
    async init(run) {
        const itemControl = document.querySelector('#item-control');
        const editor = document.querySelector('#editor');
        const switchBtn = document.querySelector('#switch-mode-button');
        const divProp = document.querySelector('#viewProp');
        const viewHtml = document.querySelector('#viewHtml');
        const resultProp = document.querySelector('#resultPropComponent');
        const resultHtmlComponent = document.querySelector('#resultHtmlComponent');
        const actionButton = document.querySelector('#btnAction');
        this.firstRun = run ?? true;

        const initialTemplate = `<sirio-chip id="chip-example-html" type="checkbox" text="Chip" event-enabled="true"></sirio-chip>`

        editor.value = initialTemplate;
        resultHtmlComponent.innerHTML = initialTemplate;

        guideApp.addBlurListener(editor, resultHtmlComponent, "chip-example-html");

        viewHtml.style.display = 'none';
        resultHtmlComponent.style.display = 'none';

        switchBtn.addEventListener('click', (e) => {
            const val = e.currentTarget.text;
            e.currentTarget.text = val === 'HTML' ? 'Standard' : 'HTML';
            divProp.style.display = val === 'Standard' ? '' : 'none';
            viewHtml.style.display = val === 'HTML' ? '' : 'none';
            resultPropComponent.style.display = val === 'Standard' ? '' : 'none';
            resultHtmlComponent.style.display = val === 'HTML' ? '' : 'none';

            if(val === 'HTML') {
                actionButton.setAttribute("disabled", "disabled");
                editor.value = initialTemplate;
                resultHtmlComponent.innerHTML = initialTemplate;

                document.getElementById("chip-example-html")?.updateComplete?.then(() => {
                    try {
                        document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("chip-example-html")?.outerHTML);
                        return;
                    } catch (e) {
                        return;
                    }
                });
            }
            actionButton.removeAttribute("disabled");
            document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("chip-example-prop")?.outerHTML);
        });

        await this.apply();
    }

    async apply() {
        var chip = document.getElementById("chip-example-prop");
        if(!this.firstRun) {
            var btnText = document.getElementById("text").getValue();
            chip.text = btnText;

            var type = document.getElementById("type").getSelectedValues()[0];

            chip.type= type;

            var icon = document.getElementById("icon").getValue();
            if (icon !== '') {
                chip.icon = icon;
            }

            var disabled = document.getElementById("InputDisable").getSelectedValues();
            if(disabled) {
                chip.setAttribute("disabled", "");
            } else {
                chip.removeAttribute("disabled");
            }

            var chiudi = document.getElementById("InputChiudi").getSelectedValues();
            if(chiudi)
                chip.setAttribute("close-button", "Elimina");
            else
                chip.removeAttribute("close-button");
        } else { this.firstRun = false; }

        const container = document.getElementById("codeView");
        await chip.updateComplete;
        container.innerHTML = guideApp.highlightAuto(chip.outerHTML);
    }
}

class SirioDatetimeDemo {
    initDatetimeStandard() {
        const elems = document.querySelector("#resultPropComponent sirio-datetime .sirio-datepicker");
        const datepicker = new Datepicker(elems, {
            format: "dd/mm/yyyy",
            language: "it",
            prevArrow: '<span class="fas fa-angle-left" aria-hidden="true"></span>',
            nextArrow: '<span class="fas fa-angle-right" aria-hidden="true"></span>',
            autohide: true
        });
    }

    initDatetimeRange() {
        const elemRange = document.querySelector("#resultPropComponent sirio-datetime .sirio-datepicker-range");
        const datepickerRange = new DateRangePicker(elemRange, {
            format: "dd/mm/yyyy",
            language: "it",
            prevArrow: '<span class="fas fa-angle-left" aria-hidden="true"></span>',
            nextArrow: '<span class="fas fa-angle-right" aria-hidden="true"></span>'
        });
    }

    initDatetimeHtml() {
        const elems = document.querySelector("#datetime-example-html .sirio-datepicker");
        if (elems) {
            const datepicker = new Datepicker(elems, {
                format: "dd/mm/yyyy",
                language: "it",
                prevArrow: '<span class="fas fa-angle-left" aria-hidden="true"></span>',
                nextArrow: '<span class="fas fa-angle-right" aria-hidden="true"></span>',
                autohide: true
            });
        }

        const elemRange = document.querySelector("#datetime-example-html .sirio-datepicker-range");
        if (elemRange) {
            const datepickerRange = new DateRangePicker(elemRange, {
                format: "dd/mm/yyyy",
                language: "it",
                prevArrow: '<span class="fas fa-angle-left" aria-hidden="true"></span>',
                nextArrow: '<span class="fas fa-angle-right" aria-hidden="true"></span>'
            });
        }
    }

    async init(run) {
        const itemControl = document.querySelector('#item-control');
        const editor = document.querySelector('#editor');
        const switchBtn = document.querySelector('#switch-mode-button');
        const divProp = document.querySelector('#viewProp');
        const viewHtml = document.querySelector('#viewHtml');
        const resultProp = document.querySelector('#resultPropComponent');
        const resultHtmlComponent = document.querySelector('#resultHtmlComponent');
        const actionButton = document.querySelector('#btnAction');
        this.firstRun = run ?? true;

        const initialTemplate =`<sirio-datetime type="date" id="datetime-example-html" name="datetime-example-html" label="Datetime/Timepicker:" placeholder="Inserisci data/ora"></sirio-datetime>`

        editor.value = initialTemplate;
        resultHtmlComponent.innerHTML = initialTemplate;

        editor.addEventListener('blur', (e) => { {
            resultHtmlComponent.innerHTML = e.target.value;
            setTimeout(function(){
                var demo = new SirioDatetimeDemo();
                demo.initDatetimeHtml();
            }, 100);

            document.getElementById("datetime-example-html")?.updateComplete?.then(() => {
                try {
                    document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("datetime-example-html")?.outerHTML);
                    return;
                } catch (e) {
                    return;
                }
            });
        } });

        viewHtml.style.display = 'none';
        resultHtmlComponent.style.display = 'none';

        switchBtn.addEventListener('click', (e) => {
            const val = e.currentTarget.text;
            e.currentTarget.text = val === 'HTML' ? 'Standard' : 'HTML';
            divProp.style.display = val === 'Standard' ? '' : 'none';
            viewHtml.style.display = val === 'HTML' ? '' : 'none';
            resultPropComponent.style.display = val === 'Standard' ? '' : 'none';
            resultHtmlComponent.style.display = val === 'HTML' ? '' : 'none';

            if(val === 'HTML') {
                actionButton.setAttribute("disabled", "disabled");
                editor.value = initialTemplate;
                resultHtmlComponent.innerHTML = initialTemplate;
                setTimeout(function(){
                    var demo = new SirioDatetimeDemo();
                    demo.initDatetimeHtml();
                }, 100);

                document.getElementById("datetime-example-html")?.updateComplete?.then(() => {
                    try {
                        document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("datetime-example-html")?.outerHTML);
                        return;
                    } catch (e) {
                        return;
                    }
                });
            }
            actionButton.removeAttribute("disabled");
            document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("datetime-example-prop")?.outerHTML);

        });

        await this.apply();
    }

    async apply() {
        var compDt = document.getElementById("datetime-example-prop");
        if(!this.firstRun) {
            compDt.setAttribute("id", crypto.randomUUID());
            var dateType = document.getElementById("dateType").getSelectedValues()[0];
            if (dateType) {
                compDt.setAttribute("type", dateType);
            } else {
                compDt.setAttribute("type", "");
            }

            if(dateType === 'range'){
                compDt.setAttribute("id-start", "range-date");
                compDt.setAttribute("name-start", "range-start");
                compDt.setAttribute("id-end", "range-date");
                compDt.setAttribute("name-end", "range-end");
            }

            var label = document.getElementById("label").getValue();
            compDt.setAttribute("label", label);

            var perc = document.getElementById("placeholder").getValue();
            compDt.setAttribute("placeholder",perc);
        } else { this.firstRun = false; }

        const container = document.getElementById("codeView")
        await compDt.updateComplete;
        setTimeout(function(){
            var demo = new SirioDatetimeDemo();
            if (dateType === 'date') {
                demo.initDatetimeStandard();
            }

            if (dateType === 'range') {
                demo.initDatetimeRange();
            }

            container.innerHTML = guideApp.highlightAuto(compDt.outerHTML);
        }, 100);
    }
}

class SirioDialogDemo {
    async init(run) {
        const itemControl = document.querySelector('#item-control');
        const editor = document.querySelector('#editor');
        const switchBtn = document.querySelector('#switch-mode-button');
        const divProp = document.querySelector('#viewProp');
        const viewHtml = document.querySelector('#viewHtml');
        const resultProp = document.querySelector('#resultPropComponent');
        const resultHtmlComponent = document.querySelector('#resultHtmlComponent');
        const actionButton = document.querySelector('#btnAction');
        this.firstRun = run ?? true;

        const initialTemplate = `<sirio-dialog id="dialog-object-html" title="Titolo finestra di dialogo">
            <sirio-content slot="dialog-body">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor incididunt ut labore et dolore 
                    magna aliqua.
                </p>
            </sirio-content>
            <sirio-button id="btn-dialog-html" color="primary" text="Conferma"></sirio-button>
        </sirio-dialog>`

        editor.value = initialTemplate;
        resultHtmlComponent.innerHTML = initialTemplate;

        guideApp.addBlurListener(editor, resultHtmlComponent, "dialog-object-html");

        viewHtml.style.display = 'none';
        resultHtmlComponent.style.display = 'none';

        switchBtn.addEventListener('click', (e) => {
            const val = e.currentTarget.text;
            e.currentTarget.text = val === 'HTML' ? 'Standard' : 'HTML';
            divProp.style.display = val === 'Standard' ? '' : 'none';
            viewHtml.style.display = val === 'HTML' ? '' : 'none';
            resultPropComponent.style.display = val === 'Standard' ? '' : 'none';
            resultHtmlComponent.style.display = val === 'HTML' ? '' : 'none';

            if (val === 'HTML') {
                actionButton.setAttribute("disabled", "disabled");
                editor.value = initialTemplate;
                resultHtmlComponent.innerHTML = initialTemplate;

                document.getElementById("dialog-example-html")?.updateComplete?.then(() => {
                    try {
                        document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("dialog-example-html")?.outerHTML);
                        return;
                    } catch (e) {
                        return;
                    }
                });
            }
            document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("dialog-object-prop")?.outerHTML);
            actionButton.removeAttribute("disabled");

        });

        await this.apply();
    }

    async apply() {
        var dialog = document.getElementById("dialog-object-prop");
        if(!this.firstRun) {
            var type = document.getElementById("type").getSelectedValues()[0];
            dialog.setAttribute("type", type);

            var title = document.getElementById("title").getValue();
            dialog.setAttribute("title", title);

            var contenuto = document.getElementById("itemsInput").getValue();
            dialog.querySelector('[slot="dialog-body"]').innerHTML = contenuto;
        } else { this.firstRun = false; }

        const container = document.getElementById("codeView")
        await dialog.updateComplete;
        container.innerHTML = guideApp.highlightAuto(dialog.outerHTML);
    }
}

class SirioDropdownDemo {
    async init() {
        const editor = document.querySelector('#editor');
        const resultHtmlComponent = document.querySelector('#resultHtmlComponent');

        const initialTemplate = `<sirio-dropdown id="dropdown-example-html" items='[
    {"text": "Opzione 1", "url": "#"},
    {"text": "Opzione 2", "url": "#"},
    {"text": "Opzione 3", "url": "#"}]'
    text="Dropdown menu" color="primary">
</sirio-dropdown>`

        editor.value = initialTemplate;
        resultHtmlComponent.innerHTML = initialTemplate;

        guideApp.addBlurListener(editor, resultHtmlComponent, "dropdown-example-html");

        document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("dropdown-example-html")?.outerHTML);
    }
}

class SirioFilterDemo {
    async init() {
        const editor = document.querySelector('#editor');
        const resultHtmlComponent = document.querySelector('#resultHtmlComponent');

        const initialTemplate = `<sirio-filter title="Filtri" id="filter-example-html" type="vertical" filter-selected>
    <sirio-filter-group title="Section Title #1" title-info="Titolo info" 
        content-info="<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>" show-item=5>
        <sirio-chip id="filter-chip-1" value="1" name="filter-chip-1" 
            text="Valore chip" type="checkbox"></sirio-chip>
        <sirio-chip id="filter-chip-2" value="1" name="filter-chip-2" 
            text="Valore chip lungo" type="checkbox"></sirio-chip>
        <sirio-chip id="filter-chip-3" value="1" name="filter-chip-3" 
            text="Valore chip" type="checkbox"></sirio-chip>
        <sirio-chip id="filter-chip-4" value="1" name="filter-chip-4" 
            text="Valore chip" type="checkbox"></sirio-chip>
        <sirio-chip id="filter-chip-5" value="1" name="filter-chip-5" 
            text="Valore chip" type="checkbox"></sirio-chip>
        <sirio-chip id="filter-chip-6" value="1" name="filter-chip-6" 
            text="Valore chip" type="checkbox"></sirio-chip>
        <sirio-chip id="filter-chip-7" value="1" name="filter-chip-7" 
            text="Valore chip" type="checkbox"></sirio-chip>
        <sirio-chip id="filter-chip-8" value="1" name="filter-chip-8" 
            text="Valore chip" type="checkbox"></sirio-chip>
        <sirio-chip id="filter-chip-9" value="1" name="filter-chip-9" 
            text="Valore chip" type="checkbox"></sirio-chip>
    </sirio-filter-group>
    <sirio-filter-group title="Section Title #2" title-info="Titolo info" 
        content-info="<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>">
        <sirio-input label="Label:" type="text" id="filter-input-1" name="filter-input-1" 
            placeholder="text"></sirio-input>
        <sirio-input label="Label:" type="text" id="filter-input-2" name="filter-input-2" 
            placeholder="text"></sirio-input>
    </sirio-filter-group>
    <sirio-filter-btn id="btn-1" type-btn="cancel" text="Elimina filtri"></sirio-filter-btn>
    <sirio-filter-btn id="btn-2" type-btn="confirm" text="Applica filtri"></sirio-filter-btn>
</sirio-filter>
        `;

        editor.value = initialTemplate;
        resultHtmlComponent.innerHTML = initialTemplate;

        guideApp.addBlurListener(editor, resultHtmlComponent, "filter-example-html");

        codeStandard.style.display = 'none';

        document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("filter-example-html")?.outerHTML);
    }
}

class SirioGridDemo {
    async init(run) {
        const itemControl = document.querySelector('#item-control');
        const editor = document.querySelector('#editor');
        const switchBtn = document.querySelector('#switch-mode-button');
        const divProp = document.querySelector('#viewProp');
        const viewHtml = document.querySelector('#viewHtml');
        const resultProp = document.querySelector('#resultPropComponent');
        const actionButton = document.querySelector('#btnAction');
        const codeStandard = document.querySelector('#code-grid-object');
        const codeJS = document.querySelector('#code-gridJS-object');
        this.firstRun = run ?? true;

        viewHtml.style.display = 'none';

        await this.apply();
    }

    async apply() {
        var grid = document.getElementById("grid-object-prop");
        if(!this.firstRun) {
            const itemsElement = document.getElementById("items");
            const columnDefElement = document.getElementById("columnDef");

            try {
                const rawItems = itemsElement?.getAttribute("value") || "";
                const rawColumnDef = columnDefElement?.getAttribute("value") || "";

                let cleanedItems = rawItems.replace(/\b(\w+):/g, '"$1":');
                cleanedItems = cleanedItems.replace(/'/g, '"');

                const parsedItems = JSON.parse(cleanedItems);
                const parsedColumnDef = JSON.parse(rawColumnDef.replace(/\n/g, "").replace(/\s+/g, " "));

                grid.items = parsedItems;
                grid.columnDef = parsedColumnDef;

            } catch (error) {
                console.error("Errore durante il parsing di items o columnDef:", error);

                grid.items = [];
                grid.columnDef = [];
            }

            var spacing = document.getElementById("spacing").getSelectedValues()[0];
            if (spacing == '-') { grid.removeAttribute("spacing"); }
            else grid.setAttribute("spacing", spacing);

            var dark = document.getElementById("dark").getSelectedValues();
            if (dark) { grid.setAttribute("dark", ""); }
            else grid.removeAttribute("dark");

            var fixed = document.getElementById("fixed").getSelectedValues();
            if (fixed) { grid.setAttribute("fixed", ""); }
            else grid.removeAttribute("fixed");

            var card = document.getElementById("card").getSelectedValues();
            if (card) { grid.setAttribute("card", ""); }
            else grid.removeAttribute("card");
        } else { this.firstRun = false; }

        const container = document.getElementById("codeView");
        await grid.updateComplete;
        container.innerHTML = guideApp.highlightAuto(grid.outerHTML);
    }
}

class SirioHeroDemo {
    async init(run) {
        const itemControl = document.querySelector('#item-control');
        const editor = document.querySelector('#editor');
        const switchBtn = document.querySelector('#switch-mode-button');
        const divProp = document.querySelector('#viewProp');
        const viewHtml = document.querySelector('#viewHtml');
        const resultProp = document.querySelector('#resultPropComponent');
        const resultHtmlComponent = document.querySelector('#resultHtmlComponent');
        const actionButton = document.querySelector('#btnAction');
        this.firstRun = run ?? true;

        const initialTemplate = `<sirio-hero id="hero-object-html" items='[{ "title": "Home", "url": "https://www.inps.it/", "target": "_blank" }, { "title": "Lorem Ipsum" }, { "title": "Dolor sit amet" }]' heading="Titolo hero" subheading="Sottotitolo" sr-breadcrumb-label="" img="../../assets/img/img-hero.svg" call-to-action='{ "text": "Testo link" }'>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Sed ullamcorper ante aliquet lectus imperdiet, 
                    <a href="#">nec vehicula sapien</a> placerat. 
                    Etiam sollicitudin elementum ligula eget aliquet. Fusce mollis facilisis leo.
                </p>
        </sirio-hero>`

        editor.value = initialTemplate;
        resultHtmlComponent.innerHTML = initialTemplate;

        guideApp.addBlurListener(editor, resultHtmlComponent, "hero-object-html");

        viewHtml.style.display = 'none';
        resultHtmlComponent.style.display = 'none';

        switchBtn.addEventListener('click', (e) => {
            const val = e.currentTarget.text;
            e.currentTarget.text = val === 'HTML' ? 'Standard' : 'HTML';
            divProp.style.display = val === 'Standard' ? '' : 'none';
            viewHtml.style.display = val === 'HTML' ? '' : 'none';
            resultPropComponent.style.display = val === 'Standard' ? '' : 'none';
            resultHtmlComponent.style.display = val === 'HTML' ? '' : 'none';

            if (val === 'HTML') {
                actionButton.setAttribute("disabled", "disabled");
                editor.value = initialTemplate;
                resultHtmlComponent.innerHTML = initialTemplate;

                document.getElementById("hero-example-html")?.updateComplete?.then(() => {
                    try {
                        document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("hero-example-html")?.outerHTML);
                        return;
                    } catch (e) {
                        return;
                    }
                });
            }
            actionButton.removeAttribute("disabled");
            document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("hero-object-prop")?.outerHTML);

        });

        await this.apply();
    }

    async apply() {
        var hero = document.getElementById("hero-object-prop");
        if(!this.firstRun) {
            var titolo = document.getElementById("inputHeading").getValue();
            hero.setAttribute("heading", titolo);

            var sottotitolo = document.getElementById("inputSubheading").getValue();
            hero.setAttribute("subheading", sottotitolo);

            var itemsInput = document.getElementById("itemsInput").getValue();
            hero.setAttribute("items", itemsInput);

            var contenuto = document.getElementById("inputContent").getValue();
            hero.setAttribute("content", contenuto);

            var btnText = document.getElementById("btnText").getValue();
            hero.setAttribute("call-to-action", `{ "text": "${btnText}" }`);

            let tagText = document.getElementById("inputTagText")?.getValue?.();
            let tagIcon = document.getElementById("inputTagIcon")?.getValue?.();
            if (tagIcon && tagText) {
                hero.setAttribute("hero-tag", `{"icon": "${tagIcon}", "text": "${tagText}"}`);
            }


        } else { this.firstRun = false; }

        const container = document.getElementById("codeView")
        await hero.updateComplete;
        container.innerHTML = guideApp.highlightAuto(hero.outerHTML);
    }
}

class SirioCarouselDemo {
    async init() {
        const editor = document.querySelector('#editor');
        const resultHtmlComponent = document.querySelector('#resultHtmlComponent');

        const initialTemplate = `
        <sirio-carousel splide="1" id="carousel-object-html">
            <sirio-card id="sirioCard#1">
                <sirio-card-header tag="Categoria" date="13 Nov 2021" src="../../assets/img/example-1.jpg" 
                    image-position="left"></sirio-card-header>
                <sirio-card-body 
                    title='<h4><a href="#">Titolo lorem ipsum dolor consectetur adipisci eli</a></h4>'
                    subtitle="Lorem ipsum dolor sit amet consectetur adipisci eli"
                    signature="Firma autore">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisci elit, 
                        sed do eiusmod tempor incidunt ut labore et dolore magna aliqua
                    </p>
                </sirio-card-body>
                <sirio-card-footer>
                    <sirio-card-action type="link" url="#" icon="fas fa-share-alt"></sirio-card-action>
                    <sirio-card-action type="link" url="#" icon="fas fa-heart"></sirio-card-action>
                </sirio-card-footer>
            </sirio-card>
            <sirio-card id="sirioCard#2">
                <sirio-card-header tag="Categoria" date="13 Nov 2021" src="../../assets/img/example-2.jpg" 
                    image-position="left"></sirio-card-header>
                <sirio-card-body 
                    title='<h4><a href="#">Titolo lorem ipsum dolor consectetur adipisci eli</a></h4>'
                    subtitle="Lorem ipsum dolor sit amet consectetur adipisci eli"
                    signature="Firma autore">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisci elit, 
                        sed do eiusmod tempor incidunt ut labore et dolore magna aliqua
                    </p>
                </sirio-card-body>
                <sirio-card-footer>
                    <sirio-card-action type="link" url="#" icon="fas fa-share-alt"></sirio-card-action>
                    <sirio-card-action type="link" url="#" icon="fas fa-heart"></sirio-card-action>
                </sirio-card-footer>
            </sirio-card>
            <sirio-card id="sirioCard#3">
                <sirio-card-header tag="Categoria" date="13 Nov 2021" src="../../assets/img/example-3.jpg" 
                    image-position="left"></sirio-card-header>
                <sirio-card-body 
                    title='<h4><a href="#">Titolo lorem ipsum dolor consectetur adipisci eli</a></h4>'
                    subtitle="Lorem ipsum dolor sit amet consectetur adipisci eli"
                    signature="Firma autore">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisci elit, 
                        sed do eiusmod tempor incidunt ut labore et dolore magna aliqua
                    </p>
                </sirio-card-body>
                <sirio-card-footer>
                    <sirio-card-action type="link" url="#" icon="fas fa-share-alt"></sirio-card-action>
                    <sirio-card-action type="link" url="#" icon="fas fa-heart"></sirio-card-action>
                </sirio-card-footer>
            </sirio-card>
        </sirio-carousel>`

        editor.value = initialTemplate;
        resultHtmlComponent.innerHTML = initialTemplate;

        guideApp.addBlurListener(editor, resultHtmlComponent, "carousel-object-html");

        document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("carousel-object-html")?.outerHTML);
    }
}



class SirioInfoDemo {
    async init(run) {
        const itemControl = document.querySelector('#item-control');
        const editor = document.querySelector('#editor');
        const switchBtn = document.querySelector('#switch-mode-button');
        const divProp = document.querySelector('#viewProp');
        const viewHtml = document.querySelector('#viewHtml');
        const resultProp = document.querySelector('#resultPropComponent');
        const resultHtmlComponent = document.querySelector('#resultHtmlComponent');
        const actionButton = document.querySelector('#btnAction');
        this.firstRun = run ?? true;

        const initialTemplate = `<sirio-info id="info-example-html" title="Titolo attenzione" call-to-action='{ "text": "Testo link" }'>
            <p>
                Ac iaculis posuere turpis diam mi non viverra tempus eget.
                Nunc volutpat nunc erat risus eleifend convallis viverra bibendum.
                Mattis ante mauris sit montes.
                <a href="#">ipsam lectus nec?</a> Explicabo consequuntur incididunt ipsam.
            </p>
        </sirio-info>`

        editor.value = initialTemplate;
        resultHtmlComponent.innerHTML = initialTemplate;

        guideApp.addBlurListener(editor, resultHtmlComponent, "info-example-html");

        viewHtml.style.display = 'none';
        resultHtmlComponent.style.display = 'none';

        switchBtn.addEventListener('click', (e) => {
            const val = e.currentTarget.text;
            e.currentTarget.text = val === 'HTML' ? 'Standard' : 'HTML';
            divProp.style.display = val === 'Standard' ? '' : 'none';
            viewHtml.style.display = val === 'HTML' ? '' : 'none';
            resultPropComponent.style.display = val === 'Standard' ? '' : 'none';
            resultHtmlComponent.style.display = val === 'HTML' ? '' : 'none';

            if (val === 'HTML') {
                actionButton.setAttribute("disabled", "disabled");
                editor.value = initialTemplate;
                resultHtmlComponent.innerHTML = initialTemplate;

                document.getElementById("info-example-html")?.updateComplete?.then(() => {
                    try {
                        document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("info-example-html")?.outerHTML);
                        return;
                    } catch (e) {
                        return;
                    }
                });
            }
            actionButton.removeAttribute("disabled");
            document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("info-example-prop")?.outerHTML);

        });

        await this.apply();
    }

    async apply() {
        var info = document.getElementById("info-example-prop");
        if(!this.firstRun) {
            var title = document.getElementById("title").getValue();
            info.setAttribute("title", title);

            var btnText = document.getElementById("btnText").getValue();
            info.setAttribute("call-to-action", `{ "text": "${btnText}" }`);

            var mode = document.getElementById("inputMode").getSelectedValues();
            if (mode) {
                info.setAttribute("dark", "");
            } else {
                info.removeAttribute("dark");
            }

            var disabled = document.getElementById("disabled").getSelectedValues();
            if (disabled) {
                info.setAttribute("disabled", "");
            } else {
                info.removeAttribute("disabled");
            }
        } else { this.firstRun = false; }

        const container = document.getElementById("codeView")
        await info.updateComplete;
        container.innerHTML = guideApp.highlightAuto(info.outerHTML);
    }
}

class SirioNotifyDemo {
    async init(run) {
        const itemControl = document.querySelector('#item-control');
        const editor = document.querySelector('#editor');
        const switchBtn = document.querySelector('#switch-mode-button');
        const divProp = document.querySelector('#viewProp');
        const viewHtml = document.querySelector('#viewHtml');
        const resultProp = document.querySelector('#resultPropComponent');
        const resultHtmlComponent = document.querySelector('#resultHtmlComponent');
        const actionButton = document.querySelector('#btnAction');
        this.firstRun = run ?? true;

        const initialTemplate = `<sirio-notify id="notify-example-html" title="Titolo attenzione" type="success" call-to-action='{ "text": "Testo link" }'>
            <p>
                Ac iaculis posuere turpis diam mi non viverra tempus eget.
                Nunc volutpat nunc erat risus eleifend convallis viverra bibendum.
                Mattis ante mauris sit montes.
                <a href="#">ipsam lectus nec?</a> Explicabo consequuntur incididunt ipsam.
            </p>
        </sirio-notify>`

        editor.value = initialTemplate;
        resultHtmlComponent.innerHTML = initialTemplate;

        guideApp.addBlurListener(editor, resultHtmlComponent, "notify-example-html");

        viewHtml.style.display = 'none';
        resultHtmlComponent.style.display = 'none';

        switchBtn.addEventListener('click', (e) => {
            const val = e.currentTarget.text;
            e.currentTarget.text = val === 'HTML' ? 'Standard' : 'HTML';
            divProp.style.display = val === 'Standard' ? '' : 'none';
            viewHtml.style.display = val === 'HTML' ? '' : 'none';
            resultPropComponent.style.display = val === 'Standard' ? '' : 'none';
            resultHtmlComponent.style.display = val === 'HTML' ? '' : 'none';

            if (val === 'HTML') {
                actionButton.setAttribute("disabled", "disabled");
                editor.value = initialTemplate;
                resultHtmlComponent.innerHTML = initialTemplate;

                document.getElementById("notify-example-html")?.updateComplete?.then(() => {
                    try {
                        document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("notify-example-html")?.outerHTML);
                        return;
                    } catch (e) {
                        return;
                    }
                });
            }
            actionButton.removeAttribute("disabled");
            document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("notify-example-prop")?.outerHTML);

        });

        await this.apply();
    }

    async apply() {
        var info = document.getElementById("notify-example-prop");
        if(!this.firstRun) {
            var title = document.getElementById("title").getValue();
            info.setAttribute("title", title);

            var btnText = document.getElementById("btnText").getValue();
            info.setAttribute("call-to-action", `{ "text": "${btnText}" }`);

            var type = document.getElementById("inputMode").getSelectedValues();
            console.log("type", type);
            if (type ) {
                info.setAttribute("type", type);
            } else {
                info.setAttribute("type", "success");
            }

            var disabled = document.getElementById("disabled").getSelectedValues();
            if (disabled) {
                info.setAttribute("disabled", "");
            } else {
                info.removeAttribute("disabled");
            }
        } else { this.firstRun = false; }

        const container = document.getElementById("codeView")
        await info.updateComplete;
        container.innerHTML = guideApp.highlightAuto(info.outerHTML);
    }
}


class SirioInputDemo {
    async init(run) {
        const itemControl = document.querySelector('#item-control');
        const editor = document.querySelector('#editor');
        const switchBtn = document.querySelector('#switch-mode-button');
        const divProp = document.querySelector('#viewProp');
        const viewHtml = document.querySelector('#viewHtml');
        const resultProp = document.querySelector('#resultPropComponent');
        const resultHtmlComponent = document.querySelector('#resultHtmlComponent');
        const actionButton = document.querySelector('#btnAction');
        const maxLenght = document.querySelector('#maxInput')
        this.firstRun = run ?? true;

        const initialTemplate =
            `<sirio-input prevent-default
            id="first-field" 
            aria-label="campo di test"
            type="autocomplete" 
            placeholder="Questo è un componente <sirio-input>"
            texthelp="Modifica il codice nell'editor e visualizza i cambiamenti"
            label="Campo di test" 
            item='["Opzione 1", "Opzione 2", "Opzione 3"]'
        ></sirio-input>`

        editor.value = initialTemplate;
        resultHtmlComponent.innerHTML = initialTemplate;

        guideApp.addBlurListener(editor, resultHtmlComponent, "first-field");

        viewHtml.style.display = 'none';
        resultHtmlComponent.style.display = 'none';

        switchBtn.addEventListener('click', (e) => {
            const val = e.currentTarget.text;
            e.currentTarget.text = val === 'HTML' ? 'Standard' : 'HTML';
            divProp.style.display = val === 'Standard' ? '' : 'none';
            viewHtml.style.display = val === 'HTML' ? '' : 'none';
            resultPropComponent.style.display = val === 'Standard' ? '' : 'none';
            resultHtmlComponent.style.display = val === 'HTML' ? '' : 'none';
            if(val === 'HTML') {
                actionButton.setAttribute("disabled", "disabled");
                editor.value = initialTemplate;
                resultHtmlComponent.innerHTML = initialTemplate;

                document.getElementById("first-field")?.updateComplete?.then(() => {
                    try {
                        document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("first-field")?.outerHTML);
                        return;
                    } catch (e) {
                        return;
                    }
                });
            }
            document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("input1")?.outerHTML);
            actionButton.removeAttribute("disabled");

        });

        await this.apply();
    }

    async apply() {
        var obj = document.getElementById("input1");
        if(!this.firstRun) {
            var inputType = document.getElementById("inputType").getSelectedValues()[0];
            obj.setAttribute("type", inputType);

            var labelInput = document.getElementById("labelInput").getValue();
            obj.setAttribute("label", labelInput);

            var placeholderInput = document.getElementById("placeholderInput").getValue();
            obj.setAttribute("placeholder", placeholderInput);

            var helpInput = document.getElementById("helpInput").getValue();
            obj.setAttribute("texthelp", helpInput);

            var maxInput = document.getElementById("maxInput").getValue();
            if (maxInput) {
                obj.setAttribute("maxlength", maxInput);
            }

            var valueInput = document.getElementById("valueInput").getValue();
            if (valueInput) {
                obj.setAttribute("value", valueInput);
            }

            var rowInput = document.getElementById("rowInput").getValue();
            obj.setAttribute("rows", rowInput);

            var inputEvent = document.getElementById("inputEvent").getSelectedValues();
            obj.setAttribute("event-enabled", !inputEvent);

            var inputDebug = document.getElementById("inputDebug").getSelectedValues();
            obj.setAttribute("debug", !inputDebug);

            var inputDisabled = document.getElementById("inputDisable").getSelectedValues();
            if (inputDisabled) {
                obj.setAttribute("disabled", "");
            } else {
                obj.removeAttribute("disabled");
            }
        } else { this.firstRun = false; }

        const container = document.getElementById("codeView")
        await obj.updateComplete;
        container.innerHTML = guideApp.highlightAuto(obj.outerHTML);
    }
}

class SirioPanelExpandDemo {
    constructor() {
        this.panelEl      = document.getElementById('myPanel');
        this.titleBarEl   = document.getElementById('dummyTitleBar');
        this.expandBtnEl  = document.getElementById('myExpandBtn');
        this.outputEl     = document.getElementById('codeOutput');
        this.bpSelectEl   = document.getElementById('dataBreakpoint');
        this.codePanel    = document.getElementById('code-panel');
        this.switchBtn    = document.getElementById('switch-mode-button');
        this.codeVisible  = false;
    }

    init() {
        // Setup the “HTML / Nascondi” toggle
        this.switchBtn.addEventListener('click', () => {
            this.codeVisible = !this.codeVisible;
            this.codePanel.style.display = this.codeVisible ? 'block' : 'none';
            this.switchBtn.text = this.codeVisible ? 'Nascondi' : 'HTML';
            document.querySelector('.view-source')?.click();
        });

        // Show initial code
        this.updateCode();
    }

    applyProperties() {
        const labelExpandVal   = document.getElementById('labelExpand').value;
        const labelCollapseVal = document.getElementById('labelCollapse').value;
        const accessVal        = document.getElementById('accessLabel').value;

        // If your dataBreakpoint is also a sirio-select,
        // you might do .getSelectedValues() or .value, etc.
        const bpVal = this.bpSelectEl.value || '';

        // Assegna le property
        this.expandBtnEl.labelExpand     = labelExpandVal || '';
        this.expandBtnEl.labelCollapse   = labelCollapseVal || '';
        this.expandBtnEl.accessLabel     = accessVal || '';
        this.expandBtnEl.dataBreakpoint  = bpVal;

        // Refresh code
        this.updateCode();
    }

    updateCode() {
        let codeStr = `
<sirio-panel-expandable id="myPanel">
  <sirio-title-bar id="dummyTitleBar">
  <!-- sirio-tool per filtri -->
    <sirio-panel-expand-btn
      id="myExpandBtn"
      label-expand="${this.expandBtnEl.labelExpand || ''}"
      label-collapse="${this.expandBtnEl.labelCollapse || ''}"
      access-label="${this.expandBtnEl.accessLabel || ''}"
      data-breakpoint="${this.expandBtnEl.dataBreakpoint || ''}"
    ></sirio-panel-expand-btn>
  </sirio-title-bar>
  
  <!-- sirio-filter -->
  <!-- sirio-grid -->
  <!-- sirio-pager -->
  
</sirio-panel-expandable>
      `.trim();

        this.outputEl.textContent = codeStr;
    }
}

class SirioPagerDemo {
    async init(run) {
        const itemControl = document.querySelector('#item-control');
        const editor1 = document.querySelector('#editor-1');
        const editor2 = document.querySelector('#editor-2');
        const switchBtn = document.querySelector('#switch-mode-button');
        const divProp = document.querySelector('#viewProp');
        const viewHtml = document.querySelector('#viewHtml');
        const resultProp = document.querySelector('#resultPropComponent');
        const resultHtmlComponent1 = document.querySelector('#resultHtmlComponent-1');
        const resultHtmlComponent2 = document.querySelector('#resultHtmlComponent-2');
        const actionButton = document.querySelector('#btnAction');
        this.firstRun = run ?? true;

        const initialTemplate1 = `<sirio-pager sirio-runtime="angular-dev" id="pager-object-html-1" total-items="100" has-select
            items-per-page-options='[{"text": 10, "value": 10}, {"text": 20, "value": 20},
            {"text": 30, "value": 30}]'>
            <sirio-pager-nav type="left"></sirio-pager-nav>
            <sirio-pager-nav type="right"></sirio-pager-nav>
        </sirio-pager>`

        const initialTemplate2 = `<sirio-pager sirio-runtime="angular-dev" id="pager-object-html-2" total-items="60" items-per-page="10">
            <sirio-pager-list delimiter-index="5" smart prevent-default>
            </sirio-pager-list>
        </sirio-pager>`

        editor1.value = initialTemplate1;
        resultHtmlComponent1.innerHTML = initialTemplate1;

        editor2.value = initialTemplate2;
        resultHtmlComponent2.innerHTML = initialTemplate2;

        guideApp.addBlurListener(editor1, resultHtmlComponent1, "pager-object-html-1");

        guideApp.addBlurListener(editor2, resultHtmlComponent2, "pager-object-html-2");

        viewHtml.style.display = 'none';
        resultHtmlComponent1.style.display = 'none';
        resultHtmlComponent2.style.display = 'none';

        switchBtn.addEventListener('click', (e) => {
            const val = e.currentTarget.text;
            e.currentTarget.text = val === 'HTML' ? 'Standard' : 'HTML';
            divProp.style.display = val === 'Standard' ? '' : 'none';
            viewHtml.style.display = val === 'HTML' ? '' : 'none';
            resultPropComponent.style.display = val === 'Standard' ? '' : 'none';
            resultHtmlComponent1.style.display = val === 'HTML' ? '' : 'none';
            resultHtmlComponent2.style.display = val === 'HTML' ? '' : 'none';

            if (val === 'HTML') {
                actionButton.setAttribute("disabled", "disabled");
                editor1.value = initialTemplate1;
                resultHtmlComponent1.innerHTML = initialTemplate1;

                document.getElementById("pager-object-html-1")?.updateComplete?.then(() => {
                    try {
                        document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("pager-object-html-1")?.outerHTML);
                    } catch (e) {
                    }
                });

                editor2.value = initialTemplate2;
                resultHtmlComponent2.innerHTML = initialTemplate2;

                document.getElementById("pager-object-html-2")?.updateComplete?.then(() => {
                    try {
                        document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("pager-object-html-2")?.outerHTML);
                        return;
                    } catch (e) {
                        return;
                    }
                });
            }
            actionButton.removeAttribute("disabled");
            document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("pager-object-prop")?.outerHTML);
            document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("pager-object-prop-navigator")?.outerHTML);
        });

        await this.apply();
    }

    async apply() {
        // Paginazione con alto numero di pagine
        var pager1 = document.getElementById("pager-object-prop");

        // Cursosi di navigazione
        var pager2 = document.getElementById("pager-object-prop-navigator");
        if(!this.firstRun) {
            // Paginazione con alto numero di pagine
            var items = document.getElementById("itemsInput").getValue();
            pager1.setAttribute("items-per-page-options", items);

            var jumper = document.getElementById("inputJumper").getSelectedValues();
            if (jumper) {
                pager1.setAttribute("has-jumper", "");
            } else {
                pager1.removeAttribute("has-jumper");
            }

            var totalItems1 = document.getElementById("totalItems1").getValue();
            pager1.setAttribute("total-items", totalItems1);

            // Cursosi di navigazione
            var totalItems2 = document.getElementById("totalItems2").getValue();
            pager2.setAttribute("total-items", totalItems2);

            var itemsPerPage = document.getElementById("itemsPerPage").getValue();
            pager2.setAttribute("items-per-page", itemsPerPage);

            var pagerList = document.querySelector("#pager-object-prop-navigator sirio-pager-list");
            var delimiter = document.getElementById("delimiter").getValue();
            pagerList.setAttribute("delimiter-index", delimiter - 1);
        } else { this.firstRun = false; }

        const container = document.getElementById("codeView")
        await pager1.updateComplete;
        await pager2.updateComplete;
        container.innerHTML = guideApp.highlightAuto(pager1.outerHTML);
        container.innerHTML = guideApp.highlightAuto(pager2.outerHTML);
    }
}

class SirioProgressbarDemo {
    async init(run) {
        const itemControl = document.querySelector('#item-control');
        const editor = document.querySelector('#editor');
        const switchBtn = document.querySelector('#switch-mode-button');
        const divProp = document.querySelector('#viewProp');
        const viewHtml = document.querySelector('#viewHtml');
        const resultProp = document.querySelector('#resultPropComponent');
        const resultHtmlComponent = document.querySelector('#resultHtmlComponent');
        const actionButton = document.querySelector('#btnAction');
        this.firstRun = run ?? true;

        const initialTemplate = `<sirio-progress-bar id="progressbar-example-html-1" label="Progress label" value="20"></sirio-progress-bar>`

        editor.value = initialTemplate;
        resultHtmlComponent.innerHTML = initialTemplate;

        guideApp.addBlurListener(editor, resultHtmlComponent, "progressbar-example-html-1");

        viewHtml.style.display = 'none';
        resultHtmlComponent.style.display = 'none';

        switchBtn.addEventListener('click', (e) => {
            const val = e.currentTarget.text;
            e.currentTarget.text = val === 'HTML' ? 'Standard' : 'HTML';
            divProp.style.display = val === 'Standard' ? '' : 'none';
            viewHtml.style.display = val === 'HTML' ? '' : 'none';
            resultPropComponent.style.display = val === 'Standard' ? '' : 'none';
            resultHtmlComponent.style.display = val === 'HTML' ? '' : 'none';

            if (val === 'HTML') {
                actionButton.setAttribute("disabled", "disabled");
                editor.value = initialTemplate;
                resultHtmlComponent.innerHTML = initialTemplate;

                document.getElementById("progressbar-example-html-1")?.updateComplete?.then(() => {
                    try {
                        document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("progressbar-example-html-1")?.outerHTML);
                        return;
                    } catch (e) {
                        return;
                    }
                });
            }
            actionButton.removeAttribute("disabled");
            document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("progressbar-example-prop-1")?.outerHTML);
        });

        await this.apply();
    }

    async apply() {
        var pgbar = document.getElementById("progressbar-example-prop-1");
        if(!this.firstRun) {
            var label = document.getElementById("label").getValue();
            pgbar.setAttribute("label", label);

            var perc = document.getElementById("perc").getValue();
            pgbar.setAttribute("value", perc);
        } else { this.firstRun = false; }

        const container = document.getElementById("codeView")
        await pgbar.updateComplete;
        container.innerHTML = guideApp.highlightAuto(pgbar.outerHTML);
    }
}

class SirioSearchbarDemo {
    async init(run) {
        const itemControl = document.querySelector('#item-control');
        const editor = document.querySelector('#editor');
        const switchBtn = document.querySelector('#switch-mode-button');
        const divProp = document.querySelector('#viewProp');
        const viewHtml = document.querySelector('#viewHtml');
        const resultProp = document.querySelector('#resultPropComponent');
        const resultHtmlComponent = document.querySelector('#resultHtmlComponent');
        const actionButton = document.querySelector('#btnAction');
        const itemsHtml = document.querySelector('#itemsHtml');
        this.firstRun = run ?? true;

        const initialTemplate = `<sirio-searchbar id="searchbar-object-html"
        label='Campo testo autocomplete (es.: "rel")'
        placeholder="Questo è un campo sirio-searchbar" btn-text="Ricerca" btn-icon="fas fa-search" item='["relazionale","relazione","relazioni","relazioni industriali","relegare","relegazioni","religione","religioni","religiosa"]'>
        </sirio-searchbar>`

        editor.value = initialTemplate;
        resultHtmlComponent.innerHTML = initialTemplate;

        guideApp.addBlurListener(editor, resultHtmlComponent, "searchbar-object-html");

        viewHtml.style.display = 'none';
        resultHtmlComponent.style.display = 'none';

        switchBtn.addEventListener('click', (e) => {
            const val = e.currentTarget.text;
            e.currentTarget.text = val === 'HTML' ? 'Standard' : 'HTML';
            divProp.style.display = val === 'Standard' ? '' : 'none';
            viewHtml.style.display = val === 'HTML' ? '' : 'none';
            resultPropComponent.style.display = val === 'Standard' ? '' : 'none';
            resultHtmlComponent.style.display = val === 'HTML' ? '' : 'none';

            if (val === 'HTML') {
                actionButton.setAttribute("disabled", "disabled");
                editor.value = initialTemplate;
                resultHtmlComponent.innerHTML = initialTemplate;

                document.getElementById("searchbar-object-html")?.updateComplete?.then(() => {
                    try {
                        document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("searchbar-object-html")?.outerHTML);
                        return;
                    } catch (e) {
                        return;
                    }
                });
            }
            actionButton.removeAttribute("disabled");
            document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("searchbar-object-prop")?.outerHTML);
        });

        await this.apply();
    }

    async apply() {
        var searchbar = document.getElementById("searchbar-object-prop");
        if(!this.firstRun) {
            var label = document.getElementById("label").getValue();
            searchbar.setAttribute("label", label);

            var placeholder = document.getElementById("placeholder").getValue();
            searchbar.setAttribute("placeholder", placeholder);

            var btnText = document.getElementById("btn-text").getValue();
            searchbar.setAttribute("btn-text", btnText);

            var btnIcon = document.getElementById("btn-icon").getValue();
            searchbar.setAttribute("btn-icon", btnIcon);

            var disabled = document.getElementById("disabled").getSelectedValues();
            if (disabled) {
                searchbar.setAttribute("disabled", "");
            } else {
                searchbar.removeAttribute("disabled");
            }

            var items = document.getElementById("items");
            try {
                searchbar.setOptionElements(JSON.parse(items.getValue()));
            } catch (error) {
                return;
            }
        } else { this.firstRun = false; }

        const container = document.getElementById("codeView")
        await searchbar.updateComplete;
        container.innerHTML = guideApp.highlightAuto(searchbar.outerHTML);
    }
}

class SirioSelectDemo {
    async init(run) {
        const itemControl = document.querySelector('#item-control');
        const editor1 = document.querySelector('#editor-1');
        const editor2 = document.querySelector('#editor-2');
        const editor3 = document.querySelector('#editor-3');
        const editor4 = document.querySelector('#editor-4');
        const switchBtn = document.querySelector('#switch-mode-button');
        const divProp = document.querySelector('#viewProp');
        const viewHtml = document.querySelector('#viewHtml');
        const resultProp = document.querySelector('#resultPropComponent');
        const resultHtmlComponent1 = document.querySelector('#resultHtmlComponent-1');
        const resultHtmlComponent2 = document.querySelector('#resultHtmlComponent-2');
        const resultHtmlComponent3 = document.querySelector('#resultHtmlComponent-3');
        const resultHtmlComponent4 = document.querySelector('#resultHtmlComponent-4');
        const actionButton = document.querySelector('#btnAction');
        this.firstRun = run ?? true;

        const initialTemplate1 = `<sirio-select type="dropdown-select" label="Dropdown Select Singola" 
                            id="dropdown-select-html" name="dropdown-select-html" items='
        [
            {"text": "Seleziona un valore", "value": "0"},
            {"text": "Opzione 1", "value": "1"},
            {"text": "Opzione 2", "value": "2"},
            {"text": "Opzione 3", "value": "3"},
            {"text": "Opzione 4", "value": "4"},
            {"text": "Opzione 5", "value": "5"},
            {"text": "Opzione 6", "value": "6"}
        ]'></sirio-select>`

        const initialTemplate2 = `<sirio-select type="dropdown-select" label="Dropdown Select Multipla" 
                                id="dropdown-select-multiple-html" name="dropdown-select-multiple-html" title="Seleziona uno o più elementi" items='
        [
            {"text": "Opzione 1", "value": "1"},
            {"text": "Opzione 2", "value": "2"},
            {"text": "Opzione 3", "value": "3"},
            {"text": "Opzione 4", "value": "4"},
            {"text": "Opzione 5", "value": "5"},
            {"text": "Opzione 6", "value": "6"}
        ]' multiple></sirio-select>`

        const initialTemplate3 = `<sirio-select id="checkboxRadio-html" label="Checkbox" type="checkbox"
                items='[
            {"id": "input-checkbox-vert-1", "name":"input-checkbox-vert-1", 
            "value": "1", "label": "Opzione 1"},
            {"id": "input-checkbox-vert-2", "name":"input-checkbox-vert-2", 
            "value": "2", "label": "Opzione 2"},
            {"id": "input-checkbox-vert-3", "name":"input-checkbox-vert-3", 
            "value": "3", "label": "Opzione 3"}
        ]'></sirio-select>`

        const initialTemplate4 = `<sirio-select id="toggleSelect-html" name="toggleSelect-html" label="Toggle" 
            type="toggle" value="1"></sirio-select>`


        editor1.value = initialTemplate1;
        resultHtmlComponent1.innerHTML = initialTemplate1;

        editor2.value = initialTemplate2;
        resultHtmlComponent2.innerHTML = initialTemplate2;

        editor3.value = initialTemplate3;
        resultHtmlComponent3.innerHTML = initialTemplate3;

        editor4.value = initialTemplate4;
        resultHtmlComponent4.innerHTML = initialTemplate4;

        guideApp.addBlurListener(editor1, resultHtmlComponent1, "dropdown-select-html");

        guideApp.addBlurListener(editor2, resultHtmlComponent2, "dropdown-select-multiple-html");

        guideApp.addBlurListener(editor3, resultHtmlComponent3, "checkboxRadio-html");

        guideApp.addBlurListener(editor4, resultHtmlComponent4, "toggleSelect-html");

        viewHtml.style.display = 'none';
        resultHtmlComponent1.style.display = 'none';
        resultHtmlComponent2.style.display = 'none';
        resultHtmlComponent3.style.display = 'none';
        resultHtmlComponent4.style.display = 'none';

        switchBtn.addEventListener('click', (e) => {
            const val = e.currentTarget.text;
            e.currentTarget.text = val === 'HTML' ? 'Standard' : 'HTML';
            divProp.style.display = val === 'Standard' ? '' : 'none';
            viewHtml.style.display = val === 'HTML' ? '' : 'none';
            resultPropComponent.style.display = val === 'Standard' ? '' : 'none';
            resultHtmlComponent1.style.display = val === 'HTML' ? '' : 'none';
            resultHtmlComponent2.style.display = val === 'HTML' ? '' : 'none';
            resultHtmlComponent3.style.display = val === 'HTML' ? '' : 'none';
            resultHtmlComponent4.style.display = val === 'HTML' ? '' : 'none';

            if (val === 'HTML') {
                actionButton.setAttribute("disabled", "disabled");
                editor1.value = initialTemplate1;
                resultHtmlComponent1.innerHTML = initialTemplate1;
                document.getElementById("dropdown-select-html")?.updateComplete?.then(() => {
                    try {
                        document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("dropdown-select-html")?.outerHTML);
                     } catch (e) {
                    }
                });

                editor2.value = initialTemplate2;
                resultHtmlComponent2.innerHTML = initialTemplate2;
                document.getElementById("dropdown-select-multiple-html")?.updateComplete?.then(() => {
                    try {
                        document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("dropdown-select-multiple-html")?.outerHTML);
                    } catch (e) {
                    }
                });

                editor3.value = initialTemplate3;
                resultHtmlComponent3.innerHTML = initialTemplate3;
                document.getElementById("checkboxRadio-html")?.updateComplete?.then(() => {
                    try {
                        document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("checkboxRadio-html")?.outerHTML);
                    } catch (e) {
                    }
                });

                editor4.value = initialTemplate4;
                resultHtmlComponent4.innerHTML = initialTemplate4;
                document.getElementById("toggleSelect-html")?.updateComplete?.then(() => {
                    try {
                        document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("toggleSelect-html")?.outerHTML);
                        return;
                    } catch (e) {
                        return;
                    }
                });
            }
            actionButton.removeAttribute("disabled");
            document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("dropdown-select-prop")?.outerHTML);
            document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("dropdown-select-multiple-prop")?.outerHTML);
            document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("checkboxRadio-prop")?.outerHTML);
            document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("toggleSelect-prop")?.outerHTML);
        });

        await this.apply();
    }

    async apply() {
        // dropdown select singola
        var dropdownSelect = document.getElementById("dropdown-select-prop");

        // dropdown select multipla
        var dropdownSelectMultiple = document.getElementById("dropdown-select-multiple-prop")

        // checkbox - radio
        var checkboxRadio = document.getElementById("checkboxRadio-prop");

        // toggle
        var toggleSelect = document.getElementById("toggleSelect-prop");
        if(!this.firstRun) {
            // dropdown select singola
            var itemsDropdown = document.getElementById("itemsDropdown");
            try {
                dropdownSelect.setOptionElements(JSON.parse(itemsDropdown.getValue()));
            } catch (error) { }

            var labelDropdown = document.getElementById("labelDropdown").getValue();
            dropdownSelect.setAttribute("label", labelDropdown);

            // dropdown select multipla
            var itemsDropdownMultiple = document.getElementById("itemsDropdownMultiple");
            try {
                dropdownSelectMultiple.setOptionElements(JSON.parse(itemsDropdownMultiple.getValue()));
            } catch (error) { }

            var labelDropdownMUltiple = document.getElementById("labelDropdownMUltiple").getValue();
            dropdownSelectMultiple.setAttribute("label", labelDropdownMUltiple);

            var titleDropdownMultiple = document.getElementById("titleDropdownMultiple").getValue();
            dropdownSelectMultiple.setAttribute("title", titleDropdownMultiple);

            // checkbox - radio
            var type = document.getElementById("type").getSelectedValues()[0];
            checkboxRadio.setAttribute("type", type);

            var itemsChechboxRadio = document.getElementById("itemsChechboxRadio").getValue();
            checkboxRadio.setAttribute("items", itemsChechboxRadio);

            var labelChechboxRadio = document.getElementById("labelChechboxRadio").getValue();
            checkboxRadio.setAttribute("label", labelChechboxRadio);

            // toggle
            var labelToggle = document.getElementById("labelToggle").getValue();
            toggleSelect.setAttribute("label", labelToggle);

            var checked = document.getElementById("checked").getSelectedValues();
            if (checked) {
                toggleSelect.setAttribute("checked", "");
            } else {
                toggleSelect.removeAttribute("checked");
            }

            var dx = document.getElementById("dx").getSelectedValues();
            if (dx) {
                toggleSelect.setAttribute("dx", "");
            } else {
                toggleSelect.removeAttribute("dx");
            }
        } else { this.firstRun = false; }

        const container = document.getElementById("codeView")
        await dropdownSelect.updateComplete;
        container.innerHTML = guideApp.highlightAuto(dropdownSelect.outerHTML);

        await dropdownSelectMultiple.updateComplete;
        container.innerHTML = guideApp.highlightAuto(dropdownSelectMultiple.outerHTML);

        await checkboxRadio.updateComplete;
        container.innerHTML = guideApp.highlightAuto(checkboxRadio.outerHTML);

        await toggleSelect.updateComplete;
        container.innerHTML = guideApp.highlightAuto(toggleSelect.outerHTML);
    }
}

class SirioSidenavDemo {
    async init(run) {
        const itemControl = document.querySelector('#item-control');
        const editor = document.querySelector('#editor');
        const switchBtn = document.querySelector('#switch-mode-button');
        const divProp = document.querySelector('#viewProp');
        const viewHtml = document.querySelector('#viewHtml');
        const resultProp = document.querySelector('#resultPropComponent');
        const resultHtmlComponent = document.querySelector('#resultHtmlComponent');
        const actionButton = document.querySelector('#btnAction');
        this.firstRun = run ?? true;

        const initialTemplate = `<sirio-sidenav id="sidenav-object-html" title="Web Component nome sezione" 
        items='[
            { "content": "Label 1" },
            { "content": "Label 2" },
            { "content": "Label 3", "childItems": 
                [
                { "content": "Child 1", "childItems": 
                [
                    { "content": "Grandchild 1", "active": true  },
                    { "content": "Grandchild 2" },
                    { "content": "Grandchild 3" }]},
                    { "content": "Child 2" }] 
                },
            { "content": "Label 4", "childItems": 
                [
                { "content": "Child 1" },
                { "content": "Child 2" },
                { "content": "Child 3" }]},
            { "content": "Label 5" }]'></sirio-sidenav>`

        editor.value = initialTemplate;
        resultHtmlComponent.innerHTML = initialTemplate;

        guideApp.addBlurListener(editor, resultHtmlComponent, "sidenav-object-html");

        viewHtml.style.display = 'none';
        resultHtmlComponent.style.display = 'none';

        switchBtn.addEventListener('click', (e) => {
            const val = e.currentTarget.text;
            e.currentTarget.text = val === 'HTML' ? 'Standard' : 'HTML';
            divProp.style.display = val === 'Standard' ? '' : 'none';
            viewHtml.style.display = val === 'HTML' ? '' : 'none';
            resultPropComponent.style.display = val === 'Standard' ? '' : 'none';
            resultHtmlComponent.style.display = val === 'HTML' ? '' : 'none';

            if (val === 'HTML') {
                actionButton.setAttribute("disabled", "disabled");
                editor.value = initialTemplate;
                resultHtmlComponent.innerHTML = initialTemplate;

                document.getElementById("sidenav-object-html")?.updateComplete?.then(() => {
                    try {
                        document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("sidenav-object-html")?.outerHTML);
                        return;
                    } catch (e) {
                        return;
                    }
                });
            }
            document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("sidenav-object-prop")?.outerHTML);

            actionButton.removeAttribute("disabled");
        });

        await this.apply();
    }

    async apply() {
        var sidenav = document.getElementById("sidenav-object-prop");
        if(!this.firstRun) {
            var items = document.getElementById("itemsInput").getValue();
            sidenav.setAttribute("items", items);

            var title = document.getElementById("title").getValue();
            sidenav.setAttribute("title", title);
        } else { this.firstRun = false; }

        const container = document.getElementById("codeView")
        await sidenav.updateComplete;
        container.innerHTML = guideApp.highlightAuto(sidenav.outerHTML);
    }
}

class SirioSliderDemo {
    async init(run) {
        const itemControl = document.querySelector('#item-control');
        const editor = document.querySelector('#editor');
        const switchBtn = document.querySelector('#switch-mode-button');
        const divProp = document.querySelector('#viewProp');
        const viewHtml = document.querySelector('#viewHtml');
        const resultProp = document.querySelector('#resultPropComponent');
        const resultHtmlComponent = document.querySelector('#resultHtmlComponent');
        const actionButton = document.querySelector('#btnAction');
        this.firstRun = run ?? true;

        const initialTemplate = `<sirio-slider id="slider-demo-html" value="40" min="0" max="100" label="Slider label" description="* Lorem ipsum dolor sit amet, consectetur adipisci elit."></sirio-slider>`

        editor.value = initialTemplate;
        resultHtmlComponent.innerHTML = initialTemplate;

        guideApp.addBlurListener(editor, resultHtmlComponent, "slider-demo-html");

        viewHtml.style.display = 'none';
        resultHtmlComponent.style.display = 'none';

        switchBtn.addEventListener('click', (e) => {
            const val = e.currentTarget.text;
            e.currentTarget.text = val === 'HTML' ? 'Standard' : 'HTML';
            divProp.style.display = val === 'Standard' ? '' : 'none';
            viewHtml.style.display = val === 'HTML' ? '' : 'none';
            resultPropComponent.style.display = val === 'Standard' ? '' : 'none';
            resultHtmlComponent.style.display = val === 'HTML' ? '' : 'none';

            if(val === 'HTML') {
                actionButton.setAttribute("disabled", "disabled");
                editor.value = initialTemplate;
                resultHtmlComponent.innerHTML = initialTemplate;

                document.getElementById("slider-demo-html")?.updateComplete?.then(() => {
                    try {
                        document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("slider-demo-html")?.outerHTML);
                        return;
                    } catch (e) {
                        return;
                    }
                });
            }
            actionButton.removeAttribute("disabled");
            document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("slider-demo-prop")?.outerHTML);
        });

        await this.apply();
    }

    async apply() {
        var slider = document.getElementById("slider-demo-prop");
        if(!this.firstRun) {
            var label = document.getElementById("label").getValue();
            slider.setAttribute("label", label);

            var description = document.getElementById("description").getValue();
            slider.setAttribute("description", description);

            var value = document.getElementById("value").getValue();
            try {
                slider.setValue(value);
            } catch (error) { }

            var min = document.getElementById("min").getValue();
            slider.setAttribute("min", min);

            var max = document.getElementById("max").getValue();
            slider.setAttribute("max", max);

            var disabled = document.getElementById("inputDisable").getSelectedValues();
            if (disabled) {
                slider.setAttribute("disabled", "disabled");
            } else {
                slider.removeAttribute("disabled");
            }
        } else { this.firstRun = false; }

        const container = document.getElementById("codeView")
        await slider.updateComplete;
        container.innerHTML = guideApp.highlightAuto(slider.outerHTML);
    }
}

class SirioStepperDemo {
    async init(run) {
        const itemControl = document.querySelector('#item-control');
        const editor = document.querySelector('#editor');
        const switchBtn = document.querySelector('#switch-mode-button');
        const divProp = document.querySelector('#viewProp');
        const viewHtml = document.querySelector('#viewHtml');
        const resultProp = document.querySelector('#resultPropComponent');
        const resultHtmlComponent = document.querySelector('#resultHtmlComponent');
        const actionButton = document.querySelector('#btnAction');
        const codeStandard = document.querySelector('#code-stepper-object');
        const codeComposed = document.querySelector('#code-stepperc-object');
        this.firstRun = run ?? true;

        const initialTemplate = `<sirio-stepper id="stepper-object-html" items='[
            { "text": "Prima di cominciare", "status": "success" },
            { "text": "Dati anagrafici", "status": "success" },
            { "text": "Cosa è successo", "status": "active" },
            { "text": "Contatti" },
            { "text": "Anteprima" },
            { "text": "Invio" }
        ]'>
        </sirio-stepper>`

        editor.value = initialTemplate;
        resultHtmlComponent.innerHTML = initialTemplate;

        guideApp.addBlurListener(editor, resultHtmlComponent, "stepper-object-html");

        codeComposed.style.display = 'none';
        viewHtml.style.display = 'none';
        resultHtmlComponent.style.display = 'none';

        switchBtn.addEventListener('click', (e) => {
            const val = e.currentTarget.text;
            e.currentTarget.text = val === 'HTML' ? 'Standard' : 'HTML';
            divProp.style.display = val === 'Standard' ? '' : 'none';
            viewHtml.style.display = val === 'HTML' ? '' : 'none';
            resultPropComponent.style.display = val === 'Standard' ? '' : 'none';
            resultHtmlComponent.style.display = val === 'HTML' ? '' : 'none';
            codeStandard.style.display = val === 'Standard' ? 'block' : 'none';
            codeComposed.style.display = val === 'HTML' ? 'block' : 'none';

            if (val === 'HTML') {
                actionButton.setAttribute("disabled", "disabled");
                editor.value = initialTemplate;
                resultHtmlComponent.innerHTML = initialTemplate;

                document.getElementById("stepper-object-html")?.updateComplete?.then(() => {
                    try {
                        document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("stepper-object-html")?.outerHTML);
                        return;
                    } catch (e) {
                        return;
                    }
                });
            }
            document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("stepper-object-prop")?.outerHTML);
            actionButton.removeAttribute("disabled");
        });

        await this.apply();
    }

    async apply() {
        var stepper = document.getElementById("stepper-object-prop");
        if(!this.firstRun) {
            var items = document.getElementById("itemsInput").getValue();
            stepper.setAttribute("items", items);

            var responsive = document.getElementById("inputResponsive").getSelectedValues();
            if (responsive) {
                stepper.setAttribute("responsive", "");
            } else {
                stepper.removeAttribute("responsive");
            }
        } else { this.firstRun = false; }

        const container = document.getElementById("codeView")
        await stepper.updateComplete
        container.innerHTML = guideApp.highlightAuto(stepper.outerHTML);
    }
}

class SirioTabDemo {
    async init(run) {
        const itemControl = document.querySelector('#item-control');
        const editor = document.querySelector('#editor');
        const switchBtn = document.querySelector('#switch-mode-button');
        const divProp = document.querySelector('#viewProp');
        const viewHtml = document.querySelector('#viewHtml');
        const resultProp = document.querySelector('#resultPropComponent');
        const resultHtmlComponent = document.querySelector('#resultHtmlComponent');
        const actionButton = document.querySelector('#btnAction');
        const codeStandard = document.querySelector('#code-tab-object');
        const codeComposed = document.querySelector('#code-tabc-object');
        this.firstRun = run ?? true;

        const initialTemplate = `<sirio-tab id="tab-object-html" type="HorizontalTabContainer" 
            nav-item-left-text="Scorri a sinistra" 
            nav-item-right-text="Scorri a destra" 
            nav-item-left-icon="fa-angle-left" 
            nav-item-right-icon="fa-angle-right">
        <sirio-tab-item label="Label tab" selected>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
        </sirio-tab-item>
        <sirio-tab-item label="Label tab">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
        </sirio-tab-item>
        <sirio-tab-item label="Label tab con icona" icon="fas fa-file">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
        </sirio-tab-item>
        <sirio-tab-item label="Label tab disabled" disabled>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
        </sirio-tab-item>
        <sirio-tab-item label="Label tab">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
        </sirio-tab-item>
        </sirio-tab>`

        editor.value = initialTemplate;
        resultHtmlComponent.innerHTML = initialTemplate;

        guideApp.addBlurListener(editor, resultHtmlComponent, "tab-object-html");

        codeComposed.style.display = 'none';
        viewHtml.style.display = 'none';
        resultHtmlComponent.style.display = 'none';

        switchBtn.addEventListener('click', (e) => {
            const val = e.currentTarget.text;
            e.currentTarget.text = val === 'HTML' ? 'Standard' : 'HTML';
            divProp.style.display = val === 'Standard' ? '' : 'none';
            viewHtml.style.display = val === 'HTML' ? '' : 'none';
            resultPropComponent.style.display = val === 'Standard' ? '' : 'none';
            resultHtmlComponent.style.display = val === 'HTML' ? '' : 'none';
            codeStandard.style.display = val === 'Standard' ? 'block' : 'none';
            codeComposed.style.display = val === 'HTML' ? 'block' : 'none';

            if (val === 'HTML') {
                actionButton.setAttribute("disabled", "disabled");
                editor.value = initialTemplate;
                resultHtmlComponent.innerHTML = initialTemplate;

                document.getElementById("tab-object-html")?.updateComplete?.then(() => {
                    try {
                        document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("tab-object-html")?.outerHTML);
                        return;
                    } catch (e) {
                        return;
                    }
                });
            }
            document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("tab-object-prop")?.outerHTML);
            actionButton.removeAttribute("disabled");
        });

        await this.apply();
    }

    async apply() {
        var tab = document.getElementById("tab-object-prop");
        if(!this.firstRun) {
            var item = document.getElementById("item").getValue();
            tab.setAttribute("item", item);

            var type = document.getElementById("type").getSelectedValues()[0];
            tab.setAttribute("type", type);

            var iconRight = document.getElementById("iconRight").getValue();
            if(iconRight) {
                tab.setAttribute("nav-item-right-icon", iconRight);
            } else {
                tab.removeAttribute("nav-item-right-icon");
            }

            var iconLeft = document.getElementById("iconLeft").getValue();
            if(iconLeft) {
                tab.setAttribute("nav-item-left-icon", iconLeft);
            } else {
                tab.removeAttribute("nav-item-left-icon");
            }

            var iconRightText = document.getElementById("iconRightText").getValue();
            if(iconRightText) {
                tab.setAttribute("nav-item-right-text", iconRightText);
            } else {
                tab.removeAttribute("nav-item-right-text");
            }

            var iconLeftText = document.getElementById("iconLeftText").getValue();
            if(iconLeftText) {
                tab.setAttribute("nav-item-left-text", iconLeftText);
            } else {
                tab.removeAttribute("nav-item-left-text");
            }
        } else { this.firstRun = false; }

        const container = document.getElementById("codeView")
        await tab.updateComplete;
        container.innerHTML = guideApp.highlightAuto(tab.outerHTML);
    }
}

class SirioTitleBarDemo {
    async init(run) {
        const itemControl = document.querySelector('#item-control');
        const editor = document.querySelector('#editor');
        const switchBtn = document.querySelector('#switch-mode-button');
        const divProp = document.querySelector('#viewProp');
        const viewHtml = document.querySelector('#viewHtml');
        const resultProp = document.querySelector('#resultPropComponent');
        const resultHtmlComponent = document.querySelector('#resultHtmlComponent');
        const actionButton = document.querySelector('#btnAction');
        this.firstRun = run ?? true;

        const initialTemplate = `<sirio-title-bar id="titleBar-example-html" title="Titolo" subtitle="Sottotitolo (opzionale)" icon="fa-ellipsis-h">
            <sirio-title-bar-tool title="Cerca" label="Cerca" icon="fa-search"></sirio-title-bar-tool>
            <sirio-title-bar-tool title="Impostazioni" label="Impostazioni" icon="fa-sliders-h"></sirio-title-bar-tool>
            <sirio-title-bar-tool title="Filtri" label="Filtri" icon="fa-filter"></sirio-title-bar-tool>
        </sirio-title-bar>`

        editor.value = initialTemplate;
        resultHtmlComponent.innerHTML = initialTemplate;

        guideApp.addBlurListener(editor, resultHtmlComponent, "titleBar-example-html");

        viewHtml.style.display = 'none';
        resultHtmlComponent.style.display = 'none';

        switchBtn.addEventListener('click', (e) => {
            const val = e.currentTarget.text;
            e.currentTarget.text = val === 'HTML' ? 'Standard' : 'HTML';
            divProp.style.display = val === 'Standard' ? '' : 'none';
            viewHtml.style.display = val === 'HTML' ? '' : 'none';
            resultPropComponent.style.display = val === 'Standard' ? '' : 'none';
            resultHtmlComponent.style.display = val === 'HTML' ? '' : 'none';

            if (val === 'HTML') {
                actionButton.setAttribute("disabled", "disabled");
                editor.value = initialTemplate;
                resultHtmlComponent.innerHTML = initialTemplate;

                document.getElementById("titleBar-example-html")?.updateComplete?.then(() => {
                    try {
                        document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("titleBar-example-html")?.outerHTML);
                        return;
                    } catch (e) {
                        return;
                    }
                });
            }
            document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("titleBar-example-prop")?.outerHTML);
            actionButton.removeAttribute("disabled");
        });

        await this.apply();
    }

    async apply() {
        var titleBar = document.getElementById("titleBar-example-prop");
        var icon = document.getElementById("input-toggle-only-icon")?.getSelectedValues?.();

        if (icon) {
            titleBar.setAttribute('only-icons', icon);
        }

        var stb1 = document.getElementById("stb1");
        var stb2 = document.getElementById("stb2");
        var stb3 = document.getElementById("stb3");
        if(!this.firstRun) {
            var title = document.getElementById("title").getValue();
            titleBar.setAttribute("title", title);

            var subtitle = document.getElementById("subtitle").getValue();
            titleBar.setAttribute("subtitle", subtitle);

            var dark = document.getElementById("dark").getSelectedValues();
            if (dark) { titleBar.setAttribute("dark", ""); }
            else titleBar.removeAttribute("dark");

            var t1 = document.getElementById("title1").getValue();
            stb1.setAttribute("title", t1);

            var ic1 = document.getElementById("icon1").getValue();
            stb1.setAttribute("icon", ic1);

            var t2 = document.getElementById("title2").getValue();
            stb2.setAttribute("title", t2);

            var ic2 = document.getElementById("icon2").getValue();
            stb2.setAttribute("icon", ic2);

            var t3 = document.getElementById("title3").getValue();
            stb3.setAttribute("title", t3);

            var ic3 = document.getElementById("icon3").getValue();
            stb3.setAttribute("icon", ic3);
        } else { this.firstRun = false; }

        const container = document.getElementById("codeView")
        await titleBar.updateComplete;
        container.innerHTML = guideApp.highlightAuto(titleBar.outerHTML);
    }
}

class SirioTooltipDemo {
    async init(run) {
        const itemControl = document.querySelector('#item-control');
        const editor = document.querySelector('#editor');
        const switchBtn = document.querySelector('#switch-mode-button');
        const divProp = document.querySelector('#viewProp');
        const viewHtml = document.querySelector('#viewHtml');
        const resultProp = document.querySelector('#resultPropComponent');
        const resultHtmlComponent = document.querySelector('#resultHtmlComponent');
        const actionButton = document.querySelector('#btnAction');
        this.firstRun = run ?? true;

        const initialTemplate = `<label>
        Popover top-start
        <sirio-button id="btn-tooltip-ts-1" icon="fa-info-circle" aria-label="Popover top-start"></sirio-button>
        <sirio-tooltip for="btn-tooltip-ts-1" type="popover"
                    placement="top-start"
                    title="Popover top-start">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <a href='#' class='sirio-btn sirio-btn-tertiary-light'>Azione</a>
        </sirio-tooltip>
        </label>`

        editor.value = initialTemplate;
        resultHtmlComponent.innerHTML = initialTemplate;

        guideApp.addBlurListener(editor, resultHtmlComponent, "btn-tooltip-ts-1");

        viewHtml.style.display = 'none';
        resultHtmlComponent.style.display = 'none';

        switchBtn.addEventListener('click', (e) => {
            const val = e.currentTarget.text;
            e.currentTarget.text = val === 'HTML' ? 'Standard' : 'HTML';
            divProp.style.display = val === 'Standard' ? '' : 'none';
            viewHtml.style.display = val === 'HTML' ? '' : 'none';
            resultPropComponent.style.display = val === 'Standard' ? '' : 'none';
            resultHtmlComponent.style.display = val === 'HTML' ? '' : 'none';

            if (val === 'HTML') {
                actionButton.setAttribute("disabled", "disabled");
                editor.value = initialTemplate;
                resultHtmlComponent.innerHTML = initialTemplate;

                document.getElementById("btn-tooltip-ts-1")?.updateComplete?.then(() => {
                    try {
                        document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("btn-tooltip-ts-1")?.outerHTML);
                        return;
                    } catch (e) {
                        return;
                    }
                });
            }
            document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("tooltip-object-prop")?.outerHTML);
            actionButton.removeAttribute("disabled");
        });

        await this.apply();
    }

    async apply() {
        var btn = document.getElementById("tooltip-btn-object-prop");
        var tooltip = document.getElementById("tooltip-object-prop");
        if(!this.firstRun) {
            var titleInput = document.getElementById("title").getValue();
            tooltip.setAttribute("title", titleInput);

            var titleBtn = document.getElementById("titleBtn").getValue();
            btn.setAttribute("text", titleBtn);

            var type = document.getElementById("type").getSelectedValues();
            tooltip.setAttribute("placement", type);

            tooltip.requestUpdate();
            btn.requestUpdate();
        } else { this.firstRun = false; }

        const container = document.getElementById("codeView")
        await tooltip.updateComplete;
        container.innerHTML = guideApp.highlightAuto(tooltip.outerHTML);
    }
}

class SirioValidationDemo {
    async init(run) {
        const itemControl = document.querySelector('#item-control');

        const switchBtn = document.querySelector('#switch-mode-button');
        const divProp = document.querySelector('#viewProp');
        const viewHtml = document.querySelector('#viewHtml');
        const resultProp = document.querySelector('#resultPropComponent');
        const resultHtmlComponent = document.querySelector('#resultHtmlComponent');
        const actionButton = document.querySelector('#btnAction');
        this.firstRun = run ?? true;

        const initialTemplate = `<sirio-input label="Text:" type="text" id="input-text-valid-html" name="input-text-valid" placeholder="Inserisci il testo"></sirio-input>
        <sirio-validation id="input-text-valid-message-html" for="input-text-valid-html" text="Lorem ipsum onopossum tagit tua" type="valid"></sirio-validation>`

        editor.value = initialTemplate;
        resultHtmlComponent.innerHTML = initialTemplate;

        guideApp.addBlurListener(editor, resultHtmlComponent, "input-text-valid-message-html");

        viewHtml.style.display = 'none';
        resultHtmlComponent.style.display = 'none';

        switchBtn.addEventListener('click', (e) => {
            const val = e.currentTarget.text;
            e.currentTarget.text = val === 'HTML' ? 'Standard' : 'HTML';
            divProp.style.display = val === 'Standard' ? '' : 'none';
            viewHtml.style.display = val === 'HTML' ? '' : 'none';
            resultPropComponent.style.display = val === 'Standard' ? '' : 'none';
            resultHtmlComponent.style.display = val === 'HTML' ? '' : 'none';

            if (val === 'HTML') {
                actionButton.setAttribute("disabled", "disabled");
                editor.value = initialTemplate;
                resultHtmlComponent.innerHTML = initialTemplate;
                document.getElementById("input-text-valid-message-html")?.updateComplete?.then(() => {
                    try {
                        document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("input-text-valid-message-html")?.outerHTML);
                        return;
                    } catch (e) {
                        return;
                    }
                });
            }
            document.getElementById("codeView").innerHTML = guideApp.highlightAuto(document.getElementById("input-text-valid-message-prop")?.outerHTML);
            actionButton.removeAttribute("disabled");
        });

        await this.apply();
    }

    async apply() {
        var validation = document.getElementById("input-text-valid-message-prop");
        if(!this.firstRun) {
            var type = document.getElementById("type").getSelectedValues()[0];
            validation.setAttribute("type", type);

            var message = document.getElementById("message").getValue();
            validation.setAttribute("text", message);
        } else { this.firstRun = false; }

        const container = document.getElementById("codeView")
        await validation.updateComplete;
        container.innerHTML = guideApp.highlightAuto(validation.outerHTML);
    }
}

class GuideAppPage {
    async init(ver) {
        var version ='9.0.7';

        $(document).on('click', '#guide-nav > li > a', function (e) {
            e.preventDefault();
            GuideApp.openCollapse($(this));
        });
        $(document).on('click', '.guide-nav.open #guide-nav li li a', function (e) {
            $(".guide-nav.open").removeClass("open");
        });
        $("#guide-nav > li > a").each(function() {
            if (window.location.pathname.indexOf($(this).attr("href").replace("#nav","")) < 0) {
                GuideApp.closeCollapse($(this));
            }
        });

        $(document).on('click', '.guide-section [href="#"]', function (e) {
            e.preventDefault();
        });

        $(document).ready(function() {

            // Version
            let displayVersion = ver ?? version;
            $('header small, footer small').html('ver ' + displayVersion);


            // Scroll to top
            $(window).on("scroll", function(){
                if ($(this).scrollTop() >= 350) {
                  $("#guide-scroll-top").fadeIn(200);
                } else {
                  $("#guide-scroll-top").fadeOut(200);
                }
            });
            $(document).on('click', '#guide-scroll-top', function (e) {
                $("body,html").animate({
                  scrollTop : 0
                }, 500);
                e.preventDefault();
            });


            // Prevent link example
            $(document).on('click', 'a[href=""]', function (e) {
                e.preventDefault();
            });

            $('div.changelog').each(function() {
                let id = $(this).attr("id");
                $(this).find("pre").each(function(i) {
                    $(this).attr("id",id+"-"+i)
                    //$(this).before('<button class="btn btn-xs btn-copy" data-clipboard-action="copy" data-clipboard-target="#'+id+'-'+i+' code">Copia</button>');
                });
                $(this).replaceWith('<a class="view-source guide-collapsed" data-guide-toggle="collapse" href="#src-'+id+'">Visualizza</a><div id="src-'+id+'" class="guide-collapse">'+$(this).html()+'</div>');
            });

            // highlight.js e clipboard.js
            $('div.code').each(function() {
                let id = $(this).attr("id");
                $(this).find("pre").each(function(i) {
                    $(this).attr("id",id+"-"+i)
                    $(this).before('<button class="btn btn-xs btn-copy" data-clipboard-action="copy" data-clipboard-target="#'+id+'-'+i+' code">Copia</button>');
                });
                $(this).replaceWith('<a class="view-source guide-collapsed" data-guide-toggle="collapse" href="#src-'+id+'">Mostra il codice</a><div id="src-'+id+'" class="guide-collapse">'+$(this).html()+'</div>');
            });

            $('div.link').each(function() {
                let id = $(this).attr("id");
                $(this).find("pre").each(function(i) {
                    $(this).attr("id",id+"-"+i)
                    $(this).before('<button class="btn btn-xs btn-copy" data-clipboard-action="copy" data-clipboard-target="#'+id+'-'+i+' code">Copia</button>');
                });
                $(this).replaceWith('<a class="view-source guide-collapsed" data-guide-toggle="collapse" href="#src-'+id+'">Visualizza Link</a><div id="src-'+id+'" class="guide-collapse">'+$(this).html()+'</div>');
            });

            $('div.obsoleteSirioMenu').each(function() {
                let id = $(this).attr("id");
                $(this).find("pre").each(function(i) {
                    $(this).attr("id",id+"-"+i)
                    //$(this).before('<button class="btn btn-xs btn-copy" data-clipboard-action="copy" data-clipboard-target="#'+id+'-'+i+' code">Copia</button>');
                });
                $(this).replaceWith('<a class="view-source guide-collapsed" data-guide-toggle="collapse" href="#src-'+id+'">SIRIO-MENU [obsoleto]</a><div id="src-'+id+'" class="guide-collapse">'+$(this).html()+'</div>');
            });

            $(document).on('click', '[data-guide-toggle="collapse"]', function (e) {
                e.preventDefault();
                $(this).toggleClass("guide-collapsed")
                let id = $(this).attr("href");
                $(id).slideToggle('slow');
            });

            $('xmp').each(function() {
                let data = $(this).html().toString().replace(/</g, '&lt;').replace(/>/g, '&gt;');
                $(this).replaceWith('<code>'+data+'</code>');
            });

            if ($('pre').length) {
                hljs.initHighlighting();
                let clipboard = new ClipboardJS('.btn-copy');

                clipboard.on('success', function(e) {
                    e.clearSelection();
                    window.alert('Codice copiato con successo!');
                });

                clipboard.on('error', function(e) {
                    e.clearSelection();
                    window.alert('Premi Ctrl+C per copiare il codice.');
                });
            }
        });
    }
}

class GuideAppPageWC {
    async init() {
        $(document).ready(function() {

            // highlight.js e clipboard.js
            $('div.info').each(function () {
                let id = $(this).attr("id");
                $(this).find("div").each(function (i) {
                    $(this).attr("id", id + "-" + i)
                });
                $(this).replaceWith('<a class="view-source guide-collapsed" data-guide-toggle="collapse" href="#src-' + id + '">Mostra la guida</a><div id="src-' + id + '" class="guide-collapse">' + $(this).html() + '</div>');
            });

            $('div.changeLog').each(function () {
                let id = $(this).attr("id");
                $(this).find("div").each(function (i) {
                    $(this).attr("id", id + "-" + i)
                });
                $(this).replaceWith('<a class="view-source guide-collapsed" data-guide-toggle="collapse" href="#src-' + id + '">Mostra le modifiche</a><div id="src-' + id + '" class="guide-collapse">' + $(this).html() + '</div>');
            });

        });
    }
}

try
{ module.exports = {
    GuideApp, GuideAppPage, GuideAppPageWC, SirioAccordionDemo, SirioAlertDemo, SirioBreadcrumbDemo, SirioButtonDemo,
    SirioCardDemo, SirioChipDemo, SirioDatetimeDemo, SirioDialogDemo, SirioDropdownDemo, SirioFilterDemo, SirioGridDemo, SirioHeroDemo, SirioCarouselDemo,
    SirioInfoDemo, SirioNotifyDemo, SirioInputDemo,SirioPanelExpandDemo, SirioPagerDemo,SirioProgressbarDemo, SirioSearchbarDemo, SirioSelectDemo, SirioSidenavDemo,
    SirioSliderDemo, SirioStepperDemo, SirioTabDemo, SirioTitleBarDemo, SirioTooltipDemo, SirioValidationDemo }
} catch { }
