function heading_enumerator(target_class, starting_level, prepunctuation, form_string, postpunctuation) {
	//interpret form
	let form = [];
	for (let i = 0; i < form_string.length; i++) {
		if ("01AaRr".includes(form_string.charAt(i))) { //give its own level in form
			form.push({display: form_string.charAt(i), punctuation: ""});
		} else { //punctuation on last form element
			form[form.length-1].punctuation += form_string.charAt(i);
		}
	}
	//now lets actually read the doc
	let p = []; //track levels
	for (heading of document.getElementsByClassName(target_class)) {
		let depth = (heading.tagName.substring(1))-(starting_level-1); //the depth of this el. 0=top level, form.length-1=bottom level we should care about
		if (depth < 0 || depth > form.length) continue; //We dont care about this heading.
		if (p.length > depth) { //cut p, going to grander heading
			while (p.length > depth) {
				let waste = p.pop();
			}
			p[depth-1]++;
		} else if (p.length < depth) { //extend p, going to specific heading
			while (p.length < depth) p.push(0);
		} else {
			p[depth-1]++; //increment where we're already at
		}
		let pretext = ""; //now lets interpret p array into pretext (the enumeration. following form)
		for (let i = 0; i < p.length; i++) {
			//turn p[i] into something meaningful based on form[i].display
			let added_digit = "Oopsie woopsie :3c";
			switch (form[i].display) {
				case "0": added_digit = p[i]; break;
				case "1": added_digit = p[i]+1; break;
				case "A": added_digit = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt(p[i]); break;
				case "a": added_digit = "abcdefghijklmnopqrstuvwxyz".charAt(p[i]); break;
				case "R": added_digit = roman(p[i]+1); break;
				case "r": added_digit = roman(p[i]+1).toLowerCase(); break;
			}
			pretext += added_digit;
			if (i+1<p.length || p.length == form.length) pretext += form[i].punctuation; //only keep putting that form[i].punctuation if theres more digits to come
		}
		heading.innerHTML = prepunctuation + pretext + postpunctuation + heading.innerHTML;
	}
	//lets define some helpy functions
	function roman(num) {
		if (num < 1 || num > 3999) return "?";
		let r = "";
		let ones = "IXCM";
		let fives = "VLD";
		let magnitude = 0; //currently working on 10^0s
		while (num > 0) {
			let digit = num%10;
			let this_place = "";
			if (digit < 4) { //put in N ones
				for (let i = 0; i < digit; i++)
					this_place += ones[magnitude];
			} else if (digit == 4) { //put in one and five
				this_place += ones[magnitude] + fives[magnitude];
			} else if (digit < 9) { //V and digit-5 Is
				this_place += fives[magnitude];
				for (let i = 0; i < digit-5; i++)
					this_place += ones[magnitude];
			} else if (digit == 9) { //IX
				this_place += ones[magnitude] + ones[magnitude+1];
			}
			r = this_place + r;
			num = Math.floor(num/10);
			magnitude++;
		}
		return r;
	}
} //end function
/**shoutout vrabbers for showing me how to do this like 2 years ago**/
