
    var MAX_SIZE = 512;
    var MIN_SIZE = 16;
	var WIDTH = 512;
	var HEIGHT = 512;
    var size = MAX_SIZE;
    var colors = {
       original: {
           bg_dark: '#E44D26',
           bg_light: '#F16529',
           fg_dark: '#EBEBEB',
           fg_light: '#FFFFFF',
           text: '#000000'
       },
       bw: {
           bg_dark: '#231F20',
           bg_light: '#4F4B4C',
           fg_dark: '#D3D2D2',
           fg_light: '#FFFFFF',
           text: '#000000'
       } 
    };
    
    // DOM-related variables
    //var canvas = document.querySelector('canvas');
    //var ctx = canvas.getContext('2d');
	
	function clearCanvasObjects(ctx, width, height) {
        WIDTH = width;
		HEIGHT = height;
		ctx.clearRect(0, 0, width, height);
	}

    function drawCanvasObject(ctx, shape, size, type, posx , posy) {
		shape = shape ? shape : "logo";
		size = size ? size : 100;
		type = type ? type : "original";
		posx = posx ? posx : 0;
		posy = posy ? posy : 0;
        
        var radius;
        var twopi = Math.PI * 2;
        
        // Calculate the path coordinates for each shape            
        var shapes = {
            logo: [
                {
                    color: 'bg_dark',
                    comment: 'Dark part of the background',
                    path: [
                        [size / 7.175, size / 1.111],
                        [size / 16.663, 0],
                        [size / 1.063, 0],
                        [size / 1.162, size / 1.111],
                        [size / 2, size / 1]
                    ]
                },
                {
                    color: 'bg_light',
                    comment: 'Light part of the background',
                    path: [
                        [size / 2, size / 1.083],
                        [size / 1.263, size / 1.187],
                        [size / 1.162, size / 13.588],
                        [size / 2, size / 13.588]
                    ]
                },
                {
                    color: 'fg_dark',
                    comment: 'Dark part of the foreground',
                    path: [
                        [size / 2, size / 2.455],
                        [size / 2.825, size / 2.455],
                        [size / 2.908, size / 3.397],
                        [size / 2, size / 3.397],
                        [size / 2, size / 5.435],
                        [size / 4.48, size / 5.435],
                        [size / 3.953, size / 1.931],
                        [size / 2, size / 1.931]
                    ]
                },
                {
                    color: 'fg_dark',
                    path: [
                        [size / 2, size / 1.441],
                        [size / 2.655, size / 1.513],
                        [size / 2.712, size / 1.745],
                        [size / 3.877, size / 1.745],
                        [size / 3.658, size / 1.34],
                        [size / 2, size / 1.236]
                    ]
                },
                {
                    color: 'fg_light',
                    comment: 'Light part of the foreground',
                    path: [
                        [size / 2, size / 2.455],
                        [size / 2, size / 1.931],
                        [size / 1.573, size / 1.931],
                        [size / 1.606, size / 1.513],
                        [size / 2, size / 1.441],
                        [size / 2, size / 1.236],
                        [size / 1.374, size / 1.34],
                        [size / 1.322, size / 2.455]
                    ]
                },
                {
                    color: 'fg_light',
                    path: [
                        [size / 2, size / 5.435],
                        [size / 2, size / 3.397],
                        [size / 1.305, size / 3.397],
                        [size / 1.288, size / 5.435]
                    ]
                }
            ],
            text: [
                {
                    color: 'text',
                    comment: 'The text (H)',
                    path: [
                        [size / 4.724, 0],
                        [size / 3.895, 0],
                        [size / 3.895, size / 22.456],
                        [size / 3.356, size / 22.456],
                        [size / 3.356, 0],
                        [size / 2.915, 0],
                        [size / 2.915, size / 7.416],
                        [size / 3.356, size / 7.416],
                        [size / 3.356, size / 11.149],
                        [size / 3.895, size / 11.149],
                        [size / 3.895, size / 7.416],
                        [size / 4.724, size / 7.416],
                        [size / 4.724, 0]
                    ]
                },
                {
                    color: 'text',
                    comment: 'The text (T)',
                    path: [
                        [size / 2.486, size / 22.362],
                        [size / 2.757, size / 22.362],
                        [size / 2.757, 0],
                        [size / 2.053, 0],
                        [size / 2.053, size / 22.362],
                        [size / 2.235, size / 22.362],
                        [size / 2.235, size / 7.416],
                        [size / 2.485, size / 7.416],
                        [size / 2.485, size / 22.362]
                    ]
                },
                {
                    color: 'text',
                    comment: 'The text (M)',
                    path: [
                        [size / 1.973, 0],
                        [size / 1.806, 0],
                        [size / 1.716, size / 21.105],
                        [size / 1.635, 0],
                        [size / 1.518, 0],
                        [size / 1.518, size / 7.416],
                        [size / 1.629, size / 7.416],
                        [size / 1.629, size / 14.703],
                        [size / 1.716, size / 8.624],
                        [size / 1.815, size / 14.703],
                        [size / 1.815, size / 7.416],
                        [size / 1.973, size / 7.416],
                        [size / 1.973, 0]
                    ]
                },
                {
                    color: 'text',
                    comment: 'The text (L)',
                    path: [
                        [size / 1.468, 0],
                        [size / 1.377, 0],
                        [size / 1.377, size / 11.077],
                        [size / 1.267, size / 11.077],
                        [size / 1.267, size / 7.416],
                        [size / 1.468, size / 7.416],
                        [size / 1.468, 0]
                    ]
                },
                {
                    color: 'bg_dark',
                    comment: 'Dark background',
                    path: [
                        [size / 4.756, size / 1.087],
                        [size / 6.86, size / 5.088],
                        [size / 1.171, size / 5.088],
                        [size / 1.266, size / 1.087],
                        [size / 2.002, size / 1]
                    ]
                },
                {
                    color: 'bg_light',
                    comment: 'Light background',
                    path: [
                        [size / 2, size / 1.066],
                        [size / 1.362, size / 1.145],
                        [size / 1.266, size / 3.912],
                        [size / 2, size / 3.912]
                    ]
                },
                {
                    color: 'fg_dark',
                    comment: 'Dark foreground',
                    path: [
                        [size / 2, size / 1.909],
                        [size / 2.613, size / 1.909],
                        [size / 2.67, size / 2.309],
                        [size / 2, size / 2.309],
                        [size / 2, size / 2.904],
                        [size / 2.001, size / 2.904],
                        [size / 3.602, size / 2.904],
                        [size / 3.575, size / 2.716],
                        [size / 3.316, size / 1.633],
                        [size / 2, size / 1.633]
                    ]
                },
                {
                    color: 'fg_dark',
                    path: [
                        [size / 2, size / 1.326],
                        [size / 2.002, size / 1.326],
                        [size / 2.495, size / 1.374],
                        [size / 2.535, size / 1.522],
                        [size / 2.886, size / 1.522],
                        [size / 3.273, size / 1.522],
                        [size / 3.146, size / 1.256],
                        [size / 2.002, size / 1.181],
                        [size / 2, size / 1.181]
                    ]
                },
                {
                    color: 'fg_light',
                    comment: 'Light foreground',
                    path: [
                        [size / 2.001, size / 1.909],
                        [size / 2.001, size / 1.633],
                        [size / 1.642, size / 1.633],
                        [size / 1.671, size / 1.374],
                        [size / 2.001, size / 1.326],
                        [size / 2.001, size / 1.181],
                        [size / 1.467, size / 1.256],
                        [size / 1.464, size / 1.28],
                        [size / 1.421, size / 1.826],
                        [size / 1.417, size / 1.909],
                        [size / 1.466, size / 1.909]
                    ]
                },
                {
                    color: 'fg_light',
                    path: [
                        [size / 2.001, size / 2.904],
                        [size / 2.001, size / 2.504],
                        [size / 2.001, size / 2.31],
                        [size / 2.001, size / 2.309],
                        [size / 1.401, size / 2.309],
                        [size / 1.401, size / 2.309],
                        [size / 1.401, size / 2.309],
                        [size / 1.397, size / 2.421],
                        [size / 1.389, size / 2.716],
                        [size / 1.385, size / 2.904]
                    ]
                }
            ],
            braille: [
                {
                    color: 'text',
                    comment: 'The text (H)',
                    path: [
                        [size / 4.414, size / 42.667, size / 46.545]
                    ]
                },
                {
                    color: 'text',
                    path: [
                        [size / 3.507, size / 42.667, size / 102.4]
                    ]
                },
                {
                    color: 'text',
                    path: [
                        [size / 4.414, size / 12.190, size / 46.545]
                    ]
                },
                {
                    color: 'text',
                    path: [
                        [size / 3.507, size / 12.190, size / 46.545]
                    ]
                },
                {
                    color: 'text',
                    path: [
                        [size / 4.414, size / 7.111, size / 102.4]
                    ]
                },
                {
                    color: 'text',
                    path: [
                        [size / 3.507, size / 7.111, size / 102.4]
                    ]
                },
                {
                    color: 'text',
                    comment: 'The text (T)',
                    path: [
                        [size / 2.667, size / 42.667, size / 102.4]
                    ]
                },
                {
                    color: 'text',
                    path: [
                        [size / 2.246, size / 42.667, size / 46.545]
                    ]
                },
                {
                    color: 'text',
                    path: [
                        [size / 2.667, size / 12.190, size / 46.545]
                    ]
                },
                {
                    color: 'text',
                    path: [
                        [size / 2.246, size / 12.190, size / 46.545]
                    ]
                },
                {
                    color: 'text',
                    path: [
                        [size / 2.667, size / 7.111, size / 46.545]
                    ]
                },
                {
                    color: 'text',
                    path: [
                        [size / 2.246, size / 7.111, size / 102.4]
                    ]
                },
                {
                    color: 'text',
                    comment: 'The text (M)',
                    path: [
                        [size / 1.829, size / 42.667, size / 46.545]
                    ]
                },
                {
                    color: 'text',
                    path: [
                        [size / 1.652, size / 42.667, size / 46.545]
                    ]
                },
                {
                    color: 'text',
                    path: [
                        [size / 1.829, size / 12.190, size / 102.4]
                    ]
                },
                {
                    color: 'text',
                    path: [
                        [size / 1.652, size / 12.190, size / 102.4]
                    ]
                },
                {
                    color: 'text',
                    path: [
                        [size / 1.829, size / 7.111, size / 46.545]
                    ]
                },
                {
                    color: 'text',
                    path: [
                        [size / 1.652, size / 7.111, size / 102.4]
                    ]
                },
                {
                    color: 'text',
                    comment: 'The text (L)',
                    path: [
                        [size / 1.414, size / 42.667, size / 46.545]
                    ]
                },
                {
                    color: 'text',
                    path: [
                        [size / 1.306, size / 42.667, size / 102.4]
                    ]
                },
                {
                    color: 'text',
                    path: [
                        [size / 1.414, size / 12.190, size / 46.545]
                    ]
                },
                {
                    color: 'text',
                    path: [
                        [size / 1.306, size / 12.190, size / 102.4]
                    ]
                },
                {
                    color: 'text',
                    path: [
                        [size / 1.414, size / 7.111, size / 46.545]
                    ]
                },
                {
                    color: 'text',
                    path: [
                        [size / 1.306, size / 7.111, size / 102.4]
                    ]
                },
                {
                    color: 'bg_dark',
                    comment: 'Dark background',
                    path: [
                        [size / 4.756, size / 1.087],
                        [size / 6.86, size / 5.088],
                        [size / 1.171, size / 5.088],
                        [size / 1.266, size / 1.087],
                        [size / 2.002, size / 1]
                    ]
                },
                {
                    color: 'bg_light',
                    comment: 'Light background',
                    path: [
                        [size / 2, size / 1.066],
                        [size / 1.362, size / 1.145],
                        [size / 1.266, size / 3.912],
                        [size / 2, size / 3.912]
                    ]
                },
                {
                    color: 'fg_dark',
                    comment: 'Dark foreground',
                    path: [
                        [size / 2.586, size / 2.51, size / 13.477]
                    ]
                },
                {
                    color: 'fg_dark',
                    comment: 'Dark foreground',
                    path: [
                        [size / 2.586, size / 1.652, size / 32]
                    ]
                },
                {
                    color: 'fg_dark',
                    comment: 'Dark foreground',
                    path: [
                        [size / 2.586, size / 1.237, size / 32]
                    ]
                },
                {
                    color: 'fg_light',
                    comment: 'Light foreground',
                    path: [
                        [size / 1.631, size / 2.51, size / 32]
                    ]
                },
                {
                    color: 'fg_light',
                    path: [
                        [size / 1.631, size / 1.652, size / 13.477]
                    ]
                },
                {
                    color: 'fg_light',
                    path: [
                        [size / 1.631, size / 1.237, size / 32]
                    ]
                }
            ],
            sign: [
                {
                    color: 'text',
                    comment: 'The text (H)',
                    fontsize: size / 3.765,
                    path: [
                        [size / 4.339, size / 5.818]
                    ],
                    text: 'H'
                },
                {
                    color: 'text',
                    comment: 'The text (T)',
                    fontsize: size / 3.765,
                    path: [
                        [size / 2.415, size / 5.818]
                    ],
                    text: 'T',
                },
                {
                    color: 'text',
                    comment: 'The text (M)',
                    fontsize: size / 3.765,
                    path: [
                        [size / 1.954, size / 5.818]
                    ],
                    text: 'M',
                },
                {
                    color: 'text',
                    comment: 'The text (L)',
                    fontsize: size / 3.765,
                    path: [
                        [size / 1.59, size / 5.818]
                    ],
                    text: 'L',
                },
                {
                    color: 'bg_dark',
                    comment: 'Dark background',
                    path: [
                        [size / 4.756, size / 1.087],
                        [size / 6.86, size / 5.088],
                        [size / 1.171, size / 5.088],
                        [size / 1.266, size / 1.087],
                        [size / 2.002, size / 1]
                    ]
                },
                {
                    color: 'bg_light',
                    comment: 'Light background',
                    path: [
                        [size / 2, size / 1.066],
                        [size / 1.362, size / 1.145],
                        [size / 1.266, size / 3.912],
                        [size / 2, size / 3.912]
                    ]
                },
                {
                    color: 'fg_light',
                    comment: 'The text (5)',
                    fontsize: size / 1.138,
                    path: [
                        [size / 4.491, size / 1.148]
                    ],
                    text: '5',
                }
            ],
            semantics: [
                {
                    color: 'text',
                    comment: 'Semantics',
                    path: [
                        [0, size / 3.926],
                        [size / 2, 0],
                        [size / 1, size / 3.926],
                        [size / 1, size / 2.382],
                        [size / 2, size / 6.057],
                        [0, size / 2.382]
                    ]
                },
                {
                    color: 'text',
                    comment: 'Semantics',
                    path: [
                        [0, size / 1.843],
                        [size / 2, size / 3.419],
                        [size / 1, size / 1.843],
                        [size / 1, size / 1.413],
                        [size / 2, size / 2.186],
                        [0, size / 1.413]
                    ]
                },
                {
                    color: 'text',
                    comment: 'Semantics',
                    path: [
                        [0, size / 1.205],
                        [size / 2, size / 1.71],
                        [size / 1, size / 1.205],
                        [size / 1, size / 1.005],
                        [size / 2, size / 1.333],
                        [0, size / 1.005]
                    ]
                }
            ],
            css3: [
                {
                    color: 'text',
                    comment: 'CSS3 & Styling',
                    path: [
                        [size / 6.707, 0],
                        [size / 8.661, size / 5.946],
                        [size / 1.25, size / 5.946],
                        [size / 1.284, size / 3.612],
                        [size / 10.68, size / 3.612],
                        [size / 16.541, size / 2.247],
                        [size / 1.342, size / 2.247],
                        [size / 1.415, size / 1.57],
                        [size / 2.321, size / 1.373],
                        [size / 5.213, size / 1.57],
                        [size / 4.803, size / 1.806],
                        [size / 25, size / 1.806],
                        [0, size / 1.324],
                        [size / 2.529, size / 1.103],
                        [size / 1.175, size / 1.324],
                        [size / 1.097, size / 2.213],
                        [size / 1.082, size / 2.558],
                        [size / 0.998, 0]
                    ]
                }
            ],
            effects: [
                {
                    color: 'text',
                    comment: '3D & Effects',
                    path: [
                        [size / 1.843, 0],
                        [size / 3.504, size / 12.06],
                        [size / 1.187, size / 3.797],
                        [size / 1.187, size / 1.616],
                        [size / 2.122, size / 1.354],
                        [size / 6.332, size / 1.569],
                        [size / 6.332, size / 3.458],
                        [size / 2.17, size / 2.583],
                        [size / 1.393, size / 3.288],
                        [size / 6.25, size / 8.108],
                        [0, size / 5.701],
                        [0, size / 1.329],
                        [size / 2.122, size / 1.105],
                        [size / 0.999, size / 1.363],
                        [size / 0.999, size / 6.761]
                    ]
                }
            ],
            multimedia: [
                {
                    color: 'text',
                    comment: 'Multimedia',
                    path: [
                        [size / 1.002, 0],
                        [size / 1.286, 0],
                        [size / 1.608, size / 6.438],
                        [size / 1.188, size / 6.438]
                    ]
                },
                {
                    color: 'text',
                    comment: 'Multimedia',
                    path: [
                        [size / 2, size / 6.438],
                        [size / 1.526, 0],
                        [size / 2.298, 0],
                        [size / 3.578, size / 6.438]
                    ]
                },
                {
                    color: 'text',
                    comment: 'Multimedia',
                    path: [
                        [size / 1.187, size / 1.642],
                        [size / 6.438, size / 1.642],
                        [size / 6.438, size / 6.371],
                        [size / 3.198, 0],
                        [size / 10.844, 0],
                        [0, size / 10.844],
                        [0, size / 1.308],
                        [size / 1.002, size / 1.308],
                        [size / 1.002, size / 6.438],
                        [size / 1.187, size / 6.438]
                    ]
                }
            ],
            device: [
                {
                    color: 'text',
                    comment: 'Device Access',
                    path: [
                        [size / 1.378, size / 4.93],
                        [size / 1.077, 0],
                        [size / 1.407, 0],
                        [size / 1.998, size / 4.75],
                        [size / 3.455, 0],
                        [size / 13.876, 0],
                        [size / 3.638, size / 4.93],
                        [0, size / 4.93],
                        [0, size / 1.06],
                        [size / 6.919, size / 1.06],
                        [size / 3.32, size / 1.06],
                        [size / 2.766, size / 1.06],
                        [size / 2.002, size / 1.242],
                        [size / 1.568, size / 1.06],
                        [size / 1.393, size / 1.06],
                        [size / 1.17, size / 1.06],
                        [size / 1, size / 1.06],
                        [size / 1, size / 4.93],
                        [size / 1.378, size / 4.93],
                    ]
                },
                {
                    color: 'fg_light',
                    comment: 'Device Access',
                    path: [
                        [size / 2, size / 1.702],
                        [size / 3.351, size / 1.267],
                        [size / 6.5, size / 1.267],
                        [size / 6.5, size / 2.804],
                        [size / 1.181, size / 2.804],
                        [size / 1.181, size / 1.267],
                        [size / 1.424, size / 1.267],
                        [size / 2, size / 1.702]
                    ]
                }
            ],
            offline: [
                {
                    color: 'text',
                    comment: 'Offline Storage',
                    path: [
                        [size / 1, size / 3.722],
                        [size / 1.194, size / 3.722],
                        [size / 1.297, size / 9.216, size / 1.633, 0, size / 2.295, 0],
                        [size / 5.113, 0, 0, size / 5.122, 0, size / 2.295],
                        [0, size / 1.479, size / 5.113, size / 1.147, size / 2.295, size / 1.147],
                        [size / 1.633, size / 1.147, size / 1.297, size / 1.31, size / 1.194, size / 1.658],
                        [size / 1, size / 1.658],
                        [size / 1, size / 3.722]
                        
                    ]
                },
                {
                    color: 'fg_light',
                    comment: 'Offline Storage',
                    path: [

                        [size / 1.148, size / 2.112],
                        [size / 2.295, size / 2.112],
                        [size / 2.41, size / 2.112, size / 2.513, size / 2.189, size / 2.513, size / 2.295],
                        [size / 2.513, size / 2.41, size / 2.412, size / 2.513, size / 2.295, size / 2.513],
                        [size / 1.148, size / 2.513],
                        [size / 1.148, size / 2.112]
                    ]
                },
                {
                    color: 'fg_light',
                    comment: 'Offline Storage',
                    path: [
                        [size / 2.295, size / 1.347],
                        [size / 3.75, size / 1.347, size / 7.737, size / 1.653, size / 7.737, size / 2.293],
                        [size / 7.737, size / 3.745, size / 3.75, size / 7.717, size / 2.295, size / 7.717],
                        [size / 1.85, size / 7.717, size / 1.571, size / 5.434, size / 1.444, size / 3.717],
                        [size / 2.295, size / 3.717],
                        [size / 2.908, size / 3.717, size / 3.722, size / 2.908, size / 3.722, size / 2.293],
                        [size / 3.722, size / 1.894, size / 2.911, size / 1.658, size / 2.295, size / 1.658],
                        [size / 1.444, size / 1.658],
                        [size / 1.57, size / 1.453, size / 1.849, size / 1.347, size / 2.295, size / 1.347]
                    ]
                }
            ],
            connectivity: [
                {
                    color: 'text',
                    comment: 'Connectivity',
                    path: [
                        [size / 1.333, size / 1.774],
                        [size / 1.144, size / 1.774],
                        [size / 1.144, size / 3.755],
                        [size / 1.362, size / 7.887],
                        [size / 1.546, size / 4.665],
                        [size / 1.333, size / 3.148],
                        [size / 1.333, size / 1.774],
                        [size / 1.144, size / 1.598],
                        [size / 1.441, size / 1.598],
                        [size / 2.262, size / 1.598],
                        [size / 2.951, size / 1.914],
                        [size / 2.613, size / 2.089],
                        [size / 2.137, size / 1.773],
                        [size / 1.554, size / 1.773],
                        [size / 2.125, size / 2.559],
                        [size / 1.943, size / 2.884],
                        [size / 1.454, size / 1.925],
                        [size / 1.454, size / 2.906],
                        [size / 1.659, size / 3.859],
                        [size / 1.548, size / 4.636],
                        [size / 2.318, 0],
                        [size / 4.554, 0],
                        [size / 4.554, 0],
                        [0, 0],
                        [size / 8.095, size / 8.095],
                        [size / 8.095, size / 8.074],
                        [size / 8.053, size / 8.074],
                        [size / 2.633, size / 8.074],
                        [size / 2.126, size / 4.665],
                        [size / 2.959, size / 2.884],
                        [size / 4.042, size / 3.903],
                        [size / 4.042, size / 5.378],
                        [size / 8.095, size / 5.378],
                        [size / 8.095, size / 3.252],
                        [size / 2.959, size / 1.916],
                        [size / 3.99, size / 1.642],
                        [size / 2.563, size / 1.336],
                        [size / 1.661, size / 1.336],
                        [size / 1.002, size / 1.336],
                        [size / 1.002, size / 1.336],
                        [size / 1.144, size / 1.598]
                    ]
                }
            ],
            perfintegration: [
                {
                    color: 'text',
                    comment: 'Performance & Integration',
                    path: [
                        [size / 1.028, size / 2.448],
                        [size / 1.205, size / 2.865],
                        [size / 1.125, size / 4.84],
                        [size / 1.145, size / 5.39, size / 1.167, size / 6.038, size / 1.191, size / 6.781],
                        [size / 1.193, size / 6.834, size / 1.195, size / 6.89, size / 1.196, size / 6.944],
                        [size / 1.199, size / 7.033, size / 1.202, size / 7.121, size / 1.205, size / 7.216],
                        [size / 1.231, size / 8.24, size / 1.26, size / 9.456, size / 1.294, size / 10.976],
                        [size / 1.586, size / 6.665],
                        [size / 1.751, size / 147.368],
                        [size / 1.925, 0, size / 2.139, 0, size / 2.397, size / 180.645],
                        [size / 2.403, size / 177.215, size / 2.407, size / 175, size / 2.412, size / 172.84],
                        [size / 2.424, size / 163.743, size / 2.437, size / 152.174, size / 2.449, size / 142.132],
                        [size / 2.865, size / 6.668],
                        [size / 4.861, size / 11.028],
                        [size / 6.138, size / 8.25, size / 7.952, size / 6.332, size / 10.483, size / 5.015],
                        [size / 10.514, size / 5.004, size / 10.554, size / 4.994, size / 10.59, size / 4.982],
                        [size / 10.732, size / 4.94, size / 10.874, size / 4.897, size / 11.015, size / 4.854],
                        [size / 6.668, size / 2.866],
                        [size / 148.936, size / 2.449],
                        [0, size / 2.174, 0, size / 1.954, size / 183.007, size / 1.779],
                        [size / 179.487, size / 1.776, size / 177.215, size / 1.773, size / 171.779, size / 1.77],
                        [size / 164.706, size / 1.763, size / 153.846, size / 1.757, size / 145.078, size / 1.751],
                        [size / 6.668, size / 1.586],
                        [size / 11.015, size / 1.293],
                        [size / 9.579, size / 1.262, size / 8.398, size / 1.234, size / 7.405, size / 1.209],
                        [size / 7.254, size / 1.204, size / 7.116, size / 1.2, size / 6.969, size / 1.196],
                        [size / 6.871, size / 1.193, size / 6.763, size / 1.19, size / 6.665, size / 1.187],
                        [size / 5.979, size / 1.164, size / 5.37, size / 1.144, size / 4.852, size / 1.125],
                        [size / 2.867, size / 1.206],
                        [size / 2.451, size / 1.028],
                        [size / 2.438, size / 1.028, size / 2.425, size / 1.027, size / 2.412, size / 1.027],
                        [size / 2.409, size / 1.027, size / 2.405, size / 1.027, size / 2.402, size / 1.027],
                        [size / 2.142, size / 1.019, size / 1.927, size / 1.019, size / 1.751, size / 1.028],
                        [size / 1.586, size / 1.206],
                        [size / 1.293, size / 1.125],
                        [size / 1.29, size / 1.127, size / 1.287, size / 1.128, size / 1.284, size / 1.13],
                        [size / 1.283, size / 1.13, size / 1.282, size / 1.131, size / 1.281, size / 1.131],
                        [size / 1.217, size / 1.172, size / 1.165, size / 1.225, size / 1.125, size / 1.292],
                        [size / 1.206, size / 1.586],
                        [size / 1.028, size / 1.75],
                        [size / 1.028, size / 1.757, size / 1.028, size / 1.763, size / 1.027, size / 1.77],
                        [size / 1.027, size / 1.772, size / 1.027, size / 1.774, size / 1.027, size / 1.776],
                        [size / 1.019, size / 1.952, size / 1.019, size / 2.172, size / 1.028, size / 2.448]
                    ]
                },
                {
                    color: 'fg_light',
                    comment: 'Performance & Integration',
                    path: [
                        [size / 1.167, size / 1.936],
                        [size / 1.416, size / 1.727],
                        [size / 1.415, size / 1.725],
                        [size / 1.416, size / 1.725],
                        [size / 1.301, size / 1.369],
                        [size / 1.321, size / 1.344, size / 1.344, size / 1.322, size / 1.369, size / 1.301],
                        [size / 1.725, size / 1.416],
                        [size / 1.725, size / 1.415],
                        [size / 1.727, size / 1.416],
                        [size / 1.936, size / 1.167],
                        [size / 2.005, size / 1.165, size / 2.079, size / 1.165, size / 2.16, size / 1.167],
                        [size / 2.497, size / 1.416],
                        [size / 2.5, size / 1.415],
                        [size / 2.501, size / 1.417],
                        [size / 4.023, size / 1.301],
                        [size / 4.049, size / 1.303, size / 4.077, size / 1.305, size / 4.104, size / 1.308],
                        [size / 4.19, size / 1.315, size / 4.274, size / 1.324, size / 4.363, size / 1.333],
                        [size / 4.455, size / 1.341, size / 4.556, size / 1.35, size / 4.652, size / 1.359],
                        [size / 4.681, size / 1.361, size / 4.707, size / 1.365, size / 4.738, size / 1.368],
                        [size / 3.654, size / 1.725],
                        [size / 3.661, size / 1.725],
                        [size / 3.658, size / 1.727],
                        [size / 8.159, size / 1.936],
                        [size / 8.238, size / 2.005, size / 8.245, size / 2.08, size / 8.151, size / 2.16],
                        [size / 3.659, size / 2.496],
                        [size / 3.661, size / 2.499],
                        [size / 3.655, size / 2.5],
                        [size / 4.739, size / 4.015],
                        [size / 4.487, size / 4.248, size / 4.247, size / 4.49, size / 4.017, size / 4.737],
                        [size / 2.502, size / 3.656],
                        [size / 2.5, size / 3.662],
                        [size / 2.498, size / 3.66],
                        [size / 2.16, size / 8.166],
                        [size / 2.08, size / 8.25, size / 2.005, size / 8.25, size / 1.936, size / 8.161],
                        [size / 1.727, size / 3.659],
                        [size / 1.725, size / 3.655],
                        [size / 1.369, size / 4.737],
                        [size / 1.357, size / 4.611, size / 1.346, size / 4.484, size / 1.334, size / 4.363],
                        [size / 1.323, size / 4.244, size / 1.312, size / 4.13, size / 1.302, size / 4.015],
                        [size / 1.417, size / 2.502],
                        [size / 1.416, size / 2.5],
                        [size / 1.416, size / 2.497],
                        [size / 1.167, size / 2.16],
                        [size / 1.165, size / 2.08, size / 1.165, size / 2.006, size / 1.167, size / 1.936]
                    ]
                },
                {
                    color: 'text',
                    comment: 'Performance & Integration',
                    path: [
                        [size / 1.622, size / 2.286],
                        [size / 1.623, size / 2.288],
                        [size / 1.532, size / 2.864],
                        [size / 1.548, size / 2.93, size / 1.566, size / 2.995, size / 1.586, size / 3.059],
                        [size / 1.843, size / 2.752],
                        [size / 1.844, size / 2.754],
                        [size / 1.845, size / 2.753],
                        [size / 1.977, size / 3.634],
                        [size / 2.019, size / 3.645, size / 2.062, size / 3.645, size / 2.108, size / 3.634],
                        [size / 2.283, size / 2.754],
                        [size / 2.285, size / 2.754],
                        [size / 2.286, size / 2.753],
                        [size / 2.861, size / 3.059],
                        [size / 2.927, size / 2.998, size / 2.991, size / 2.933, size / 3.056, size / 2.866],
                        [size / 2.749, size / 2.288],
                        [size / 2.751, size / 2.288],
                        [size / 2.75, size / 2.286],
                        [size / 3.633, size / 2.109],
                        [size / 3.634, size / 2.104, size / 3.636, size / 2.099, size / 3.637, size / 2.094],
                        [size / 3.64, size / 2.077, size / 3.638, size / 2.06, size / 3.638, size / 2.043],
                        [size / 3.638, size / 2.027, size / 3.64, size / 2.01, size / 3.636, size / 1.995],
                        [size / 3.636, size / 1.99, size / 3.635, size / 1.985, size / 3.632, size / 1.98],
                        [size / 2.75, size / 1.846],
                        [size / 2.75, size / 1.845],
                        [size / 2.749, size / 1.845],
                        [size / 3.054, size / 1.587],
                        [size / 2.993, size / 1.567, size / 2.927, size / 1.55, size / 2.86, size / 1.534],
                        [size / 2.285, size / 1.624],
                        [size / 2.285, size / 1.623],
                        [size / 2.283, size / 1.624],
                        [size / 2.108, size / 1.421],
                        [size / 2.062, size / 1.419, size / 2.018, size / 1.419, size / 1.977, size / 1.421],
                        [size / 1.844, size / 1.624],
                        [size / 1.843, size / 1.623],
                        [size / 1.843, size / 1.624],
                        [size / 1.586, size / 1.534],
                        [size / 1.566, size / 1.55, size / 1.548, size / 1.568, size / 1.532, size / 1.587],
                        [size / 1.623, size / 1.845],
                        [size / 1.622, size / 1.846],
                        [size / 1.622, size / 1.847],
                        [size / 1.42, size / 1.98],
                        [size / 1.419, size / 2.001, size / 1.419, size / 2.023, size / 1.419, size / 2.044],
                        [size / 1.419, size / 2.066, size / 1.419, size / 2.088, size / 1.419, size / 2.11],
                        [size / 1.622, size / 2.286]
                    ]
                },
                {
                    color: 'fg_light',
                    comment: 'Performance & Integration',
                    path: [
                        [size / 2.042, size / 1.821],
                        [size / 2.188, size / 1.821, size / 2.323, size / 1.914, size / 2.323, size / 2.042],
                        [size / 2.323, size / 2.188, size / 2.188, size / 2.324, size / 2.042, size / 2.324],
                        [size / 1.913, size / 2.324, size / 1.821, size / 2.189, size / 1.821, size / 2.042],
                        [size / 1.821, size / 1.914, size / 1.913, size / 1.821, size / 2.042, size / 1.821]
                    ]
                }
            ]
        };
        
        var item, color, color_old, comment, coordx, coordy, path, cp1x, cp1y, cp2x, cp2y, text, fontsize;
        // Loop through each path of the shape
        var items = shapes[shape];
        for (var i = 0, items_len = items.length; i < items_len; i++) {
            item = items[i];
            color = colors[type][item.color];
            comment = item.comment;
            path = item.path;
            
            // Draw and fill each path of the shape
            if (color !== color_old) {
                ctx.fillStyle = color;
            }
            
            // If text
            text = item.text
            if (text) {
                coord = path[0];
                coordx = coord[0]+posx;
                coordy = coord[1]+posy;
                fontsize = item.fontsize;
                
                ctx.font = fontsize + 'px Gallaudet';
                ctx.fillText(text, coordx, coordy);
                
            } else {                
                ctx.beginPath();
                // Loop through each pair of coordinates on the path. Round them when displaying
                var len = path.len;
                for (var j = 0, coord; coord =path[j]; j++) {
                    if (coord.length === 2) {
                        // Draw a simple path
                        coordx = coord[0]+posx;
                        coordy = coord[1]+posy;
                        if (j === 0) {
                            ctx.moveTo(coordx, coordy);
                        } else {
                            ctx.lineTo(coordx, coordy);
                        }
                    } else if (coord.length === 3) {
                        // Draw a circle
                        coordx = coord[0]+posx;
                        coordy = coord[1]+posy;
                        radius = coord[2];
                        ctx.arc(coordx, coordy, radius, 0, twopi, false);
                    } else {
                        // Draw a curve
                        cp1x = coord[0]+posx;
                        cp1y = coord[1]+posy;
                        cp2x = coord[2]+posx;
                        cp2y = coord[3]+posy;
                        coordx = coord[4]+posx;
                        coordy = coord[5]+posy;
                        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, coordx, coordy);
                    }
                }
                ctx.closePath();
                ctx.fill();
            }
            color_old = color;
        }
    }
