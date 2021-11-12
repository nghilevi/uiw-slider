export { bem, joinClasses, bemFromBlock }

type ModifierObject = { [mod: string]: any }
type ClassString = string | (string | undefined | null)[]
type Modifier = ClassString | ModifierObject
type Bem = (base: string, ...modifiers: Modifier[]) => string

const bem: Bem = (base, ...modifiers) => {
    // "base" is either just a "block", or a "block__element" string
    let out = base

    for (const modifier of modifiers) {
        if (typeof modifier === 'string') {
            if (modifier) out += ` ${base}--${modifier}`
            continue
        }

        const modifierArray = Array.isArray(modifier)
            ? modifier
            : Object.keys(modifier).filter((k) => modifier[k])

        for (const modifier of modifierArray) {
            if (modifier) out += ` ${base}--${modifier}`
        }
    }

    return out
}

const joinClasses = (
    ...classes: (ClassString | null | undefined)[]
): string => {
    let out = ''

    for (const cssClass of classes) {
        if (!cssClass) continue

        const classArray = typeof cssClass === 'string' ? [cssClass] : cssClass

        for (const cssClass of classArray) {
            if (cssClass) out += ` ${cssClass}`
        }
    }

    return out.trim()
}

const bemFromBlock =
    (block: string): Bem =>
    (element, ...modifiers) =>
        bem(`${block}__${element}`, ...modifiers)
