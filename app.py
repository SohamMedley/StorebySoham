from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/store')
def store():
    # Expanded product catalog with more detailed items
    design_assets = [
        {"id": 1, "name": "Premium Photoshop Brushes", "price": 24.99, "category": "design", "subcategory": "brushes", "tags": ["photoshop", "digital art", "painting"], "image": "static/images/design-asset-1.jpg", "rating": 4.8, "sales": 1250, "featured": True},
        {"id": 2, "name": "UI Kit Bundle", "price": 39.99, "category": "design", "subcategory": "ui-kits", "tags": ["ui", "interface", "figma"], "image": "static/images/design-asset-2.jpg", "rating": 4.9, "sales": 2100, "featured": True},
        {"id": 3, "name": "Logo Templates Pack", "price": 19.99, "category": "design", "subcategory": "templates", "tags": ["logo", "branding", "identity"], "image": "static/images/design-asset-3.jpg", "rating": 4.7, "sales": 980, "featured": False},
        {"id": 4, "name": "Social Media Templates", "price": 29.99, "category": "design", "subcategory": "templates", "tags": ["social media", "instagram", "facebook"], "image": "static/images/design-asset-4.jpg", "rating": 4.6, "sales": 1560, "featured": True},
        {"id": 5, "name": "Gradient Texture Pack", "price": 15.99, "category": "design", "subcategory": "textures", "tags": ["gradients", "backgrounds", "abstract"], "image": "static/images/design-asset-5.jpg", "rating": 4.5, "sales": 720, "featured": False},
        {"id": 6, "name": "Isometric 3D Icons", "price": 22.99, "category": "design", "subcategory": "icons", "tags": ["3d", "isometric", "icons"], "image": "static/images/design-asset-6.jpg", "rating": 4.8, "sales": 890, "featured": False},
        {"id": 7, "name": "Watercolor Illustration Kit", "price": 34.99, "category": "design", "subcategory": "illustrations", "tags": ["watercolor", "painting", "artistic"], "image": "static/images/design-asset-7.jpg", "rating": 4.9, "sales": 1100, "featured": True},
        {"id": 8, "name": "Minimal Portfolio Template", "price": 44.99, "category": "design", "subcategory": "templates", "tags": ["portfolio", "minimal", "clean"], "image": "static/images/design-asset-8.jpg", "rating": 4.7, "sales": 650, "featured": False},
        {"id": 9, "name": "Geometric Pattern Pack", "price": 18.99, "category": "design", "subcategory": "patterns", "tags": ["geometric", "patterns", "backgrounds"], "image": "static/images/design-asset-9.jpg", "rating": 4.6, "sales": 780, "featured": False},
        {"id": 10, "name": "Hand-drawn Icon Set", "price": 19.99, "category": "design", "subcategory": "icons", "tags": ["hand-drawn", "sketchy", "doodle"], "image": "static/images/design-asset-10.jpg", "rating": 4.8, "sales": 920, "featured": False},
        {"id": 11, "name": "Branding Mockup Bundle", "price": 49.99, "category": "design", "subcategory": "mockups", "tags": ["branding", "mockups", "presentation"], "image": "static/images/design-asset-11.jpg", "rating": 4.9, "sales": 1300, "featured": True},
        {"id": 12, "name": "Typography Poster Templates", "price": 24.99, "category": "design", "subcategory": "templates", "tags": ["typography", "posters", "print"], "image": "static/images/design-asset-12.jpg", "rating": 4.7, "sales": 760, "featured": False},
        {"id": 13, "name": "Digital Painting Brushes", "price": 29.99, "category": "design", "subcategory": "brushes", "tags": ["digital painting", "art", "procreate"], "image": "static/images/design-asset-13.jpg", "rating": 4.8, "sales": 1050, "featured": False},
        {"id": 14, "name": "Web UI Components", "price": 34.99, "category": "design", "subcategory": "ui-kits", "tags": ["web", "components", "interface"], "image": "static/images/design-asset-14.jpg", "rating": 4.6, "sales": 870, "featured": False},
        {"id": 15, "name": "Architectural Sketch Brushes", "price": 27.99, "category": "design", "subcategory": "brushes", "tags": ["architecture", "sketching", "drawing"], "image": "static/images/design-asset-15.jpg", "rating": 4.7, "sales": 680, "featured": False},
    ]
    
    video_assets = [
        {"id": 16, "name": "Cinematic LUTs Pack", "price": 34.99, "category": "video", "subcategory": "color-grading", "tags": ["cinematic", "color grading", "film"], "image": "static/images/video-asset-1.jpg", "rating": 4.9, "sales": 1850, "featured": True},
        {"id": 17, "name": "Transition Effects Bundle", "price": 49.99, "category": "video", "subcategory": "transitions", "tags": ["transitions", "effects", "premiere"], "image": "static/images/video-asset-2.jpg", "rating": 4.8, "sales": 2200, "featured": True},
        {"id": 18, "name": "Motion Graphics Pack", "price": 59.99, "category": "video", "subcategory": "motion-graphics", "tags": ["motion graphics", "animation", "after effects"], "image": "static/images/video-asset-3.jpg", "rating": 4.9, "sales": 1700, "featured": True},
        {"id": 19, "name": "Sound Effects Library", "price": 24.99, "category": "video", "subcategory": "audio", "tags": ["sound effects", "audio", "foley"], "image": "static/images/video-asset-4.jpg", "rating": 4.7, "sales": 1300, "featured": False},
        {"id": 20, "name": "Glitch Effects Pack", "price": 29.99, "category": "video", "subcategory": "effects", "tags": ["glitch", "distortion", "digital"], "image": "static/images/video-asset-5.jpg", "rating": 4.8, "sales": 950, "featured": False},
        {"id": 21, "name": "Aerial Drone Footage", "price": 69.99, "category": "video", "subcategory": "stock-footage", "tags": ["aerial", "drone", "landscapes"], "image": "static/images/video-asset-6.jpg", "rating": 4.9, "sales": 780, "featured": True},
        {"id": 22, "name": "Title Animation Templates", "price": 39.99, "category": "video", "subcategory": "titles", "tags": ["titles", "animation", "typography"], "image": "static/images/video-asset-7.jpg", "rating": 4.7, "sales": 1100, "featured": False},
        {"id": 23, "name": "VHS Retro Effects", "price": 19.99, "category": "video", "subcategory": "effects", "tags": ["retro", "vhs", "vintage"], "image": "static/images/video-asset-8.jpg", "rating": 4.6, "sales": 820, "featured": False},
        {"id": 24, "name": "YouTube Intro Templates", "price": 24.99, "category": "video", "subcategory": "templates", "tags": ["youtube", "intro", "social media"], "image": "static/images/video-asset-9.jpg", "rating": 4.7, "sales": 1600, "featured": False},
        {"id": 25, "name": "Cinematic Overlays Bundle", "price": 34.99, "category": "video", "subcategory": "overlays", "tags": ["overlays", "film", "cinematic"], "image": "static/images/video-asset-10.jpg", "rating": 4.8, "sales": 920, "featured": False},
        {"id": 26, "name": "4K Film Grain Pack", "price": 29.99, "category": "video", "subcategory": "textures", "tags": ["film grain", "texture", "4k"], "image": "static/images/video-asset-11.jpg", "rating": 4.7, "sales": 750, "featured": False},
        {"id": 27, "name": "Lower Thirds Collection", "price": 22.99, "category": "video", "subcategory": "titles", "tags": ["lower thirds", "titles", "broadcast"], "image": "static/images/video-asset-12.jpg", "rating": 4.6, "sales": 880, "featured": False},
        {"id": 28, "name": "Particle Effects System", "price": 49.99, "category": "video", "subcategory": "effects", "tags": ["particles", "effects", "animation"], "image": "static/images/video-asset-13.jpg", "rating": 4.9, "sales": 1050, "featured": True},
        {"id": 29, "name": "Social Media Video Templates", "price": 39.99, "category": "video", "subcategory": "templates", "tags": ["social media", "instagram", "tiktok"], "image": "static/images/video-asset-14.jpg", "rating": 4.8, "sales": 1750, "featured": False},
        {"id": 30, "name": "Cinematic Sound Design", "price": 44.99, "category": "video", "subcategory": "audio", "tags": ["sound design", "cinematic", "audio"], "image": "static/images/video-asset-15.jpg", "rating": 4.7, "sales": 680, "featured": False},
    ]
    
    # Get filter parameters from URL
    category = request.args.get('category', 'all')
    subcategory = request.args.get('subcategory', 'all')
    sort = request.args.get('sort', 'featured')
    
    # Filter products based on parameters
    if category == 'design':
        products = design_assets
    elif category == 'video':
        products = video_assets
    else:
        products = design_assets + video_assets
    
    # Filter by subcategory if specified
    if subcategory != 'all':
        products = [p for p in products if p['subcategory'] == subcategory]
    
    # Sort products
    if sort == 'price-low':
        products = sorted(products, key=lambda x: x['price'])
    elif sort == 'price-high':
        products = sorted(products, key=lambda x: x['price'], reverse=True)
    elif sort == 'rating':
        products = sorted(products, key=lambda x: x['rating'], reverse=True)
    elif sort == 'bestselling':
        products = sorted(products, key=lambda x: x['sales'], reverse=True)
    elif sort == 'newest':
        # In a real app, you would sort by date added
        # Here we'll just reverse the list as a placeholder
        products = list(reversed(products))
    else:  # featured or default
        products = sorted(products, key=lambda x: (0 if x['featured'] else 1, -x['sales']))
    
    # Get all subcategories for filtering
    design_subcategories = sorted(list(set(item['subcategory'] for item in design_assets)))
    video_subcategories = sorted(list(set(item['subcategory'] for item in video_assets)))
    
    return render_template('store.html', 
                          products=products, 
                          design_assets=design_assets, 
                          video_assets=video_assets,
                          design_subcategories=design_subcategories,
                          video_subcategories=video_subcategories,
                          current_category=category,
                          current_subcategory=subcategory,
                          current_sort=sort)

