# heading-enumerator

This is a small JS project that automatically enumerates <h> heading elements in an HTML document that profides significant customization in how enumerations are presented.

## Customization

A call to the `heading_enumerator` function might look like

```
heading_enumerator("autoenumerate", 2, "Section ", "R.r", ": ");
```

Its five arguments are

- `target_class`: The HTML class that will have enumerations inserted. The class name provided here should only ever be applied to `<h1>`, `<h2>`, etc. Non-`<h>` elements won't work.
- `starting_level`: The first `<h>` level that the enumerator will label. Anything above this level will not have its content altered.
- `prepunctuation`: Text that will come before the enumeration in all altered headings. Text here might be "Section " or "§".
- `form`: A string that shows how the enumeration should be formatted through various levels. Each instance of the characters "0", "1", "A", "a", "R", "r" represents a heading level that will be enumerated. Levels marked "0"/"1" use numeric enumeration beginning at 0/1 respectively; levels marked "A"/"a" use uppercase/lowercase alphabetical enumeration; levels marked "R"/"r" use uppercase/lowercase Roman numeral enumeration. Any characters other than those six are interpreted as punctuation that go between the levels. Punctuation will only appear if the level to its right is present (i.e. a `form` of "A.a" will only place periods when the second level is present). The exception is punctuation at the end of `form` (i.e. "A(1)" will show both parenthee whenever the second level is present).
- `postpunctuation`: Text that will come between the enumeration and the normal heading content.
