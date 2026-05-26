// Tiny, very basic large number library for incremental games
// Does not support negative numbers, only operations are addition, subtraction, >=, and multiplying by float, basically just made for an incremental game
// Range is 0 - 9.99(...)e2147483647
const increm = {
	from(float, exponent){ // create a number from component, second parameter is optional
		if(Number.isFinite(float)==false){
			return [0, 0]
		}
		return increm.normalize([float, exponent | 0]);
	},
	addSub: function(num1, num2, subtract){ // add or subtract two numbers
		let mant1 = num1[0], mant2 = num2[0], exp1 = num1[1] | 0 , exp2 = num2[1] | 0;
		// if outside precision, return largest
		if(exp1-exp2>12){
			return num1;
		}
		else if(exp2-exp1>12){
			return num2;
		}
		// if not, antinormalize
		while(exp1 > exp2){
			mant1*=10;
			exp1--;
		}
		while(exp2 > exp1){
			mant2*=10;
			exp2--;
		}
		if(subtract){
			mant2*=-1;
		}
		return increm.normalize([mant1+mant2,exp1]);
	},
	multFloat: function(num, float){ // multiply increm by float
		if(Number.isFinite(float)==false){
			return num;
		}
		return increm.normalize([num[0]*float, num[1]]);
	},
	toFloat: function(num){
		return Number((num[0] * (10**(num[1]|0))).toPrecision(12));
	},
	compare: function(num1, num2){ // greater than or equal to
		let n1 = increm.normalize(num1), n2 = increm.normalize(num2);
		if(n1[1]>n2[1]){
			return true;
		}
		else if(n1[1]<n2[1]){
			return false;
		}
		else if(n1[0]>=n2[0]){
			return true;
		}
		return false;
	},
	normalize: function(num){ // normalize mantissa to 0 <= m < 10
		let mantissa = num[0], exponent = num[1] | 0;
		if(mantissa >= 1 && mantissa < 10){ // return up here as most of the time it's within range, saves a bunch of comparisons
			return num;
		}
		// if mantissa is zero, return to prevent infinite loop
		if(mantissa==0){
			return [0, 0];
		}
		// only one of these conditions will ever be true
		while(mantissa>=10){
			mantissa/=10;
			exponent++;
		}
		while(mantissa<1){
			mantissa*=10;
			exponent--;
		}
		// trying to prevent floating point fuckery
		mantissa = Math.round(mantissa*1e12)/1e12
		if(mantissa >= 10){
			mantissa=1
			exponent++;
		}
		return [Math.max(mantissa, 1), exponent | 0]; // does | 0 again to stop exponent from going out of range
	}
}
