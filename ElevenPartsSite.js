class ElevenPartsSite extends KDApplication {
    
    run() {
        if (super.run()) {
            this.show();
        }
    }

    show() {
        var imagePath = "img/";
        var categoriasTransparencia = 0;

        var estiloLogoImagen = kdStyles(
            { height: '20vh' },
            { width: 'auto' },
            // { border: '1px solid black' }
        );

        var estiloCategorias = kdStyles(
            { height: '90vh' },
            { width: '20vw' },
            { backgroundImage: "linear-gradient(blue, white)" },
            { display: "inline-block" },
            { verticalAlign: "top" },
            { border: "1px white solid" },
            { overflowX: "hidden" },
        );

        var estiloCategoria = kdStyles(
            { padding: '4px' },
            { border: "1px solid white" },
            { margin: "8px" },
            { fontSize: "20px" },
            // { backgroundColor: "rgba(255, 0, 0, 0.5)" },
        );

        var estiloVinculoCategoria = kdStyles(
            { color: "white" },
            { fontWeight: "bold" },
            { textShadow: "2px 2px 1px blue" },
            { fontSize: "2vw" },

        );

        var estiloVitrina = kdStyles(
            { height: '90vh' },
            { width: '70vw' },
            // { border: '1px solid black' },
            //{ backgroundColor: "orange" },
            { display: "inline-block" },
            { verticalAlign: "top" },
            { overflow: "scroll" },
            { backgroundImage: "url(img/eleven-logo-800.png)" },
            { backgroundSize: "60vw 60vh" },
            { backgroundRepeat: "no-repeat" },

        );

        var estiloMarcoProducto = kdStyles(
            { height: 'auto' },
            { width: '200px' },
            { border: '1px solid white' },
            { display: "inline-block" },
            { verticalAlign: "top" },
            { padding: "4px" },
            { margin: "8px" },
            // { borderRadius: "8px" },
            { boxShadow: "8px 8px 8px darkorange" },
            { backgroundColor: kdColor(0, 191, 255, 0.8) },
        )

        var estiloMarcoImagenProducto = kdStyles(
            { height: '200px' },
            { width: '200px' },
            { overflowX: 'scroll' },
            { overflowY: 'hidden' },
            //{ backgroundColor: "gray" },
            // { borderRadius: "8px" },
            { border: "1px blue solid" },
        )

        var estiloSubmarcoImagenProducto = kdStyles(
            { height: '150px' },
            { width: 'auto' },
            // { backgroundColor: "cyan" },
        )

        var estiloContenedorImagenProducto = kdStyles(
            { display: "flex" }
        )

        var estiloImagenProducto = kdStyles(
            { height: 'auto' },
            { width: '200px' },
            { display: 'flex' },
            { backgroundColor: "yellow" }
        )

        var estiloNombreProducto = kdStyles(
            { display: "block" },
            { textTransform: "uppercase" },
            { fontWeight: "bold" },
        )

        var estiloDescripcion = kdStyles(
            { display: "block" },
            { fontFamily: "Verdana, Arial, Helvetica, sans-serif" },

        )

        var estiloPrecio = kdStyles(
            { display: "block" },
            { fontWeight: "bold" },
        )

        var estiloBotonVer = kdStyles(
            { width: "100%" },
            { display: "block" },
            { bottom: "2px" },
            { fontWeight: "bold" },
            { backgroundColor: "darkorange" },
            { color: "white" },
        )

        var estiloSegundaFila = kdStyles(
            { position: "absolute" },
            { display: "block" },
            { height: '90vh' },
            { width: '98vw' },
            { border: '1px solid white' },
            { top: "22vh" },
            //{ boxShadow: "8px 8px 8px gray" },
        );


        var estiloLogoMarco = kdStyles(
            { position: "absolute" },
            //{ height: '20vh' },
            { width: '83vw' },
            { display: "block" },
            // { textAlign: "right" },
            { borderBottom: '4px dashed orange' },
            { marginBottom: "10px" },
            { padding: "4px" },
        );

        var estiloLogoTexto = kdStyles(
            { fontSize: "8vw" },
            { color: "blue" },
            { textShadow: "2px 2px 16px  darkorange" },
            { fontFamily: "Faster One" },
            { display: "block" },
            //{ position: "relative" },
            //{ textAlign: "center" },
            //{ verticalAlign: "top" },
            //{ top: "4vh" },
        );

        var estiloRif = kdStyles(
            { display: "inline-block" },
            //{ backgroundColor: "rgba(150,120,30,0.5)" },
            { margin: "8px" },
            { position: "absolute" },
            // { left: "100px" },
            // { bottom: "10px" },
            //{ width: "3vw" },
            { right: "0px" },
            //{ margin: "4px" },
            //{ fontFamily: "Arial, Helvetica, sans-serif" },

        );

        var estiloBuscador = kdStyles(
            { display: "inline-block" },
            //{ position: "relative" },
            //{ bottom: "10px" },
            { width: "15vw" },
            //{ height: "5vh" },
            //{ left: "200px" },
            { backgroundColor: "rgb(179, 217, 255)" },
            { color: "navy" },
        );

        var estiloMarcoPrincipal = kdStyles(
            { position: "absolute" },
            { width: "90vw" },
            { height: "auto" },
            { left: "50%" },
            { transform: "translateX(-50%)" },

        );

        var estiloTelefono = kdStyles(
            { margin: "8px" },
        );




        //Cargamos el marco principal
        var marcoPrincipal = kdLayer(estiloMarcoPrincipal)
            .publish()


        // Dibujamos la interfaz:
        var logo = kdLayer(estiloLogoMarco)
            .wrap(
                kdLabel(estiloLogoTexto)
                    .setValue("ELEVEN PARTS CA"),
                kdLabel(estiloRif)
                    .setValue("J-31542268-9"),
                kdText(estiloBuscador)
                    .addEvent("keypress", buscar)
                    .setOnDom("placeholder", "Buscar..."),
            )
            .publish(marcoPrincipal)


        var segundaFila = kdLayer(estiloSegundaFila)
            .publish(marcoPrincipal);


        var categorias = kdLayer(estiloCategorias)
            .wrap(
                kdLayer(estiloCategoria)
                    .setDoBeforeSetValue(variarTransparenciaCategoria)
                    .wrap(
                        kdHiperlink(estiloVinculoCategoria)
                            .setValuePrefix("javascript:cargarProductosPorCategoria(\"")
                            .setValueSuffix("\")")
                            .setName("categoria")
                    )
            )
            .publish(segundaFila);

        var vitrina = kdLayer(estiloVitrina) // array
            .wrap(
                kdLayer(estiloMarcoProducto) // row
                    .wrap(
                        kdLayer(estiloMarcoImagenProducto)
                            .wrap(
                                kdLayer(estiloSubmarcoImagenProducto)
                                    .wrap(
                                        kdLayer(estiloContenedorImagenProducto)
                                            .setName("imagenes")
                                            .wrap(
                                                kdImage(estiloImagenProducto)
                                                    .setValuePrefix("img/")
                                                    .setName("nombre")
                                            )
                                    )
                            ),
                        kdLabel(estiloNombreProducto)
                            .setName("nombre"),
                        kdLabel(estiloDescripcion)
                            .setName("descripcion"),
                        kdLabel(estiloPrecio)
                            .setValuePrefix("Precio: ")
                            .setValueSuffix("$")
                            .setName("precio"),
                        kdButton(estiloBotonVer)
                            .setValue("Ver"),

                    )
            )
            .saveStructure()
            .publish(segundaFila);

        //Cargar categorias
        function cargarCategorias() {
            let params = new FormData();
            params.append("c", "c");

            let server = new KDServerBridge(
                "procPortal.php",
                params,
                function (datos) {
                    let obj = JSON.parse(datos);
                    categorias.setValue(obj);
                })
                .request();
        }
        cargarCategorias();


        function cargarProductos() {
            vitrina.restore();

            let params = new FormData();
            params.append("c", "p");

            let server = new KDServerBridge(
                "procPortal.php",
                params,
                function (datos) {
                    let obj = JSON.parse(datos);
                    vitrina.setValue(obj);
                })
                .request();


        }
        cargarProductos();


        window.cargarProductosPorCategoria = function (categoria) {
            vitrina.restore();

            let params = new FormData();
            params.append("c", "k");
            params.append("k", categoria);

            let server = new KDServerBridge(
                "procPortal.php",
                params,
                function (datos) {
                    let obj = JSON.parse(datos);
                    vitrina.setValue(obj);
                })
                .request();

        }

        var colorVariableEnCategorias = 0;
        function variarTransparenciaCategoria(obj) {
            colorVariableEnCategorias -= 10;
            let c = kdColor(255, 200 + colorVariableEnCategorias, colorVariableEnCategorias, 1);
            obj.setStyles(kdStyles({ backgroundColor: c }));

        }

        function abrirWhatsapp() {
            alert("Por hacer");
        }

        function buscar(e) {
            if (e.keyCode == 13) {
                // alert(e.target.mirror.getValue());
                let value = e.target.mirror.getValue();

                if (value.toUpperCase() == "Ave Maria".toUpperCase()) {
                    abrirTerminal();
                } else {

                    let params = new FormData();
                    params.append("c", "b");
                    params.append("q", value);

                    let server = new KDServerBridge(
                        "procPortal.php",
                        params,
                        function (datos) {
                            vitrina.restore();
                            let obj = JSON.parse(datos);
                            vitrina.setValue(obj);
                        })
                        .request();
                }
            }
        }

        function abrirTerminal() {
            kdKernel.sendLocalMessage(kdMessage("terminal"));
        }
    }
}