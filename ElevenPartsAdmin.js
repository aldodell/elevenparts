class ElevenPartsAdmin extends KDApplication {

    run() {
        if (super.run()) {
            this.show();
        }
    }

    show() {
        /* Estilos */
        var adm_estilo = kdStyles(
            { "height": "200px" },
            { "width": "95vw" },
            //{ "border": "1px solid black" }
        );

        var adm_estiloTitulo = kdStyles(
            { "fontSize": "32px" },
            { "color": "blue" }

        );

        var adm_estiloBaseProductos = kdStyles(
            { "border": "1px solid black" },
            { "backgroundColor": "orange" },
            { width: "50vw" },
        )

        var adm_estiloEtiqueta = kdStyles(
            { "fontSize": "16px" },
            { "color": "black" }
        );

        var adm_estiloTexto = kdStyles(
            { "display": "block" },
            { width: "25vw" },
            { marginBottom: "10px" },
            { backgroundColor: kdColor(100, 149, 237, 0.5) },
        );

        var adm_estiloId = kdStyles(
            { width: "40px" }
        )

        var adm_estiloNoEditable = kdStyles(
            { enabled: false }
        )

        var adm_estiloCargaImagenes = kdStyles(
            // { height: "200px" },
            // { width: "200px" },
            { border: "2px black dotted" },
            // { display: "inline-block" },
            { padding: "4px" },
        )

        var adm_estiloDropZone = kdStyles(
            { height: "200px" },
            { width: "200px" },
            { border: "2px black dotted" },
            { display: "inline-block" },
        )

        var adm_estiloImagen = kdStyles(
            { display: "block" },
            { height: "auto" },
            { width: "100px" },
        );

        var adm_estiloLogoImagen = kdStyles(
            { height: "auto" },
            { width: "200px" },
        )

        var adm_estiloNombre = kdStyles(
            // { height: "auto" },
            { width: "35vw" },
        )

        var adm_estiloBoton = kdStyles(
            { border: "4px blue solid" },
            { backgroundColor: "darkorange" },
            { color: "white" },
            { boxShadow: "2px 2px 2px orange" }
        )

        var adm_estiloAreaEdicion = kdStyles(
            { border: "2px blue solid" },
            { padding: "8px" },
            { width: "48vw" },
        );

        var adm_estiloPrincipal = kdStyles(
            { border: "2px blue solid" },
            { padding: "8px" },
            { width: "50vw" },
            { position: "absolute" },
            { left: "50%" },
            { transform: "translateX(-50%)" }
        );

        var adm_estiloEtiquetaDropZone = kdStyles(
            { display: "inline-block" },
            { width: "200px" },
            { verticalAlign: "top" },
            { padding: "16px" },
            { fontSize: "16px" },
        )

        /* varaibles globales */
        var ultimoProductoCargado = 0;

        /* Definimos la interfaz */
        var adm_win = kdWindow();
        var adm_principal = kdLayer(adm_estiloPrincipal)
        adm_win
            .wrapOnBody(adm_principal)
            .changeSize("70vw", "70vh")
            .setTitle("Administrador");


        //Logo
        kdLayer(adm_estilo)
            .wrap(
                kdImage(adm_estiloLogoImagen)
                    .setValue("img/eleven-logo-800.png")
            )
            .publish(adm_principal);

        //Titulo
        kdLabel(adm_estiloTitulo)
            .setValue("Administración de productos")
            .publish(adm_principal)

        //Listado por nombre de productos
        kdLayer(adm_estiloBaseProductos)
            .wrap(
                kdText(adm_estiloId)
                    .setValue("ID")
                    .setEnable(false),
                kdText(adm_estiloNombre)
                    .setValue("Nombre")
                    .setEnable(false),
                kdLayer()
                    .storeIn("adm_adaptadorProducto")
                    .wrap(
                        kdLayer()
                            .wrap(
                                kdText(adm_estiloId)
                                    .setName("id")
                                    .setEnable(false),
                                kdText(adm_estiloNombre)
                                    .setName("nombre")
                                    .setEnable(false),
                                kdButton()
                                    .setValue("Editar")
                                    .addEvent("click", adm_editarProducto),
                                kdButton()
                                    .setValue("Eliminar")
                                    .addEvent("click", adm_eliminarProducto)
                            )
                    )
                    .saveStructure()
            )
            .publish(adm_principal);

        //Espacio en blanco
        kdLayer(kdStyles({ height: "4px" }))
            .publish(adm_principal);

        //Bot'on para agregar nuevo producto.
        kdButton(adm_estiloBoton)
            .setValue("Agregar nuevo producto")
            .addEvent("click", adm_nuevoProducto)
            .publish(adm_principal);

        //Espacio en blanco
        kdLayer(kdStyles({ height: "30px" }))
            .publish(adm_principal);

        //Area de edicion de un producto
        kdLayer(adm_estiloAreaEdicion)
            .storeIn("adm_adaptadorProductoEditando")
            .wrap(
                kdLabel(adm_estiloEtiqueta)
                    .setValue("nombre:"),
                kdText(adm_estiloTexto)
                    .setName("nombre"),
                kdLabel(adm_estiloEtiqueta)
                    .setValue("descripción:"),
                kdText(adm_estiloTexto)
                    .setName("descripcion"),
                kdLabel(adm_estiloEtiqueta)
                    .setValue("marca:"),
                kdText(adm_estiloTexto)
                    .setName("marca"),
                kdLabel(adm_estiloEtiqueta)
                    .setValue("modelo:"),
                kdText(adm_estiloTexto)
                    .setName("modelo"),
                kdLabel(adm_estiloEtiqueta)
                    .setValue("código:"),
                kdText(adm_estiloTexto)
                    .setName("codigo"),
                kdLabel(adm_estiloEtiqueta)
                    .setValue("categorias:"),
                kdText(adm_estiloTexto)
                    .setName("categorias"),
                kdLabel(adm_estiloEtiqueta)
                    .setValue("precio:"),
                kdText(adm_estiloTexto)
                    .setName("precio"),
                kdLabel(adm_estiloEtiqueta)
                    .setValue("cantidad:"),
                kdText(adm_estiloTexto)
                    .setName("cantidad"),
                kdLabel(adm_estiloEtiqueta)
                    .setValue("vendidos:"),
                kdText(adm_estiloTexto)
                    .setName("vendidos"),
                kdHidden()
                    .setName("id"),
                kdButton(adm_estiloBoton)
                    .setValue("Guardar cambios")
                    .addEvent("click", adm_guardarCambios)
            )
            .publish(adm_principal);


        //Area de carga de imagenes
        kdLayer(adm_estiloCargaImagenes)
            .wrap(
                kdLayer()
                    .storeIn("adm_adaptadorImagenes")
                    .wrap(
                        kdLayer()
                            .wrap(
                                kdImage(adm_estiloImagen)
                                    .setValuePrefix("img/")
                                    .setName("nombre"),
                                kdButton(adm_estiloBoton)
                                    .addEvent("click", adm_eliminarImagen)
                                    .setValue("Eliminar"),
                            )
                    )
                    .saveStructure()
            )
            .publish(adm_principal)

        //Espacio en blanco
        kdLayer(kdStyles({ height: "30px" }))
            .publish(adm_principal);

        var dropZone = kdDropFileZone(adm_estiloDropZone)
            .publish(adm_principal);

        kdLabel(adm_estiloEtiquetaDropZone)
            .setValue("Arrastra hasta el cuadro punteado las imágenes que quieras asociar al producto seleccionado")
            .publish(adm_principal);

        function adm_guardarCambios(e) {
            let b64 = new KDBase64();
            let data = adm_adaptadorProductoEditando.toString();
            data = b64.toBase64(data);

            let params = new FormData();
            params.append("c", "a");
            params.append("data", data);

            let server = new KDServerBridge(
                "procProductos.php",
                params,
                function (datos) {
                    alert("Ok.:" + datos);
                    adm_cargarProductos();
                })
                .request();

        }

        function adm_nuevoProducto() {
            let params = new FormData();
            params.append("c", "i");
            let server = new KDServerBridge(
                "procProductos.php",
                params,
                function (datos) {
                    adm_cargarProductos();
                })
                .request();
        }

        function adm_cargarImagenes(idProducto) {

            if (idProducto == undefined) idProducto = ultimoProductoCargado;

            //Cargamos las imagenes
            let params = new FormData();
            params.append("c", "l");
            params.append("idProducto", idProducto);

            let server = new KDServerBridge(
                "procImagenes.php",
                params,
                function (datos) {
                    if (datos.trim() != "") {
                        let obj = JSON.parse(datos);
                        adm_adaptadorImagenes.restore();
                        adm_adaptadorImagenes.setValue(obj);
                    }
                })
                .request();
        }

        function adm_activarDropZone(idProducto) {
            //Configuramos la dropzone
            var data = new FormData();
            data.append("c", "s");
            data.append("idProducto", idProducto);
            dropZone.active("procImagenes.php", data, function (a, b, m) { console.log(a + " " + b + " " + m); adm_cargarImagenes(); }, function (m) { alert(m) });
        }


        function adm_editarProducto(e) {
            let kdid = e.target.id;
            let c = document.getElementById(kdid);
            let id = c.mirror.parent.getValue()["id"];
            let params = new FormData();
            params.append("c", "e");
            params.append("id", id);
            let server = new KDServerBridge(
                "procProductos.php",
                params,
                function (datos) {
                    let obj = JSON.parse(datos);
                    adm_adaptadorProductoEditando.setValue(obj);
                    adm_cargarImagenes(id);
                    adm_activarDropZone(id);
                    ultimoProductoCargado = id;
                })
                .request();
        }


        function adm_eliminarProducto(e) {
            let kdid = e.target.id;
            let c = document.getElementById(kdid);
            let id = c.mirror.parent.getValue()["id"];
            let params = new FormData();
            params.append("c", "d");
            params.append("id", id);

            let server = new KDServerBridge(
                "procProductos.php",
                params,
                function (datos) {
                    alert("Ok: " + datos);
                    adm_cargarProductos();
                })
                .request();
        }

        function adm_eliminarImagen(e) {
            //let id = JSON.stringify(e.target.parentNode.parentNode.mirror.getValue());
            let nombre = e
                .target
                .mirror
                .parent
                .components[0]
                .getValue();

            nombre = nombre.substr(nombre.lastIndexOf("/") + 1);
            let params = new FormData();
            params.append("c", "d");
            params.append("nombre", nombre);

            let server = new KDServerBridge(
                "procImagenes.php",
                params,
                function (datos) {
                    alert("Ok: " + datos);
                    adm_cargarImagenes();
                })
                .request();

        }


        function adm_cargarProductos() {
            debugger;
            //Cargamos el producto
            adm_adaptadorProducto.restore();
            let params = new FormData();
            params.append("c", "l");
            let server = new KDServerBridge(
                "procProductos.php",
                params,
                function (datos) {
                    let obj = JSON.parse(datos);
                    adm_adaptadorProducto.setValue(obj);

                })
                .request();
        }
        
        adm_win.publish();
        adm_cargarProductos();

    }
}