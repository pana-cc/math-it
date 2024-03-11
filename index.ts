function render() {
    let html: string = "<div>";

    let mmToInch = 1 / 25.4;

    const printableWidthInMM = 200;
    const printableHeightInMM = 260;

    let dpi = 300;
    let xPixels = Math.ceil(dpi * printableWidthInMM * mmToInch);
    let yPixels = Math.floor(dpi * printableHeightInMM * mmToInch);

    html += `<h1 class="non-printable">Math Generator</h1>`;
    html += `<h2 class="non-printable">Multiplication</h2>`;
    html += `<p class="non-printable">The page contains two printable sheets - one with math multiplication problems; a second one with the solutions.</p>`;
    html += `<p class="non-printable">Printing should fit into two A4 sheets of paper. Make sure you are not printing two-sided.</p>`;
    html += `<p class="non-printable"><a class="non-printable button" onclick="location.reload()">Randomize</a><a class="non-printable button" onclick="window.print();">Print</a></p>`;

    let svgProblems = ``;
    let svgSolutions = ``;
    
    svgProblems = `<svg class="non-selectable" style="break-after:page" viewBox="0 0 ${xPixels} ${yPixels}" width="${printableWidthInMM}mm" height="${printableHeightInMM}mm" xmlns="http://www.w3.org/2000/svg">`;
    svgSolutions = `<svg class="non-selectable" style="break-after:page" viewBox="0 0 ${xPixels} ${yPixels}" width="${printableWidthInMM}mm" height="${printableHeightInMM}mm" xmlns="http://www.w3.org/2000/svg">`;

    const textSize = Math.ceil(0.125 * dpi);
    const gridWidth = Math.ceil(0.15 * dpi);
    const gridHeight = Math.ceil(0.25 * dpi);
    const charXOffset = Math.ceil(0.0275 * dpi);
    const charYOffset = Math.round(-0.02 * dpi);

    svgProblems += `
    <style>
        .digits {
            font-family: Consolas, monaco, monospace;
            font-size: ${textSize}px;
            font-style: normal;
            font-variant: normal;
            font-weight: 700;
            line-height: ${textSize}px;
        }
        .carryover {
            font-family: Consolas, monaco, monospace;
            font-size: ${textSize / 2}px;
            font-style: normal;
            font-variant: normal;
            font-weight: 700;
            line-height: ${textSize / 2}px;
        }
    </style>`;

    svgSolutions += `
    <style>
        .digits {
            font-family: Consolas, monaco, monospace;
            font-size: ${textSize}px;
            font-style: normal;
            font-variant: normal;
            font-weight: 700;
            line-height: ${textSize}px;
        }
        .carryover {
            font-family: Consolas, monaco, monospace;
            font-size: ${textSize / 2}px;
            font-style: normal;
            font-variant: normal;
            font-weight: 700;
            line-height: ${textSize / 2}px;
        }
    </style>`;

    const cornerSize = Math.ceil(0.05 * dpi);
    // svgProblems += `<rect width="${cornerSize}" height="${cornerSize}" x="0" y="0" fill="black" />`;
    // svgProblems += `<rect width="${cornerSize}" height="${cornerSize}" x="${xPixels - cornerSize}" y="0" fill="black" />`;
    // svgProblems += `<rect width="${cornerSize}" height="${cornerSize}" x="0" y="${yPixels - cornerSize}" fill="black" />`;
    // svgProblems += `<rect width="${cornerSize}" height="${cornerSize}" x="${xPixels - cornerSize}" y="${yPixels - cornerSize}" fill="black" />`;

    // svgSolutions += `<rect width="${cornerSize}" height="${cornerSize}" x="0" y="0" fill="black" />`;
    // svgSolutions += `<rect width="${cornerSize}" height="${cornerSize}" x="${xPixels - cornerSize}" y="0" fill="black" />`;
    // svgSolutions += `<rect width="${cornerSize}" height="${cornerSize}" x="0" y="${yPixels - cornerSize}" fill="black" />`;
    // svgSolutions += `<rect width="${cornerSize}" height="${cornerSize}" x="${xPixels - cornerSize}" y="${yPixels - cornerSize}" fill="black" />`;

    function character(char: string, x: number, y: number) {
        return `<text x="${cornerSize + x * gridWidth + charXOffset}" y="${cornerSize + textSize + gridHeight * y + charYOffset}" class="digits">${char}</text>`;
    }

    function carryover(char: string, x: number, y: number) {
        return `<text x="${cornerSize + x * gridWidth + charXOffset + 5}" y="${cornerSize + gridHeight * y + charYOffset}" class="carryover">${char}</text>`;
    }

    function equationLine(left: number, right: number, y: number) {
        return `<rect x="${cornerSize + left * gridWidth}" y="${cornerSize + textSize + gridHeight * y}" width="${Math.ceil((right - left + 1) * gridWidth)}" height="${Math.ceil(0.01 * dpi)}" fill="black" />`;
    }


    function blanks(left: number, right: number, y: number, color: string = "black") {
        let svg = ``;
        for(let x = left; x <= right; x++) {
            svg += `<rect x="${cornerSize + x * gridWidth + Math.floor(gridWidth * 0.15)}" y="${cornerSize + textSize + gridHeight * y - Math.floor(gridHeight * 0.1)}" width="${Math.ceil(gridWidth * 0.7)}" height="${Math.ceil(0.01 * dpi)}" fill="lightgray" />`;
        }
        return svg;
    }

    for (let column = 0; column < 3; column++) {
        for (let row = 0; row < 6; row++) {

            const columnChars = 17;
            const problemRowLines = 7;
            const problemRowOffset = 0;
            const problemColumnOffset = -3;

            const firstNumberLength = random(3, 6);
            const secondNumberLength = random(2, Math.min(4, firstNumberLength - 1));

            const numberA = random(Math.pow(10, firstNumberLength - 1), Math.pow(10, firstNumberLength) - 1);
            const numberB = random(Math.pow(10, secondNumberLength - 1), Math.pow(10, secondNumberLength) - 1);

            const top = row * problemRowLines + problemRowOffset;
            const left = column * columnChars + problemColumnOffset;

            const problem = numberA.toString() + "·" + numberB.toString();
            for (let char = 0; char < problem.length; char++) {
                const text = character(problem[char], (columnChars + 1 - problem.length) + left + char, top);
                svgProblems += text;
                svgSolutions += text;
            }

            svgProblems += character("+", left + columnChars - problem.length + 1, top + 0.5 * secondNumberLength + 0.1);
            svgSolutions += character("+", left + columnChars - problem.length + 1, top + 0.5 * secondNumberLength + 0.1);

            svgProblems += equationLine(left + columnChars - problem.length + 1, left + columnChars, top);
            svgSolutions += equationLine(left + columnChars - problem.length + 1, left + columnChars, top);

            for (let eq = 0; eq < secondNumberLength; eq++) {
                svgProblems += blanks(left + columnChars - firstNumberLength - eq, left + columnChars - eq, top + eq + 1);
                svgSolutions += blanks(left + columnChars - firstNumberLength - eq, left + columnChars - eq, top + eq + 1);
            }
            svgProblems += equationLine(left + columnChars - problem.length + 1, left + columnChars, top + secondNumberLength);
            svgSolutions += equationLine(left + columnChars - problem.length + 1, left + columnChars, top + secondNumberLength);

            svgProblems += blanks(left + columnChars - firstNumberLength - secondNumberLength + 1, left + columnChars, top + secondNumberLength + 1);
            svgSolutions += blanks(left + columnChars - firstNumberLength - secondNumberLength + 1, left + columnChars, top + secondNumberLength + 1);

            const lineNumbers: number[][] = [];
            for (let row = 0; row < secondNumberLength; row++) {
                lineNumbers.push([]);
                for (let column = 0; column < firstNumberLength + secondNumberLength; column++) {
                    lineNumbers[row][column] = 0;
                }
            }

            // Solve...
            for (let solutionLine = 0; solutionLine < secondNumberLength; solutionLine++) {
                const digitB = Number.parseInt(numberB.toString()[numberB.toString().length - 1 - solutionLine]);

                if (digitB == 0) {
                    svgSolutions += character("0", left + columnChars - solutionLine, top + 1 + solutionLine);
                    continue;
                }

                let carryOver = 0;
                for (let i = 0; i < firstNumberLength; i++) {
                    const digitA = Number.parseInt(numberA.toString()[numberA.toString().length - 1 - i]);
                    const result = carryOver + digitA * digitB;
                    const resultDigit = result % 10;
                    carryOver = Math.floor(result / 10);

                    lineNumbers[solutionLine][firstNumberLength + secondNumberLength - 1 - i - solutionLine] = resultDigit;

                    svgSolutions += character(resultDigit.toString(), left + columnChars - i - solutionLine, top + 1 + solutionLine);

                    if (carryOver > 0) {
                        svgSolutions += carryover(carryOver.toString(), left + columnChars - i - solutionLine - 1, top + 1 + solutionLine);
                    }
                }

                if (carryOver > 0) {
                    svgSolutions += character(carryOver.toString(), left + columnChars - firstNumberLength - solutionLine, top + 1 + solutionLine);
                    lineNumbers[solutionLine][firstNumberLength + secondNumberLength - 1 - firstNumberLength - solutionLine] = carryOver;
                }
            }

            // TODO: Calculate the lineNumbers[row][col] to figure out carryovers
            let carryoverTotal = 0;
            for (let i = 0; i < firstNumberLength + secondNumberLength; i++) {
                let sum = carryoverTotal;
                for (let j = 0; j < secondNumberLength; j++) {
                    sum += lineNumbers[j][firstNumberLength + secondNumberLength - 1 - i];
                }
                const solutionDigit = sum % 10;
                carryoverTotal = Math.floor(sum / 10);

                if (i < firstNumberLength + secondNumberLength - 1 || solutionDigit != 0) {
                    svgSolutions += character(solutionDigit.toString(), left + columnChars - i, top + 1 + secondNumberLength);
                }
                if (carryoverTotal > 0) {
                    svgSolutions += carryover(carryoverTotal.toString(), left + columnChars - i - 1, top + 1 + secondNumberLength);
                }
            }

            // const solution = (numberA * numberB).toString();
            // for (let char = 0; char < solution.length; char++) {
            //     svgSolutions += character(solution[char], left + columnChars - solution.length + 1 + char, top + 1 + secondNumberLength);
            // }
        }
    }

    svgProblems += `</svg>`;
    svgSolutions += `</svg>`;

    html += `<h3 class="non-printable">Multiplication problems page</h3>`;
    html += svgProblems;
    html += `<h3 class="non-printable">Multiplication solutions page</h3>`;
    html += svgSolutions;

    html += "</div>";
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(html, 'text/html');
    return htmlDoc.querySelector("div");
}

function random(from: number, to: number) {
    return from + Math.floor(Math.random() * (to - from + 1));
}

document.body.appendChild(render());
