# Editorial review: the 200 expansion drafts

Compared against all 306 live Supabase prompt rows on 21 October 2026, including both English and French. French adaptations were treated as the same underlying idea, not as additional topics. Also reviewed the drafts against each other. The user subsequently authorised the selected set for import; 352 bilingual rows were imported on 21 October 2026. See [the import record](prompt-bank-expansion.md).

## Recommendation

**Final selection: 170 kept as written, 24 dropped, and 6 approved rewrites.** The user explicitly retained EL05 and RE06, approved all six rewrites, then authorised importing the resulting 176 ideas. All were adapted into French and imported through `20261021120000_expand_reviewed_prompt_bank.sql` on 21 October 2026.

The 352 additions take the live bank from 306 to 658 prompt rows. Existing content and IDs, including the separately flagged legacy duplicates, are preserved.

## Does the tone fit?

Mostly yes. The live bank works best when it starts with something recognisable, offers one clear hook, and invites an opinion, story, explanation or playful choice. It mixes practical and imaginative prompts without requiring a correct answer. The stronger drafts continue that approach.

The weaker drafts overuse office problem-solving, build elaborate premises before the speaker can start, or revisit an existing question with a different time limit or prop. I have not treated a shared theme or speaking skill alone as duplication: related prompts stay when they open up meaningfully different answers. The more subjective tone cuts are labelled as such.

## Your shorter review list

The initial review flagged 32 exceptions. Final decisions: 24 cuts accepted, two questions retained and all six rewrites approved. The sections below preserve the rationale. Original draft files stay intact.

### Confirmed keeps after review

The user considers these sufficiently distinct from the live bank:

- **EL05** — Which everyday task looks easy until you have to explain every step to a beginner?
- **RE06** — You are introducing two friends who have almost nothing in common. How would you get their conversation started?

### Suggested cuts: repeated ideas (15)


**LE15 — You have to describe a familiar object without using its name, its colour or what it is made of. Choose an object and try.**

Near-repeat: Another constrained description exercise. The live food prompt and jargon-free explanation already cover this speaking task.

Live reference: #164: “Which familiar food would be hardest to explain without naming its ingredients?” / #250: “Explain something you understand well without using its usual technical terms.”


**CU04 — Tell a familiar story from the point of view of a character who usually gets ignored.**

Overlap within drafts: Keep CU10 instead: a minor character’s life after the ending gives the perspective shift a more specific new direction.

**SO10 — A street is closed to cars for one day. Describe what would convince residents to try it again—or decide against it.**

Near-repeat: Returns to the existing cars-versus-pedestrians debate, with a trial day as the new framing.

Live reference: #194: “How should a town decide between more parking and more pedestrian space?”

**SO12 — Should a queue hold a place for someone who leaves briefly? Propose a rule strangers could accept.**

Near-repeat: The live bank already asks for a fair queue system. Holding a place is a narrower version of that discussion.

Live reference: #108: “Invent a better way to organise a queue without making anyone feel cheated.”

**SO14 — A popular viewing spot is becoming damaged by visitors. How could people keep enjoying it while helping it recover?**

Near-repeat: The existing visitor-responsibility prompt already invites this discussion about protecting popular destinations.

Live reference: #196: “What responsibility do visitors have towards the people who live in a popular destination?”

**WO04 — Which matters more on someone's first day: feeling useful or feeling welcome? Design a first day around your answer.**

Near-repeat: A first-day plan is too close to the existing first-week onboarding question.

Live reference: #43: “What should a newcomer learn during their first week in a team?”

**WO05 — Two colleagues do equally valuable work, but only one is visible to the rest of the team. How could their contributions be recognised fairly?**

Near-repeat: Essentially the same question about fairly recognising invisible work.

Live reference: #40: “Describe a fair way to recognise work that usually goes unnoticed.”

**WO10 — Would you rather have a predictable working day or a different challenge every day? Explain when your preference might change.**

Near-repeat: The same predictable-work-versus-new-challenges choice, with an extra follow-up.

Live reference: #41: “Would you rather have predictable tasks or frequent new challenges?”

**WO13 — You are asked to train your replacement in a single afternoon. What would you teach first, and what would you write down?**

Near-repeat: Training a replacement is already covered by the handover prompt; the afternoon limit adds little.

Live reference: #51: “Plan a handover so someone can take over a project without constant questions.”

**TR02 — A visitor has only one hour in your area. What would you show them, and what would you deliberately leave out?**

Near-repeat: Showing a visitor your area without standard attractions is already covered. The one-hour constraint is not enough of a new angle.

