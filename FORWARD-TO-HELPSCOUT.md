We forward inbound and outbound emails to Help Scout using [Gmail Compliance](https://admin.google.com/ac/apps/gmail/compliance) > Content compliance

## Add rule "Inbound to Help Scout"

1. Email messages to affect:
   Inbound

2. If ALL of the following match the message

- Location: Subject
  Matches regex: Support Request \[\w+\]

- Location: Recipients header
  Equals: investors@orthogonalthinker.com

3. Add more recipients:
   help@orthogonal.helpscoutapp.com

## Add rule "Outbound to Help Scout"

1. Email messages to affect:
   Outbound

2. If ALL of the following match the message

- Location: Subject
  Matches regex: Support Request \[\w+\]

- Location: Sender header
  Equals: investors@orthogonalthinker.com

3. Add more recipients:
   help@orthogonal.helpscoutapp.com
