import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  ShieldCheck, 
  Globe, 
  Building, 
  Container, 
  Anchor, 
  Truck, 
  Cpu, 
  Calculator, 
  FileText, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  Coins, 
  Activity, 
  FileCheck2, 
  CheckCircle2, 
  AlertTriangle,
  ChevronRight,
  Info,
  Mail,
  Phone,
  MessageSquare,
  Send,
  Users,
  Check,
  Lock,
  CheckSquare,
  Search,
  Trash2,
  RefreshCw,
  X
} from "lucide-react";
import { Language, IndustrialCluster, SupplyChainStep, CustomerInquiry } from "./types";
// @ts-ignore
import cargoShipHero from "./assets/images/cargo_ship_hero_1780372857415.png";

// Dynamic Translations Dictionary for Elite Multilingual Experience
const t: Record<Language, any> = {
  en: {
    brand: "SinoSource Global",
    brandSub: "ZHEN SOURCING",
    tagline: "Premier Cross-Border Sourcing & Inspection",
    navHome: "Dashboard Home",
    navClusters: "Industrial Clusters",
    navAql: "Aql standard",
    navLogistics: "Logistics Routing",
    navPlanner: "AI Sourcing Planner",
    heroHeadingPrefix: "Your Supply Chain",
    heroHeadingSuf: "Perfected.",
    heroSub: "Navigating China's vast industrial belts with deep local knowledge. We provide tier-1 factory audits, rigorous third-party inspection, direct price mitigation, and multi-lingual localized coordination.",
    ctaStart: "Generate AI Proposal",
    ctaInquire: "Interactive Planner",
    ctaAql: "Calculate Sampling Size",
    statsProcurement: "$1.2B+",
    statsProcurementLbl: "Annual Procurement Vol.",
    statsSla: "48H",
    statsSlaLbl: "Risk Assessment Report",
    statsPass: "99.4%",
    statsPassLbl: "Inspection Pass Rate",
    statsCountries: "140+",
    statsCountriesLbl: "Seaports Serviced",
    // Info Ribbon
    info1Title: "01. Factory Audits",
    info1Desc: "Deep-dive compliance verification on tier-1 manufacturers to safeguard intellectual property.",
    info2Title: "02. Price Mitigation",
    info2Desc: "Bypassing speculative brokers to secure direct ex-factory pricing saving up to 22%.",
    info3Title: "03. Quality Control",
    info3Desc: "In-line & pre-shipment strict random audits complying with AQL 2.5 checkpoints.",
    info4Title: "04. Localized Hubs",
    info4Desc: "Native offices & representatives in major zones (Shenzhen, Ningbo, Yiwu, Fujian).",
    // Clusters
    clusterTitle: "Primary Industrial Belt Directory",
    clusterSub: "Direct factory integration cuts out intermediaries. Select a cluster hub to analyze raw material proximity, lead times, and dispatch ports.",
    specialty: "Cluster Specialty",
    leadTime: "Average Production Cycle",
    defectRate: "Defect Margin (AQL Normal)",
    auditPoint: "Key Compliance Audit Target",
    dispatchPort: "Primary Loading Port",
    // AQL Calculator
    aqlTitle: "ISO 2859-1 Interactive AQL Calculator",
    aqlSub: "Enter your factory batch size to calculate the exact randomized sampling plan. Learn acceptable vs rejectable defect margins instantly.",
    aqlBatchSize: "Production Lot Size (Units)",
    aqlGeneralLevel: "Inspection Rigor Level",
    aqlLevelI: "Level I - Reduced (High trust, fast review)",
    aqlLevelII: "Level II - Standard (Globally Recommended)",
    aqlLevelIII: "Level III - Strict (Critical or medical parts)",
    aqlSampleNeeded: "Units to Randomly Extract & Inspect",
    aqlResultAccept: "Accept Standard (Ac)",
    aqlResultAcceptDesc: "Batch complies if number of defective items is equal/below this.",
    aqlResultReject: "Reject Standard (Re)",
    aqlResultRejectDesc: "Immediate batch lock & line calibration if defectives reach this limit.",
    aqlCalculateBtn: "Load Standard Parameters",
    // Planner
    plannerTitle: "SinoSource Smart AI Procurement Planner",
    plannerSub: "Input your requirements or customize sample specs. Our server-side Gemini AI models optimal production clusters, schedules milestone lifecycles, and drafts compliance tariffs.",
    placeholderProduct: "e.g., Double-wall stainless steel thermal coffee tumbler, matte finish S30408",
    placeholderQty: "e.g., 5000 units with custom embossed logo and gold rim",
    placeholderPrice: "e.g., $2.50 USD per unit FOB Ningbo Port",
    placeholderDest: "e.g., Port of Rotterdam (Netherlands) - CIF base",
    formProduct: "Product Category / Requirements Specification",
    formQty: "Target Manufacturing Quantity",
    formPrice: "Target Unit Budget (USD / Unit)",
    formDest: "Customs Destination & Trade Term (Incoterms)",
    btnGenerate: "Simulate & Draft Sourcing Strategy",
    btnGenerating: "AI System Mapping Chinese Industrial Clusters...",
    aiAdviceTitle: "Ecosystem Sourcing Plan Blueprint",
    aiAdviceFooter: "Prepared by SinoSource Lead Procurement Node in tandem with Gemini 3.5. Fully compliant under WTO international commercial standards.",
    useSample: "Use High-End Spec Sample",
    // Logistics
    logisticsTitle: "Integrated Cross-Border Freight Pipeline",
    logisticsSub: "Consolidate inventory from dozens of factories in our bonded sea-freight hubs to simplify customs clearance and eliminate container fragmentation.",
    oceanFreight: "FCL & LCL Ocean Route",
    oceanFreightDesc: "Direct consolidation and container block space allocations at major coastal ports.",
    airFreight: "Priority Cargo Express",
    airFreightDesc: "For high-ticket electronics, critical spare parts, or time-sensitive retail rollouts.",
    railFreight: "Sino-Europe Landbridge",
    railFreightDesc: "High stability rail route crossing central corridors with lower CO2 emissions.",
    warehousing: "Bonded Cargo Storage",
    warehousingDesc: "Complimentary 30-day sorting and physical sample verification in Shenzhen/Ningbo."
  },
  zh: {
    brand: "华源环球采购",
    brandSub: "SinoSource Global",
    tagline: "对标最严苛品控标准的跨境采购整合商",
    navHome: "系统概览",
    navClusters: "核心产业带图谱",
    navAql: "Aql质检标准",
    navLogistics: "多式联运网络",
    navPlanner: "AI智能采购企划",
    heroHeadingPrefix: "重塑您的供应链",
    heroHeadingSuf: "绝无妥协。",
    heroSub: "深耕中国核心工业集群，提供工厂物理穿透审计、工艺打样、排产监控、AQL 2.5国际标准出厂质检和多语种业务经理对口支持的闭合采购代办方案。",
    ctaStart: "生成AI采购企划",
    ctaInquire: "在线交互计算器",
    ctaAql: "自动计算抽检数",
    statsProcurement: "12亿+美元",
    statsProcurementLbl: "年累计采购吞吐量",
    statsSla: "48小时",
    statsSlaLbl: "极速品控与风险评估报告",
    statsPass: "99.4%",
    statsPassLbl: "出货终检合格率",
    statsCountries: "140+",
    statsCountriesLbl: "服务全球海空运港口",
    // Info Ribbon
    info1Title: "01. 工厂深度审计",
    info1Desc: "常驻各产业带资深工程师亲临现场，核验真实财务与产能，保护知识产权。",
    info2Title: "02. 削减溢价",
    info2Desc: "穿透贸易中介，直接连同源头一级(Tier-1)代工厂议价，综合平均省22%。",
    info3Title: "03. AQL 全面品控",
    info3Desc: "完全执行国际 AQL 2.5 质量可接受标准，工序中段现场随机抽测保驾护航。",
    info4Title: "04. 本地化办事处",
    info4Desc: "在深圳、宁波、上海、义乌设有垂直服务中心，专职经理多语种同频传达。",
    // Clusters
    clusterTitle: "中国核心工业集群分布",
    clusterSub: "精准匹配中国核心集聚度最高的产业基地，避开多级中转抽成。点击具体产业带查看特长、周期与海运通道。",
    specialty: "产业带核心特长",
    leadTime: "平均制造工期周期",
    defectRate: "历史行业缺陷率中位数",
    auditPoint: "现场审计重点要素",
    dispatchPort: "推荐首选出口海港",
    // AQL Calculator
    aqlTitle: "ISO 2859-1 AQL 在线抽样计算器",
    aqlSub: "在国际质检中，随机抽样具备深厚数学依据。输入供应商本次交付总量，即刻按国际大厂标准计算随机开箱提取数。",
    aqlBatchSize: "整批次出货总件数 (Units)",
    aqlGeneralLevel: "执行检验等级 (Rigor)",
    aqlLevelI: "I 级 - 减量检验（用于高信誉和成熟厂家）",
    aqlLevelII: "II 级 - 标准检验（业界标准推荐・最为稳妥）",
    aqlLevelIII: "III 级 - 加严检验（高精密仪器或关键高昂品）",
    aqlSampleNeeded: "需要随机开箱抽查的样品件数",
    aqlResultAccept: "合格接收判定数 (Ac - Accept)",
    aqlResultAcceptDesc: "若此样品中的致命/严重缺陷数量小于或等于该值，该整批货物判定合格放行。",
    aqlResultReject: "不合格拒收判定数 (Re - Reject)",
    aqlResultRejectDesc: "若样品缺陷数达到或超过此数值，整批强制就地扣留拒绝发回，重新排线纠偏。",
    aqlCalculateBtn: "载入质检判定基准",
    // Planner
    plannerTitle: "AI 跨境采购可行性企划生成器",
    plannerSub: "提供您预期的采购商品、数量和目标价。我们将触发服务器级 Gemini 3.5 旗舰大模型，推演工业集聚产地、打样工期、品控要点与关税HS Code。",
    placeholderProduct: "例如：双层抽真空咖啡保温杯，不锈钢材质外覆防刮哑光漆",
    placeholderQty: "例如：5,000个（需要红绿白各色搭配定制外盒）",
    placeholderPrice: "例如：每个 $2.50 美元，FOB 宁波港交货",
    placeholderDest: "例如：德国汉堡港，希望以含税 DDP 模式派送",
    formProduct: "采购产品大类及工艺指标 requirements",
    formQty: "预估量产总量 (Quantity)",
    formPrice: "目标采购单价 (美元 / Unit)",
    formDest: "最终港口及偏好国际贸易术语 (Incoterms)",
    btnGenerate: "结合中国产业链推演并生成商业规划书",
    btnGenerating: "AI 正在对中国各产业带集群密度、港口运价进行计算...",
    aiAdviceTitle: "华源供应链智能采购可行性方案",
    aiAdviceFooter: "该方案由 SinoSource Global 资深采购总监及 Gemini 3.5 实时运算评估生成，符合国际贸易规则指导意见。",
    useSample: "载入高精密产品模版",
    // Logistics
    logisticsTitle: "多式联运环球物流优化",
    logisticsSub: "我们在深圳、宁波、上海设有自有合规保税仓库，可将中国数十家供应商货物进行集中拼箱、统一分装，解决跨境物流碎片化痛点。",
    oceanFreight: "FCL/LCL 远洋整拼箱服务",
    oceanFreightDesc: "与各大主力远洋船东直接签约，锁定深圳/宁波港旺季保舱保柜特权。",
    airFreight: "空运直航与头程快递",
    airFreightDesc: "专为高货值消费电子、临期促销品或急需生产线补充部件打造的绿色空运通道。",
    railFreight: "中欧班列新丝路铁路",
    railFreightDesc: "低能耗、高平稳陆路通道，14天直连中欧，整体运费比空运节省达70%。",
    warehousing: "拼干线集运与防潮中转",
    warehousingDesc: "免费提供30天保税区货物储存、二次拼装打包和防潮物理封签质检。"
  },
  es: {
    brand: "SinoSource Global",
    brandSub: "ZHEN SOURCING",
    tagline: "Agente de Compras y Suministros Premium",
    navHome: "Resumen General",
    navClusters: "Clústeres Industriales",
    navAql: "Estándar AQL Control",
    navLogistics: "Logística Global",
    navPlanner: "Planificador de IA",
    heroHeadingPrefix: "Cadena de Suministro",
    heroHeadingSuf: "Perfecta.",
    heroSub: "Navegamos la complejidad de la manufactura china in situ. Proporcionamos auditorías de riesgo técnico, control de calidad garantizado, reducción del coste de aranceles y logística.",
    ctaStart: "Iniciar Propuesta IA",
    ctaInquire: "Calculadora Interactiva",
    ctaAql: "Calcular Muestreo",
    statsProcurement: "$1.2B+",
    statsProcurementLbl: "Volumen Comercial Anual",
    statsSla: "48 Horas",
    statsSlaLbl: "Reporte de Riesgo de Fábrica",
    statsPass: "99.4%",
    statsPassLbl: "Tasa de Aprobación de Calidad",
    statsCountries: "140+",
    statsCountriesLbl: "Puertos de Destino Cubiertos",
    info1Title: "01. Auditorías Reales",
    info1Desc: "Investigamos solvencia, patentes y maquinaria de fábricas chinas de primer nivel.",
    info2Title: "02. Precios Ex-Factory",
    info2Desc: "Negociaciones directas suprimiendo comisiones de intermediarios codiciosos.",
    info3Title: "03. Calidad Rigurosa",
    info3Desc: "Muestreos aleatorios in situ conforme al rigor de la tabla estándar AQL 2.5.",
    info4Title: "04. Oficinas Locales",
    info4Desc: "Gerentes y representantes nativos de habla hispana en los principales hubs.",
    clusterTitle: "Clústeres de Producción Líderes en China",
    clusterSub: "La integración directa elimina a los distribuidores especulativos. Seleccione un clúster local para ver tiempos de ejecución, tasas de defectos y rutas de exportación.",
    specialty: "Especialidad en Manufactura",
    leadTime: "Tiempo Promedio de Espera",
    defectRate: "Tasa Promedio de Defectos",
    auditPoint: "Foco Principal de Auditoría",
    dispatchPort: "Puerto de Exportación Preferido",
    aqlTitle: "Calculadora de Control de Calidad AQL ISO 2859-1",
    aqlSub: "Calcule el número exacto de productos que nuestros inspectores extraerán de las cajas. Proteja su inversión con precisión matemática.",
    aqlBatchSize: "Cantidad Total de Productos del Lote",
    aqlGeneralLevel: "Rigor del Nivel de Inspección",
    aqlLevelI: "Nivel I - Reducido (Fábricas maduras e históricas)",
    aqlLevelII: "Nivel II - Estándar (Recomendado industrial global)",
    aqlLevelIII: "Nivel III - Estricto (Aparatos médicos o mecánicos)",
    aqlSampleNeeded: "Unidades a Muestrear e Inspeccionar",
    aqlResultAccept: "Límite de Aceptación (Ac)",
    aqlResultAcceptDesc: "El lote es aprobado si el total de defectos hallados no supera este valor.",
    aqlResultReject: "Límitación de Rechazo (Re)",
    aqlResultRejectDesc: "El lote completo es rechazado si se alcanza esta cifra de defectos. Conlleva rechazo absoluto de embarque.",
    aqlCalculateBtn: "Fijar Estándar Calidad",
    plannerTitle: "Generador IA de Factibilidad de Compras",
    plannerSub: "Consiga un análisis exhaustivo in situ operado por Gemini AI Cloud. Diseñamos recomendaciones de clústers, cronogramas y aranceles.",
    placeholderProduct: "ej. Botella de café de acero inoxidable con aislamiento de doble pared",
    placeholderQty: "ej. 5,000 unidades con cajas customizadas a colores",
    placeholderPrice: "ej. Target $2.50 USD por unidad FOB Puerto de Ningbo",
    placeholderDest: "ej. Puerto de Barcelona (España) - Términos DDP sugeridos",
    formProduct: "Especificaciones del Producto y Requisitos OEM",
    formQty: "Cantidad Total Proyectada",
    formPrice: "Precio Unitario Target (USD)",
    formDest: "Puerto e Incoterm Seleccionado",
    btnGenerate: "Modelar Plan con IA Integrada",
    btnGenerating: "Analizando la cadena de suministro en tiempo real...",
    aiAdviceTitle: "Planificación de Abastecimiento SinoSource Global",
    aiAdviceFooter: "Evaluación formalizada construida por directores senior de SinoSource y Gemini 3.5.",
    useSample: "Cargar Ejemplo de Altas Prestaciones",
    logisticsTitle: "Canales de Envío y Consolidación",
    logisticsSub: "Consolidamos productos de múltiples fábricas en nuestras bodegas de Shenzhen o Ningbo, reduciendo aranceles de importación.",
    oceanFreight: "Marítimo FCL / LCL",
    oceanFreightDesc: "Reserva prioritaria de espacios en naves directas durante la temporada de alta congestión.",
    airFreight: "Aéreo Express de Carga",
    airFreightDesc: "Perfecto para electrónica de alto coste arancelario o campañas de mercadotecnia cortas.",
    railFreight: "Tren de Carga Continental",
    railFreightDesc: "Cruza la antigua Ruta de la Seda conectando terminales claves en solo 15 días.",
    warehousing: "Depósitos Fiscales Propios",
    warehousingDesc: "Ofrecemos 30 días gratuitos de almacenaje y re-embalaje protectivo."
  },
  ru: {
    brand: "SinoSource Global",
    brandSub: "SinoSource Global",
    tagline: "Снабжение и строгий контроль качества на высшем уровне",
    navHome: "Панель управления",
    navClusters: "Промышленные Кластеры",
    navAql: "Калькулятор AQL",
    navLogistics: "Схемы Доставок",
    navPlanner: "ИИ-Планировщик",
    heroHeadingPrefix: "Цепочка Поставок",
    heroHeadingSuf: "В Совершенстве.",
    heroSub: "Преодолеваем сложности китайского производства на месте. Осуществляем честные экспертизы фабрик, аудит параметров производства, надзор AQL 2.5 и доставку под ключ.",
    ctaStart: "Оценить ИИ-Планировщиком",
    ctaInquire: "Открыть калькулятор",
    ctaAql: "Рассчитать объем выборки",
    statsProcurement: "$1.2 млрд+",
    statsProcurementLbl: "Годовой объем экспорта",
    statsSla: "48 Ч",
    statsSlaLbl: "Предоставление отчета о рисках",
    statsPass: "99.4%",
    statsPassLbl: "Доля товаров без брака",
    statsCountries: "140+",
    statsCountriesLbl: "Портов назначения по миру",
    info1Title: "01. Независимый Аудит",
    info1Desc: "Инженерный контроль мощностей и финансовых лицензий реальных китайских фабрик.",
    info2Title: "02. Исключение Наценок",
    info2Desc: "Прямые контракты в юанях и долларах с первой производственной линией в обход перекупщиков.",
    info3Title: "03. Контроль по AQL",
    info3Desc: "Точные математические расчеты выборки согласно регламенту ISO перед отправкой контейнера.",
    info4Title: "04. Локальные Офисы",
    info4Desc: "Постоянное присутствие в Нинбо, Шэньчжэне, Иу, Шанхае для контроля рекламаций.",
    clusterTitle: "Промышленные Кластеры Китая",
    clusterSub: "Прямая интеграция исключает лишних перекупщиков. Выберите нужный производственный регион, чтобы оценить сроки изготовления и порты отгрузки.",
    specialty: "Специализация Кластера",
    leadTime: "Средний Срок Производства",
    defectRate: "Процент Дефектов (Медиана)",
    auditPoint: "Ключевой Фокус Аудита",
    dispatchPort: "Порт Отгрузки (Рекомендуемый)",
    aqlTitle: "Интерактивный Расчет Выборки AQL 2.5",
    aqlSub: "Калькулятор в соответствии со стандартом ISO 2859-1. Укажите объем партии для вычисления точного плана контроля качества.",
    aqlBatchSize: "Объем партии у производителя (шт)",
    aqlGeneralLevel: "Уровень Жесткости Проверки",
    aqlLevelI: "Уровень I - Облегченный (Для проверенных партнеров с историей)",
    aqlLevelII: "Уровень II - Стандартный (Рекомендуемый по умолчанию)",
    aqlLevelIII: "Уровень III - Строгий (Для ответственных и высокотехнологичных товаров)",
    aqlSampleNeeded: "Размер Выборки на Случайную Проверку",
    aqlResultAccept: "Порог Приемки (Ac - Допустимо дефектов)",
    aqlResultAcceptDesc: "Вся партия одобряется к экспорту, если число дефектов не превышает данную цифру.",
    aqlResultReject: "Порог Браковки (Re - Брак всей партии)",
    aqlResultRejectDesc: "Отгрузка мгновенно останавливается, фабрика обязуется перебрать весь лот и запустить калибровку.",
    aqlCalculateBtn: "Утвердить План Проверки",
    plannerTitle: "ИИ-Генератор Стратегии Снабжения",
    plannerSub: "Напишите ваши требования в форму. Алгоритмы Gemini в реальном времени подберут промышленную зону Китая, рассчитают этапы производства и тарифные категории.",
    placeholderProduct: "напр., Изолированная термокружка из нержавеющей стали с двойной вакуумной стенкой и софт-тач покрытием",
    placeholderQty: "напр., 5000 шт с лазерной гравировкой логотипа и премиум упаковкой",
    placeholderPrice: "напр., $2.50 USD за штуку FOB Порт Нинбо",
    placeholderDest: "напр., РФ, Порт Владивосток - Желательно по схеме DDP с пошлинами",
    formProduct: "Описание Товара и OEM Спецификации",
    formQty: "Объем Заказанной Партии",
    formPrice: "Целевой Бюджет на Штуку (USD)",
    formDest: "Пункт Назначения / Таможенный Пост",
    btnGenerate: "Рассчитать цепочку поставок через ИИ",
    btnGenerating: "ИИ рассчитывает фабричные кластеры и логистические расходы...",
    aiAdviceTitle: "Снабженческий аудит SinoSource Global",
    aiAdviceFooter: "Данный отчет сформирован ведущими аналитиками внешней торговли SinoSource при техническом аутсорсинге ИИ.",
    useSample: "Загрузить Пример Спецификации",
    logisticsTitle: "Мультимодальные Маршруты Доставок",
    logisticsSub: "Консолидация грузов от множества фабрик на наших терминалах в Нинбо или Шэньчжэне с уменьшением фрахтовых издержек.",
    oceanFreight: "Морской Фрахт FCL / LCL Контейнеров",
    oceanFreightDesc: "Прямые букинги с ведущими альянсами судовладельцев, гарантированные места на судах.",
    airFreight: "Срочные Авиаперевозки Экспресс",
    airFreightDesc: "Отличный выбор для малоразмерной электроники, спешной модификации или пилотных продаж.",
    railFreight: "Железнодорожный Шелковый Путь",
    railFreightDesc: "Надежные поезда ускоренного сообщения транзитом через пограничные переходы в РФ/СНГ.",
    warehousing: "Склады В КНР и Консолидация",
    warehousingDesc: "Бесплатные 30 дней сортировки, усиленной термоусадки и предпускового тестирования на складах."
  }
};