Live reference: #70: “Plan a visit to your area for someone who dislikes famous attractions.”

**TR10 — You can take a visitor to one ordinary place that tourists rarely see. Explain why it deserves their time.**

Near-repeat: Very close to the live alternative local-tour prompt and to TR02 in the drafts.

Live reference: #70: “Plan a visit to your area for someone who dislikes famous attractions.”

**TR19 — Would you take a trip if you could not tell anyone about it afterward? Explain whether that would change your destination.**

Near-repeat: Travel without being able to tell anyone and travel without photos can lead to substantially the same discussion about private enjoyment versus sharing.

Live reference: #74: “How would you enjoy a trip if every photo you took vanished afterward?”

**TE02 — Which device feature would you find hardest to explain to someone from fifty years ago?**

Near-repeat: Explaining modern technology to someone from the past overlaps strongly with explaining a digital habit to someone unfamiliar with the internet.

Live reference: #13: “Explain a familiar digital habit to someone who has never used the internet.”

**TE19 — Your calendar starts declining invitations on your behalf. What would it need to understand before you trusted it?**

Near-repeat: The calendar example narrows the existing question about technology anticipating wishes rather than waiting for instructions.

Live reference: #17: “Would you prefer technology that anticipates your wishes or waits for clear instructions?”

**LE12 — Explain how you would learn a board game if nobody available had played it before.**

Overlap within drafts: Keep LE01: explaining a game to another person provides a clearer speaking task than describing how to read or discover the rules.

### Suggested cuts: weaker fit (9)

**EL11 — You can taste everything perfectly, but only eat meals at room temperature for a week. What would you put on the menu?**

Weak setup: The reassurance about tasting perfectly makes the room-temperature restriction feel arbitrary. It is more likely to produce a menu list than an engaging discussion.

**EL19 — What small repair have you been putting off—or could an imaginary character be putting off? Make the case for finally doing it today.**

Too much scaffolding: The imaginary-character detour makes an ordinary procrastination question cumbersome, without a particularly fresh payoff.

**CU07 — You must recommend a work you have never finished. Explain why it still deserves someone's attention.**

Forced premise: Requires the speaker to endorse an unfinished work. The existing bank’s recommendation prompts offer more freedom and a more natural starting point.

**IM08 — A tiny dragon has moved into a public library. Explain how the librarian persuades everyone it can stay.**

Tone drift: The library dragon feels closer to a children’s story assignment than the existing bank’s playful, everyday-adjacent hypotheticals. A taste-based cut, not a duplication claim.

**IM13 — A mountain applies to move closer to the sea. Present its request to the committee responsible.**

Tone drift: The committee application for a mountain adds bureaucracy to an already abstract premise; more setup than conversational payoff.

**IM15 — You become the caretaker of a cloud for a week. Describe the instructions you receive.**

Tone drift: Cloud-care instructions lean towards whimsical writing rather than an immediately accessible speaking question.

**WO12 — Your team can remove one recurring report. How would you decide which one nobody would miss?**

Too narrow: Assumes familiarity with recurring reports and invites process optimisation rather than a broadly relatable conversation.

**WO14 — A colleague takes excellent notes that nobody reads. What could make those notes more useful?**

Too procedural: Another office-efficiency task in a batch already heavy on team problem-solving. Less lively than the work prompts worth keeping.

**LE18 — Invent a way to practise directions with someone without leaving the room.**

Too instructional: Asks the speaker to design a language-teaching exercise. More lesson planning than an engaging topic in its own right.

### Approved rewrites (6)

The user approved all six replacement versions below. Use the proposed text in any future adaptation or import; the originals remain here for the audit trail.

**EL08**

Original: You find a shopping list with five very different items. Invent the story behind it.

Why change it: The speaker has to invent the five items as well as connect them. Supply the hook so they can start talking immediately.

Proposed: **A shopping list says: lemons, string, a birthday candle, batteries and a single potato. Who wrote it, and what are they planning?**

**SO05**

Original: A neighbourhood noticeboard is full of complaints. Write the first positive notice that might change its tone.

Why change it: “Write” points towards a written task rather than speaking. Keep the neighbourhood observation and make the action oral.

Proposed: **Your neighbourhood noticeboard is full of complaints. What good thing would you announce to change the mood?**

**LE11**

Original: You can ask an expert to explain one thing, but you cannot ask a follow-up question. How would you phrase your question?

Why change it: Forbidding follow-up questions makes the task unnecessarily restrictive. Asking about expertise is still useful if it is distinct from the existing artist-process prompt.