@app.route('/product/<int:product_id>')
def product_detail(product_id):
    # In a real app, you would fetch this from a database
    all_products = []
    
    design_assets = [
        {"id": 1, "name": "Premium Photoshop Brushes", "price": 24.99, "category": "design", "subcategory": "brushes", "tags": ["photoshop", "digital art", "painting"], "image": "static/images/design-asset-1.jpg", "rating": 4.8, "sales": 1250, "featured": True, "description": "A collection of 50+ high-quality Photoshop brushes perfect for digital artists and designers. These brushes are designed to mimic natural media with realistic textures and pressure sensitivity.", "compatibility": ["Photoshop CS6+", "Photoshop CC", "Photoshop 2020+"], "file_format": ["ABR", "TPL"], "author": "Sarah Johnson", "release_date": "2023-05-15", "last_update": "2023-11-20", "reviews": 128},
        # Add more products with detailed information
        # (Abbreviated for clarity - the full list would include all products with detailed information)
    ]
    
    video_assets = [
        {"id": 16, "name": "Cinematic LUTs Pack", "price": 34.99, "category": "video", "subcategory": "color-grading", "tags": ["cinematic", "color grading", "film"], "image": "static/images/video-asset-1.jpg", "rating": 4.9, "sales": 1850, "featured": True, "description": "Transform your footage with 30 professional cinematic color grading LUTs inspired by blockbuster films. Perfect for creating atmospheric and emotionally engaging visuals.", "compatibility": ["Premiere Pro", "Final Cut Pro", "DaVinci Resolve", "After Effects"], "file_format": ["CUBE", "3DL"], "author": "Michael Chen", "release_date": "2023-06-10", "last_update": "2023-12-05", "reviews": 215},
        # Add more products with detailed information
    ]
    
    all_products = design_assets + video_assets
    
    # Find the product by ID
    product = next((p for p in all_products if p['id'] == product_id), None)
    
    if product:
        # Get related products (same category)
        related_products = [p for p in all_products if p['category'] == product['category'] and p['id'] != product_id][:4]
        return render_template('product.html', product=product, related_products=related_products)
    else:
        # Product not found
        return render_template('404.html'), 404

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/blog')
def blog():
    blog_posts = [
        {
            "id": 1,
            "title": "10 Essential Design Principles Every Creator Should Know",
            "excerpt": "Learn the fundamental design principles that can transform your creative work and help you communicate more effectively through visual design.",
            "author": "Soham Patel",
            "date": "April 5, 2025",
            "category": "Design Tips",
            "image": "static/images/blog-1.jpg",
            "comments": 24
        },
        {
            "id": 2,
            "title": "Color Grading Techniques for Cinematic Video",
            "excerpt": "Discover professional color grading techniques that can give your videos that cinematic look viewers love, using tools you already have.",
            "author": "Soham Patel",
            "date": "March 22, 2025",
            "category": "Video Editing",
            "image": "static/images/blog-2.jpg",
            "comments": 18
        },
        {
            "id": 3,
            "title": "Creating Effective Social Media Graphics",
            "excerpt": "Learn how to design eye-catching social media graphics that increase engagement and help your brand stand out in crowded feeds.",
            "author": "Priya Sharma",
            "date": "March 15, 2025",
            "category": "Social Media",
            "image": "static/images/blog-3.jpg",
            "comments": 32
        },
        {
            "id": 4,
            "title": "Typography Trends for 2025",
            "excerpt": "Explore the latest typography trends that are shaping design in 2025 and learn how to incorporate them into your projects.",
            "author": "Soham Patel",
            "date": "February 28, 2025",
            "category": "Design Trends",
            "image": "static/images/blog-4.jpg",
            "comments": 15
        },
        {
            "id": 5,
            "title": "Motion Graphics: Taking Your Videos to the Next Level",
            "excerpt": "Discover how motion graphics can enhance your video content and learn techniques for creating professional animations.",
            "author": "Arjun Mehta",
            "date": "February 14, 2025",
            "category": "Motion Graphics",
            "image": "static/images/blog-5.jpg",
            "comments": 27
        },
        {
            "id": 6,
            "title": "Building a Cohesive Brand Identity",
            "excerpt": "Learn the essential elements of creating a cohesive brand identity that resonates with your audience and stands the test of time.",
            "author": "Soham Patel",
            "date": "January 30, 2025",
            "category": "Branding",
            "image": "static/images/blog-6.jpg",
            "comments": 21
        }
    ]
    return render_template('blog.html', blog_posts=blog_posts)

