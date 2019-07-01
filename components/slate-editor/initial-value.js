import { Value } from 'slate'
// Create our initial value...
export const initialValue = Value.fromJSON({
    document: {
      nodes: [
        {
          object: 'block',
          type: 'paragraph',
          nodes: [
            {
              object: 'text',
              text: '',
            },
          ],
        },
      ],
    },
  })