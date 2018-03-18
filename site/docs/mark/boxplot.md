---
layout: docs
menu: docs
title: Boxplot
permalink: /docs/boxplot.html
---

{: .suppress-error}
```json
// Single View Specification
{
  "data": ... ,
  "mark": "boxplot",
  "encoding": ... ,
  ...
}
```

A box plot summarizes a distribution of quantitative values using a set of summary statistics.  The median tick in the box represents the median. The lower and upper part of the box represents the first and third quartile respectively. The ends of the whiskers can represent multiple, depending on the type of box plots (#boxplot-types).

To create a box plot, you can set `mark` to `"boxplot"`.

## Documentation Overview
{:.no_toc}

- TOC
{:toc}



{: .suppress-error}
```json
{
  ...
  "mark": "boxplot",
  ...
}
```

{:#properties}
## BoxPlot Mark Properties

A boxplot's mark definition contain the following properties:

{% include table.html props="type,extent,orient,size" source="BoxPlotDef" %}

Besides the properties listed above, `box`, `median`, `whisker` can be used to specifying the underlying [mark properties](mark.html#mark-def) for different [parts of the box plots](#parts) as well.

## Types of Box Plot
{:#boxplot-types}

Vega-Lite supports two types of box plots, defined by the `extent` property in the mark definition object.

1) __Tukey Box Plot__, which is the default box plot in Vega-Lite. For a tukey box plot, the whisker spans from _Q1 - k * IQR_ to _Q3 + k * IQR_ where _Q1_ and _Q3_ are the first and third quartiles while _IQR_ is the interquartile range (_Q3-Q1_). In this type of box plot, you can specify the constant _k_ by setting the `extent`.

By default, the extent is `1.5`.

<div class="vl-example" data-name="boxplot_tukey_1D_horizontal"></div>

Explicitly setting `extent` to `1.5` produce an identical plot.

<!-- TODO: please add another plot that's eq-->



2) __`min-max` Box Plot__, which is a box plot where lower and upper whiskers are defined as the min and max respectively.

<div class="vl-example" data-name="boxplot_minmax_2D_horizontal"></div>

## Dimension & Orientation
There are two `boxplot` dimensions:

1) A 1D `boxplot` shows the distribution of a continuous field.
<div class="vl-example" data-name="boxplot_tukey_1D_horizontal"></div>

2) A 2D `boxplot` shows the distribution of a continuous field, broken down by categories.
<div class="vl-example" data-name="boxplot_tukey_2D_horizontal_IQR"></div>

Box plot's orientation is automatically determined by the continuous field axis.
For example, you can create a vertical 1D box plot by encoding a continuous field on the y axis.

<div class="vl-example" data-name="boxplot_tukey_1D_vertical"></div>

For 2D box plots with one continuous and one discrete fields,
the box plot will be horizontal if the continuous field is on the x axis.

<div class="vl-example" data-name="boxplot_tukey_2D_horizontal_IQR"></div>

Similarly, if the continuous field is on the y axis, the box plot will be vertical.

<div class="vl-example" data-name="boxplot_tukey_2D_vertical"></div>

## Color, Size, and Opacity Encoding Channels

You can customize the color, size, and opacity of the box in the `boxplot` by using the `color`, `size`, and `opacity` [encoding channels](encoding.html#channels). `color` and `size` are applied to only the box and median tick whereas `opacity` is applied to the whole `boxplot`.

An example of a `boxplot` where the `size` encoding channel is specified.
<div class="vl-example" data-name="boxplot_vertical_2D_vertical"></div>

<div class="vl-example" data-name="boxplot_minmax_2D_horizontal_color_size"></div>

{:#parts}
## Parts of Box Plots

Under the hood, the `"boxplot"` mark is a composite mark that expands into a layered plot.  For example, [a basic 1D boxplot shown above](#boxplot-type) is expanded to:

<div class="vl-example" data-name="normalized/boxplot_tukey_1D_horizontal_normalized"></div>

To customize different parts of the box, we can use roles config to customize different parts of the box plot (`box`, `median`, `whisker`).


<!-- TODO: please add example to customize plots via mark definition block -->


__Note:__ `aggregate` property of the continuous field is implicitly `boxplot`.
For example, [a basic 1D boxplot shown above](#boxplot-type) is equivalent to:
<div class="vl-example" data-name="boxplot_tukey_2D_vertical_explicit_aggregate"></div>

## Mark Config
{: .suppress-error}
```json
{
  "boxplot": {
    "size": ...,
    "extent": ...,
    "box": ...,
    "median": ...,
    "whisker": ...
  }
}
```
The `boxplot` config object sets the default properties for `boxplot` marks.

The boxplot config can contain the following [boxplot mark properties](#properties): `size`, `extent`, `box`, `median`, `whisker`.

