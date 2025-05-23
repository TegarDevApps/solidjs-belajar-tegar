import { createSignal, createEffect, onMount, onCleanup } from "solid-js";
import { Box, Heading, Tabs, TabList, Tab, TabPanel } from "@hope-ui/solid";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

interface UserPostStat {
  id: number;
  name: string;
  username: string;
  postCount: number;
}

interface PostChartProps {
  data: UserPostStat[];
}

const PostChart = (props: PostChartProps) => {
  const [selectedTab, setSelectedTab] = createSignal("bar");
  
  let barChartDiv!: HTMLDivElement;
  let pieChartDiv!: HTMLDivElement;
  let barChartRoot: am5.Root | null = null;
  let pieChartRoot: am5.Root | null = null;
  let barChart: am5xy.XYChart | null = null;
  let pieChart: am5percent.PieChart | null = null;

  const disposeBarChart = () => {
    if (barChartRoot) {
      barChartRoot.dispose();
      barChartRoot = null;
      barChart = null;
    }
  };

  const disposePieChart = () => {
    if (pieChartRoot) {
      pieChartRoot.dispose();
      pieChartRoot = null;
      pieChart = null;
    }
  };

  const createBarChart = () => {
    if (!barChartDiv || props.data.length === 0) return;
    
    disposeBarChart();

    try {
      barChartRoot = am5.Root.new(barChartDiv);
      barChartRoot.setThemes([am5themes_Animated.new(barChartRoot)]);

      barChart = barChartRoot.container.children.push(am5xy.XYChart.new(barChartRoot, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft: 0,
        paddingRight: 1
      }));

      const cursor = barChart.set("cursor", am5xy.XYCursor.new(barChartRoot, {}));
      cursor.lineY.set("visible", false);

      const xRenderer = am5xy.AxisRendererX.new(barChartRoot, {
        minGridDistance: 30,
        minorGridEnabled: true
      });

      xRenderer.labels.template.setAll({
        rotation: -90,
        centerY: am5.p50,
        centerX: am5.p100,
        paddingRight: 15
      });

      xRenderer.grid.template.setAll({ location: 1 });

      const xAxis = barChart.xAxes.push(am5xy.CategoryAxis.new(barChartRoot, {
        maxDeviation: 0.3,
        categoryField: "name",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(barChartRoot, {})
      }));

      const yRenderer = am5xy.AxisRendererY.new(barChartRoot, { strokeOpacity: 0.1 });
      const yAxis = barChart.yAxes.push(am5xy.ValueAxis.new(barChartRoot, {
        maxDeviation: 0.3,
        renderer: yRenderer
      }));

      const series = barChart.series.push(am5xy.ColumnSeries.new(barChartRoot, {
        name: "Posts per User",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "postCount",
        sequencedInterpolation: true,
        categoryXField: "name",
        tooltip: am5.Tooltip.new(barChartRoot, {
          labelText: "{name}: {postCount} posts"
        })
      }));

      series.columns.template.setAll({
        cornerRadiusTL: 5,
        cornerRadiusTR: 5,
        strokeOpacity: 0
      });

      series.columns.template.adapters.add("fill", (_, target) => {
        return barChart!.get("colors")!.getIndex(series.columns.indexOf(target));
      });

      series.columns.template.adapters.add("stroke", (_, target) => {
        return barChart!.get("colors")!.getIndex(series.columns.indexOf(target));
      });

      const data = props.data.map(user => ({
        name: user.username,
        postCount: user.postCount,
        fullName: user.name
      }));

      xAxis.data.setAll(data);
      series.data.setAll(data);
      series.appear(1000);
      barChart.appear(1000, 100);
    } catch (error) {
      console.error("Error creating bar chart:", error);
      disposeBarChart();
    }
  };

  const createPieChart = () => {
    if (!pieChartDiv || props.data.length === 0) return;
    
    disposePieChart();

    try {
      pieChartRoot = am5.Root.new(pieChartDiv);
      pieChartRoot.setThemes([am5themes_Animated.new(pieChartRoot)]);

      pieChart = pieChartRoot.container.children.push(am5percent.PieChart.new(pieChartRoot, {
        layout: pieChartRoot.verticalLayout,
        innerRadius: am5.percent(50)
      }));

      const series = pieChart.series.push(am5percent.PieSeries.new(pieChartRoot, {
        valueField: "postCount",
        categoryField: "name",
        alignLabels: false
      }));

      series.labels.template.setAll({
        textType: "circular",
        centerX: 0,
        centerY: 0
      });

      // Use top 8 users for pie chart to avoid clutter
      const data = props.data.slice(0, 8).map(user => ({
        name: user.username,
        postCount: user.postCount,
        fullName: user.name
      }));

      series.data.setAll(data);

      const legend = pieChart.children.push(am5.Legend.new(pieChartRoot, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 15,
      }));

      legend.data.setAll(series.dataItems);
      series.appear(1000, 100);
    } catch (error) {
      console.error("Error creating pie chart:", error);
      disposePieChart();
    }
  };

  createEffect(() => {
    if (props.data.length > 0) {
      const currentTab = selectedTab();
      
      setTimeout(() => {
        if (currentTab === "bar") {
          createBarChart();
        } else if (currentTab === "pie") {
          createPieChart();
        }
      }, 50);
    }
  });

  // Handle tab switching
  createEffect(() => {
    const currentTab = selectedTab();
    
    if (props.data.length > 0) {
      setTimeout(() => {
        if (currentTab === "bar") {
          disposePieChart();
          createBarChart();
        } else if (currentTab === "pie") {
          disposeBarChart();
          createPieChart();
        }
      }, 50);
    }
  });

  onMount(() => {
    if (props.data.length > 0) {
      setTimeout(() => {
        if (selectedTab() === "bar") {
          createBarChart();
        } else {
          createPieChart();
        }
      }, 100);
    }
  });

  onCleanup(() => {
    disposeBarChart();
    disposePieChart();
  });

  return (
    <Box
      h="auto"
      w="100%"
      bg="white"
      borderRadius="$md"
      shadow="$sm"
      p="$4"
    >
      <Box mb="$4">
        <Heading size="lg">Posts Analytics</Heading>
      </Box>

      <Tabs 
        value={selectedTab()} 
        onChange={(val: string) => {
          setSelectedTab(val as "bar" | "pie");
        }}
      >
        <TabList>
          <Tab value="bar">Bar Chart</Tab>
          <Tab value="pie">Pie Chart</Tab>
        </TabList>

        <TabPanel value="bar">
          <Box
            ref={(el: HTMLDivElement) => (barChartDiv = el)}
            h="400px"
            w="100%"
            bg="white"
            borderRadius="$md"
            shadow="$sm"
            style={{ "min-height": "400px" }}
          />
        </TabPanel>

        <TabPanel value="pie">
          <Box
            ref={(el: HTMLDivElement) => (pieChartDiv = el)}
            h="400px"
            w="100%"
            bg="white"
            borderRadius="$md"
            shadow="$sm"
            style={{ "min-height": "400px" }}
          />
        </TabPanel>
      </Tabs>
    </Box>
  );
};

export default PostChart;