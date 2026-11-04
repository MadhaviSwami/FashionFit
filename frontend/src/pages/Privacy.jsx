const SECTIONS = [
  {
    title: 'Photos you upload or capture',
    body: [
      'Your photo stays in your browser until you press "Generate try-on".',
      'When you generate a try-on, the photo is sent to the Fashion Fit server and to the AI provider configured by the site operator (Hugging Face or Replicate), only to create the try-on image. Those providers have their own privacy policies.',
      'The Fashion Fit server processes photos in memory and does not save your original photo.',
      'The photo quality check (face, blur and brightness detection) also runs in memory, and nothing is saved.',
    ],
  },
  {
    title: 'Try-on history (optional)',
    body: [
      'If you are logged in and tick "Save the generated result to my try-on history", the generated result image (not your original photo) is stored on the server.',
      'You can delete any saved result at any time from your profile. Deleting your account deletes all saved results.',
    ],
  },
  {
    title: 'Account information',
    body: [
      'When you sign up we store your name, email address and a securely hashed password (we never store your actual password).',
    ],
  },
  {
    title: 'Browser storage',
    body: [
      'Your login session, and your body measurements if you tick "Remember my measurements", are kept in your browser (localStorage). They are never sent to our server.',
    ],
  },
  {
    title: 'Camera access',
    body: [
      'The camera is only used after you press "Start camera" and grant permission. Nothing is recorded or sent until you capture a photo and choose to use it. The camera stops when you capture a photo or leave the page.',
    ],
  },
  {
    title: 'Pinterest content',
    body: [
      'Some body shapes in the style guide show inspiration pins using Pinterest’s official embed. When that section is visible, your browser loads content directly from Pinterest, which has its own privacy policy.',
    ],
  },
  {
    title: 'Contact messages',
    body: ['Messages sent through the contact form are stored so we can reply to them.'],
  },
  {
    title: 'Your choices',
    body: [
      'You can delete saved try-on results or your whole account from your profile page at any time.',
      'Fashion Fit does not sell anything and does not sell or share personal data for advertising.',
    ],
  },
]

export default function Privacy() {
  return (
    <div className="container-page max-w-3xl py-12">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Privacy Policy</h1>
      <p className="mt-4 text-ink/60">How Fashion Fit handles your photos and personal information.</p>
      <div className="mt-10 space-y-8">
        {SECTIONS.map((s) => (
          <section key={s.title}>
            <h2 className="font-sans text-lg font-semibold">{s.title}</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-ink/70">
              {s.body.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