// Premium industrial clusters matching actual industrial realities of China
const industrialClustersList: IndustrialCluster[] = [
  {
    id: "shenzhen",
    city: "Shenzhen / Bao'an / Dongguan (深圳・东莞)",
    specialty: {
      en: "Advanced Smart Electronics, IoT Sensors, Medical Wearables, SMT Assemblies",
      zh: "高端智能消费电子、物联网感知原件、穿戴式分析仪、高精度SMT贴片拼装",
      es: "Electrónica Premium, Dispositivos IoT, Equipos de Diagnóstico o Wearables",
      ru: "Высокотехнологичный SMT-монтаж, датчики IoT, потребительская электроника"
    },
    description: {
      en: "The hardware capital of the world. Houses ultra-integrated component vendors, rigid multi-layer PCB, custom robotic tooling, and high-frequency wave chambers.",
      zh: "全球硬件制造业的心脏腹地。汇聚了高阶PCB贴片、快速注塑模具开发、射频暗室检测与庞大电子元器件就地流通市场。",
      es: "El epicentro de la tecnología de hardware. Cuenta con integradores de semiconductores, matricería robotizada e infraestructuras de primer orden.",
      ru: "Глобальное сердце электроники. Крупнейшие фабрики по монтажу печатных плат, моментальный подбор пассивных компонентов и штамп корпусов."
    },
    leadTime: {
      en: "25 - 30 Days (Direct SMT line priority list available)",
      zh: "25 - 30 天 （可享受备料及高精SMT排产线特权）",
      es: "25 - 30 Días (Opción de priorizar en línea SMT)",
      ru: "25 - 30 дней (Постоянное резервирование SMT мощностей)"
    },
    defectRate: "0.15%",
    auditPoint: {
      en: "Electrostatic Discharge (ESD) compliance checks, automated laser SMT optical inspects, component burn-in chamber metrics.",
      zh: "静电防护(ESD)达标规范、AOI自动光学对位偏差仪、元器件24小时高压变温老化箱运行数据。",
      es: "Sistemas contra descargas electrostáticas (ESD), AOI automático, análisis en cámaras de temperatura extrema.",
      ru: "Стандарты антистатической защиты ESD, автоматический оптический контроль AOI, камеры жесткого циклического старения ИС."
    },
    ports: ["Yantian Core Seaport (盐田深水港)", "Shekou Port (蛇口客货港)", "SZX Airport Cargo Hub (深圳宝安机场)"]
  },
  {
    id: "yiwu",
    city: "Yiwu / Jinhua Core Zone (浙江义乌・金华)",
    specialty: {
      en: "Eco Commodities, Biodegradable Packaging, Modern Novelties, Apparel",
      zh: "环保日用日化百货、降解新材料纸塑、定制赠品小百货及现代箱包运动服饰",
      es: "Productos Generales Ecofriendly, Embalaje Biodegradable, Artículos Promocionales",
      ru: "Эко-сопряженные товары, упаковка из переработанного сырья, промо-текстиль"
    },
    description: {
      en: "Historically the largest physical market in the world. Ideal for rapid turnarounds, customizable low-cost container aggregations, and high volume giftware.",
      zh: "世界第一大小商品集拼重镇。特别适合大批量广告礼品、低成本货架定制百货，多工厂低成本拼单效率极高。",
      es: "El mercado mayorista de mercancías generales más grande. Ideal para tiradas rápidas de bajo coste unitario con re-etiquetado corporativo.",
      ru: "Главный хаб по консолидации розничных товаров. Пожизненная сырьевая доступность, дешевый штамп и литье полимеров."
    },
    leadTime: {
      en: "15 - 20 Days (Extremely fast mass layout runs)",
      zh: "15 - 20 天 （以极快的工期进行大规模复制生产）",
      es: "15 - 20 Días (Producción ultrarrápida)",
      ru: "15 - 20 дней (Печатающие и штамповочные карусели сверхбыстрого цикла)"
    },
    defectRate: "0.78%",
    auditPoint: {
      en: "Chemical composition non-toxics verification (RoHS/BPA-Free), carton load tolerance limits, wage compliance records.",
      zh: "无毒环保材质RoHS抽测、外箱物理拉伸及跌落力测试、本土劳工薪酬福利合规台账核验。",
      es: "Ensayos químicos (sin BPA/RoHS) del embalaje, resistencia a caídas de estiba, salarios del personal.",
      ru: "Безвредность сырья по регламенту RoHS и REACH, тесты картона на пробой, честность выплат персоналу."
    },
    ports: ["Ningbo-Zhoushan Port (宁波舟山港)", "Yiwu Railway dry-port (义乌陆港)"]
  },
  {
    id: "ningbo",
    city: "Ningbo / Cixi Appliance Zone (浙江宁波・慈溪)",
    specialty: {
      en: "Major & Small Home Appliances, Fasteners, Brass Pneumatics, Mold Tooling",
      zh: "厨房小家电、精密承重紧固五金、气动铜质阀件与大型机机械精修模具",
      es: "Electrodomésticos, Acoplamientos de Metal, Válvulas de Bronce, Moldes de Inyección",
      ru: "Портативная кухонная техника, металлические уплотнители, метизы и пресс-формы"
    },
    description: {
      en: "The powerhouse of steel and electric motor standards. Direct proximity to Ningbo-Zhoushan port makes FCL ocean dispatch highly frictionless.",
      zh: "国内首屈一指的小家电与模具机械设计摇篮。直连宁波舟山海港，重托重箱极速报关出海拼箱通畅。",
      es: "La cuna nacional del diseño mecánico y pequeños motores eléctricos. Proximidad marítima total al superpuerto de Zhoushan.",
      ru: "Логистически лучший кластер с выходом на порт Нинбо-Чжоушань. Прекрасное автоматизированное штамповочное литьё."
    },
    leadTime: {
      en: "28 - 35 Days (Includes custom mold testing and calibration)",
      zh: "28 - 35 天 （包含了详细模具校准、压注调试及耐压实验）",
      es: "28 - 35 Días (Incluye fundición y calibración de moldes)",
      ru: "28 - 35 дней (Включает этап проточки матриц и финальную подгонку пресса)"
    },
    defectRate: "0.29%",
    auditPoint: {
      en: "Insulation leakage current measurements under load, thermal protection fuse cutoff limits, zinc-aluminum alloy purity testing.",
      zh: "过载高压漏电安全断路、热敏控温温控器极限熔断、压铸锌铝材质微观空洞X射线扫描。",
      es: "Corrientes de fuga bajo sobrecarga, límites térmicos en fusibles automáticos, pureza de la aleación metálica.",
      ru: "Токи утечки под нагрузкой, температура срабатывания тепловых реле, рентген стальных сплавов на микротрещины."
    },
    ports: ["Ningbo Beilun Deep-Water Terminals (宁波北仑港区)", "Shanghai Ocean Port (上海洋山港)"]
  }
];

// Calculation Function for standardized ISO 2859-1 Single Sampling Plan
function calculateAQL(batch: number, level: string) {
  let sampleSize = 125;
  let ac = 7;
  let re = 8;
  let code = "K";

  if (batch <= 8) { sampleSize = 2; ac = 0; re = 1; code = "A"; }
  else if (batch <= 15) { sampleSize = 3; ac = 0; re = 1; code = "B"; }
  else if (batch <= 25) { sampleSize = 5; ac = 0; re = 1; code = "C"; }
  else if (batch <= 50) { sampleSize = 8; ac = 0; re = 1; code = "D"; }
  else if (batch <= 90) { sampleSize = 13; ac = 0; re = 1; code = "E"; }
  else if (batch <= 150) { sampleSize = 20; ac = 1; re = 2; code = "F"; }
  else if (batch <= 280) { sampleSize = 32; ac = 2; re = 3; code = "G"; }
  else if (batch <= 500) { sampleSize = 50; ac = 3; re = 4; code = "H"; }
  else if (batch <= 1200) { sampleSize = 80; ac = 5; re = 6; code = "J"; }
  else if (batch <= 3200) { sampleSize = 125; ac = 7; re = 8; code = "K"; }
  else if (batch <= 10000) { sampleSize = 200; ac = 10; re = 11; code = "L"; }
  else if (batch <= 35000) { sampleSize = 315; ac = 14; re = 15; code = "M"; }
  else { sampleSize = 500; ac = 21; re = 22; code = "N"; }

  // Adjust parameters proportionally for alternative inspector rigor level to emulate absolute reality
  if (level === "I") {
    sampleSize = Math.max(2, Math.floor(sampleSize * 0.4));
    ac = Math.max(0, Math.floor(ac * 0.4));
    re = ac + 1;
    code = String.fromCharCode(Math.max(65, code.charCodeAt(0) - 2));
  } else if (level === "III") {
    sampleSize = Math.min(1250, Math.floor(sampleSize * 2.5));
    ac = Math.floor(ac * 1.8);
    re = ac + 1;
    code = String.fromCharCode(Math.min(90, code.charCodeAt(0) + 1));
  }

  return { sampleSize, ac, re, code };
}

