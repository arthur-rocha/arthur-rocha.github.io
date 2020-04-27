draw_skill_plot = function() {
    var w = 400,
        h = 360;
    var font_family = "Raleway, sans-serif";
    var plot_area = new Raphael(document.getElementById('canvas_container'), w, h);

    plot_area.setViewBox(32, 0, w, h, true);
    plot_area.setSize('100%', '100%')

    var plot_side_lines = plot_area.set(
        plot_area.path("M 318.05,269.28 314.16,273.42 310.11,277.39 305.89,281.18 301.52,284.80 297.00,288.23 292.34,291.47 287.55,294.51 282.64,297.35 277.61,299.98 272.47,302.39 267.24,304.59 261.92,306.57 256.53,308.32 251.06,309.85 245.54,311.15 239.96,312.21 234.35,313.04 228.71,313.63 223.04,313.99 217.37,314.11"),
        plot_area.path("M 306.86,259.21 303.02,263.29 298.98,267.18 294.78,270.88 290.40,274.38 285.87,277.67 281.18,280.75 276.36,283.61 271.42,286.24 266.35,288.64 261.18,290.80 255.91,292.72 250.56,294.39 245.14,295.81 239.66,296.97 234.13,297.88 228.56,298.53 222.97,298.92 217.37,299.05"),
        plot_area.path("M 295.67,249.14 291.62,253.40 287.33,257.43 282.82,261.21 278.11,264.73 273.21,267.99 268.13,270.97 262.90,273.66 257.52,276.05 252.02,278.14 246.41,279.92 240.71,281.38 234.94,282.52 229.12,283.34 223.25,283.84 217.37,284.00"),
        plot_area.path("M 284.49,239.06 280.46,243.26 276.16,247.19 271.63,250.83 266.86,254.18 261.90,257.21 256.74,259.91 251.43,262.28 245.97,264.30 240.39,265.96 234.72,267.26 228.98,268.20 223.19,268.76 217.37,268.95"),

        plot_area.path("M 100.04,110.89 102.98,106.04 106.12,101.31 109.46,96.72 112.98,92.27 116.69,87.98 120.58,83.84 124.63,79.87 128.85,76.08 133.22,72.46 137.74,69.03 142.40,65.79 147.19,62.75 152.10,59.91 157.13,57.28 162.27,54.87 167.50,52.67 172.82,50.69 178.21,48.94 183.68,47.41 189.20,46.12"),
        plot_area.path("M 113.08,118.42 115.99,113.63 119.13,108.99 122.48,104.49 126.03,100.16 129.78,95.99 133.72,92.01 137.84,88.21 142.13,84.60 146.59,81.21 151.20,78.02 155.95,75.05 160.83,72.30 165.84,69.79 170.96,67.51 176.18,65.47 181.49,63.68 186.88,62.13 192.33,60.84"),
        plot_area.path("M 126.12,125.95 129.20,120.93 132.56,116.10 136.18,111.46 140.06,107.04 144.17,102.83 148.52,98.87 153.08,95.15 157.84,91.69 162.79,88.50 167.90,85.59 173.17,82.98 178.58,80.66 184.11,78.65 189.74,76.95 195.46,75.56"),
        plot_area.path("M 139.15,133.47 142.22,128.53 145.61,123.79 149.29,119.29 153.25,115.02 157.48,111.03 161.96,107.31 166.66,103.89 171.58,100.78 176.69,97.99 181.97,95.54 187.39,93.43 192.94,91.68 198.59,90.29")
    )

    plot_side_lines.attr({ stroke: "#e6e6e6" })


    var skill = plot_area.set(

        bar_web_scraping = plot_area.path("M 220,50 226.07,50.98 232.08,51.53 238.05,52.36 243.97,53.48 249.84,54.87 255.63,56.54 261.34,58.47 266.95,60.68 264.68,66.07 262.42,71.47 260.15,76.87 257.88,82.26 255.61,87.66 253.34,93.06 251.07,98.45 248.80,103.85 246.54,109.25 241.23,107.25 235.78,105.65 230.23,104.47 224.61,103.71 218.95,103.38 219.07,97.53 219.19,91.68 219.31,85.82 219.44,79.97 219.56,74.12 219.68,68.27 219.80,62.41 219.93,56.56 220.05,50.71 Z"),

        bar_text_mining = plot_area.path("M 271.85,62.86 277.24,65.55 282.50,68.50 287.62,71.69 292.58,75.12 297.37,78.77 301.98,82.65 306.41,86.75 310.64,91.04 306.37,95.05 302.11,99.06 297.84,103.06 293.57,107.07 289.30,111.08 285.04,115.09 280.77,119.09 276.50,123.10 272.24,127.11 268.20,123.12 263.87,119.45 259.28,116.12 254.45,113.14 249.42,110.53 251.91,105.23 254.40,99.94 256.89,94.64 259.39,89.34 261.88,84.05 264.37,78.75 266.86,73.45 269.36,68.16 271.85,62.86 Z"),

        bar_machine_learning = plot_area.path("M 319.92,90.11 323.54,94.48 326.97,99.00 330.21,103.66 333.25,108.45 336.09,113.36 338.72,118.39 341.13,123.53 343.33,128.76 345.31,134.08 339.62,136.06 333.94,138.04 328.25,140.02 322.56,142.00 316.88,143.98 311.19,145.96 305.51,147.94 299.82,149.92 294.13,151.90 288.45,153.88 286.38,148.59 283.92,143.48 281.09,138.57 277.89,133.88 274.34,129.45 278.90,125.52 283.46,121.58 288.02,117.65 292.58,113.71 297.13,109.78 301.69,105.84 306.25,101.91 310.81,97.98 315.37,94.04 319.92,90.11 Z"),

        bar_data_viz = plot_area.path("M 347.06,139.47 348.59,144.94 349.88,150.46 350.95,156.04 351.78,161.65 352.37,167.29 352.73,172.96 352.85,178.63 352.73,184.30 352.37,189.97 346.37,189.46 340.37,188.96 334.37,188.45 328.37,187.95 322.37,187.45 316.37,186.94 310.37,186.44 304.37,185.94 298.37,185.43 292.37,184.93 292.63,179.26 292.47,173.59 291.87,167.95 290.86,162.37 289.42,156.88 295.19,155.14 300.95,153.40 306.71,151.66 312.48,149.92 318.24,148.17 324.01,146.43 329.77,144.69 335.53,142.95 341.30,141.21 347.06,139.47 Z"),

        bar_statistics = plot_area.path("M 366.71,197.50 365.89,203.11 364.87,208.69 363.63,214.23 362.18,219.72 360.53,225.15 358.68,230.51 356.62,235.80 354.37,241.01 351.92,246.12 349.28,251.15 344.21,248.36 339.13,245.57 334.06,242.78 328.99,239.99 323.91,237.20 318.84,234.41 313.76,231.62 308.69,228.83 303.62,226.05 298.54,223.26 293.47,220.47 288.40,217.68 283.32,214.89 285.87,209.82 288.02,204.57 289.78,199.17 291.12,193.66 292.04,188.06 297.78,188.79 303.53,189.51 309.27,190.24 315.02,190.97 320.76,191.69 326.50,192.42 332.25,193.14 337.99,193.87 343.74,194.59 349.48,195.32 355.22,196.05 360.97,196.77 366.71,197.50 Z"),

    );

    skill.attr({ fill: "#f99790", stroke: "#f99790" });

    var tools = plot_area.set(

        bar_web_stuff = plot_area.path("M 191.59,288.54 185.71,287.00 179.92,285.14 174.24,282.97 168.69,280.49 163.28,277.72 158.02,274.67 152.94,271.33 156.52,266.18 160.10,261.03 163.68,255.88 167.26,250.73 170.84,245.58 174.42,240.43 179.19,243.49 184.19,246.18 189.37,248.49 194.71,250.40 200.18,251.91 198.75,258.01 197.32,264.12 195.89,270.22 194.45,276.33 193.02,282.44 191.59,288.54 Z"),

        bar_sql_nosql = plot_area.path("M 140.01,280.55 135.30,276.79 130.76,272.81 126.42,268.63 122.29,264.24 118.36,259.67 114.65,254.92 111.17,249.99 107.93,244.91 112.93,241.88 117.94,238.85 122.95,235.81 127.96,232.78 132.96,229.75 137.97,226.72 142.98,223.68 147.98,220.65 152.99,217.62 156.11,222.36 159.58,226.85 163.38,231.06 167.48,234.98 171.87,238.58 168.33,243.24 164.79,247.91 161.25,252.57 157.71,257.23 154.17,261.89 150.63,266.56 147.09,271.22 143.55,275.88 140.01,280.55 Z"),

        bar_python_lang = plot_area.path("M 105.25,240.27 102.47,234.92 99.94,229.44 97.68,223.86 95.68,218.17 93.96,212.39 92.50,206.54 91.33,200.63 90.43,194.67 96.24,193.93 102.05,193.20 107.85,192.47 113.66,191.73 119.47,191.00 125.28,190.26 131.08,189.53 136.89,188.80 142.70,188.06 143.62,193.66 144.96,199.17 146.72,204.57 148.87,209.82 151.42,214.89 146.29,217.71 141.16,220.53 136.03,223.35 130.90,226.17 125.77,228.99 120.64,231.81 115.51,234.63 110.38,237.45 105.25,240.27 Z"),

        bar_r_lang = plot_area.path("M 67.37,191.23 67.00,185.56 66.85,179.89 66.91,174.22 67.18,168.55 67.67,162.90 68.37,157.26 69.28,151.66 70.40,146.10 71.73,140.58 73.27,135.12 78.81,136.80 84.35,138.47 89.89,140.14 95.44,141.82 100.98,143.49 106.52,145.16 112.06,146.84 117.61,148.51 123.15,150.18 128.69,151.86 134.23,153.53 139.78,155.20 145.32,156.88 143.88,162.37 142.87,167.95 142.27,173.59 142.11,179.26 142.37,184.93 136.60,185.41 130.83,185.90 125.06,186.38 119.29,186.87 113.52,187.35 107.75,187.83 101.98,188.32 96.22,188.80 90.45,189.29 84.68,189.77 78.91,190.26 73.14,190.74 67.37,191.23 Z"),

    );

    tools.attr({ fill: "#3fcfd2", stroke: "#3fcfd2" });

    var plots_inlines = plot_area.set(

        tools_line = plot_area.path("M 189.29,243.95 183.25,241.47 178.43,238.60 173.84,235.36 169.53,231.77 165.50,227.85 161.80,223.63 158.44,219.13 155.45,214.38 152.83,209.41 150.62,204.25 148.81,198.94 147.43,193.50 146.48,187.96 145.97,182.37 145.89,176.76 146.26,171.16"),

        skills_line = plot_area.path("M 232.24,108.69 237.76,110.10 243.16,111.94 248.39,114.21 253.43,116.89 258.23,119.96 262.78,123.40 267.04,127.20 270.98,131.32 274.58,135.74 277.82,140.44 280.67,145.38 283.12,150.53 285.15,155.86 286.75,161.33 287.90,166.92 288.61,172.58 288.87,178.27 288.67,183.97 288.02,189.64 286.92,195.24 285.37,200.73")

    )

    plots_inlines.attr({ stroke: "#7b7b7b" })

    var plot_inside_text = plot_area.set(

        skills_text = plot_area.text(265, 151.85, "Skills"),
        tools_text = plot_area.text(175, 213.56, "Tools")
    );

    plot_inside_text.attr({ fill: "#7b7b7b", "font-family": font_family, "font-weight": "bold" })

    //SKILL ITENS - PLOT OUTSIDE TEXT
    var skills_itens = plot_area.set(

        web_scraping = plot_area.text(247, 27, "Web\nScraping"),
        web_scraping.rotate(-78),

        text_mining = plot_area.text(305, 55, "Text\nMining"),
        text_mining.rotate(-54),

        machine_learning = plot_area.text(360, 97, "Machine\nLearning"),
        machine_learning.rotate(-30),

        data_viz = plot_area.text(390, 157, "Data\nVisualization"),
        data_viz.rotate(-6),

        statistics = plot_area.text(390, 240, "Statistics"),
        statistics.rotate(20)

    );

    skills_itens.attr({
        "font-size": 9,
        "font-weight": "bold",
        fill: "#7b7b7b",
        "font-family": font_family
    });

    //TOOLS ITENS - PLOT OUTSIDE TEXT
    var tools_itens = plot_area.set(

        web_stuff = plot_area.text(160.92, 300.92, "Web\nStuff"),
        web_stuff.rotate(-66),

        sql_nosql = plot_area.text(103.86, 285.63, "SQL\nNOSQL"),
        sql_nosql.rotate(-42),

        python_lang = plot_area.text(70.15, 230.21, "Python"),
        python_lang.rotate(-18),

        r_lang = plot_area.text(52.66, 164.90, "R"),
        r_lang.rotate(6)

    );

    tools_itens.attr({
        "font-size": 9,
        "font-weight": "bold",
        fill: "#7b7b7b",
        "font-family": font_family
    });



    //Mouseover animations

    skill.mouseover(function() {
        this.attr({ cursor: "pointer" });
        tools.animate({
            fill: "#7b7b7b",
            stroke: "#7b7b7b"
        }, 100, 'linear');
        skills_text.attr({ fill: "black" });
        //skills_line.animate({path: "M218.24,105.69L237.76,110.1L243.16,111.94L248.39,114.21L253.43,116.89L258.23,119.96L262.78,123.4L267.04,127.2L270.98,131.32L274.58,135.74L277.82,140.44L280.67,145.38L283.12,150.53L285.15,155.86L286.75,161.33L287.9,166.92L288.61,172.58L288.87,178.27L288.67,183.97L288.02,189.64L286.92,195.24L279.37,212.73"}, 100, "linear");
        skills_line.attr({ stroke: "black" });
        this.animate({
            fill: "#cf2519",
            stroke: "#cf2519",
            "stroke-width": 5
        }, 120, "linear");

    });

    skill.mouseout(function() {
        this.animate({
            fill: "#f99790",
            stroke: "#f99790",
            "stroke-width": 1
        }, 120, "linear");
        tools.animate({ fill: "#3fcfd2", stroke: "#3fcfd2" }, 100, 'linear');
        //skills_line.animate({path: "M 189.29,243.95 183.25,241.47 178.43,238.60 173.84,235.36 169.53,231.77 165.50,227.85 161.80,223.63 158.44,219.13 155.45,214.38 152.83,209.41 150.62,204.25 148.81,198.94 147.43,193.50 146.48,187.96 145.97,182.37 145.89,176.76 146.26,171.16"});
        skills_line.attr({ stroke: "#7b7b7b" });
        skills_text.attr({ fill: "#7b7b7b" });
        this.toBack();
    });

    tools.mouseover(function() {
        this.animate({
            fill: "#005e61",
            stroke: "#005e61",
            "stroke-width": 5
        }, 120, "linear");
        this.attr({ cursor: "pointer" });
        skill.animate({ fill: "#7b7b7b", stroke: "#7b7b7b" }, 100, 'linear');
        tools_text.attr({ fill: "black" });
        tools_line.attr({ stroke: "black" });
    });

    tools.mouseout(function() {
        this.animate({
                fill: "#3fcfd2",
                stroke: "#3fcfd2",
                "stroke-width": 1
            },
            120, "linear");
        skill.animate({ fill: "#f99790", stroke: "#f99790" }, 100, 'linear');
        tools_line.attr({ stroke: "#7b7b7b" });
        tools_text.attr({ fill: "#7b7b7b" });
    });

    increase_text_size(bar_web_stuff, web_stuff)
    increase_text_size(bar_sql_nosql, sql_nosql)
    increase_text_size(bar_python_lang, python_lang)
    increase_text_size(bar_r_lang, r_lang)

    increase_text_size(bar_statistics, statistics);
    increase_text_size(bar_data_viz, data_viz);
    increase_text_size(bar_machine_learning, machine_learning);
    increase_text_size(bar_text_mining, text_mining);
    increase_text_size(bar_web_scraping, web_scraping);

    function increase_text_size(bar, text) {
        bar.mouseover(function() {
            text.animate({
                "font-size": 10,
                fill: "black"
            }, 40)

        })

        bar.mouseout(function() {
            text.animate({
                "font-size": 9,
                fill: "#7b7b7b"
            }, 40)
        })
    }

    //TOOLTIP STUFF


    create_description(bar_web_stuff, "This plot is a proof!");
    create_description(bar_sql_nosql, "I've worked with Elasticsearch, Mongodb, Postgres and others.");
    create_description(bar_python_lang, "I use this at my data science routine (pandas, numpy and scikitlearn mostly).");
    create_description(bar_r_lang, "I'm a R NINJA!!");

    create_description(bar_statistics, "I'm a Statistician!!");
    create_description(bar_data_viz, "I love this! Checkout my plots!");
    create_description(bar_machine_learning, "Call me model designer...");
    create_description(bar_text_mining, "I love this too!");
    create_description(bar_web_scraping, "This is a powerful tool to get data from everywhere!\nOne of my favorites.");


    function create_description(bar, description_text) {
        bar.mouseover(function() {

            txt_description = plot_area.text(235, 350, description_text).
            attr({ fill: "#333333", "font-family": font_family, "font-weight": "bold" })
        })

        bar.mouseout(function() {

            txt_description.remove()
        })
    }

    another_kind_description(bar_statistics, "I'm a Statistician!!", 20)

    another_kind_description(bar_data_viz, "I love this! Checkout my plots!!", -6)


    function another_kind_description(bar, description_text, angle) {

        var centroid = getCentroid(bar);
        var r_polar = Math.sqrt((centroid.x + 100) ** 2 + (centroid.y + 20) ** 2)
        var phi = angle

        bar.mouseover(function() {

            another_description = plot_area.text(r_polar * phi, r_polar * phi, description_text)
            another_description.attr({ fill: "#333333", font: "font: Arial 9px", "font-weight": "bold" })
            another_description.rotate(angle)
        });

        bar.mouseout(function() {

            another_description.remove()
        });
    }

    function getCentroid(path) {
        var x = new Array(11);
        var y = new Array(11);
        var asum = 0,
            cxsum = 0,
            cysum = 0;
        var totlength = path.getTotalLength();
        for (var i = 0; i < 11; i++) {
            var location = path.getPointAtLength(i * totlength / 10);
            x[i] = location.x;
            y[i] = location.y;

            if (i > 0) {
                asum += x[i - 1] * y[i] - x[i] * y[i - 1];
                cxsum += (x[i - 1] + x[i]) * (x[i - 1] * y[i] - x[i] * y[i - 1]);
                cysum += (y[i - 1] + y[i]) * (x[i - 1] * y[i] - x[i] * y[i - 1]);
            }
        }

        return ({ x: (1 / (3 * asum)) * cxsum, y: (1 / (3 * asum)) * cysum });

    }


}