@app.route('/tutorials')
def tutorials():
    tutorials = [
        {
            "id": 1,
            "title": "Creating Custom Brushes in Photoshop",
            "difficulty": "Intermediate",
            "duration": "25 min",
            "category": "Design",
            "image": "static/images/tutorial-1.jpg",
            "views": 12500
        },
        {
            "id": 2,
            "title": "Color Grading in DaVinci Resolve",
            "difficulty": "Advanced",
            "duration": "40 min",
            "category": "Video",
            "image": "static/images/tutorial-2.jpg",
            "views": 9800
        },
        {
            "id": 3,
            "title": "Logo Design Fundamentals",
            "difficulty": "Beginner",
            "duration": "35 min",
            "category": "Design",
            "image": "static/images/tutorial-3.jpg",
            "views": 15600
        },
        {
            "id": 4,
            "title": "Creating Smooth Transitions in Premiere Pro",
            "difficulty": "Intermediate",
            "duration": "30 min",
            "category": "Video",
            "image": "static/images/tutorial-4.jpg",
            "views": 11200
        },
        {
            "id": 5,
            "title": "Digital Illustration Techniques",
            "difficulty": "Intermediate",
            "duration": "45 min",
            "category": "Design",
            "image": "static/images/tutorial-5.jpg",
            "views": 8900
        },
        {
            "id": 6,
            "title": "Sound Design for Video",
            "difficulty": "Advanced",
            "duration": "50 min",
            "category": "Video",
            "image": "static/images/tutorial-6.jpg",
            "views": 7500
        },
        {
            "id": 7,
            "title": "UI/UX Design Principles",
            "difficulty": "Beginner",
            "duration": "35 min",
            "category": "Design",
            "image": "static/images/tutorial-7.jpg",
            "views": 13800
        },
        {
            "id": 8,
            "title": "Visual Effects in After Effects",
            "difficulty": "Advanced",
            "duration": "55 min",
            "category": "Video",
            "image": "static/images/tutorial-8.jpg",
            "views": 10200
        }
    ]
    return render_template('tutorials.html', tutorials=tutorials)

