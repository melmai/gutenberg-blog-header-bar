/* global wp */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { Button } = wp.components;
const {
	RichText,
	MediaUpload,
	BlockControls,
	AlignmentToolbar
} = wp.editor;

registerBlockType( 'blog-header-bar/blog-header-bar', {
	title: __( 'Blog Header Bar', 'blog-header-bar' ),
	icon: 'editor-textcolor',
	category: 'layout',
	attributes: {
		alignment: {
			type: 'string',
			default: 'none',
		},
		title: {
			type: 'array',
			source: 'children',
			selector: 'h2',
		},
		mediaID: {
			type: 'number',
		},
		mediaURL: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},
	},
	edit: ( props ) => {
		console.log(props);
		const {
			className,
			attributes: {
				alignment,
				title,
				mediaID,
				mediaURL,
			},
			setAttributes,
		} = props;
		const onChangeTitle = ( value ) => {
			setAttributes( { title: value } );
		};

		const onSelectImage = ( media ) => {
			setAttributes( {
				mediaURL: media.url,
				mediaID: media.id,
			} );
		};
		const onChangeAlignment = (newAlignment) => {
			props.setAttributes({
				alignment: newAlignment === undefined ? 'none' : newAlignment
			});
		};
		
		return (
			<div>
				{
					<BlockControls>
						<AlignmentToolbar
							value={ alignment }
							onChange={ onChangeAlignment }
						/>
					</BlockControls>
				}
				<div className={ className }>
					<RichText
						tagName="h2"
						placeholder={ __( 'Section Title...', 'blog-header-bar' ) }
						value={ title }
						onChange={ onChangeTitle }
					/>
					<div className="title-image">
						<MediaUpload
							onSelect={ onSelectImage }
							allowedTypes="image"
							value={ mediaID }
							render={ ( { open } ) => (
								<Button className={ mediaID ? 'image-button' : 'button button-large' } onClick={ open }>
									{ ! mediaID ? __( 'Upload Image', 'blog-header-bar' ) : <img src={ mediaURL } alt={ __( 'Upload Icon Image', 'blog-header-bar' ) } /> }
								</Button>
							) }
						/>
					</div>
				</div>
			</div>
		);
	},
	save: ( props ) => {
		console.log(props);
		const {
			className,
			attributes: {
				title,
				mediaURL,
			},
		} = props;
		return (
			<div className={className}>
				<RichText.Content className="blog-header-text" tagName="h2" value={ title } />
				<img className="blog-header-image" src={ mediaURL } />
			</div>
		);
	},
} );