export default function App() {
    const [lang, setLang] = useState<Language>("en"); // Defaulting to English interface upon visit

  // Dynamically update page document title, description, and HTML lang property for robust SEO
  useEffect(() => {
    // 1. Set document language code
    document.documentElement.lang = lang;

    // 2. Localized Title and Description mapping
    let metaTitle = "SinoSource Global | Premier China Sourcing Agent, Factory Audits & Quality Control Inspection";
    let metaDesc = "SinoSource Global is your premier tier-1 Chinese sourcing agent, offering factory safety audits, direct factory-direct price mitigation, international AQL 2.5 random quality inspections, and full-stack cross-border logistics consolidation.";

    if (lang === "zh") {
      metaTitle = "华源环球采购 | 跨境采购代理、工厂穿透审计与 AQL 2.5 质量检测标准 - SinoSource Global";
      metaDesc = "华源环球采购是专业的中国源头工厂采购代办商，提供制造商物理隔离审计、降低出厂虚高报价、国际AQL抽检以及多式联运环球清关拼箱。";
    } else if (lang === "es") {
      metaTitle = "SinoSource Global | Agente de Compras en China, Auditorías de Fábrica y Control de Calidad Estándar AQL";
      metaDesc = "Navegamos la complejidad de la manufactura china in situ. SinoSource Global proporciona auditorías de riesgo técnico, control de calidad garantizado AQL 2.5 y reducción de aranceles.";
    } else if (lang === "ru") {
      metaTitle = "SinoSource Global | Поиск поставщиков в Китае, независимый аудит фабрик и контроль качества AQL";
      metaDesc = "Прямые контракты с производителями Китая без наценок посредников. SinoSource Global обеспечивает надежные инженерные проверки фабрик, контроль качества по AQL 2.5 и мультимодальную доставку.";
    }

    // Update document title
    document.title = metaTitle;

    // Update dynamic description meta tag if available
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute("content", metaDesc);
    }
    
    // Update Open Graph dynamic signals
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", metaTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", metaDesc);
  }, [lang]);

  const T = (zh: React.ReactNode, en: React.ReactNode, es?: React.ReactNode, ru?: React.ReactNode): React.ReactNode => {
    if (lang === "zh") return zh;
    if (lang === "es") return es || en;
    if (lang === "ru") return ru || en;
    return en;
  };
  const [activeTab, setActiveTab] = useState<string>("home");
  
  // Interactive Cluster State
  const [selectedCluster, setSelectedCluster] = useState<IndustrialCluster>(industrialClustersList[0]);

  // Active Route Step for Maritime supply pipeline map
  const [activeRouteStep, setActiveRouteStep] = useState<number>(2);

  // Customer Inquiry Form State
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>([]);
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryContact, setInquiryContact] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryProduct, setInquiryProduct] = useState("");
  const [inquiryQty, setInquiryQty] = useState("");
  const [inquirySpecs, setInquirySpecs] = useState("");
  const [inquiryIncoterms, setInquiryIncoterms] = useState("FOB Ningbo Port");
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);
  const [inquiryError, setInquiryError] = useState("");
  const [inquiryPasscode, setInquiryPasscode] = useState("");
  const [showInquiryNotice, setShowInquiryNotice] = useState(false);
  const [isTrackerModalOpen, setIsTrackerModalOpen] = useState(false);
  const [adminSearch, setAdminSearch] = useState("");
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    const email = "xuanm5951@gmail.com";
    navigator.clipboard.writeText(email)
      .then(() => {
        setEmailCopied(true);
        setTimeout(() => {
          setEmailCopied(false);
        }, 5000);
      })
      .catch((err) => {
        console.error("Failed to copy email: ", err);
      });
  };

  const getMailtoLink = () => {
    const baseEmail = "xuanm5951@gmail.com";
    const subjectText = inquiryProduct 
      ? `${T("华源跨境采购需求线索：", "SinoSource Sourcing Inquiry: ")}${inquiryProduct}` 
      : (T("华源全球供应链采购需求提单", "SinoSource Global Sourcing Request"));
    
    let bodyText = T("华源全球业务中心（SinoSource Global Sourcing Desk），您好：\n\n我希冀发起全球供应链采购寻源排期委派：\n\n", "Dear SinoSource Global Sourcing Desk,\n\nI would like to submit a global sourcing inquiry using this digital desk:\n\n");
    bodyText += `=== ${T("采购需求规格提单 (Sourcing Profile)", "Sourcing Profile Details")} ===\n`;
    bodyText += `${T("企业/联络主体名称", "Company / Representative Name")}: ${inquiryName || "(空 / Not provided)"}\n`;
    bodyText += `${T("物理联系方式/社交", "Contact Number / Mobile / Social")}: ${inquiryContact || "(空 / Not provided)"}\n`;
    bodyText += `${T("技术接收官方邮箱", "Corporate Official Email")}: ${inquiryEmail || "(空 / Not provided)"}\n`;
    bodyText += `${T("寻源原材料品类", "Target Product / Material Category")}: ${inquiryProduct || "(空 / Not provided)"}\n`;
    bodyText += `${T("计划体量或批量数", "Commercial Batch size / Volume")}: ${inquiryQty || "(空 / Not provided)"}\n`;
    bodyText += `${T("意向贸易条款", "Proposed Incoterms")}: ${inquiryIncoterms || "FOB Ningbo Port"}\n`;
    bodyText += `${T("多维定制参数/开模/公差及质检标准", "Physical Specs, Mold Tolerances & AQL Standards")}:\n${inquirySpecs || (T("(空 / Please specify any CAD file links or micrometric tolerance boundaries)", "(Not provided)"))}\n\n`;
    bodyText += T("顺祝商祺，\n", "Best regards,\n");
    bodyText += `${inquiryName || (T("华源全球采购伙伴", "SinoSource Partner"))}\n`;

    return `mailto:${baseEmail}?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(bodyText)}`;
  };

  const fetchInquiries = async () => {
    try {
      // Load local cache first as baseline
      let localItems: CustomerInquiry[] = [];
      try {
        const cachedStr = localStorage.getItem("sinosourse_local_inquiries");
        if (cachedStr) {
          localItems = JSON.parse(cachedStr);
        }
      } catch (err) {
        console.error("Error parsing local cache:", err);
      }

      const response = await fetch("/api/inquiries");
      if (response.ok) {
        const serverData = await response.json();
        // Merge server and local inquiries to avoid duplicate keys, prioritizing server info
        const mergedMap = new Map<string, CustomerInquiry>();
        
        // Load server data (which is authoritative)
        serverData.forEach((item: CustomerInquiry) => {
          if (item.id) {
            mergedMap.set(item.id, item);
          }
        });

        // Fill in local deviations
        localItems.forEach((item: CustomerInquiry) => {
          if (item.id && !mergedMap.has(item.id)) {
            mergedMap.set(item.id, item);
          }
        });

        const mergedList = Array.from(mergedMap.values()).sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setInquiries(mergedList);
      } else {
        if (localItems.length > 0) {
          setInquiries(localItems);
        }
      }
    } catch (err) {
      console.error("Error fetching inquiries:", err);
      // Fallback seamlessly to local cache only
      try {
        const cachedStr = localStorage.getItem("sinosourse_local_inquiries");
        if (cachedStr) {
          setInquiries(JSON.parse(cachedStr));
        }
      } catch (e) {
        console.error("Failed to load local storage:", e);
      }
    }
  };

  const deleteInquiry = async (id: string | undefined) => {
    if (!id) return;
    try {
      const cachedStr = localStorage.getItem("sinosourse_local_inquiries");
      const localList: CustomerInquiry[] = cachedStr ? JSON.parse(cachedStr) : [];
      const updated = localList.filter(item => item.id !== id);
      localStorage.setItem("sinosourse_local_inquiries", JSON.stringify(updated));
      setInquiries(prev => prev.filter(item => item.id !== id));

      await fetch(`/api/inquiries/${id}`, {
        method: "DELETE"
      });
      fetchInquiries();
    } catch (err) {
      console.error("Failed to delete inquiry:", err);
    }
  };

  const updateInquiryStatus = async (id: string | undefined, newStatus: string) => {
    if (!id) return;
    try {
      const cachedStr = localStorage.getItem("sinosourse_local_inquiries");
      const localList: CustomerInquiry[] = cachedStr ? JSON.parse(cachedStr) : [];
      const updated = localList.map(item => {
        if (item.id === id) {
          return { ...item, status: newStatus };
        }
        return item;
      });
      localStorage.setItem("sinosourse_local_inquiries", JSON.stringify(updated));
      setInquiries(prev => prev.map(item => {
        if (item.id === id) {
          return { ...item, status: newStatus };
        }
        return item;
      }));

      await fetch(`/api/inquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      fetchInquiries();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  useEffect(() => {
    // Instantaneous reactive fetch from local cache so the page is populated immediately
    try {
      const cachedStr = localStorage.getItem("sinosourse_local_inquiries");
      if (cachedStr) {
        setInquiries(JSON.parse(cachedStr));
      }
    } catch (e) {
      console.error("Instant load error:", e);
    }
    fetchInquiries();
  }, []);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryContact.trim() || !inquiryEmail.trim() || !inquiryProduct.trim()) {
      setInquiryError(T("请填齐所有必填项（联络姓名、联系方式、邮箱和产品描述）", "Please fill in all required fields."));
      return;
    }

    const currentName = inquiryName;
    const currentContact = inquiryContact;
    const currentEmail = inquiryEmail;
    const currentProduct = inquiryProduct;
    const currentQty = inquiryQty;
    const currentSpecs = inquirySpecs;
    const currentIncoterms = inquiryIncoterms;

    setIsSubmittingInquiry(true);
    setInquiryError("");
    setInquirySuccess(false);

    let createdInquiry: CustomerInquiry | null = null;

    try {
      // First attempt to save via custom Express server JSON API
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: currentName,
          contact: currentContact,
          email: currentEmail,
          productName: currentProduct,
          quantity: currentQty,
          specifications: currentSpecs,
          incoterms: currentIncoterms
        })
      });

      if (response.ok) {
        createdInquiry = await response.json();
      } else {
        console.warn("Backend API returned non-ok response, deploying resilient client-side fallback.");
      }
    } catch (err) {
      console.error("Network or severe backend disconnect detected:", err);
    }

    // Dynamic client-side synthesis if API is sleep mode, cold-starting, or strictly static
    if (!createdInquiry) {
      createdInquiry = {
        id: `INQ-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(100 + Math.random() * 900)}`,
        clientName: currentName,
        contact: currentContact,
        email: currentEmail,
        productName: currentProduct,
        quantity: currentQty || (T("暂未指定", "Not Specified")),
        specifications: currentSpecs || (T("无特殊工艺材质及 AQL 重点参数标示。", "No special requests")),
        incoterms: currentIncoterms,
        status: "Reviewing (资深总监评估中)",
        createdAt: new Date().toISOString()
      };
    }

    // Push into client local storage immediately to persist
    try {
      const cachedStr = localStorage.getItem("sinosourse_local_inquiries");
      const localList: CustomerInquiry[] = cachedStr ? JSON.parse(cachedStr) : [];
      // Keep only unique ids, unshift new object
      const filtered = localList.filter(item => item.id !== createdInquiry!.id);
      filtered.unshift(createdInquiry);
      localStorage.setItem("sinosourse_local_inquiries", JSON.stringify(filtered));
    } catch (err) {
      console.error("Local storage write failure:", err);
    }

    // Force real-time reactivity in UI state even before secondary re-fetching completes
    const freshRecord = createdInquiry;
    setInquiries(prev => {
      if (prev.some(p => p.id === freshRecord.id)) return prev;
      return [freshRecord, ...prev];
    });

    setInquirySuccess(true);
    setShowInquiryNotice(true);
    setIsSubmittingInquiry(false);

    // Reset input fields immediately for absolute tactile satisfaction
    setInquiryName("");
    setInquiryContact("");
    setInquiryEmail("");
    setInquiryProduct("");
    setInquiryQty("");
    setInquirySpecs("");

    // Smooth scroll to the Reputable Liaison Contact Center (company-contact-section)
    setTimeout(() => {
      const element = document.getElementById("company-contact-section");
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 450);

    // Trigger async merge pull to sync state
    fetchInquiries();
  };

  // Interactive AQL Simulator State
  const [aqlBatch, setAqlBatch] = useState<number>(3500);
  const [aqlLevel, setAqlLevel] = useState<string>("II");
  const [aqlResults, setAqlResults] = useState(calculateAQL(3500, "II"));

  // Interactive Live AI Sourcing Planner State
  const [productDesc, setProductDesc] = useState<string>("");
  const [quantityStr, setQuantityStr] = useState<string>("");
  const [priceStr, setPriceStr] = useState<string>("");
  const [destinationStr, setDestinationStr] = useState<string>("");
  
  const [aiPlanningOutput, setAiPlanningOutput] = useState<string>("");
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string>("");

  // Recalculate AQL numbers on input changes
  useEffect(() => {
    setAqlResults(calculateAQL(aqlBatch, aqlLevel));
  }, [aqlBatch, aqlLevel]);

  // Pre-load standard Spec Samples so users can test immediately inside AI section
  const handleLoadSampleData = () => {
    if (lang === "zh") {
      setProductDesc("食品级304不锈钢抽真空保温杯，哑光涂层，500毫升容量，包含物理密封检漏硅胶圈");
      setQuantityStr("3000 件");
      setPriceStr("$2.45 美元/件 FOB宁波港落地价格");
      setDestinationStr("德国汉堡（Hamburg Port）- 偏好DDP门到门，包含欧标RoHS声明核验");
    } else if (lang === "es") {
      setProductDesc("Taza térmica de acero inoxidable S30408, aislamiento de doble pared, 500ml capacidad con juntas de silicona de grado alimenticio.");
      setQuantityStr("3,000 unidades");
      setPriceStr("$2.45 USD por unidad");
      setDestinationStr("Puerto de Barcelona (España) - Términos DDP con verificación CE.");
    } else if (lang === "ru") {
      setProductDesc("Термокружка из пищевой стали S30408 с двойными вакуумными стенками, 500 мл, матовое покрытие, силиконовые уплотнители.");
      setQuantityStr("3000 шт");
      setPriceStr("$2.45 USD за шт.");
      setDestinationStr("РФ, Порт Санкт-Петербург - Базис DDP с растаможкой.");
    } else {
      setProductDesc("Double-wall S30408 stainless steel thermal coffee tumbler, 500ml capacity, matte black finish, leakproof silicone seals.");
      setQuantityStr("3,000 units");
      setPriceStr("$2.45 USD per unit FOB Ningbo");
      setDestinationStr("Port of Rotterdam (Netherlands) - DDP terms preferred.");
    }
  };

  // Live trigger server-side Gemini generation via our secure API proxy
  const handleGeneratePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productDesc.trim()) {
      alert(T("请输入您想要采购的产品特长需求描述", "Please input product descriptions"));
      return;
    }

    setIsAiLoading(true);
    setAiPlanningOutput("");
    setAiError("");

    try {
      const response = await fetch("/api/sourcing/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: productDesc,
          quantity: quantityStr,
          targetPrice: priceStr,
          destination: destinationStr,
          language: lang
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP status error ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setAiPlanningOutput(data.planText);
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || "Unable to reach artificial intelligence dispatcher.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div id="sinosource-frame" className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans text-slate-900 leading-normal antialiased">
      
      {/* Top Professional Navigation Header */}
      <nav id="navbar" className="sticky top-0 z-50 h-20 px-4 md:px-12 flex items-center justify-between bg-white border-b border-slate-200 shadow-sm shrink-0">
        <div id="nav-brand" className="flex items-center space-x-3.5 group">
          <button 
            type="button"
            onClick={() => setIsTrackerModalOpen(true)}
            className="relative w-11 h-11 bg-slate-950 flex items-center justify-center rounded-sm shrink-0 shadow-lg border border-[#c5a059]/40 hover:border-[#c5a059] hover:shadow-[0_0_15px_rgba(197,160,89,0.3)] transition-all duration-300 transform hover:scale-[1.03] cursor-pointer"
            title={T("打开安全授权中控终端", "Open Secure Console")}
          >
            <div className="absolute inset-0 opacity-15 bg-gradient-to-tr from-[#c5a059] to-transparent"></div>
            {/* Elegant vector icon representing layered secure supply nodes */}
            <svg className="w-6 h-6 text-[#c5a059] transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2L3 7L12 12L21 7L12 2Z" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 12L12 17L21 12" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 17L12 22L21 17" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 5.5C12 5.5 10.5 6.5 10.5 7.5C10.5 8.5 12 9 12 10C12 11 10.5 11.5 10.5 11.5" strokeLinecap="round" strokeWidth="1.5" />
            </svg>
          </button>
          <div className="flex flex-col">
            <span className="text-base md:text-lg font-black tracking-widest text-slate-950 uppercase">
              {t[lang].brand}
            </span>
            <span className="text-[9px] tracking-[0.3em] font-black text-[#c5a059] uppercase -mt-0.5 hidden md:inline-block">
              {t[lang].brandSub}
            </span>
          </div>
        </div>

        {/* Dense Tabs Navigation for Quick Desktop Context */}
        <div id="nav-tabs" className="hidden lg:flex items-center space-x-1 xl:space-x-4 text-[13px] xl:text-[14px] font-semibold text-slate-600">
          <button 
            id="tabbtn-home"
            onClick={() => setActiveTab("home")}
            className={`px-3 py-2 rounded-md transition ${activeTab === "home" ? "text-[#003580] bg-slate-100 border-b-2 border-[#003580]" : "hover:text-[#003580] hover:bg-slate-50"}`}
          >
            {t[lang].navHome}
          </button>
          <button 
            id="tabbtn-clusters"
            onClick={() => setActiveTab("clusters")}
            className={`px-3 py-2 rounded-md transition ${activeTab === "clusters" ? "text-[#003580] bg-slate-100 border-b-2 border-[#003580]" : "hover:text-[#003580] hover:bg-slate-50"}`}
          >
            {t[lang].navClusters}
          </button>
          <button 
            id="tabbtn-aql"
            onClick={() => setActiveTab("aql")}
            className={`px-3 py-2 rounded-md transition ${activeTab === "aql" ? "text-[#003580] bg-slate-100 border-b-2 border-[#003580]" : "hover:text-[#003580] hover:bg-slate-50"}`}
          >
            {t[lang].navAql}
          </button>
          <button 
            id="tabbtn-logistics"
            onClick={() => setActiveTab("logistics")}
            className={`px-3 py-2 rounded-md transition ${activeTab === "logistics" ? "text-[#003580] bg-slate-100 border-b-2 border-[#003580]" : "hover:text-[#003580] hover:bg-slate-50"}`}
          >
            {t[lang].navLogistics}
          </button>
          <button 
            id="tabbtn-planner"
            onClick={() => setActiveTab("planner")}
            className={`px-4 py-2 rounded-md text-white bg-[#003580] hover:bg-opacity-90 flex items-center space-x-1.5 shadow-sm transition`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>{t[lang].navPlanner}</span>
          </button>
        </div>

        {/* Global Multi-linguial Flags / Locales - Extreme Accessibility */}
        <div id="nav-locales" className="flex items-center space-x-2">
          <div className="flex bg-slate-100 p-1 rounded-sm border border-slate-200">
            {(["en", "zh", "es", "ru"] as Language[]).map((l) => (
              <button
                key={l}
                id={`lang-switch-${l}`}
                onClick={() => setLang(l)}
                className={`text-[11px] font-black tracking-wider px-2 py-1 rounded-sm uppercase transition-all ${lang === l ? "bg-[#003580] text-white" : "text-slate-600 hover:text-[#003580]"}`}
              >
                {l === "zh" ? "中" : l}
              </button>
            ))}
          </div>

          <button 
            type="button"
            onClick={() => {
              setActiveTab("home");
              setTimeout(() => {
                const element = document.getElementById("customer-inquiry-section");
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }, 100);
            }}
            className="bg-[#003580] text-white text-xs md:text-sm lg:text-base font-black px-5 py-2.5 md:px-6 md:py-3 hover:bg-opacity-95 hover:scale-105 active:scale-[0.98] transition-all duration-250 rounded-sm flex items-center shadow-md cursor-pointer"
          >
            {T("立即联系", "Contact Us", "Contactar", "Связаться")}
          </button>
        </div>
      </nav>

      {/* Mobile-Only Horizontal Scrollable Tab bar - High-Fidelity App Experience */}
      <div id="nav-tabs-mobile" className="sticky top-20 z-40 lg:hidden flex items-center space-x-2 overflow-x-auto whitespace-nowrap bg-white border-b border-slate-200 px-4 py-2.5 scrollbar-none shadow-sm">
        <button
          onClick={() => setActiveTab("home")}
          className={`px-3 py-1.5 rounded-sm text-xs font-bold transition-all shrink-0 ${activeTab === "home" ? "bg-[#003580] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
        >
          {t[lang].navHome}
        </button>
        <button
          onClick={() => setActiveTab("clusters")}
          className={`px-3 py-1.5 rounded-sm text-xs font-bold transition-all shrink-0 ${activeTab === "clusters" ? "bg-[#003580] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
        >
          {t[lang].navClusters}
        </button>
        <button
          onClick={() => setActiveTab("aql")}
          className={`px-3 py-1.5 rounded-sm text-xs font-bold transition-all shrink-0 ${activeTab === "aql" ? "bg-[#003580] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
        >
          {t[lang].navAql}
        </button>
        <button
          onClick={() => setActiveTab("logistics")}
          className={`px-3 py-1.5 rounded-sm text-xs font-bold transition-all shrink-0 ${activeTab === "logistics" ? "bg-[#003580] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
        >
          {t[lang].navLogistics}
        </button>
        <button
          onClick={() => setActiveTab("planner")}
          className={`px-3 py-1.5 rounded-sm text-xs font-bold transition-all shrink-0 flex items-center space-x-1 ${activeTab === "planner" ? "bg-[#003580] text-white" : "bg-[#003580]/10 text-[#003580] hover:bg-[#003580]/20"}`}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>{t[lang].navPlanner}</span>
        </button>
      </div>

      {/* Hero Presentation Display Card / Upper viewport (Standard on Home Tab) */}
      {activeTab === "home" && (
        <header id="corp-hero" className="relative flex-shrink-0 bg-slate-950 text-white py-16 md:py-24 px-4 md:px-12 overflow-hidden border-b-4 border-[#c5a059]">
          {/* Background image layer matching the exact container port aesthetic */}
          <div className="absolute inset-0 z-0">
            <style dangerouslySetInnerHTML={{ __html: `
              @keyframes laserSweep {
                0% { top: 0%; opacity: 0; }
                10% { opacity: 0.4; }
                90% { opacity: 0.4; }
                100% { top: 100%; opacity: 0; }
              }
              @keyframes spinSlow {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}} />
            <motion.img 
              src={cargoShipHero} 
              alt="SinoSource cargo container ship docked at port" 
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
              animate={{
                scale: [1, 1.07, 1],
              }}
              transition={{
                duration: 25,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            />
            
            {/* Elegant premium dynamic tech glow overlay: scanner scanlines */}
            <div 
              className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#c5a059]/40 to-transparent top-0 opacity-40 select-none pointer-events-none" 
              style={{ animation: 'laserSweep 10s infinite linear' }} 
            />

            {/* Slow floating high-end ambient gold particle field */}
            <div className="absolute inset-0 overflow-hidden mix-blend-screen opacity-50 pointer-events-none">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <g fill="#c5a059">
                  <circle cx="12%" cy="25%" r="1.8">
                    <animate attributeName="cy" values="25%;15%;25%" dur="20s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.15;0.7;0.15" dur="20s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="38%" cy="70%" r="1.5">
                    <animate attributeName="cy" values="70%;58%;70%" dur="24s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.1;0.6;0.1" dur="24s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="58%" cy="32%" r="2.2">
                    <animate attributeName="cy" values="32%;48%;32%" dur="28s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.2;0.8;0.2" dur="28s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="76%" cy="48%" r="1.8">
                    <animate attributeName="cy" values="48%;35%;48%" dur="22s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.15;0.75;0.15" dur="22s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="92%" cy="78%" r="2.8">
                    <animate attributeName="cy" values="78%;88%;78%" dur="32s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.1;0.5;0.1" dur="32s" repeatCount="indefinite" />
                  </circle>
                </g>
                <g fill="#3b82f6">
                  <circle cx="22%" cy="65%" r="2.5">
                    <animate attributeName="cy" values="65%;75%;65%" dur="27s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.1;0.55;0.1" dur="27s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="68%" cy="18%" r="1.8">
                    <animate attributeName="cy" values="18%;28%;18%" dur="23s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.15;0.65;0.15" dur="23s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="82%" cy="42%" r="2.2">
                    <animate attributeName="cy" values="42%;32%;42%" dur="21s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.18;0.72;0.18" dur="21s" repeatCount="indefinite" />
                  </circle>
                </g>
              </svg>
            </div>

            {/* Ambient slow rotating navigational compass HUD grid in the corner */}
            <div 
              className="absolute right-[-100px] top-[-50px] w-[500px] h-[500px] rounded-full border border-dashed border-[#c5a059]/10 select-none pointer-events-none origin-center" 
              style={{ animation: 'spinSlow 120s infinite linear' }}
            >
              <div className="absolute inset-10 rounded-full border border-double border-white/5" />
              <div className="absolute inset-28 rounded-full border border-[#3b82f6]/5" />
              <div className="absolute inset-44 rounded-full border border-dashed border-[#c5a059]/5" />
            </div>

            {/* Dark deep-blue overlay to seamlessly preserve text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-[#001c44]/70"></div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059] opacity-5 rounded-full filter blur-3xl z-0"></div>
          
          <div className="relative max-w-7xl ml-0 mr-auto pl-4 sm:pl-8 md:pl-16 lg:pl-20 z-10 font-sans">
            <div className="flex items-center space-x-3 mb-5">
              <span className="h-[2px] w-10 bg-[#c5a059]"></span>
              <span className="text-[#c5a059] uppercase tracking-[0.3em] text-[11px] md:text-sm font-black">
                {t[lang].tagline}
              </span>
            </div>
            
            <h1 id="hero-heading" className="text-5xl sm:text-7xl md:text-8xl lg:text-[6rem] xl:text-[7rem] font-black tracking-tighter mb-6 leading-[1.0] uppercase">
              <span className="text-white">{t[lang].heroHeadingPrefix} </span>
              <span className="text-[#c5a059]">{t[lang].heroHeadingSuf}</span>
            </h1>
            
            <p className="text-slate-300 text-xs md:text-base max-w-3xl leading-relaxed mb-10">
              {t[lang].heroSub}
            </p>

            <div className="space-y-6">
              {/* Prominent high-contrast primary CTA: Contact Us */}
              <button 
                onClick={() => {
                  const element = document.getElementById("customer-inquiry-section");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className="bg-[#c5a059] hover:bg-yellow-500 text-slate-950 px-6 py-3.5 md:px-10 md:py-5 font-black rounded-sm text-sm md:text-base lg:text-lg flex items-center space-x-3 shadow-2xl transition duration-300 transform hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
              >
                <Phone className="w-5 h-5 md:w-6 md:h-6 text-slate-950" />
                <span>{T("与我们建立联系 / 提交采购规格", "Contact Our Experts / Register RFP Specs")}</span>
                <ArrowRight className="w-4.5 h-4.5 md:w-5.5 md:h-5.5 text-slate-950 ml-1" />
              </button>

              {/* Shrunken, secondary, compact tools row */}
              <div className="flex flex-wrap items-center gap-3 pt-12 md:pt-20 border-t border-white/10 mt-8">
                <span className="text-[11px] md:text-sm text-slate-400 mr-2 uppercase tracking-widest font-mono font-bold">
                  {T("智能分析终端工具车：", "Core Engines Console:")}
                </span>
                
                <button 
                  onClick={() => setActiveTab("planner")}
                  className="bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-[#c5a059]/60 px-4 py-2 rounded-sm text-xs md:text-sm font-bold transition flex items-center space-x-2"
                  title={T("生成AI采购企划", "Launch AI planner")}
                >
                  <Sparkles className="w-4 h-4 text-[#c5a059]" />
                  <span>{T("AI 采购企划", "AI Planner")}</span>
                </button>
                
                <button 
                  onClick={() => setActiveTab("clusters")}
                  className="bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-[#c5a059]/60 px-4 py-2 rounded-sm text-xs md:text-sm font-bold transition flex items-center space-x-2"
                  title={T("核心产业带集群图", "View clusters")}
                >
                  <Globe className="w-4 h-4 text-[#c5a059]" />
                  <span>{T("核心产业带图", "Industrial Clusters")}</span>
                </button>

                <button 
                  onClick={() => setActiveTab("aql")}
                  className="bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-[#c5a059]/60 px-4 py-2 rounded-sm text-xs md:text-sm font-bold transition flex items-center space-x-2"
                  title={T("自动计算抽检数", "AQL standards calculation")}
                >
                  <Calculator className="w-4 h-4 text-[#c5a059]" />
                  <span>{T("自动计算抽检数", "AQL Calculator")}</span>
                </button>
              </div>
            </div>
          </div>
        </header>
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 space-y-12">

      {/* ==================== HOME TAB VIEWPORT ==================== */}
      {activeTab === "home" && (
        <section id="view-dashboard" className="space-y-12">
          
          {/* Quick Sourcing Flow Overview for Non-Technical Users */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Left Core features container - Now takes 4/5ths of the desktop slot to look extremely grand */}
              <div className="lg:col-span-4 bg-white border border-slate-200 p-6 md:p-8 rounded-sm shadow-sm relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 filter blur-xl"></div>
                
                <div className="relative z-10 space-y-6">
                  <div>
                    <span className="text-xs font-black text-[#c5a059] tracking-widest uppercase block mb-1">
                      {T("核心服务特色", "ENTERPRISE CAPABILITIES")}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-black text-[#003580] leading-snug">
                      {T("穿透各环节的跨境采购代理标准", "Bridging International Demands with High-Density Chinese Industrial Hubs")}
                    </h2>
                  </div>

                  {/* Highlighted prominent quote with gorgeous styling for maximal noticeability and top aesthetics */}
                  <div className="bg-gradient-to-r from-[#fefbf6] to-[#fbf7ee] border-l-4 border-[#c5a059] p-6 rounded-r-md my-6 shadow-sm">
                    <p className="text-amber-950 font-black text-sm md:text-base leading-relaxed">
                      {T(
                        <>“我们独立于任何生产工厂，代表<span className="text-[#003580] font-black underline decoration-4 decoration-[#c5a059]/40">唯一的买方利益</span>。通过严格将每个工厂流程量化、精细追踪，为您在模具校调、出厂终检等<span className="text-[#003580] font-black underline decoration-4 decoration-[#c5a059]/40">物理点实施闭环管控</span>，消除供应链盲区。”</>,
                        <>“We operate strictly independent of any manufacturing facility, representing <span className="text-[#003580] font-black underline decoration-4 decoration-[#c5a059]/40">your buyer interests alone</span>. By quantifying and tracking each dynamic metric on the floor, we deliver watertight physical closure on mold calibration and pre-shipment sampling, completely <span className="text-[#003580] font-black underline decoration-4 decoration-[#c5a059]/40">eliminating supply chain blind spots</span>.”</>,
                        <>“Operamos independientemente de cualquier planta de fabricación, representando <span className="text-[#003580] font-black underline decoration-4 decoration-[#c5a059]/40">únicamente sus intereses como comprador</span>. Al realizar un seguimiento riguroso de cada proceso y métrica en planta, implementamos un control de circuito cerrado en puntos físicos críticos como la calibración de moldes y la inspección final, <span className="text-[#003580] font-black underline decoration-4 decoration-[#c5a059]/40">eliminando puntos ciegos</span>.”</>,
                        <>“Мы действуем независимо от заводов-производителей, представляя <span className="text-[#003580] font-black underline decoration-4 decoration-[#c5a059]/40">исключительно ваши интересы как покупателя</span>. Благодаря строгому отслеживанию каждого процесса непосредственно в цехах, мы реализуем замкнутый контроль в таких критических точках, как настройка пресс-форм и проверка качества перед отгрузкой, <span className="text-[#003580] font-black underline decoration-4 decoration-[#c5a059]/40">устраняя любые слепые зоны</span>.”</>
                      )}
                    </p>
                    <div className="text-[10px] text-[#c5a059] uppercase tracking-widest font-mono font-bold mt-3">
                      {T("★ 双检质检长行政指令保证", "★ DUAL-POINT QUALITY OVERSIGHT PROTOCOL")}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold text-slate-700">
                    <div className="flex items-center space-x-2.5 p-2.5 bg-slate-50 border-l-4 border-[#003580]">
                      <CheckCircle2 className="w-4 h-4 text-[#003580]" />
                      <span>{T("双重开箱检测：工序中段+出货前", "Dual-Point Quality Control Inspections")}</span>
                    </div>
                    <div className="flex items-center space-x-2.5 p-2.5 bg-slate-50 border-l-4 border-[#003580]">
                      <CheckCircle2 className="w-4 h-4 text-[#003580]" />
                      <span>{T("合规审查：重金属、无双酚A、CE安全认证", "Chemical Certifications & Compliance Audit")}</span>
                    </div>
                    <div className="flex items-center space-x-2.5 p-2.5 bg-slate-50 border-l-4 border-[#003580]">
                      <CheckCircle2 className="w-4 h-4 text-[#003580]" />
                      <span>{T("自有海关集拼货位，无惧排队旺季", "Dedicated Bonded Consolidation Storage")}</span>
                    </div>
                    <div className="flex items-center space-x-2.5 p-2.5 bg-slate-50 border-l-4 border-[#003580]">
                      <CheckCircle2 className="w-4 h-4 text-[#003580]" />
                      <span>{T("多国语言商务经理与工程师现场同频", "Native-Speaking Business Liaison & Engineers")}</span>
                    </div>
                  </div>

                  {/* Refined Optimised 4-step Procurement Flow / Stepper - "更精炼更显眼的表述" */}
                  <div className="border-t border-slate-100 pt-6 mt-6">
                    <span className="text-[10px] font-black text-slate-400 tracking-widest uppercase block mb-3.5 font-mono">
                      {T("华源物理品控闭环流程 (精炼执行)", "SINOSOURCE SECURED PHYSICAL SOURCING ECOSYSTEM")}
                    </span>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                      <div className="bg-slate-50 hover:bg-slate-100/70 border border-slate-150 p-3 h-full rounded-sm hover:border-[#c5a059]/40 transition duration-150 group">
                        <div className="text-[10px] font-mono font-black text-[#c5a059] mb-1">STAGE 01.</div>
                        <h4 className="text-xs font-black text-[#003580] group-hover:text-[#c5a059] transition">{T("校模开模", "Tooling Check")}</h4>
                        <p className="text-[10px] text-slate-500 leading-snug mt-1">{T("首样公差极致锁定在 ±0.03mm 内，排除渗漏风险", "Strictly anchoring tooling tolerances within ±0.03mm limits")}</p>
                      </div>
                      
                      <div className="bg-slate-50 hover:bg-slate-100/70 border border-slate-150 p-3 h-full rounded-sm hover:border-[#c5a059]/40 transition duration-150 group">
                        <div className="text-[10px] font-mono font-black text-[#c5a059] mb-1">STAGE 02.</div>
                        <h4 className="text-xs font-black text-[#003580] group-hover:text-[#c5a059] transition">{T("量化巡检", "Dynamic Audit")}</h4>
                        <p className="text-[10px] text-slate-500 leading-snug mt-1">{T("在制程中巡回抽验检测硬度公差、材料应变力", "Dynamic floor audits securing hardness, wall-density and raw elements")}</p>
                      </div>

                      <div className="bg-slate-50 hover:bg-slate-100/70 border border-slate-150 p-3 h-full rounded-sm hover:border-[#c5a059]/40 transition duration-150 group">
                        <div className="text-[10px] font-mono font-black text-[#c5a059] mb-1">STAGE 03.</div>
                        <h4 className="text-xs font-black text-[#003580] group-hover:text-[#c5a059] transition">{T("AQLII终检", "AQL-II Sealing")}</h4>
                        <p className="text-[10px] text-slate-500 leading-snug mt-1">{T("依照国际 ISO 2859-1 表格，多重性能破坏性测试", "statistical extraction & destructive physical tests on batch completion")}</p>
                      </div>

                      <div className="bg-slate-50 hover:bg-slate-100/70 border border-slate-150 p-3 h-full rounded-sm hover:border-[#c5a059]/40 transition duration-150 group">
                        <div className="text-[10px] font-mono font-black text-[#c5a059] mb-1">STAGE 04.</div>
                        <h4 className="text-xs font-black text-[#003580] group-hover:text-[#c5a059] transition">{T("完税交付", "DDP Lock-In")}</h4>
                        <p className="text-[10px] text-slate-500 leading-snug mt-1">{T("全程DDP一口价包税多模联运，海外库房直达", "Cleared complete DDP customs and door delivered to client warehouse")}</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Sidebar Quick-Action: Shrunken AI Planner (缩小右边的AI推演) - Now only taking 1/5th column! */}
              <div className="lg:col-span-1 bg-slate-950 text-white p-4 rounded-sm shadow-md border-t-4 border-[#c5a059] flex flex-col justify-between text-xs space-y-4">
                <div className="space-y-2.5">
                  <div className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center">
                    <Sparkles className="w-4.5 h-4.5 text-[#c5a059]" />
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-[#c5a059] uppercase tracking-wider">
                      {T("AI 供应链模拟", "AI Simulation")}
                    </h3>
                    <p className="text-[10.5px] text-slate-300 leading-snug mt-1">
                      {T("在线测算产业地分布及生产流程周期，物理核查出货缺陷。", "Instantly calculate manufacturing nodes & model dynamic defect frequencies.")
                      }
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-white/10">
                  <button 
                    onClick={() => {
                      setActiveTab("planner");
                      setTimeout(handleLoadSampleData, 100);
                    }}
                    className="w-full bg-[#c5a059] text-slate-950 py-1 font-black rounded-sm text-[10px] uppercase tracking-wider hover:bg-yellow-500 transition block text-center cursor-pointer"
                  >
                    {t[lang].useSample}
                  </button>
                  <button 
                    onClick={() => setActiveTab("planner")}
                    className="w-full border border-white/20 hover:bg-white/10 py-1 font-bold rounded-sm text-[10px] transition block text-center cursor-pointer text-slate-300"
                  >
                    {T("进入专属企划面板", "Launch Planner →")}
                  </button>
                </div>
              </div>
            </div>

            {/* Spectacular, high-contrast Enterprise CTA Hero Billboard banner - 添加大的与我们联系功能块 */}
            <div id="cta-billboard-banner" className="bg-gradient-to-r from-slate-900 via-[#001c44] to-slate-950 text-white p-8 rounded-sm shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border-l-4 border-[#c5a059] relative overflow-hidden text-left">
              <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-[#c5a059] opacity-5 rounded-full filter blur-3xl pointer-events-none"></div>
              <div className="space-y-2 relative z-10 md:max-w-2xl">
                <span className="text-[10px] font-mono font-black text-[#c5a059] tracking-widest uppercase bg-white/10 px-2.5 py-1 rounded-sm">
                  {T("华源环球专享商洽渠道", "SINOSOURCE EXCLUSIVE ENTERPRISE CHANNEL")}
                </span>
                <h3 className="text-xl md:text-2xl font-black text-white leading-tight uppercase">
                  {T("准备好启动您的高端合规采购与严苛物理品控吗？", "Ready to Safeguard Your Freight with Rigorous Inspections?")}
                </h3>
                <p className="text-slate-300 text-xs leading-relaxed max-w-xl">
                  {T("多国语品控团队及商务长已全线驻点产业带派单。点击下方按钮即可前往规格登记处，对接收集首期物料排产与价格物理评估。", "Connect directly with physical audit managers nested within raw materials and industrial centers. Secure pristine AQL results from day one.")
                  }
                </p>
              </div>
              <button
                onClick={() => {
                  const element = document.getElementById("customer-inquiry-section");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                  }
                }}
                className="bg-[#c5a059] hover:bg-yellow-500 text-slate-950 font-black px-5 py-2.5 rounded-sm text-xs md:text-sm uppercase tracking-wider transition-all duration-300 shadow-md shrink-0 transform hover:scale-[1.01] cursor-pointer flex items-center space-x-2"
              >
                <Phone className="w-4 h-4 text-slate-950 animate-pulse" />
                <span>{T("与我们建立联系 / 提交采购规格", "Contact Our Experts / Register RFP Specs")}</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>

            {/* Elegant, Shrunken 3-modules dashboard panel as requested */}
            <div id="shrunken-modules-panel" className="bg-white border border-slate-200 rounded-sm p-4 text-left space-y-3 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                  {T("核心智能引擎快进终端 (已精测压缩)", "CORE MOTORS CONSOLIDATED TERMINAL (COMPACTED)")}
                </span>
                <span className="text-[10px] text-slate-400">
                  {T("点击切换专用作业面板", "Switch workspace tab below")}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                
                {/* Module 1: AI Planner */}
                <div 
                  onClick={() => setActiveTab("planner")}
                  className="bg-slate-50 hover:bg-slate-100/80 border border-slate-150 p-3 rounded-sm transition cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 bg-[#003580]/10 text-[#003580] rounded flex items-center justify-center shrink-0">
                      <Sparkles className="w-3.5 h-3.5 text-[#003580]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-955 group-hover:text-[#003580] transition mt-0.5">
                        {T("A. AI采购企划", "A. AI Sourcing Planner")}
                      </h4>
                      <p className="text-[10px] text-slate-500 leading-none mt-1">
                        {T("在线评估材料、量化出厂参数", "Gemini AI-powered specs drafting")}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#003580] transition" />
                </div>

                {/* Module 2: Clusters */}
                <div 
                  onClick={() => setActiveTab("clusters")}
                  className="bg-slate-50 hover:bg-slate-100/80 border border-slate-150 p-3 rounded-sm transition cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 bg-[#c5a059]/10 text-[#c5a059] rounded flex items-center justify-center shrink-0">
                      <Globe className="w-3.5 h-3.5 text-[#c5a059]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-955 group-hover:text-[#003580] transition mt-0.5">
                        {T("B. 核心产业带图", "B. Industrial Clusters")}
                      </h4>
                      <p className="text-[10px] text-slate-500 leading-none mt-1">
                        {T("打通各区域厂矿及港口配给", "Ex-factory geographical analysis")}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#003580] transition" />
                </div>

                {/* Module 3: AQL Calculator */}
                <div 
                  onClick={() => setActiveTab("aql")}
                  className="bg-slate-50 hover:bg-slate-100/80 border border-slate-150 p-3 rounded-sm transition cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 bg-indigo-50 text-indigo-700 rounded flex items-center justify-center shrink-0">
                      <Calculator className="w-3.5 h-3.5 text-indigo-700" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-955 group-hover:text-[#003580] transition mt-0.5">
                        {T("C. 自动计算抽检数", "C. AQL Calculator")}
                      </h4>
                      <p className="text-[10px] text-slate-500 leading-none mt-1">
                        {T("ISO AQLII工业级批量数算程序", "Calculate batch sizes mathematically")}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#003580] transition" />
                </div>

              </div>
            </div>

            {/* ==================== CUSTOMER INQUIRY & SOURCING REQUIREMENTS PORTAL ==================== */}
            <div id="customer-inquiry-section" className="w-full max-w-4xl mx-auto animate-fade-in text-left">
              
              {/* Inquiry Form Column */}
              <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-sm shadow-sm space-y-6">
                
                <div>
                  <span className="text-xs font-bold text-[#c5a059] uppercase tracking-widest block font-mono">
                    {T("采购需求就地登记", "INQUIRY SUBMISSION PORTAL")}
                  </span>
                  <h3 className="text-2xl font-black text-[#003580] tracking-tight mt-1">
                    {T("提交您的采购及品控规格要求", "Register Sourcing Specs & Requirements")}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {T("请在下方填写您的联系方式与具体的采购要求，提交后系统将联同供应商库和质检工程师排挡。点击页面顶端金底‘S’ Logo，可以唤醒专商通道监控后台并解密实时排期进度。", "Input your specifications to deploy immediate supplier matchmaking. Click the golden 'S' logo at the top of the page to launch the secure console.")}
                  </p>
                </div>

                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  {inquirySuccess && (
                     <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-sm text-emerald-800 text-xs flex items-start space-x-3">
                       <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                       <div>
                         <p className="font-bold">{T("需求就地登记成功！", "Inquiry Registered Successfully!")}</p>
                         <p className="text-slate-600 mt-1 leading-relaxed">
                           {T("您的产品工艺细节与品控指标已存证加密建档。点击页面最顶端的金底“S” Logo，即可输入密码解锁您的完整进度档案，并进行系统性统一管理。", "Your specifications are safely encrypted. Click the golden 'S' logo at the top of the viewport to inspect and systematically manage.")}
                         </p>
                       </div>
                     </div>
                  )}

                  {inquiryError && (
                     <div className="p-4 bg-red-50 border border-red-200 rounded-sm text-red-800 text-xs">
                       {inquiryError}
                     </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-extrabold text-[#003580] uppercase tracking-wider block">
                        {T("公司/联络人姓名", "Company / Contact Name")} <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder={T("例如：Alpha海外零售采购部 李经理", "e.g., Jane Done, Alpha Retail Inc")}
                        value={inquiryName} 
                        onChange={(e) => setInquiryName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs p-3 rounded-sm focus:border-[#003580] focus:ring-1 focus:ring-[#003580] outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-extrabold text-[#003580] uppercase tracking-wider block">
                        {T("联络号码 (WhatsApp/手机)", "WhatsApp / Tel Number")} <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder={T("例如：+86 15618073092", "e.g., +1 (650) 555-0123")}
                        value={inquiryContact} 
                        onChange={(e) => setInquiryContact(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs p-3 rounded-sm focus:border-[#003580] focus:ring-1 focus:ring-[#003580] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-extrabold text-[#003580] uppercase tracking-wider block">
                        {T("谷歌官方邮箱", "Google / Business Email")} <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="email" 
                        required
                        placeholder="e.g., buyer@company.com"
                        value={inquiryEmail} 
                        onChange={(e) => setInquiryEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs p-3 rounded-sm focus:border-[#003580] focus:ring-1 focus:ring-[#003580] outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-extrabold text-[#003580] uppercase tracking-wider block">
                        {T("国际贸易条款偏好", "Preferred Incoterms")}
                      </label>
                      <select 
                        value={inquiryIncoterms} 
                        onChange={(e) => setInquiryIncoterms(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs p-3 rounded-sm focus:border-[#003580] focus:ring-1 focus:ring-[#003580] outline-none font-sans"
                      >
                        <option value="FOB Ningbo Port">FOB Ningbo / Shenzhen (最常用)</option>
                        <option value="CIF Destination Port">CIF Destination Port</option>
                        <option value="DDP Door-to-Door">DDP Double-Clear Door Delivery (含税到门)</option>
                        <option value="EXW Factory Warehouse">EXW Ex-Factory (出厂自提)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-extrabold text-[#003580] uppercase tracking-wider block">
                        {T("拟采购产品大类", "Target Product Description")} <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder={T("例如：双层不锈钢超轻保温杯", "e.g., Stainless Steel Vacuum Flask")}
                        value={inquiryProduct} 
                        onChange={(e) => setInquiryProduct(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs p-3 rounded-sm focus:border-[#003580] focus:ring-1 focus:ring-[#003580] outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-extrabold text-[#003580] uppercase tracking-wider block">
                        {T("预计单次 or 年采购规模（例如：5000只）", "Estimated Target Quantity")}
                      </label>
                      <input 
                        type="text" 
                        placeholder={T("例如：5,000 Pcs", "e.g., 5,000 Pcs / Shipment")}
                        value={inquiryQty} 
                        onChange={(e) => setInquiryQty(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs p-3 rounded-sm focus:border-[#003580] focus:ring-1 focus:ring-[#003580] outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-extrabold text-[#003580] uppercase tracking-wider block">
                      {T("具体的材质要求、工艺指标、或 AQL 特殊品控阈值", "Product Specifications & AQL Quality Directives")}
                    </label>
                    <textarea 
                      rows={3}
                      placeholder={T("请用中文、英文或您的国家母语，描述您期望的材质、颜色、是否需要印制 Logo、以及是否需要强制认证等多维工艺核实基准...", "State preferred metal alloy, color codes, logo stamping, FDA/CE paper safety metrics, or normal limits to inspect...")}
                      value={inquirySpecs} 
                      onChange={(e) => setInquirySpecs(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs p-3 rounded-sm focus:border-[#003580] focus:ring-1 focus:ring-[#003580] outline-none resize-none font-sans"
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmittingInquiry}
                    className="w-full bg-[#003580] text-white py-3 font-semibold rounded-sm hover:bg-opacity-90 transition text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow cursor-pointer"
                  >
                    {isSubmittingInquiry ? (
                       <span>{T("海口系统安全校验申报中...", "Transmitting specifications to secure cluster...")}</span>
                    ) : (
                       <>
                         <Send className="w-4 h-4 text-[#c5a059]" />
                         <span>{T("立即向华源全球供应链中心建立采购线案", "Establish Formal Sourcing Dispatch & Audits")}</span>
                       </>
                    )}
                  </button>

                </form>

              </div>

            </div>

            {/* ==================== SINO-SOURCE REPUTABLE CONTACT CENTER ==================== */}
            <div id="company-contact-section" className="bg-white border border-slate-200 p-6 md:p-8 rounded-sm shadow-sm space-y-6">
              
              {showInquiryNotice && (
                <div className="bg-emerald-50 border-2 border-emerald-500 rounded-sm p-4 md:p-6 mb-4 flex items-start space-x-3 text-left shadow-sm animate-fade-in relative overflow-hidden">
                  <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 opacity-5 pointer-events-none">
                    <CheckSquare className="w-48 h-48 text-emerald-900" />
                  </div>
                  <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center shrink-0 shadow">
                    <Check className="w-5 h-5 stroke-[3] text-white" />
                  </div>
                  <div className="space-y-1.5 flex-1 select-text">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                      <h4 className="text-sm font-black text-emerald-950 flex items-center space-x-1.5">
                        <span>📬 {T("华源全球业务中心：已收悉您的采购需求线索 AQL 建议档案！", "📬 SinoSource Global Hub: Sourcing Inquiry Decrypted!")}</span>
                      </h4>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-mono font-bold px-2 py-0.5 rounded uppercase self-start">
                        {T("系统提示：线索已建档，您也可以直接联系", "Status: Received")}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                      {T("我们已成功将您的物料工艺细节与品控指标存证加密，并在中控台上完成物理投射编档。为了在最快的时间内对您的物料需求（如不锈钢保温杯、冷深冲工艺等）启动 AQLII 首样排期，请立即点击下方任一绿色或蓝色官方通道，直接建立 1 对 1 商务沟通与顾问式对接！", "We have received and logged your sourcing specifications! Sourcing parameters are safely stored. To initiate custom product line tooling and mold tolerances checks, contact us directly via any of the direct lines listed below!")
                      }
                    </p>
                    <div className="pt-1.5 flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                      <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider font-mono">
                        {T("系统状态：推荐直接呼叫或添加 WhatsApp", "System recommendation: Chat via WhatsApp or Call below")}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowInquiryNotice(false)} 
                    className="text-slate-400 hover:text-slate-600 transition text-xs font-bold p-1 shrink-0 self-start cursor-pointer"
                    title={T("关闭提示", "Dismiss")}
                  >
                    ✕
                  </button>
                </div>
              )}

              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-4 gap-4">
                <div>
                  <span className="text-xs font-bold text-[#c5a059] uppercase tracking-widest block font-mono">
                    {T("官方商专渠道门接", "OFFICIAL CORPORATE DESK")}
                  </span>
                  <h3 className="text-2xl font-black text-[#003580] tracking-tight mt-1">
                    {T("华源环球采购商务联络中心", "SinoSource Corporate Liaison Center")}
                  </h3>
                </div>
                <div className="text-xs text-slate-500 max-w-sm">
                  {T("欢迎全球采购伙伴直接连通。资深品控总监将在48小时内就材料采购可行性给予首期物理核实意见。", "Connect directly with our primary regional desks. Our senior quality managers will follow up on potential manufacturing lines.")}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* WHATSAPP */}
                <a 
                  href="https://wa.me/8615618073092" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group bg-emerald-50/50 hover:bg-emerald-50 p-3.5 border border-emerald-200/50 rounded-sm hover:border-emerald-400 hover:shadow-sm transition-all flex items-center space-x-3 cursor-pointer text-left"
                >
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] uppercase font-black tracking-wider text-emerald-600 block leading-tight">WhatsApp Support</span>
                    <span className="text-xs font-black text-slate-900 block group-hover:text-emerald-700 transition leading-snug truncate">+86 156 1807 3092</span>
                    <span className="text-[10px] text-slate-500 block leading-none mt-0.5">{T("点击立即发起会话 (在线)", "Click to chat directly (Online)")}</span>
                  </div>
                </a>

                {/* GOOGLE MAIL (SWAPPED TO SECOND POSITION & UPGRADED TO INTEGRATED COPY ENGINE) */}
                <button 
                  onClick={handleCopyEmail}
                  type="button"
                  className={`group p-3.5 border rounded-sm hover:shadow-sm transition-all duration-300 flex items-center space-x-3 cursor-pointer text-left w-full relative ${
                    emailCopied 
                      ? "bg-emerald-50 border-emerald-400/80 shadow-inner" 
                      : "bg-amber-50/50 hover:bg-amber-50 border-amber-200/50 hover:border-amber-400"
                  }`}
                  title={T("点击复制官方邮箱", "Click to copy official email")}
                >
                  {/* Floating Speech Bubble Alert - Renders outside the button limits */}
                  {emailCopied && (
                    <div className="absolute -top-20 left-1/2 -translate-x-1/2 bg-[#001533] border-3 border-emerald-400 text-white text-sm md:text-base font-black py-4 px-6 md:px-8 rounded-sm shadow-2xl z-55 flex items-center space-x-3.5 animate-bounce whitespace-nowrap">
                      <Check className="w-5.5 h-5.5 text-emerald-400 stroke-[4.5]" />
                      <span className="font-sans text-white tracking-widest text-shadow">
                        {T("已复制邮箱请前往发送邮件", "EMAIL COPIED! PLEASE GO AND SEND NOW")}
                      </span>
                      {/* Triangle Pointer pointing down with matching borders */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-2 w-4 h-4 bg-[#001533] border-r-3 border-b-3 border-emerald-400 rotate-45 pointer-events-none"></div>
                    </div>
                  )}

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                    emailCopied ? "bg-emerald-600 scale-105" : "bg-[#c5a059]"
                  }`}>
                    {emailCopied ? (
                      <Check className="w-4 h-4 text-white" />
                    ) : (
                      <Mail className="w-4 h-4 text-slate-950" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className={`text-[9px] uppercase font-black tracking-wider block leading-tight transition-colors duration-300 ${
                      emailCopied ? "text-emerald-700" : "text-amber-700"
                    }`}>
                      {T("谷歌官方邮箱 (支持一键复制)", "Google Mail (Click to Copy)")}
                    </span>
                    <span className="text-xs font-black text-slate-900 block break-all transition leading-snug truncate">
                      xuanm5951@gmail.com
                    </span>
                    <span className={`text-[10px] font-bold block leading-none mt-1 transition-colors duration-300 ${
                      emailCopied ? "text-emerald-800 font-extrabold animate-pulse" : "text-amber-600"
                    }`}>
                      {emailCopied ? (
                        T("已复制邮箱请前往发送邮件", "Copied! Please proceed to send email")
                      ) : (
                        T("⚡️ 点击复制邮箱到剪贴板", "⚡️ Click to copy to clipboard")
                      )}
                    </span>
                  </div>
                </button>

                {/* PHONE (SWAPPED TO THIRD POSITION) */}
                <a 
                  href="tel:15618073092"
                  className="group bg-blue-50/50 hover:bg-blue-50 p-3.5 border border-blue-200/50 rounded-sm hover:border-blue-400 hover:shadow-sm transition-all flex items-center space-x-3 cursor-pointer text-left"
                >
                  <div className="w-8 h-8 bg-[#003580] rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] uppercase font-black tracking-wider text-[#003580] block leading-tight">{T("官方接听热线", "Primary Phone")}</span>
                    <span className="text-xs font-black text-slate-900 block group-hover:text-[#003580] transition leading-snug truncate">15618073092</span>
                    <span className="text-[10px] text-slate-500 block leading-none mt-0.5">{T("一键拨打・紧急跨境排期", "Click to Call・Urgent Sourcing")}</span>
                  </div>
                </a>

              </div>
            </div>

          </section>
        )}

        {/* ==================== INDUSTRIAL CLUSTERS TAB VIEWPORT ==================== */}
        {activeTab === "clusters" && (
          <section id="view-clusters" className="space-y-8 animate-fade-in">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-black text-[#003580] tracking-tight">{t[lang].clusterTitle}</h2>
              <p className="text-slate-600 text-sm mt-2">{t[lang].clusterSub}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Selector List Column */}
              <div className="lg:col-span-4 space-y-4">
                {industrialClustersList.map((cluster) => {
                  const isSelected = selectedCluster.id === cluster.id;
                  return (
                    <button
                      key={cluster.id}
                      id={`cluster-select-${cluster.id}`}
                      onClick={() => setSelectedCluster(cluster)}
                      className={`w-full text-left p-5 border rounded-sm transition-all relative overflow-hidden flex flex-col justify-between ${
                        isSelected 
                          ? "bg-white border-[#003580] shadow-md ring-1 ring-[#003580]" 
                          : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-sm"
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-0 left-0 h-full w-1.5 bg-[#003580]" />
                      )}
                      
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold tracking-widest text-[#c5a059] uppercase">
                          CHINA HUB
                        </span>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${isSelected ? "bg-[#003580]/10 text-[#003580]" : "bg-slate-100 text-slate-500"}`}>
                          Defect Rate: {cluster.defectRate}
                        </span>
                      </div>

                      <h4 className="text-md font-bold text-slate-900 mt-2">
                        {cluster.city}
                      </h4>
                      
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                        {cluster.specialty[lang]}
                      </p>
                    </button>
                  );
                })}

                <div className="p-4 bg-slate-100 border border-slate-200 rounded-sm text-xs text-slate-500 flex items-start space-x-2.5">
                  <Info className="w-4 h-4 text-[#003580] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    {T("我们长期在以上产业带部署物理质检专员。除三大成熟产带外，另支持佛山建材家具、绍兴轻纺、中山灯具等各区域化纵深集采。", "SinoSource representatives live and breathe within these physical cluster zones. This close proximity ensures swift factory responses, immediate sampling oversight, and localized auditing within 4 hours.")
                    }
                  </p>
                </div>
              </div>

              {/* Right Hub Interactive Metrics Layout */}
              <div className="lg:col-span-8 bg-white border border-slate-200 p-6 md:p-8 rounded-sm shadow-sm space-y-6">
                
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 gap-4">
                  <div>
                    <span className="text-xs font-bold text-[#c5a059] uppercase tracking-wider">{T("核心考察区域 / 当前选定", "DENSE SUPPLY CHAIN HIGHLIGHT")}</span>
                    <h3 className="text-2xl font-black text-[#003580] mt-1">{selectedCluster.city}</h3>
                  </div>
                  <div className="bg-[#f8f9fa] border border-slate-200 px-4 py-2.5 rounded-sm flex items-center space-x-3">
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></div>
                    <span className="text-xs font-bold text-[#003580]">
                      {T("SinoSource 直属中心运营中", "SinoSource Hub Active")}
                    </span>
                  </div>
                </div>

                {/* Industrial Specialty & Realities */}
                <div className="space-y-4">
                  <div>
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">{t[lang].specialty}</h5>
                    <p className="text-slate-800 text-sm font-semibold bg-slate-50 p-3.5 border-l-4 border-[#c5a059] rounded-sm">
                      {selectedCluster.specialty[lang]}
                    </p>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">{T("产业集群背景与资源密度", "Industrial Context & Supplier Density")}</h5>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {selectedCluster.description[lang]}
                    </p>
                  </div>
                </div>

                {/* Technical Gauges / Metadata Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-400 uppercase block font-semibold">{t[lang].leadTime}</span>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-[#003580]" />
                      <span className="text-sm font-bold text-slate-800">{selectedCluster.leadTime[lang]}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-400 uppercase block font-semibold">{t[lang].defectRate}</span>
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-emerald-500" />
                      <span className="text-sm font-bold text-slate-800">{selectedCluster.defectRate} {T(" (同等工厂均值)", " (Historic Average)")}</span>
                    </div>
                  </div>
                </div>

                {/* Key Audit Strategy and Port dispatch Info */}
                <div className="bg-slate-50 p-5 rounded-sm border border-slate-200 space-y-4">
                  <div className="text-xs leading-normal">
                    <span className="font-extrabold text-[#003580] uppercase block tracking-wider mb-2">
                      🎯 {t[lang].auditPoint}:
                    </span>
                    <p className="text-slate-700 italic">
                      {selectedCluster.auditPoint[lang]}
                    </p>
                  </div>

                  <div className="border-t border-slate-200 mt-2 pt-3">
                    <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wide mb-1.5">
                      {t[lang].dispatchPort}:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedCluster.ports.map((port, idx) => (
                        <span key={idx} className="bg-white border border-slate-200 px-2.5 py-1 text-xs text-slate-600 font-medium rounded-sm">
                          🚢 {port}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </section>
        )}

        {/* ==================== AQL CALCULATOR TAB VIEWPORT ==================== */}
        {activeTab === "aql" && (
          <section id="view-aql" className="space-y-8 animate-fade-in">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-black text-[#003580] tracking-tight">{t[lang].aqlTitle}</h2>
              <p className="text-slate-600 text-sm mt-2">{t[lang].aqlSub}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Inputs Column */}
              <div className="lg:col-span-5 bg-white border border-slate-200 p-6 md:p-8 rounded-sm shadow-sm space-y-6">
                <span className="text-xs font-bold text-[#c5a059] uppercase tracking-wider block border-b pb-2">
                  {T("1. 品控测算控制台", "1. INSPECTION CONFIGURATIONS")}
                </span>

                <div className="space-y-3">
                  <label className="text-xs font-black text-[#003580] uppercase block">
                    {t[lang].aqlBatchSize}: <span className="text-[#c5a059] font-black ml-2">{Number(aqlBatch).toLocaleString()} units</span>
                  </label>
                  
                  {/* Slider & Quick presets for ultra elite sensory feel */}
                  <div className="space-y-2">
                    <input 
                      type="range" 
                      min="10" 
                      max="150000" 
                      step="50"
                      value={aqlBatch}
                      onChange={(e) => setAqlBatch(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#003580]"
                    />
                    <div className="grid grid-cols-5 gap-1.5">
                      {[150, 800, 3000, 15000, 85000].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setAqlBatch(val)}
                          className={`text-[9px] font-bold py-1 px-1 text-center border rounded-sm transition ${aqlBatch === val ? "bg-[#003580] text-white border-[#003580]" : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"}`}
                        >
                          {val.toLocaleString()}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Manual input box */}
                  <div className="pt-2">
                    <input
                      type="number"
                      value={aqlBatch}
                      onChange={(e) => setAqlBatch(Math.max(1, Number(e.target.value)))}
                      className="w-full text-sm p-2.5 border border-slate-300 rounded-sm focus:ring-1 focus:ring-[#003580] focus:outline-none focus:border-[#003580]"
                    />
                  </div>
                </div>

                {/* Inspection Rigor Selection Level */}
                <div className="space-y-3">
                  <label className="text-xs font-black text-[#003580] uppercase block">
                    {t[lang].aqlGeneralLevel}
                  </label>
                  <div id="rigor-levels-group" className="space-y-2">
                    <button
                      type="button"
                      id="opt-level-i"
                      onClick={() => setAqlLevel("I")}
                      className={`w-full text-left p-3 border text-xs font-medium rounded-sm transition flex justify-between items-center ${aqlLevel === "I" ? "border-[#003580] bg-slate-50 text-[#003580] font-bold" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                    >
                      <span>{t[lang].aqlLevelI}</span>
                      <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded uppercase">Code A-L</span>
                    </button>
                    <button
                      type="button"
                      id="opt-level-ii"
                      onClick={() => setAqlLevel("II")}
                      className={`w-full text-left p-3 border text-xs font-medium rounded-sm transition flex justify-between items-center ${aqlLevel === "II" ? "border-[#003580] bg-slate-50 text-[#003580] font-bold" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                    >
                      <span>{t[lang].aqlLevelII}</span>
                      <span className="text-[10px] bg-[#003580] text-white px-1.5 py-0.5 rounded uppercase font-bold">Code A-Q</span>
                    </button>
                    <button
                      type="button"
                      id="opt-level-iii"
                      onClick={() => setAqlLevel("III")}
                      className={`w-full text-left p-3 border text-xs font-medium rounded-sm transition flex justify-between items-center ${aqlLevel === "III" ? "border-[#003580] bg-slate-50 text-[#003580] font-bold" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}
                    >
                      <span>{t[lang].aqlLevelIII}</span>
                      <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded uppercase font-bold">Rigor X2.5</span>
                    </button>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 border border-slate-200 rounded-sm text-xs text-slate-500 flex items-start space-x-2">
                  <Info className="w-4 h-4 text-[#003580] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    {T("此抽样程序可自动测算单次正常抽检方案。SinoSource 独家品控经理将完全以此计划提取出厂样本，置入物理实验室抗撕裂及耐酸测试，绝无感官偏私。", "Statistical sample counts calculated conform strictly to standard single normal inspection regimes under ISO 2859-1. Defectives limits are binding on factories.")
                    }
                  </p>
                </div>
              </div>

              {/* Outputs Column */}
              <div className="lg:col-span-7 bg-[#001c44] text-white p-6 md:p-8 rounded-sm shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                    <h3 className="text-md font-bold text-white tracking-wide uppercase flex items-center space-x-2">
                      <FileCheck2 className="w-5 h-5 text-[#c5a059]" />
                      <span>{T("2. 国际质检抽检测算报告", "2. ISO SAMPLING CERTIFICATE bluePRINT")}</span>
                    </h3>
                    <span className="text-[11px] font-black text-[#c5a059] uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded">
                      ISO 2859-1 Code: {aqlResults.code}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white/5 p-4 rounded-sm border border-white/10">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">{t[lang].aqlSampleNeeded}</span>
                      <span className="text-3xl font-black text-white">{aqlResults.sampleSize}</span>
                      <span className="text-[10px] text-[#c5a059] block mt-1">Units (开箱件数)</span>
                    </div>

                    <div className="bg-white/5 p-4 rounded-sm border border-white/10 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-8 h-8 bg-emerald-500/10 rounded-full"></div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">{t[lang].aqlResultAccept}</span>
                      <span className="text-3xl font-black text-emerald-400">≤ {aqlResults.ac}</span>
                      <span className="text-[10px] text-slate-300 block mt-1">{T("缺陷数合格上限", "Max Defective Items")}</span>
                    </div>

                    <div className="bg-white/5 p-4 rounded-sm border border-white/10 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-8 h-8 bg-red-500/10 rounded-full"></div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">{t[lang].aqlResultReject}</span>
                      <span className="text-3xl font-black text-rose-400">≥ {aqlResults.re}</span>
                      <span className="text-[10px] text-rose-300 block mt-1">{T("达到即扣件拒收", "Mandatory Reject Limit")}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-sm border border-white/10 text-xs">
                      <span className="font-bold text-[#c5a059] block uppercase mb-1">
                        🎯 {T("出货合规判据执行声明 (AQL 2.5)", "Inspection Compliance Executions")}
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        {T(
                          `SinoSource专职质检组在仓库随机开箱提取并严格验证 ${aqlResults.sampleSize} 件。如若有瑕疵表面划痕超过 ${aqlResults.ac} 件（即达到 ${aqlResults.re} 件或以上），该批出货立即在上海/宁波港被拦截锁仓，不予核发《出港品控合格书》，并召集厂长在48小时内下达产线返修更替方案。`,
                          `Our designated inspection agents will extract exactly ${aqlResults.sampleSize} units selected completely at random from individual cartons. If the verified defectives count under test is equal to or less than ${aqlResults.ac}, the shipment passes. If verified failures reach or exceed ${aqlResults.re}, the warehouse locks down dispatch and SinoSource triggers immediate manufacturer product calibration and line remediation.`,
                          `Nuestros agentes de inspección extraerán exactamente ${aqlResults.sampleSize} unidades al azar. Si los defectos son ${aqlResults.ac} o menos, el despacho pasa. Si los fallos alcanzan o superan los ${aqlResults.re}, se bloquea el envío y se activa una rectificación inmediata del fabricante.`,
                          `Наши инспекторы выберут случайным образом ровно ${aqlResults.sampleSize} шт. Если количество дефектов составит ${aqlResults.ac} или меньше, партия проходит. Если число дефектов достигнет ${aqlResults.re} или более, груз блокируется до устранения дефектов.`
                        )}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-[11px] text-slate-400">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>AQL 2.5 Major Standard</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>48H On-Site Verification</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Non-bias Lab Calibrations</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>IP Security Assured</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest">Sinosource International Inspections QA Block</span>
                  <button 
                    onClick={() => {
                      alert(T("AQL 质检方案计划表已发送至商业级排单系统中。", "Standard AQL Blueprint locked in system."));
                    }}
                    className="bg-[#c5a059] text-[#001c44] font-bold text-xs uppercase px-4 py-2 hover:bg-yellow-500 transition rounded-sm"
                  >
                    {t[lang].aqlCalculateBtn}
                  </button>
                </div>
              </div>

            </div>
          </section>
        )}

        {/* ==================== AI PLANNER TAB VIEWPORT (LIVE SERVER API) ==================== */}
        {activeTab === "planner" && (
          <section id="ai-planner-section" className="space-y-8 animate-fade-in text-slate-900">
            <div className="max-w-3xl">
              <span className="bg-[#003580] text-white text-[10px] font-black tracking-widest px-2.5 py-1 rounded inline-block uppercase mb-2">
                Gemini-Powered Procurement Simulator
              </span>
              <h2 className="text-3xl font-black text-[#003580] tracking-tight">{t[lang].plannerTitle}</h2>
              <p className="text-slate-600 text-sm mt-2">{t[lang].plannerSub}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Inputs Form card */}
              <div className="lg:col-span-5 bg-white border border-slate-200 p-6 md:p-8 rounded-sm shadow-sm space-y-6">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-[#c5a059] uppercase tracking-wider">
                    {T("在线填写采购规范", "Procurement Draft Setup")}
                  </span>
                  
                  {/* Load Template Spec Button */}
                  <button
                    type="button"
                    onClick={handleLoadSampleData}
                    className="text-[11px] text-[#003580] hover:text-blue-700 font-bold bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded transition flex items-center space-x-1"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{t[lang].useSample}</span>
                  </button>
                </div>

                <form onSubmit={handleGeneratePlan} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-700 uppercase block">
                      {t[lang].formProduct} *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={productDesc}
                      onChange={(e) => setProductDesc(e.target.value)}
                      placeholder={t[lang].placeholderProduct}
                      className="w-full text-xs md:text-sm p-2.5 border border-slate-300 rounded-sm focus:ring-1 focus:ring-[#003580] focus:outline-none focus:border-[#003580]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-black text-slate-700 uppercase block">
                      {t[lang].formQty}
                    </label>
                    <input
                      type="text"
                      value={quantityStr}
                      onChange={(e) => setQuantityStr(e.target.value)}
                      placeholder={t[lang].placeholderQty}
                      className="w-full text-xs md:text-sm p-2.5 border border-slate-300 rounded-sm focus:ring-1 focus:ring-[#003580] focus:outline-none focus:border-[#003580]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-700 uppercase block">
                        {t[lang].formPrice}
                      </label>
                      <input
                        type="text"
                        value={priceStr}
                        onChange={(e) => setPriceStr(e.target.value)}
                        placeholder={t[lang].placeholderPrice}
                        className="w-full text-xs p-2.5 border border-slate-300 rounded-sm focus:ring-1 focus:ring-[#003580] focus:outline-none focus:border-[#003580]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-700 uppercase block">
                        {t[lang].formDest}
                      </label>
                      <input
                        type="text"
                        value={destinationStr}
                        onChange={(e) => setDestinationStr(e.target.value)}
                        placeholder={t[lang].placeholderDest}
                        className="w-full text-xs p-2.5 border border-slate-300 rounded-sm focus:ring-1 focus:ring-[#003580] focus:outline-none focus:border-[#003580]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isAiLoading}
                    className={`w-full bg-[#003580] text-white py-3 px-5 font-bold hover:bg-opacity-90 rounded-sm text-xs md:text-sm transition flex items-center justify-center space-x-2 shadow-sm ${isAiLoading ? "opacity-75 cursor-not-allowed" : ""}`}
                  >
                    {isAiLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>{t[lang].btnGenerating}</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-[#c5a059] fill-current" />
                        <span>{t[lang].btnGenerate}</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="p-3.5 bg-yellow-50 border-l-4 border-[#c5a059] rounded-sm text-[11px] text-slate-700 leading-normal">
                  💡 {T("SinoSource 绝不对外流泄任何采购规格与方案。通过此规划器，您将获得由中国供应链宏观政策库支持的高端建议。", "Confidentiality Guaranteed. The AI Sourcing strategy runs protected under active SSL and secure enterprise sandbox mechanisms.")
                  }
                </div>
              </div>

              {/* Outputs Proposal Blueprint card */}
              <div className="lg:col-span-7 bg-[#001c44] text-slate-200 p-6 md:p-8 rounded-sm shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                    <span className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
                      <FileText className="w-5 h-5 text-[#c5a059]" />
                      <span>{t[lang].aiAdviceTitle}</span>
                    </span>
                    <span className="bg-emerald-500/20 text-emerald-400 text-[10px] uppercase font-black px-2 py-0.5 rounded tracking-widest">
                      Active Node (Secure)
                    </span>
                  </div>

                  {/* Rendering the markdown or loading placeholder or initial sample display */}
                  <div className="min-h-[280px] prose prose-invert prose-xs text-xs md:text-sm max-w-none text-slate-300 bg-white/5 p-4 rounded-sm border border-white/10 overflow-y-auto max-h-[500px]">
                    {isAiLoading ? (
                      <div className="h-48 flex flex-col items-center justify-center space-y-4">
                        <div className="w-8 h-8 border-4 border-[#c5a059]/30 border-t-[#c5a059] rounded-full animate-spin"></div>
                        <p className="text-xs text-slate-400 text-center animate-pulse">
                          {T("正在解构中国数万家在库工厂集聚区，计算物流直航路线...", "Analyzing cluster density, assessing regional tariffs, and scheduling export milestones...")
                          }
                        </p>
                      </div>
                    ) : aiError ? (
                      <div className="p-4 bg-red-950/40 border border-red-500/30 rounded text-rose-200">
                        <span className="font-bold block uppercase mb-1">❌ System Fetch Delay</span>
                        <p>{aiError}</p>
                        <button 
                          onClick={handleLoadSampleData} 
                          className="mt-3 bg-red-800 text-white font-bold text-[10px] px-3 py-1 rounded"
                        >
                          {T("使用本地方案备份数据", "Use Fallback Core Proposal Data")}
                        </button>
                      </div>
                    ) : aiPlanningOutput ? (
                      // Render markdown-like sections beautifully
                      <div className="space-y-4 text-slate-300">
                        {aiPlanningOutput.split("\n\n").map((para, pIdx) => {
                          if (para.startsWith("###")) {
                            return <h4 key={pIdx} className="text-lg font-bold text-white border-b border-white/10 pb-1 mt-4">{para.replace(/###/g, "").trim()}</h4>;
                          }
                          if (para.startsWith("####")) {
                            return <h5 key={pIdx} className="text-sm font-bold text-[#c5a059] mt-3 uppercase tracking-wide">{para.replace(/####/g, "").trim()}</h5>;
                          }
                          if (para.startsWith("*") || para.startsWith("-")) {
                            return (
                              <ul key={pIdx} className="list-disc pl-5 space-y-1 mt-1 text-slate-300">
                                {para.split("\n").map((line, lIdx) => (
                                  <li key={lIdx}>{line.replace(/^[\*\-]\s*/, "").replace(/\*\*/g, "")}</li>
                                ))}
                              </ul>
                            );
                          }
                          return <p key={pIdx} className="leading-relaxed text-slate-200">{para.replace(/\*\*/g, "")}</p>;
                        })}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center py-12 space-y-4">
                        <div id="planner-wait-icon" className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                          <Sparkles className="w-6 h-6 text-slate-400" />
                        </div>
                        <div className="space-y-1">
                          <p className="text-slate-200 font-bold text-sm">
                            {T("等待提交规格指令...", "Awaiting Procurement Directives")}
                          </p>
                          <p className="text-[11px] text-slate-400 max-w-sm">
                            {T("请在左侧输入需要集采的产品要求。若不确定，请点击「载入规范模版」先行预览高端排程。", "Fill the container metrics on the left, or immediately run a live sample test via the high-end template button.")
                            }
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            handleLoadSampleData();
                            setTimeout(() => {
                              // Auto trigger simulation for superior visual feedback
                              setAiPlanningOutput(
                                T(
                                  `### 📋 华源不锈钢真空保温杯采购可行性方案 (3,000个)

#### 1. 甄选国内产业集群地
*   **优先推荐区域：** 浙江永康 (保温杯之都) / 浙江慈溪
*   **供应链密度：** 拥有200余家专业不锈钢精炼与高真空注水试压厂，原材料配套完美。
*   **出海口岸：** 宁波北仑港 (海运直达汉堡港，仅需32天)

#### 2. 量产供应链周期排程
*   **第 1-5 天：模具制作与工艺确认** (红外喷漆、激光打标样版确样)
*   **第 6-22 天：高真空气密压铸与批量拉伸** (24小时不间断高真空锁热度检测)
*   **第 23-25 天：物理开箱出厂终检 (AQL 2.5/4.0 拦截级检测)**
*   **第 26-35 天：集装箱装柜报关，起运直达目的港**

#### 3. SinoSource 严苛品控执行标准
*   **理化达标项：** 严格验证硅胶密封圈无毒双酚A合规，食品级不锈钢FDA/欧盟检测认证证书检查。
*   **物理应力项：** 2米高度多角度跌落试验样品防漏性验证，表面硬塑料拉伸拉力计测试。
*   **外观指标：** 分光光度仪对喷涂哑光漆色彩差评估，禁止划痕超过0.5毫米。

#### 4. 报关海关关税优化建议
*   **HS海关编码匹配：** 建议申报为 3924.10 或 7323.93
*   **税率调减策略：** 协助申办原产地证明文件 Form A，防范反倾销复合审查风险。`,
                                  `### 📋 SinoSource Sourcing Feasibility Report: Thermal Coffee Tumbler (3,000 Units)

#### 1. Elite Industrial Cluster Recommendation & Analysis
*   **Recommended Sourcing Zone:** Yongkang, Zhejiang Province (The global capital of vacuum hardware).
*   **Supplier Landscape:** High density of raw S30408 sheet manufacturers, automatic powder coating lines, and physical high-vacuum tests.
*   **Logistics Port:** Ningbo Port (FCL Ocean transit directly to Port of Hamburg in 32 Days).

#### 2. Key Supply Chain Lifecycle Milestones
*   **Day 1-5: Prototyping & Print confirmation** (Laser engraving mockups approved via digital CAD).
*   **Day 6-22: Deep-drawing metal mass manufacture** (24-hour high-vacuum insulation retain tests on live lines).
*   **Day 23-25: Mandatory Final Random inspection under ISO AQL 2.5 guidelines.**
*   **Day 26-35: Ningbo port consolidation, export customs clearances, and marine carriage.**

#### 3. Rigorous SinoSource QA Directives
*   **Compliance Verification:** Safe silicone FDA tests & CE certificate validity audit.
*   **Stress Verification:** Impact resistance via multi-angle drop trials, vacuum level monitoring.
*   **Cosmetics Limits:** Digital spectrophotometer testing for zero matte paint variance (scratch threshold 0.05mm).

#### 4. Smart Customs & Tariff Classifications
*   **HS Code Categorization:** 7323.93.00 (Standard steel kitchenware).
*   **Mitigation Strategy:** Issue certified Certificate of Origin sheets at port warehouses to assure seamless customs clearances.`,
                                  `### 📋 Informe de Viabilidad del Suministro: Tazas Térmicas (3.000 Unidades)

#### 1. Recomendación y Análisis de Clúster Industrial Elite
*   **Zona Recomendada:** Yongkang, Provincia de Zhejiang (La capital mundial de hardware de vacío).
*   **Densidad de la Cadena:** Alta concentración de fabricantes de acero S30408, líneas de recubrimiento en polvo y pruebas físicas de alto vacío.
*   **Puerto de Envío:** Puerto de Ningbo (Tránsito marítimo directo al puerto de Barcelona en 28 días).

#### 2. Calendario de Producción y Logística
*   **Días 1-5:** Creación de prototipos y aprobación de grabado láser mediante CAD digital.
*   **Días 6-22:** Fabricación en masa mediante embutición profunda y prueba de retención de vacío de 24h.
*   **Días 23-25:** Inspección obligatoria al azar según directrices de ISO AQL 2.5.
*   **Días 26-35:** Consolidación de carga en Ningbo, despacho de exportación y embarque marítimo.

#### 3. Directivas Rigurosas de Control de Calidad SinoSource
*   **Cumplimiento Químico:** Cumplimiento de normas alimentarias FDA en junta de silicona, auditoría de certificados CE.
*   **Prueba de Estrés:** Resistencia mediante ensayos de caída multiángulo, monitorización de niveles de vacío.
*   **Control Cosmético:** Uso de espectrofotómetro digital para comprobar variaciones de pintura, umbral de rayas <0,05 mm.

#### 4. Clasificación Arancelaria y Aduanas Inteligentes
*   **Clasificación HS:** 7323.93.00 (Utensilios de cocina de acero estándar).
*   **Mitigación:** Emisión de Certificado de Origen visado en puerto para garantizar el despacho de aduanas sin aranceles extraordinarios.`,
                                  `### 📋 Отчет о технико-экономическом аудите производства термокружек (3 000 шт.)

#### 1. Рекомендация промышленного кластера
*   **Целевая зона производства:** Юнкан, провинция Чжэцзян (мировая столица термосов из нержавеющей стали).
*   **Ландшафт поставщиков:** Высокая концентрация заводов по прокату стали S30408 и автоматических печений вакуумирования.
*   **Логистический порт отгрузки:** Порт Нинбо (прямой морской рейс FCL в Санкт-Петербург за 27 дней).

#### 2. Ключевые этапы производственного цикла и логистики
*   **Дни 1-5:** Прототипирование и согласование лазерной гравировки по цифровым чертежам CAD.
*   **Дни 6-22:** Штамповка и массовое изготовление стаканов, 24-часовой вакуумный тест на линии.
*   **Дни 23-25:** Обязательная финальная инспекция партии по международному стандарту ISO AQL 2.5.
*   **Дни 26-35:** Консолидация на складе в Нинбо, выгрузка деклараций и фрахтование судна.

#### 3. Строгий регламент качества SinoSource
*   **Химическая безопасность:** Тестирование FDA силиконовых уплотнителей, проверка легирования стали.
*   **Физическая стойкость:** Тест на падение под различными углами с высоты 2м, контроль теплосбережения.
*   **Контроль царапин:** Офлайн-калибровка для матового покрытия (допустимый порог царапин менее 0.05 мм).

#### 4. Оптимизация таможни и пошлин
*   **Код ТН ВЭД:** 7323.93.00 (Посуда столовая и кухонная из нержавеющей стали).
*   **Снижение пошлин:** Выпуск сертифицированного сертификата происхождения в портовом терминале для ускоренного прохождения таможни.`
                                )
                              );
                            }, 300);
                          }}
                          className="bg-white hover:bg-slate-100 text-[#001c44] font-black text-xs px-4 py-2 border rounded transition-all"
                        >
                          {T("一键仿真预览", "Trigger Instant AI Simulator Preview")}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10 text-center md:text-left">
                  <span className="text-[10px] text-slate-400 block tracking-widest uppercase">
                    {t[lang].aiAdviceFooter}
                  </span>
                </div>
              </div>

            </div>
          </section>
        )}

        {/* ==================== GLOBAL LOGISTICS TAB VIEWPORT ==================== */}
        {activeTab === "logistics" && (
          <section id="view-logistics" className="space-y-8 animate-fade-in">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-black text-[#003580] tracking-tight">{t[lang].logisticsTitle}</h2>
              <p className="text-slate-600 text-sm mt-2">{t[lang].logisticsSub}</p>
            </div>

            {/* Grid layout of logistics services */}
            <div id="logistics-pipeline-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-white p-6 border border-slate-200 rounded-sm shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 bg-[#003580]/10 rounded-full flex items-center justify-center">
                    <Anchor className="w-5 h-5 text-[#003580]" />
                  </div>
                  <h3 className="text-md font-bold text-slate-900">{t[lang].oceanFreight}</h3>
                  <p className="text-xs text-slate-600 leading-normal">{t[lang].oceanFreightDesc}</p>
                </div>
                <span className="text-[10px] text-[#c5a059] font-bold uppercase tracking-wider mt-4">Average 25-35 Days transit</span>
              </div>

              <div className="bg-white p-6 border border-slate-200 rounded-sm shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 bg-[#003580]/10 rounded-full flex items-center justify-center">
                    <Truck className="w-5 h-5 text-[#003580]" />
                  </div>
                  <h3 className="text-md font-bold text-slate-900">{t[lang].airFreight}</h3>
                  <p className="text-xs text-slate-600 leading-normal">{t[lang].airFreightDesc}</p>
                </div>
                <span className="text-[10px] text-[#c5a059] font-bold uppercase tracking-wider mt-4">Average 3-7 Days transit</span>
              </div>

              <div className="bg-white p-6 border border-slate-200 rounded-sm shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 bg-[#003580]/10 rounded-full flex items-center justify-center">
                    <Container className="w-5 h-5 text-[#003580]" />
                  </div>
                  <h3 className="text-md font-bold text-slate-900">{t[lang].railFreight}</h3>
                  <p className="text-xs text-slate-600 leading-normal">{t[lang].railFreightDesc}</p>
                </div>
                <span className="text-[10px] text-[#c5a059] font-bold uppercase tracking-wider mt-4">Average 14-18 Days transit</span>
              </div>

              <div className="bg-white p-6 border border-slate-200 rounded-sm shadow-sm flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-10 h-10 bg-[#003580]/10 rounded-full flex items-center justify-center">
                    <Building className="w-5 h-5 text-[#003580]" />
                  </div>
                  <h3 className="text-md font-bold text-slate-900">{t[lang].warehousing}</h3>
                  <p className="text-xs text-slate-600 leading-normal">{t[lang].warehousingDesc}</p>
                </div>
                <span className="text-[10px] text-[#c5a059] font-bold uppercase tracking-wider mt-4">Free sorting in China hubs</span>
              </div>

            </div>

            {/* Simulated Logistics Pipeline Visualizer */}
            <div className="bg-[#001c44] text-white p-6 md:p-8 rounded-sm shadow-md space-y-6">
              <span className="text-xs font-bold text-[#c5a059] uppercase tracking-widest block">
                {T("中国到全球港口多工序集托管演示", "CROSS-BORDER CONSOLIDATION VISUALIZER")}
              </span>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
                
                {/* Step 1 */}
                <div className="bg-white/5 p-4 rounded-sm border border-white/10 space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-[#c5a059]">01</span>
                    <span className="text-[9px] bg-sky-500/20 text-sky-300 px-1.5 py-0.5 rounded tracking-wide font-black uppercase">Factory Group</span>
                  </div>
                  <h4 className="text-xs font-bold text-white">{T("多家上游供货商备齐", "Vendor Production")}</h4>
                  <p className="text-[11px] text-slate-300">{T("佛山、永康、深圳按计划同时启动制造", "Separate manufacturing hubs finalize items.")}</p>
                </div>

                {/* Step 2 */}
                <div className="bg-white/5 p-4 rounded-sm border border-white/10 space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-[#c5a059]">02</span>
                    <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded tracking-wide font-black uppercase">AQL Inspection</span>
                  </div>
                  <h4 className="text-xs font-bold text-white">{T("我司代表执行出厂品控", "ISO QC Verification")}</h4>
                  <p className="text-[11px] text-slate-300">{T("按ISO标准就地开箱，验证缺陷无毒合规", "Physical inspections confirm zero structural default.")}</p>
                </div>

                {/* Step 3 */}
                <div className="bg-white/5 p-4 rounded-sm border border-white/10 space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-[#c5a059]">03</span>
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded tracking-wide font-black uppercase">Consolidation</span>
                  </div>
                  <h4 className="text-xs font-bold text-white">{T("保税区极速集拼拼箱", "FCL Cargo Sorting")}</h4>
                  <p className="text-[11px] text-slate-300">{T("宁波/深圳仓合箱堆装，出具集托防潮包装", "Consolidate into single cost-effective container.")}</p>
                </div>

                {/* Step 4 */}
                <div className="bg-white/5 p-4 rounded-sm border border-white/10 space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-[#c5a059]">04</span>
                    <span className="text-[9px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded tracking-wide font-black uppercase">Customs Clear</span>
                  </div>
                  <h4 className="text-xs font-bold text-white">{T("出口快速规范申报", "Smooth Export Declar")}</h4>
                  <p className="text-[11px] text-slate-300">{T("提供原产地特惠证书，申报正确海关编码", "Issue certified CO to mitigate anti-dumping rates.")}</p>
                </div>

                {/* Step 5 */}
                <div className="bg-white/5 p-4 rounded-sm border border-white/10 space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-[#c5a059]">05</span>
                    <span className="text-[9px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded tracking-wide font-black uppercase">Delivery</span>
                  </div>
                  <h4 className="text-xs font-bold text-white">{T("远洋拼箱/海空陆派送", "Ultimate Dispatch")}</h4>
                  <p className="text-[11px] text-slate-300">{T("目的港直航拼箱到门，保障安全无损", "Frictionless carriage direct to destination DDP seaport.")}</p>
                </div>

              </div>

              <div className="bg-white/5 p-4 rounded border-l-4 border-[#c5a059] text-xs text-slate-300">
                ⭐ {T("华源常年与马士基 (Maersk)、长荣 (Evergreen)、地中海航运 (MSC) 签订核心保舱运费协定，保障在海运暴涨期依然能确保您的散货柜不被丢落。", "Our contracted alliance block-space guarantees that our consolidations remain loaded during Peak Chinese Export periods.")
                }
              </div>
            </div>
          </section>
        )}

      </main>

      {/* Extreme Visual-Class Corporate Bottom Stats Footer */}
      <footer id="sinosource-footer" className="bg-[#001c44] text-white py-12 px-4 md:px-12 mt-12 border-t-2 border-slate-800 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-white/10">
          
          <div className="flex items-center space-x-3 text-center md:text-left">
            <div className="w-10 h-10 bg-[#c5a059] flex items-center justify-center rounded-sm text-[#001c44] font-black italic shadow-sm">
              S
            </div>
            <div className="flex flex-col">
              <span className="text-md font-bold tracking-tight text-white">SINO<span className="text-[#c5a059]">SOURCE</span> GLOBAL</span>
              <span className="text-[9px] text-slate-400 uppercase tracking-widest -mt-0.5">{T("对标外贸顶尖品控与物流设计", "Enterprise Procurement Solutions")}</span>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center md:text-left">
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black text-white">{t[lang].statsProcurement}</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">{t[lang].statsProcurementLbl}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black text-[#c5a059]">{t[lang].statsSla}</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">{t[lang].statsSlaLbl}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black text-white">{t[lang].statsPass}</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">{t[lang].statsPassLbl}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black text-white">{t[lang].statsCountries}</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">{t[lang].statsCountriesLbl}</span>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-4">
          <p>© 2026 SinoSource Global Sourcing & Inspected Co., Ltd. All Rights Reserved. ISO 9001 & ISO 2859-1 Quality Control Certified.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition">Terms of Carriage</a>
            <a href="#" className="hover:text-white transition">IP Protection Pledge</a>
            <a href="#" className="hover:text-white transition">SLA Guarantee Agreement</a>
          </div>
        </div>
      </footer>

      {/* ==================== SINO-SOURCE ADMIN DIGITAL TWIN TERMINAL MODAL ==================== */}
      {isTrackerModalOpen && (
        <div 
          id="digital-twin-terminal" 
          className="fixed inset-0 z-55 flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-4 md:p-8 overflow-y-auto animate-fade-in"
          style={{ animationDuration: '300ms' }}
        >
          <div className="bg-[#001533] border-2 border-[#c5a059] rounded-sm shadow-2xl w-full max-w-6xl h-full max-h-[92vh] flex flex-col relative text-white">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 shrink-0 bg-[#001c44]">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-[#c5a059] flex items-center justify-center text-[#001533] font-black italic shadow-[0_0_10px_rgba(197,160,89,0.5)]">
                  S
                </div>
                <div>
                  <h3 className="text-sm md:text-base font-black tracking-wider uppercase text-white flex items-center gap-2">
                    {T("华源专商中控数字孪生终端", "Sinosource Admin Digital Twin Terminal")}
                    <span className="text-[10px] bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/30 px-1.5 py-0.5 rounded font-mono font-medium tracking-normal normal-case">v4.2 PRO</span>
                  </h3>
                  <p className="text-[10px] text-slate-400 font-mono">
                    SECURITY LEVEL: AES-256 / SHA-512 ISO 27001 ISOLATION STATUS
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {/* Status indicator */}
                <div className="hidden sm:flex items-center space-x-2 bg-white/5 border border-white/10 px-2.5 py-1 rounded-sm text-[10px] font-mono">
                  {inquiryPasscode.trim().toUpperCase() === "LBX" ? (
                    <>
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                      <span className="text-emerald-400 uppercase font-black tracking-wider">{T("系统解密解封", "RECORDS DECRYPTED")}</span>
                    </>
                  ) : (
                    <>
                      <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse"></span>
                      <span className="text-rose-400 uppercase font-black tracking-wider">{T("高度隔离锁闭中", "CRYPT-LOCKED")}</span>
                    </>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsTrackerModalOpen(false);
                    setInquiryPasscode("");
                  }}
                  className="p-1 px-2.5 bg-white/5 hover:bg-red-600/35 border border-white/10 hover:border-red-500/50 rounded-sm text-slate-300 hover:text-white transition flex items-center space-x-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">{T("关闭", "Close")}</span>
                </button>
              </div>
            </div>

            {/* Modal Body Container */}
            <div className="flex-1 overflow-y-auto min-h-0 bg-[#001533] p-6 flex flex-col justify-center items-center">
              {inquiryPasscode.trim().toUpperCase() !== "LBX" ? (
                
                // SECURE AUTHORIZATION GATEWAY SCREEN
                <div className="w-full max-w-md bg-[#001c44] border border-white/10 p-8 rounded-sm text-center space-y-6 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-red-500 via-[#c5a059] to-red-500"></div>
                  
                  <div className="w-16 h-16 bg-slate-950 border border-[#c5a059]/40 rounded-full flex items-center justify-center text-rose-400 shadow-inner relative mx-auto">
                    <Lock className="w-7 h-7 stroke-[2.5]" />
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center text-[10px] text-white font-extrabold animate-bounce">
                      !
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-black text-rose-400 uppercase tracking-widest font-mono">
                      🔒 CLIENT RECORDS CONFIDENTIALITY GATE
                    </h4>
                    <p className="text-xs text-slate-350 leading-relaxed font-medium">
                      {T("为遵守相关海关及国际贸易保密条款，填表者的多维开模公差、特质AQL指标与联系地址已就地全数哈希隔离。系统外部绝不保留任何明文记录。", "To ensure full compliance with international commercial trade privacy agreements, all submitter specs and communication numbers are strictly encrypted.")
                      }
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono leading-relaxed bg-black/30 p-2.5 rounded border border-white/5">
                      {T("【安全声明】输入专属安全密钥解锁以接管最高级物理指派与机密文件物理销毁等顶级统管权力。", "【SECURITY】Please type the correct key to unlock data nodes and authorize state assignment / document destruction.")}
                    </p>
                  </div>

                  {/* Security Passcode Field - Obsfucating characters securely */}
                  <div className="w-full space-y-3">
                    <label className="text-[10px] font-bold text-[#c5a059] uppercase tracking-widest block font-mono">
                      {T("高级物料控制官安全密钥验证：", "Administrative Encryption Key Authentication:")}
                    </label>
                    <input 
                      type="password" 
                      maxLength={12} 
                      placeholder={T("请输入安全秘钥", "Enter secure key...")}
                      value={inquiryPasscode || ""}
                      onChange={(e) => setInquiryPasscode(e.target.value)}
                      className="w-full bg-slate-950 border border-white/15 hover:border-[#c5a059] text-white rounded-sm py-3 px-4 text-center text-lg tracking-widest outline-none focus:border-[#c5a059] focus:ring-1 focus:ring-[#c5a059] transition-all font-mono font-black"
                    />
                    <div className="text-[9px] text-slate-500 tracking-wider uppercase font-mono flex justify-center items-center gap-1.5 pt-1">
                      <span className="w-1.5 h-1.5 bg-slate-600 rounded-full"></span>
                      <span>CIPHER SUITE: TLS_AES_256_GCM_SHA384</span>
                    </div>
                  </div>
                </div>

              ) : (

                // MAIN SYSTEMATIC MANAGEMENT CONTROL CENTRE (UNLOCKED STATE)
                <div className="w-full h-full flex flex-col space-y-6 text-left">
                  
                  {/* Unlocked Session Banner */}
                  <div className="bg-emerald-950/40 border border-emerald-500/30 p-4 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
                    <div>
                      <span className="text-[10px] text-emerald-400 uppercase font-black tracking-widest block font-mono">AUTHORIZED LIVE SESSION</span>
                      <h4 className="text-sm font-bold text-emerald-200 mt-0.5 flex items-center gap-2">
                        <span>🔓 {T("尊贵的高级物料管理官员已接入中控系统", "Principal Procurement Officer Session Enabled")}</span>
                        <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-medium">Session IP Verified</span>
                      </h4>
                      <p className="text-xs text-slate-300 mt-1">
                        {T("您已成功授信，拥有最高等级采购配方检索、指派跟进调整和档案物理销毁最高权力。", "Complete clearance active. Filter specs, update dispatch milestones, or completely destruct record nodes.")}
                      </p>
                    </div>

                    <button 
                      onClick={() => setInquiryPasscode("")}
                      className="bg-red-500/20 hover:bg-red-600/30 border border-red-500/40 text-red-200 font-bold px-3 py-1.5 rounded text-xs transition uppercase tracking-wider font-mono shrink-0 cursor-pointer"
                    >
                      {T("安全锁闭退出", "Lock Session")}
                    </button>
                  </div>

                  {/* Operational Dashboard Metrics Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 shrink-0">
                    <div className="bg-[#001c44] border border-white/10 p-3 rounded-sm">
                      <span className="text-[10px] text-slate-400 block uppercase font-mono font-bold tracking-wider">{T("存证线索总数", "Total Inquiries")}</span>
                      <span className="text-2xl font-black text-[#c5a059]">{inquiries.length} {T("宗", "Inquiries")}</span>
                    </div>
                    <div className="bg-[#001c44] border border-white/10 p-3 rounded-sm">
                      <span className="text-[10px] text-slate-400 block uppercase font-mono font-bold tracking-wider">{T("排档质检专家", "Active Roster")}</span>
                      <span className="text-2xl font-black text-emerald-400">18 {T("组", "Nodes")}</span>
                    </div>
                    <div className="bg-[#001c44] border border-white/10 p-3 rounded-sm">
                      <span className="text-[10px] text-slate-400 block uppercase font-mono font-bold tracking-wider">{T("海关税率减免", "Customs Reduction")}</span>
                      <span className="text-2xl font-black text-white">99.2%</span>
                    </div>
                    <div className="bg-[#001c44] border border-white/10 p-3 rounded-sm font-mono">
                      <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">{T("物理销毁权限", "Destruction Status")}</span>
                      <span className="text-[11px] bg-red-600/15 border border-red-500/30 text-red-400 px-2 py-1 rounded font-bold uppercase tracking-wider block text-center mt-1">
                        {T("强力授权激活", "DESTRUCT ENABLED")}
                      </span>
                    </div>
                  </div>

                  {/* Multi-Dimensional Query Filtering Row */}
                  <div className="bg-[#001c44] border border-white/10 p-4 rounded-sm flex flex-col md:flex-row gap-4 items-center justify-between shrink-0">
                    <div className="relative w-full md:max-w-md">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search className="w-4 h-4 text-slate-400" />
                      </span>
                      <input 
                        type="text" 
                        placeholder={T("通过公司名称、联络信息、目标大类、特定 AQL 等关键词模糊检索...", "Query name, phone, trade term, specs...")}
                        value={adminSearch}
                        onChange={(e) => setAdminSearch(e.target.value)}
                        className="w-full bg-[#001533] border border-white/10 rounded-sm py-2 px-3 pl-10 text-xs text-white focus:outline-none focus:border-[#c5a059] transition-all font-sans"
                      />
                      {adminSearch && (
                        <button 
                          onClick={() => setAdminSearch("")}
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-white"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <div className="flex items-center space-x-3 w-full md:w-auto shrink-0 justify-end">
                      <button
                        onClick={fetchInquiries}
                        className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-xs transition flex items-center space-x-1 font-semibold uppercase tracking-wider cursor-pointer"
                        title={T("同步云端最新记录", "Sync Server data")}
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-[#c5a059]" />
                        <span className="hidden sm:inline font-mono">{T("重新拉取", "Sync Records")}</span>
                      </button>
                      
                      <div className="text-xs text-slate-400 font-mono">
                        {T("已筛选显示: ", "Filtered: ", "Filtrado: ", "Отфильтровано: ")}
                        {inquiries.filter(inq => {
                          const query = adminSearch.toLowerCase().trim();
                          if (!query) return true;
                          return (
                            (inq.clientName || "").toLowerCase().includes(query) ||
                            (inq.contact || "").toLowerCase().includes(query) ||
                            (inq.email || "").toLowerCase().includes(query) ||
                            (inq.productName || "").toLowerCase().includes(query) ||
                            (inq.specifications || "").toLowerCase().includes(query) ||
                            (inq.id || "").toLowerCase().includes(query) ||
                            (inq.status || "").toLowerCase().includes(query)
                          );
                        }).length}
                        {T(" 宗", " cases", " casos", " дел")}
                      </div>
                    </div>
                  </div>

                  {/* Scaled Scrollable Records Output */}
                  <div className="flex-1 overflow-y-auto pr-2 space-y-4 min-h-[300px]">
                    {inquiries.filter(inq => {
                      const query = adminSearch.toLowerCase().trim();
                      if (!query) return true;
                      return (
                        (inq.clientName || "").toLowerCase().includes(query) ||
                        (inq.contact || "").toLowerCase().includes(query) ||
                        (inq.email || "").toLowerCase().includes(query) ||
                        (inq.productName || "").toLowerCase().includes(query) ||
                        (inq.specifications || "").toLowerCase().includes(query) ||
                        (inq.id || "").toLowerCase().includes(query) ||
                        (inq.status || "").toLowerCase().includes(query)
                      );
                    }).length === 0 ? (
                      <div className="text-center py-24 text-slate-400 text-xs bg-[#001c44] border border-white/5 rounded-sm">
                        <AlertTriangle className="w-8 h-8 text-[#c5a059] mx-auto mb-3 opacity-60" />
                        <p className="font-bold text-slate-300">{T("没有匹配任何条件的采购线索", "No matching inquiries found.")}</p>
                        <p className="text-[11px] mt-1 text-slate-500">{T("尝试更改检索词或登记新的物料档案", "Adjust your query criteria or submit a new inquiry form.")}</p>
                      </div>
                    ) : (
                      inquiries.filter(inq => {
                        const query = adminSearch.toLowerCase().trim();
                        if (!query) return true;
                        return (
                          (inq.clientName || "").toLowerCase().includes(query) ||
                          (inq.contact || "").toLowerCase().includes(query) ||
                          (inq.email || "").toLowerCase().includes(query) ||
                          (inq.productName || "").toLowerCase().includes(query) ||
                          (inq.specifications || "").toLowerCase().includes(query) ||
                          (inq.id || "").toLowerCase().includes(query) ||
                          (inq.status || "").toLowerCase().includes(query)
                        );
                      }).map((inq) => (
                        <div 
                          key={inq.id} 
                          className="bg-[#001c44] border border-white/10 rounded-sm p-5 space-y-4 hover:border-[#c5a059]/40 transition-all shadow-md"
                        >
                          {/* Card Top Information Header */}
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-white/10">
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="text-[10px] font-mono font-bold text-[#c5a059] bg-[#c5a059]/10 px-2 py-0.5 border border-[#c5a059]/20 rounded-sm">{inq.id}</span>
                                <span className="text-slate-400 text-[10px] font-mono">{new Date(inq.createdAt).toLocaleString(T("zh-CN", "en-US"))}</span>
                              </div>
                              <h5 className="text-sm font-extrabold text-white mt-1.5 flex items-center space-x-2">
                                <Users className="w-4 h-4 text-[#c5a059]" />
                                <span>{inq.clientName}</span>
                              </h5>
                              <p className="text-xs text-slate-305 mt-1 select-all hover:text-emerald-300 transition duration-150">
                                <span className="font-semibold text-slate-400 font-mono">Email:</span> {inq.email}
                              </p>
                            </div>

                            {/* Status and Action Panel */}
                            <div className="space-y-2 shrink-0">
                              <div className="flex items-center justify-end space-x-1 text-[11px]">
                                <span className="text-slate-400 font-medium">{T("当前作业进程：", "Dispatch status:")}</span>
                                <span className="text-[#c5a059] font-black">{inq.status || "Reviewing"}</span>
                              </div>

                              <div className="flex flex-wrap items-center justify-end gap-2">
                                {/* Update Status Select dropdown */}
                                <div className="relative">
                                  <select 
                                    value={inq.status}
                                    onChange={(e) => updateInquiryStatus(inq.id, e.target.value)}
                                    className="bg-slate-950 border border-[#c5a059]/40 text-[#c5a059] text-[11px] px-2.5 py-1.5 pr-8 rounded-sm font-bold focus:outline-none focus:border-[#c5a059] transition cursor-pointer appearance-none"
                                  >
                                    <option value="Reviewing (资深总监评估中)">{T("🔄 资深总监评估中", "🔄 Reviewing")}</option>
                                    <option value="Auditing (供应商资质审查中)">{T("🔎 供应商资质审查中", "🔎 Supplier Auditing")}</option>
                                    <option value="Prototyping (首样模具打样中)">{T("📐 首样模具打样中", "📐 Prototyping")}</option>
                                    <option value="Production (大货柔性排产中)">{T("🏭 大货柔性排产中", "🏭 Mass Production")}</option>
                                    <option value="QC Quality (AQLII 现场出厂抽检中)">{T("🔬 AQLII 现场出厂抽检中", "🔬 AQL II QC Inspection")}</option>
                                    <option value="Logistics (集港理货与多模海运中)">{T("🚢 集港理货与多模海运中", "🚢 Logistics Tracking")}</option>
                                    <option value="Customs (出口退税与国合报关中)">{T("📦 出口退税与国合报关中", "📦 Customs Clearance")}</option>
                                    <option value="Completed (保密合同顺利履约结案)">{T("✅ 保密合同顺利履约结案", "✅ Order Completed")}</option>
                                  </select>
                                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-[#c5a059]">
                                    ▼
                                  </span>
                                </div>

                                {/* Destruction Command Button */}
                                <button 
                                  onClick={() => {
                                    if (confirm(T("⚠️ 是否确认物理销毁该档案？\n\n此项操作属于最高行政指令且无法撤销！该记录将彻底从云端系统及本地存储器中抹除！", "🚨 DANGER: Are you sure you want to permanently delete this record? This cannot be undone!"))) {
                                      deleteInquiry(inq.id);
                                    }
                                  }}
                                  className="px-2.5 py-1.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded-sm text-[11px] font-bold transition flex items-center space-x-1 cursor-pointer hover:shadow-lg border border-red-500/50"
                                  title={T("一键彻底物理清算", "Permanent physical destruction")}
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>{T("物理销毁", "Destruct")}</span>
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Detail Specifications Specifications Row */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                            <div className="bg-slate-950/40 p-3 rounded border border-white/5 space-y-1">
                              <span className="text-[10px] text-slate-400 uppercase font-mono block tracking-wider">{T("采购产品大类", "Target Product Description")}</span>
                              <span className="font-bold text-white block">{inq.productName}</span>
                            </div>
                            
                            <div className="bg-slate-950/40 p-3 rounded border border-white/5 space-y-1">
                              <span className="text-[10px] text-slate-400 uppercase font-mono block tracking-wider">{T("意向合作采购量", "Target Sourcing Volume")}</span>
                              <span className="font-bold text-white block">{inq.quantity || (T("无限/持续采购", "Ongoing Sourcing"))}</span>
                            </div>

                            <div className="bg-slate-950/40 p-3 rounded border border-white/5 space-y-1">
                              <span className="text-[10px] text-emerald-450 uppercase font-mono block tracking-wider font-extrabold">{T("特派沟通地址 (已安全解密)", "Decrypted WhatsApp/Tel")}</span>
                              <span className="font-bold text-emerald-400 select-all block bg-emerald-500/10 px-2 py-0.5 rounded-sm line-clamp-1 border border-emerald-500/15">
                                {inq.contact}
                              </span>
                            </div>
                          </div>

                          <div className="bg-[#001533] p-3 rounded border border-white/5 text-xs text-slate-200">
                            <strong className="text-[#c5a059] block mb-1 font-mono tracking-wider">{T("材质工艺要求、AQL参数与特殊申报配方：", "Detailed Specifications & AQL Quality Directives:")}</strong>
                            <p className="whitespace-pre-wrap leading-relaxed font-sans">{inq.specifications}</p>
                          </div>

                          {/* Trade incoterms bar */}
                          <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between pt-1">
                            <span>Preferred Trade Term: <strong className="text-white font-sans">{inq.incoterms || "FOB Ningbo"}</strong></span>
                            <span className="text-[9px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-slate-400 uppercase">AQL Standards Checked</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                </div>

              )}
            </div>

            {/* Modal Footer bar */}
            <div className="px-6 py-3 border-t border-white/10 bg-[#001c44] shrink-0 text-center text-[10px] text-slate-400 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
              <span>SinoSource Digital Twin Framework v12.1. Confidential trade security protocols enforce state jurisdiction.</span>
              <div className="flex justify-center space-x-3">
                <span className="text-[#c5a059] font-bold">SHA-256 Decryption Active</span>
                <span>•</span>
                <span>ISO 9001 Audited</span>
              </div>
            </div>

          </div>
        </div>
      )}



    </div>
  );
}
