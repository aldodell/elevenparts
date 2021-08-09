//Eleven app:
class ElevenParts extends KDApplication {
    request() {
        let data = new FormData()
        data.append("c", "a");
        let server = new KDServerBridge("security.php", data,
            function (m) {
                kdKernel.sendLocalMessage(kdMessage("terminal", m, "ElevenParts"));
            }

        ).request();
    }

    check(phrase) {
        let data = new FormData()
        data.append("c", "c");
        data.append("p", phrase);
        let server = new KDServerBridge("security.php", data,
            function (m) {
                if (m == "true") {
                    kdKernel.runApplication("ElevenPartsAdmin");
                };
            }
        ).request();
    }


    run() {
        if (super.run()) {
            let m;
            m = kdMessage("terminal", "take ElevenParts");
            kdKernel.sendLocalMessage(m);
        }
    }

    processMessage(m) {
        if (m.destination == "ElevenParts") {
            let tokens = m.payload.match(/\w+/g);
            if (!tokens) {
                this.run();
            } else {
                switch (tokens[0]) {
                    case "admin":
                        this.request();

                        break;

                    default:
                        this.check(m.payload)
                        break;
                }

            }

        }
    }
}