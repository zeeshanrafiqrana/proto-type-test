# **Code Challenge — Simplifying Dynamic Data for no-code tools**

**Version 1 - March 2026**

## **Context**

Non-technical users struggle with concepts like `{{input.value}}` but have a strong desire to create dynamic apps.

An example of a low-code version is [retool](https://retool.com/) which uses `{{}}` that works great for technical users but becomes difficult for non-technical users.

Your goal is to design a **simpler, more intuitive way** to work with dynamic data in a UI.

If you're not familiar with low-code tools you can signup for retool and try to drag and drop an input and a text component to bind the input value to the text

## **Challenge**

Create a small prototype that allows a non-technical user to:

1. Display dynamic data (e.g. show a name entered in an input)

2. Perform at least **2 additional actions**, such as:
   - Conditional logic (e.g. show/hide based on input)

   - Combining values (e.g. full name)

   - Transformations (e.g. uppercase, formatting)

⚠️ Constraint:

- Do **not** use syntax like `{{ }}` or anything code-like in the UX

---

## **Provided UI**

- Text element

- Example input fields: Name & age

You can change this if needed, but keep it simple.

---

## **Deliverables**

- Working prototype (rough is fine)

- 5–10 min Loom (or short write-up) explaining:
  - Your approach

  - How a non-technical user would use it

  - Why it’s better than traditional approaches

---

## **What we care about**

- Your **thinking**, not polish

- Simplicity over complexity

- Clear mental model 

**Delivery**

When you are finished, send an invite to your github, bitbucket or gitlab repository to: ismail-doitbig

Include a loom with your thought process.

**You will be judged on:**

- 7 points: Thought process and coming up with a solution
- 3 points: The ease of use for the solution

Max reachable score 10/10 points

Besides the above points your app will be compared against other developer submissions.

Goodluck!

---

## Prototype write-up

### Approach

I built a plain-language **Dynamic Text Builder** where users never write expressions or code-like syntax.

Instead of typing bindings, users compose output text by combining:

- **Static text segments** (free text)
- **Dynamic value chips** (First Name, Age)
- **Transform options** (As typed, UPPERCASE, lowercase, Title Case)
- **Conditional visibility** (is not empty, is empty, equals, does not equal, contains)

### How a non-technical user uses it

1. In **Build** mode, click a text component (or add a new one).
2. Give it a label and build content by adding text and inserting input values.
3. Set formatting on value chips (for example, uppercase).
4. Optionally enable conditional visibility and choose operator/value rules.
5. Switch to **Preview** mode and type values in **First Name** and **Age** to see live output.

### Why this is better than traditional `{{ }}` style

- **No syntax learning curve**: users never type technical expressions.
- **Guided decisions**: each action is done with buttons, chips, dropdowns, and toggles.
- **Lower error rate**: constrained controls reduce expression mistakes.
- **Clear mental model**: users think in terms of “add text → insert value → format → optional rule”.

### Requirements coverage

- Dynamic data display: text updates live from First Name and Age inputs.
- Additional action 1: Combining values by composing multiple segments in one text component.
- Additional action 2: Transformations via chip formatting (uppercase/lowercase/title case).
- Additional action 3: Conditional visibility with multiple operators.
- No `{{ }}` or code-like UX.
