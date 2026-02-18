---
order: 5
title: "Background & Motivation"
---

- We were building a new digital repository using InvenioRDM
- Our existing IR metadata has controlled values but no URIs
- Types: places, names (people, organizations), subjects, genres/forms

```xml
<mods>
    <subject authority="ulan" type="personal">
        <name>Ferlinghetti, Lawrence</name>
    </subject>
</mods>
```

Mapped all our existing terms to URIs in LC vocabularies

Why did I choose LC? Familiar, comprehensive.
