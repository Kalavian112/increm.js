# increm.js
Tiny Javascript bignum library for incremental games, supporting numbers up to 9.999(...)e2147483647

Does not support infinity or negative numbers, only operations are add, subtract, multiply float, and comparison, just made for an incremental game.

All functions are inside increm object. Increm numbers are represented by an array: [mantissa, exponent] to use outside the library (converting to strings), additionally all calculations have 12 decimal digits of accuracy.

- from: converts float into increm, with optional exponent. increm.from(1.273, 500) returns 1.273e500.
- addSub: adds or subtracts two increm based on third parameter (subtract=true)
- multFloat: multiplies increm by float
- toFloat: converts increm to float if within 1.76e308
- compare: returns true if increm1 >= increm2
- normalize: normalizes mantissa to 1 <= m < 10. Used by almost every other function.
