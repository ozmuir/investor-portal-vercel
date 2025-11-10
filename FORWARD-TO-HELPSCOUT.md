We forward inbound and outbound emails to Help Scout using [Gmail Compliance](https://admin.google.com/ac/apps/gmail/compliance) > Content compliance

All the matches are done from the perspective of **investors@orthogonalthinker.com**

## Add rule `Inbound to Help Scout`

1. Email messages to affect:

   - `Inbound`
   - `Internal - Receiving`

2. If ALL of the following match the message

- Location: `Recipients header`
  Equals: `investors@orthogonalthinker.com`

- Location: `Subject`
  Matches regex: `Support Request \[\w+\]`

3. Add more recipients: `help@orthogonal.helpscoutapp.com`

## Add rule `Outbound to Help Scout`

1. Email messages to affect:

- `Outbound`
- `Internal - Sending`

2. If ALL of the following match the message

- Location: `Sender header`
  Equals: `investors@orthogonalthinker.com`

- Location: `Subject`
  Matches regex: `Support Request \[\w+\]`

3. Add more recipients: `help@orthogonal.helpscoutapp.com`
