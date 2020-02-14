export default function() {
  return {
    settings: {
      url: '_mock.html',
    },
    'Travel Plan A': {
      func: ['setPlan', 'A'],
      description: 'top plan\nmost expensive plan\n',
      settings: {
        url: 'other-page.html',
      },
      planet: {
        switch: {
          Earth: {
            func: ['setLocation', 'earth'],
            description: 'less capacity, fullfilled water',
          },
          Mars: [['setLocation', 'mars']],
          Sun: ['setLocation', 'sun'],
        },
        'view statistics': ['view.displayStatistics'],
      },
    },
    'Travel Plan B': ['setPlan', 'B'],
    'Travel Plan Z': {
      funcs: [
        ['setPlan', 'Z'],
        ['setLocation', 'Cell Game', true],
      ],
    },
  }
}