Proposed: **What is something you have never quite understood? Choose one question you would ask someone who knows it well.**

**IM01**

Original: A lost-property office receives things people have forgotten emotionally: courage, patience, curiosity. Describe its busiest day.

Why change it: “Things people have forgotten emotionally” is awkward and hard to interpret. Keep the lost-property idea, make the premise concrete.

Proposed: **A lost-property office has your missing patience, courage and curiosity. Which do you collect first, and where might you have left it?**

**WO19**

Original: You are choosing between a polished proposal with few details and a rough proposal with a clear plan. What would you ask before deciding?

Why change it: The original polished-versus-detailed choice nudges the speaker towards an obvious answer and sounds like an interview exercise.

Proposed: **Have you ever been won over by a good presentation of a weak idea? What makes an idea sound better than it is?**

**TE11**

Original: Your phone can display only one number on its home screen. What number would be useful without becoming a distraction?

Why change it: “Only one number” is unclear: a time, a count, a measurement? Make the choice understandable and worth explaining.

Proposed: **Your phone can show you just one daily statistic. What would you choose to see, and which number would you rather stop checking?**

## Separate finding: duplicates already live

Two same-language exact duplicate pairs exist in Supabase:

- Work, French: #2 and #5 — “Quel aspect de ton travail trouves-tu le plus intéressant ?”
- Technology, English: #3 and #6 — “Has technology made your life simpler or more complicated?”

These are separate from the expansion recommendations. Do not delete either ID casually: practice history or hidden-prompt records may reference them. No live rows were changed.

## Audit notes

- None of the 200 drafts is an exact text duplicate of a live prompt or another draft. This does not imply conceptual originality; the near-repeats above are an editorial assessment.
- English/French pairs in the live bank intentionally share ideas and were not flagged for removal.
- The final import request authorised the 176 selected ideas, including unflagged keeps and the six approved rewrites.

## Full disposition index

This compact index is for tracking; it is not another reading assignment. The CSV next to this document includes every original prompt, disposition, rationale, live reference IDs and any proposed replacement.

- **EL** — Keep: EL01, EL02, EL03, EL04, EL05, EL06, EL07, EL09, EL10, EL12, EL13, EL14, EL15, EL16, EL17, EL18, EL20; drop: EL11, EL19; approved rewrite: EL08.
- **RE** — Keep: RE01, RE02, RE03, RE04, RE05, RE06, RE07, RE08, RE09, RE10, RE11, RE12, RE13, RE14, RE15, RE16, RE17, RE18, RE19, RE20; drop: none; approved rewrite: none.
- **CU** — Keep: CU01, CU02, CU03, CU05, CU06, CU08, CU09, CU10, CU11, CU12, CU13, CU14, CU15, CU16, CU17, CU18, CU19, CU20; drop: CU04, CU07; approved rewrite: none.
- **SO** — Keep: SO01, SO02, SO03, SO04, SO06, SO07, SO08, SO09, SO11, SO13, SO15, SO16, SO17, SO18, SO19, SO20; drop: SO10, SO12, SO14; approved rewrite: SO05.
- **ME** — Keep: ME01, ME02, ME03, ME04, ME05, ME06, ME07, ME08, ME09, ME10, ME11, ME12, ME13, ME14, ME15, ME16, ME17, ME18, ME19, ME20; drop: none; approved rewrite: none.
- **LE** — Keep: LE01, LE02, LE03, LE04, LE05, LE06, LE07, LE08, LE09, LE10, LE13, LE14, LE16, LE17, LE19, LE20; drop: LE12, LE15, LE18; approved rewrite: LE11.
- **IM** — Keep: IM02, IM03, IM04, IM05, IM06, IM07, IM09, IM10, IM11, IM12, IM14, IM16, IM17, IM18, IM19, IM20; drop: IM08, IM13, IM15; approved rewrite: IM01.
- **WO** — Keep: WO01, WO02, WO03, WO06, WO07, WO08, WO09, WO11, WO15, WO16, WO17, WO18, WO20; drop: WO04, WO05, WO10, WO12, WO13, WO14; approved rewrite: WO19.
- **TR** — Keep: TR01, TR03, TR04, TR05, TR06, TR07, TR08, TR09, TR11, TR12, TR13, TR14, TR15, TR16, TR17, TR18, TR20; drop: TR02, TR10, TR19; approved rewrite: none.
- **TE** — Keep: TE01, TE03, TE04, TE05, TE06, TE07, TE08, TE09, TE10, TE12, TE13, TE14, TE15, TE16, TE17, TE18, TE20; drop: TE02, TE19; approved rewrite: TE11.