@app.route('/api/cart/add', methods=['POST'])
def add_to_cart():
    # In a real app, you would add the item to the user's cart in a database or session
    data = request.get_json()
    product_id = data.get('product_id')
    quantity = data.get('quantity', 1)
    
    # Simulate successful addition to cart
    return jsonify({
        'success': True,
        'message': 'Product added to cart',
        'cart_count': 1,  # In a real app, this would be the actual cart count
        'product_id': product_id,
        'quantity': quantity
    })

@app.route('/api/wishlist/toggle', methods=['POST'])
def toggle_wishlist():
    # In a real app, you would toggle the wishlist status in a database
    data = request.get_json()
    product_id = data.get('product_id')
    
    # Simulate successful toggle
    return jsonify({
        'success': True,
        'message': 'Product added to wishlist',
        'product_id': product_id,
        'in_wishlist': True  # In a real app, this would be the actual status
    })

@app.route('/api/newsletter/subscribe', methods=['POST'])
def subscribe_newsletter():
    # In a real app, you would add the email to your newsletter database
    data = request.get_json()
    email = data.get('email')
    
    # Validate email (simple validation)
    if not email or '@' not in email:
        return jsonify({
            'success': False,
            'message': 'Invalid email address'
        })
    
    # Simulate successful subscription
    return jsonify({
        'success': True,
        'message': 'Successfully subscribed to newsletter',
        'email': email
    })

if __name__ == '__main__':
    app.run(debug=True)