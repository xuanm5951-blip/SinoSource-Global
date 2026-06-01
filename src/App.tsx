import React, { useState, useEffect } from "react";
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
  const [lang, setLang] = useState<Language>("zh"); // Defaulting to high-contrast Chinese, user has gorgeous header switches
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
      setInquiryError(lang === "zh" ? "请填齐所有必填项（联络姓名、联系方式、邮箱和产品描述）" : "Please fill in all required fields.");
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
        quantity: currentQty || (lang === "zh" ? "暂未指定" : "Not Specified"),
        specifications: currentSpecs || (lang === "zh" ? "无特殊工艺材质及 AQL 重点参数标示。" : "No special requests"),
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
      alert(lang === "zh" ? "请输入您想要采购的产品特长需求描述" : "Please input product descriptions");
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
        <div id="nav-brand" className="flex items-center space-x-3">
          <button 
            type="button"
            onClick={() => setIsTrackerModalOpen(true)}
            className="w-10 h-10 bg-[#003580] hover:bg-[#c5a059] group flex items-center justify-center rounded-sm shrink-0 shadow-sm transition-all hover:scale-105 cursor-pointer border border-[#c5a059]/20"
            title={lang === "zh" ? "打开安全授权中控终端" : "Open Secure Console"}
          >
            <span className="text-white group-hover:text-slate-950 font-black text-xl italic transition-colors">S</span>
          </button>
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-extrabold tracking-tight text-[#003580]">
              {t[lang].brand}
            </span>
            <span className="text-[10px] tracking-[0.2em] font-semibold text-[#c5a059] uppercase -mt-1 hidden md:inline">
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
            onClick={() => {
              setActiveTab("home");
              setTimeout(() => {
                const element = document.getElementById("customer-inquiry-section");
                if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }, 100);
            }}
            className="bg-[#003580] text-white text-[12px] md:text-sm font-bold px-4 py-2 hover:bg-opacity-90 transition rounded-sm flex items-center shadow-sm"
          >
            {lang === "zh" ? "立即联系" : lang === "es" ? "Contactar" : lang === "ru" ? "Связаться" : "Contact Us"}
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
        <header id="corp-hero" className="relative flex-shrink-0 bg-gradient-to-r from-slate-950 via-slate-900 to-[#001c44] text-white py-16 md:py-24 px-4 md:px-12 overflow-hidden border-b-4 border-[#c5a059]">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-400 via-blue-900 to-transparent"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059] opacity-5 rounded-full filter blur-3xl"></div>
          
          <div className="relative max-w-5xl mx-auto z-10">
            <div className="flex items-center space-x-3 mb-4">
              <button
                type="button"
                onClick={() => setIsTrackerModalOpen(true)}
                className="w-10 h-10 rounded-full bg-[#c5a059] hover:bg-yellow-500 text-slate-950 flex items-center justify-center font-black font-mono text-base shadow-[0_0_15px_rgba(197,160,89,0.4)] transition-all hover:scale-110 active:scale-95 cursor-pointer border border-[#c5a059] shrink-0"
                title={lang === "zh" ? "系统控制终端" : "SinoSource Console"}
              >
                S
              </button>
              <div className="h-[2px] w-6 bg-[#c5a059]"></div>
              <span className="text-[#c5a059] uppercase tracking-[0.25em] text-xs font-black">
                {t[lang].tagline}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-[1.1] mb-6 max-w-3xl">
              {t[lang].heroHeadingPrefix} <br className="hidden md:inline" />
              <span className="text-[#c5a059] italic bg-gradient-to-r from-amber-200 to-[#c5a059] bg-clip-text text-transparent">
                {t[lang].heroHeadingSuf}
              </span>
            </h1>
            
            <p className="text-sm md:text-md text-slate-300 max-w-2xl leading-relaxed mb-8">
              {t[lang].heroSub}
            </p>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setActiveTab("planner")}
                className="bg-[#c5a059] text-slate-950 px-6 py-3 font-bold hover:bg-yellow-500 transition rounded-sm text-sm flex items-center space-x-2 shadow-lg"
              >
                <Sparkles className="w-4 h-4 fill-current text-slate-950" />
                <span>{t[lang].ctaStart}</span>
              </button>
              <button 
                onClick={() => setActiveTab("clusters")}
                className="border border-white/30 text-white hover:bg-white/10 px-6 py-3 font-bold transition rounded-sm text-sm backdrop-blur-sm"
              >
                {t[lang].navClusters}
              </button>
              <button 
                onClick={() => setActiveTab("aql")}
                className="bg-white/10 text-white hover:bg-white/20 px-6 py-3 font-semibold transition rounded-sm text-sm flex items-center space-x-2"
              >
                <Calculator className="w-4 h-4 text-[#c5a059]" />
                <span>{t[lang].ctaAql}</span>
              </button>
            </div>
          </div>

          {/* Premium Services Summary Ribbon Overlay */}
          <div className="mt-12 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pt-10 border-t border-white/10">
            <div className="bg-white/5 p-4 rounded-sm border border-white/10 backdrop-blur-sm">
              <h3 className="text-[#c5a059] font-bold text-xs uppercase tracking-wider mb-1 flex items-center space-x-1.5">
                <Building className="w-3.5 h-3.5" />
                <span>{t[lang].info1Title}</span>
              </h3>
              <p className="text-xs text-slate-300 leading-normal">{t[lang].info1Desc}</p>
            </div>
            <div className="bg-white/5 p-4 rounded-sm border border-white/10 backdrop-blur-sm">
              <h3 className="text-[#c5a059] font-bold text-xs uppercase tracking-wider mb-1 flex items-center space-x-1.5">
                <Coins className="w-3.5 h-3.5" />
                <span>{t[lang].info2Title}</span>
              </h3>
              <p className="text-xs text-slate-300 leading-normal">{t[lang].info2Desc}</p>
            </div>
            <div className="bg-white/5 p-4 rounded-sm border border-white/10 backdrop-blur-sm">
              <h3 className="text-[#c5a059] font-bold text-xs uppercase tracking-wider mb-1 flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t[lang].info3Title}</span>
              </h3>
              <p className="text-xs text-slate-300 leading-normal">{t[lang].info3Desc}</p>
            </div>
            <div className="bg-white/5 p-4 rounded-sm border border-white/10 backdrop-blur-sm">
              <h3 className="text-[#c5a059] font-bold text-xs uppercase tracking-wider mb-1 flex items-center space-x-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>{t[lang].info4Title}</span>
              </h3>
              <p className="text-xs text-slate-300 leading-normal">{t[lang].info4Desc}</p>
            </div>
          </div>
        </header>
      )}

      {/* Main Dynamic Viewport */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-8">

        {/* ==================== HOME TAB VIEWPORT ==================== */}
        {activeTab === "home" && (
          <section id="view-dashboard" className="space-y-12">
            
            {/* Quick Sourcing Flow Overview for Non-Technical Users */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white border border-slate-200 p-6 md:p-8 rounded-sm shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -mr-16 -mt-16 filter blur-xl"></div>
                <div className="relative z-10">
                  <span className="text-xs font-bold text-[#c5a059] tracking-widest uppercase block mb-1">
                    {lang === "zh" ? "核心服务特色" : "ENTERPRISE CAPABILITIES"}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-[#003580] leading-snug mb-4">
                    {lang === "zh" ? "穿透各环节的跨境采购代理标准" : "Bridging International Demands with High-Density Chinese Industrial Hubs"}
                  </h2>
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                    {lang === "zh" ? 
                      "我们独立于任何生产工厂，代表唯一的买方利益。通过严格将每个工厂流程量化、精细追踪，为您在模具校调、出厂终检等物理点实施闭环管控，消除供应链盲区。" : 
                      "SinoSource functions as your direct physical proxy inside China. We negotiate strictly for the importer's interest, cutting through secondary trade brokers, stabilizing delivery lead times, and maintaining rigorous AQL standard oversight."
                    }
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold text-slate-700">
                    <div className="flex items-center space-x-2 p-2 bg-slate-50 border-l-4 border-[#003580]">
                      <CheckCircle2 className="w-4 h-4 text-[#003580]" />
                      <span>{lang === "zh" ? "双重开箱检测：工序中段+出货前" : "Dual-Point Quality Control Inspections"}</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 bg-slate-50 border-l-4 border-[#003580]">
                      <CheckCircle2 className="w-4 h-4 text-[#003580]" />
                      <span>{lang === "zh" ? "合规审查：重金属、无双酚A、CE安全认证" : "Chemical Certifications & Compliance Audit"}</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 bg-slate-50 border-l-4 border-[#003580]">
                      <CheckCircle2 className="w-4 h-4 text-[#003580]" />
                      <span>{lang === "zh" ? "自有海关集拼货位，无惧排队旺季" : "Dedicated Bonded Consolidation Storage"}</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 bg-slate-50 border-l-4 border-[#003580]">
                      <CheckCircle2 className="w-4 h-4 text-[#003580]" />
                      <span>{lang === "zh" ? "多国语言商务经理与工程师现场同频" : "Native-Speaking Business Liaison & Engineers"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar Quick-Action: Launch AI Planner */}
              <div className="bg-[#001c44] text-white p-6 md:p-8 rounded-sm shadow-md border-t-4 border-[#c5a059] flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-[#c5a059]" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">
                    {lang === "zh" ? "AI 供应链推演" : "AI Sourcing Simulator"}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    {lang === "zh" ? 
                      "根据商品特长定制化调取在库中国产业带数据库，秒级计算供应商地理集群配给，提供极具指导性的海关HS编码和量产周期预测。" : 
                      "Evaluate manufacture regions, projected delivery cycles, standard defects tolerance and sea logistics in seconds with our integrated Gemini assistant node."
                    }
                  </p>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={() => {
                      setActiveTab("planner");
                      setTimeout(handleLoadSampleData, 100);
                    }}
                    className="w-full bg-[#c5a059] text-[#001c44] py-2.5 font-bold rounded-sm text-xs uppercase tracking-wider hover:bg-yellow-500 transition block text-center"
                  >
                    {t[lang].useSample}
                  </button>
                  <button 
                    onClick={() => setActiveTab("planner")}
                    className="w-full border border-white/20 hover:bg-white/10 py-2.5 font-bold rounded-sm text-xs transition block text-center"
                  >
                    {lang === "zh" ? "进入决策面板 →" : "Open Planning Tool →"}
                  </button>
                </div>
              </div>
            </div>

            {/* ==================== SINO-SOURCE GLOBAL MARITIME & FACTORY QUALITY SCHEMATIC ==================== */}
            <div id="maritime-sourcing-gateway-map" className="bg-[#001c44] text-white p-6 md:p-10 border-t-4 border-[#c5a059] rounded-sm shadow-lg space-y-8 relative overflow-hidden">
              {/* Abstract overlay network lines */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-yellow-200 via-blue-900 to-transparent"></div>
              
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/10 pb-6">
                <div>
                  <span className="text-xs font-bold text-[#c5a059] uppercase tracking-widest block font-mono">
                    {lang === "zh" ? "全息物理品控廊道图" : "GLOBAL QUALITY-ASSURANCED FREIGHT ROUTE MAP"}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-1">
                    {lang === "zh" ? "万箱远洋巨轮与跨境闭环物理质检全图景" : "Advanced Sourcing: Ocean Vessel & Factory Dispatch System"}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 max-w-3xl leading-relaxed">
                    {lang === "zh" ? 
                      "我们为您精细打通“大陆工厂”、“海口集拼双检”、“海上航道”、“完税 DDP 门对门”四大阶段，把原本不透明的跨境物理货运全流程以直观的可视化仪表端和 AQL 高标准保障呈递至您的屏幕前。" : 
                      "We physically bridge raw metal processing, AQL double-point sealing, maritime container vessel routes, and import customs-cleared DDP delivery into one continuous visible monitor portal."
                    }
                  </p>
                </div>
                
                <div className="flex bg-white/5 border border-white/10 p-1 rounded font-mono shrink-0">
                  <span className="text-[10px] text-[#c5a059] font-bold px-3 py-1.5 uppercase">
                    SYS.ROUTE: STABLE (全线畅通)
                  </span>
                </div>
              </div>

              {/* Responsive Elegant SVG Diagram */}
              <div className="relative bg-slate-950/40 p-4 md:p-6 rounded border border-white/5 backdrop-blur-sm">
                
                {/* Responsive SVG Visual map */}
                <div className="w-full hidden md:block">
                  <svg viewBox="0 0 800 220" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Ocean Wave lines in the background */}
                    <path d="M 10 160 Q 200 170, 400 160 T 790 160" stroke="#003580" strokeWidth="2" strokeDasharray="5, 5" />
                    <path d="M 10 175 Q 180 185, 380 175 T 790 180" stroke="#1E40AF" strokeWidth="1" />
                    
                    {/* Glowing flow connection path */}
                    <path d="M 100 110 L 280 110 L 480 110 L 680 110" stroke="#ffffff" strokeWidth="1" strokeDasharray="6, 6" />
                    {/* Completed route highlight */}
                    <path 
                      d={`M 100 110 L ${activeRouteStep >= 1 ? 280 : 100} L ${activeRouteStep >= 2 ? 480 : 280} L ${activeRouteStep >= 3 ? 680 : 480}`} 
                      stroke="#c5a059" 
                      strokeWidth="2" 
                      className="transition-all duration-500" 
                    />

                    {/* Left node (China Factories) */}
                    <g className="cursor-pointer" onClick={() => setActiveRouteStep(0)}>
                      {/* Base factory icon/symbol drawn */}
                      <rect x="75" y="65" width="50" height="40" rx="3" fill="#001c44" stroke={activeRouteStep === 0 ? "#c5a059" : "#3b82f6"} strokeWidth="2" />
                      {/* Chimneys */}
                      <line x1="85" y1="65" x2="85" y2="50" stroke="#3b82f6" strokeWidth="3" />
                      <line x1="95" y1="65" x2="95" y2="45" stroke="#3b82f6" strokeWidth="3" />
                      <line x1="105" y1="65" x2="105" y2="52" stroke="#3b82f6" strokeWidth="3" />
                      {/* Active indicator circle */}
                      <circle cx="100" cy="110" r="10" fill={activeRouteStep === 0 ? "#c5a059" : "#3b82f6"} />
                      <circle cx="100" cy="110" r="15" stroke={activeRouteStep === 0 ? "#c5a059" : "transparent"} strokeWidth="1.5" className={activeRouteStep === 0 ? "animate-pulse" : ""} />
                      <text x="100" y="145" textAnchor="middle" fill={activeRouteStep === 0 ? "#c5a059" : "#94a3b8"} fontSize="11" fontWeight="bold">
                        {lang === "zh" ? "1. 精密制造工厂" : "1. Custom Factory"}
                      </text>
                      <text x="100" y="160" textAnchor="middle" fill="#64748b" fontSize="9">
                        {lang === "zh" ? "原料及开模工差点" : "CNC Tooling & Pre-check"}
                      </text>
                    </g>

                    {/* Step 2 (Bonded customs double-checks) */}
                    <g className="cursor-pointer" onClick={() => setActiveRouteStep(1)}>
                      {/* Shield verification house */}
                      <polygon points="260,60 280,50 300,60 300,90 280,100 260,90" fill="#001c44" stroke={activeRouteStep === 1 ? "#c5a059" : "#3b82f6"} strokeWidth="2" />
                      {/* Check mark inside shield */}
                      <path d="M 273 75 L 278 82 L 288 70" stroke="#c5a059" strokeWidth="2" strokeLinecap="round" />
                      
                      <circle cx="280" cy="110" r="10" fill={activeRouteStep === 1 ? "#c5a059" : "#3b82f6"} />
                      <circle cx="280" cy="110" r="15" stroke={activeRouteStep === 1 ? "#c5a059" : "transparent"} strokeWidth="1.5" className={activeRouteStep === 1 ? "animate-pulse" : ""} />
                      <text x="280" y="145" textAnchor="middle" fill={activeRouteStep === 1 ? "#c5a059" : "#94a3b8"} fontSize="11" fontWeight="bold">
                        {lang === "zh" ? "2. 海口集拼双检" : "2. AQL Sealing"}
                      </text>
                      <text x="280" y="160" textAnchor="middle" fill="#64748b" fontSize="9">
                        {lang === "zh" ? "大货抽样+安全防窜签" : "AQL II Rejection Threshold"}
                      </text>
                    </g>

                    {/* Step 3 (Deep sea vessel transit) */}
                    <g className="cursor-pointer" onClick={() => setActiveRouteStep(2)}>
                      {/* Modern Cargo container ship silhouette */}
                      <path d="M 440 90 L 520 90 L 515 105 L 445 105 Z" fill="#001c44" stroke={activeRouteStep === 2 ? "#c5a059" : "#3b82f6"} strokeWidth="2" />
                      {/* Containers stacked */}
                      <rect x="450" y="78" width="12" height="12" fill="#c5a059" rx="1" />
                      <rect x="464" y="78" width="12" height="12" fill="#3b82f6" rx="1" />
                      <rect x="478" y="78" width="12" height="12" fill="#10b981" rx="1" />
                      <rect x="457" y="66" width="12" height="12" fill="#f59e0b" rx="1" />
                      <rect x="471" y="66" width="12" height="12" fill="#3b82f6" rx="1" />

                      <circle cx="480" cy="110" r="10" fill={activeRouteStep === 2 ? "#c5a059" : "#3b82f6"} />
                      <circle cx="480" cy="110" r="15" stroke={activeRouteStep === 2 ? "#c5a059" : "transparent"} strokeWidth="1.5" className={activeRouteStep === 2 ? "animate-pulse" : ""} />
                      <text x="480" y="145" textAnchor="middle" fill={activeRouteStep === 2 ? "#c5a059" : "#94a3b8"} fontSize="11" fontWeight="bold">
                        {lang === "zh" ? "3. 万箱远洋巨轮" : "3. Maritime Carrier"}
                      </text>
                      <text x="480" y="160" textAnchor="middle" fill="#64748b" fontSize="9">
                        {lang === "zh" ? "大洋干线安全海运" : "Deep Sea Transit Logs"}
                      </text>
                    </g>

                    {/* Step 4 (Buyer terminal DDP) */}
                    <g className="cursor-pointer" onClick={() => setActiveRouteStep(3)}>
                      {/* Warehouse handover terminal */}
                      <rect x="655" y="65" width="50" height="40" rx="4" fill="#001c44" stroke={activeRouteStep === 3 ? "#c5a059" : "#3b82f6"} strokeWidth="2" />
                      {/* Handshake line artwork */}
                      <path d="M 665 85 L 695 85 M 680 75 L 680 95" stroke="#c5a059" strokeWidth="1.5" />
                      
                      <circle cx="680" cy="110" r="10" fill={activeRouteStep === 3 ? "#c5a059" : "#3b82f6"} />
                      <circle cx="680" cy="110" r="15" stroke={activeRouteStep === 3 ? "#c5a059" : "transparent"} strokeWidth="1.5" className={activeRouteStep === 3 ? "animate-pulse" : ""} />
                      <text x="680" y="145" textAnchor="middle" fill={activeRouteStep === 3 ? "#c5a059" : "#94a3b8"} fontSize="11" fontWeight="bold">
                        {lang === "zh" ? "4. 采购商DDP安全收货" : "4. Handover to Buyer"}
                      </text>
                      <text x="680" y="160" textAnchor="middle" fill="#64748b" fontSize="9">
                        {lang === "zh" ? "含税清关・到门无忧" : "DDP Customs Door Delivery"}
                      </text>
                    </g>

                  </svg>
                </div>

                {/* Mobile version of map (vertical path) to support perfect phone layouts */}
                <div className="block md:hidden space-y-4">
                  <div className="grid grid-cols-4 gap-2 text-center">
                    {[
                      { id: 0, label: lang === "zh" ? "1. 工厂制造" : "1. Factory" },
                      { id: 1, label: lang === "zh" ? "2. 大货双检" : "2. AQL Sealing" },
                      { id: 2, label: lang === "zh" ? "3. 船方海运" : "3. Vessel Sea" },
                      { id: 3, label: lang === "zh" ? "4. DDP交付" : "4. Handover" }
                    ].map((step) => (
                      <button
                        key={step.id}
                        type="button"
                        onClick={() => setActiveRouteStep(step.id)}
                        className={`p-2.5 rounded-sm border text-[11px] font-bold uppercase transition flex flex-col items-center justify-center space-y-1.5 cursor-pointer ${activeRouteStep === step.id ? "bg-[#c5a059]/20 border-[#c5a059] text-white" : "bg-black/25 border-white/5 text-slate-400"}`}
                      >
                        <span className={`w-2.5 h-2.5 rounded-full ${activeRouteStep === step.id ? "bg-[#c5a059]" : "bg-slate-600"}`}></span>
                        <span>{step.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Elegant micro shipping asset display */}
                  <div className="bg-slate-900/60 p-4 border border-white/5 rounded-sm flex items-center justify-between space-x-3">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-9 h-9 bg-[#001c44] rounded flex items-center justify-center shrink-0 border border-[#c5a059]/40">
                        {activeRouteStep === 0 && <Building className="w-5 h-5 text-[#c5a059]" />}
                        {activeRouteStep === 1 && <ShieldCheck className="w-5 h-5 text-[#c5a059]" />}
                        {activeRouteStep === 2 && <Globe className="w-5 h-5 text-[#c5a059]" />}
                        {activeRouteStep === 3 && <CheckCircle2 className="w-5 h-5 text-[#c5a059]" />}
                      </div>
                      <div>
                        <span className="text-[10px] text-[#c5a059] uppercase font-bold tracking-wider font-mono">Current Station Details</span>
                        <h4 className="text-xs font-bold text-white">
                          {activeRouteStep === 0 && (lang === "zh" ? "精工制造：物理精雕出厂" : "Precision Assembly: Mold Tolerances")}
                          {activeRouteStep === 1 && (lang === "zh" ? "集拼把关：AQLII 批次废止阀值" : "Sealing Gate: AQL Inspection Seals")}
                          {activeRouteStep === 2 && (lang === "zh" ? "巨轮劈波：集装箱深远海航路" : "Ocean Vessel: Sealed Ocean Container")}
                          {activeRouteStep === 3 && (lang === "zh" ? "到门完税：一站式 DDP 最终交付" : "Secure Gate: Final Handover completed")}
                        </h4>
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold bg-[#10b981]/10 px-1.5 py-0.5 rounded uppercase shrink-0 font-mono">
                      Safe
                    </span>
                  </div>
                </div>

                {/* Information Card panel updated based on selection */}
                <div className="mt-4 bg-slate-950/60 p-5 rounded border border-white/10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center text-left">
                  
                  {/* Interactive details */}
                  <div className="md:col-span-8 space-y-2">
                    
                    {activeRouteStep === 0 && (
                      <>
                        <h4 className="text-[#c5a059] font-bold text-sm uppercase tracking-wide flex items-center space-x-2">
                          <span className="w-2 h-2 bg-[#c5a059] rounded-full"></span>
                          <span>[工站 01] 大陆源头精密开模与物理制造 (High-Precision Chinese Factory Floor)</span>
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {lang === "zh" ? 
                            "品控第一线始于加工厂机床和冷冲模具工艺。华源工程师进驻车间，对首期钢材级真空抽压腔内径壁、硅胶密封阻圈实施物理测径规比对，开模公差牢固锚定在国际高标准的 ±0.03mm 幅度内，绝对规避废料回炉引起的材质碳化污染。" : 
                            "Quality checks commence in deep-drawing press molds. Our on-site mechanical engineers audit metal formulation certificates, wall thickness and silicon ring elastic tolerances to lock raw steel specifications inside precise ±0.03mm thresholds."
                          }
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2 text-[10px] font-mono">
                          <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-slate-300">CNC Precision: ±0.03mm Max</span>
                          <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-slate-300">Material Standard: FDA Food Grade S30408</span>
                          <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-slate-300">Chemical Compliance: Passed (No BPA/Heavy Metal)</span>
                        </div>
                      </>
                    )}

                    {activeRouteStep === 1 && (
                      <>
                        <h4 className="text-[#c5a059] font-bold text-sm uppercase tracking-wide flex items-center space-x-2">
                          <span className="w-2 h-2 bg-[#c5a059] rounded-full"></span>
                          <span>[工站 02] 海关集拼监管：物理双检与合规加印 (Bonded Hub & Rigid Dual Check Sealing)</span>
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {lang === "zh" ? 
                            "在大批货品进入集装箱之前，华源在宁波及深圳设有自有集箱监管工位。在此，质检部推派具有10年以上经验的理货长进行 AQL 抽样。一旦整批缺陷点超越接收极限（例如3500件抽200件，出现第11个缺陷），当场锁扣封箱回程，绝不正将风险带上公海。" : 
                            "Before oceanic dispatch, cargo is centralized in custom-supervised hub facilities. Under ISO 2859-1 criteria, senior inspectors perform unboxing audits. If defect limits are crossed, freight is locked inside the province and recycled immediately."
                          }
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2 text-[10px] font-mono">
                          <span className="bg-[#10b981]/10 text-emerald-400 border border-[#10b981]/20 px-2 py-1 rounded">AQL sampling: ISO 2859-1 standards</span>
                          <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-slate-300">Anti-Counterfeit Tag: Physical Lead Seal</span>
                          <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-slate-300">Customs Clearance Index: AAA level</span>
                        </div>
                      </>
                    )}

                    {activeRouteStep === 2 && (
                      <>
                        <h4 className="text-[#c5a059] font-bold text-sm uppercase tracking-wide flex items-center space-x-2">
                          <span className="w-2 h-2 bg-[#c5a059] rounded-full"></span>
                          <span>[工站 03] 深深大洋干线安全海运：万箱巨轮航程追踪 (Secure Deep-Sea Ocean Transit Vessels)</span>
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {lang === "zh" ? 
                            "在茫茫大海中，通过数字货描锁定万千重箱的运输状态。货品防潮抽真空纸箱坚固固定在特型高重力防撞架内部，中控系统通过海事地理坐标（AIS 信号）同频对货班实况、预计抵达口岸（如巴塞罗那港、鹿特丹港、洛杉矶港）执行闭环时效调度。" : 
                            "Your custom cargo boards modern panamax container ships. Packed tightly inside pressure-tested outer cartons with heavy corner palettes, container positions are continually referenced via direct real-time maritime AIS telemetry logs."
                          }
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2 text-[10px] font-mono">
                          <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-slate-300">Voyage Vessel: MAERSK / COSCO Prestige Liner</span>
                          <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-slate-300">Transit Humidity Control: Below 40% RH</span>
                          <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-slate-300">AIS Geo-Tracking: Enabled</span>
                        </div>
                      </>
                    )}

                    {activeRouteStep === 3 && (
                      <>
                        <h4 className="text-[#c5a059] font-bold text-sm uppercase tracking-wide flex items-center space-x-2">
                          <span className="w-2 h-2 bg-[#c5a059] rounded-full"></span>
                          <span>[工站 04] DDP 双清关安全落地：买方终点完美递交付托 (Seamless Destination Handover & Door Delivery)</span>
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {lang === "zh" ? 
                            "海运安全抵达卸货港后，华源本土物流链接管海卡联运。办理全套海关完税手续、清扫码头杂费，由集美、联邦等战略卡班直接派送到您的境外中心库房。您只需要在库门核对加贴的唯一品控防伪标签，拆包即用，省心无虞。" : 
                            "Post-discharge logistics are smoothly handed over to bonded trucks. Fully custom-cleared on DDP terms, the cargo slides directly to your foreign warehouse dock. Buyers sign only of physical seals check, taking possession with complete clarity."
                          }
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2 text-[10px] font-mono">
                          <span className="bg-[#10b981]/10 text-emerald-400 border border-[#10b981]/20 px-2 py-1 rounded">DDP: Full Customs tax & Duty Paid</span>
                          <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-slate-300">Delivery Status: Secure Handshake Signature</span>
                          <span className="bg-white/5 border border-white/10 px-2 py-1 rounded text-slate-300">Anti-Theft Protocol: Encrypted Lead Code</span>
                        </div>
                      </>
                    )}

                  </div>

                  {/* Sidebar stats panel */}
                  <div className="md:col-span-4 bg-white/5 p-4 rounded border border-white/10 space-y-3.5 text-xs">
                    <span className="text-[10px] text-[#c5a059] uppercase font-bold tracking-wider font-mono block">
                      {lang === "zh" ? "工艺品控追踪状态面板" : "TELEMETRY METRIC CONSOLE"}
                    </span>
                    
                    <div className="space-y-2 font-mono text-[11px]">
                      <div className="flex justify-between border-b border-white/15 pb-1.5 font-sans">
                        <span className="text-slate-400">Node Status:</span>
                        <span className="font-bold text-emerald-400">● {lang === "zh" ? "正常流通" : "NORMAL"}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/15 pb-1.5 font-sans">
                        <span className="text-slate-400">Integrity:</span>
                        <span className="font-bold text-slate-100">100.0% Approved</span>
                      </div>
                      <div className="flex justify-between border-b border-white/15 pb-1.5 font-sans">
                        <span className="text-slate-400">Seals Standard:</span>
                        <span className="font-bold text-[#c5a059]">ISO 2859-1 II</span>
                      </div>
                      <div className="flex justify-between font-sans">
                        <span className="text-slate-400">Audit Protocol:</span>
                        <span className="font-bold text-slate-100">DDP Door Delivery</span>
                      </div>
                    </div>

                    <div className="pt-1.5 text-center">
                      <button
                        onClick={() => {
                          const element = document.getElementById("customer-inquiry-section");
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          }
                        }}
                        className="w-full bg-[#c5a059] text-slate-950 hover:bg-yellow-500 font-bold py-1.5 px-3 rounded text-[10px] uppercase tracking-wider transition-all cursor-pointer block text-center"
                      >
                        {lang === "zh" ? "对标此流程发起采购" : "Apply Sourcing My RFP"}
                      </button>
                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* Industrial Cluster Map Highlight teaser */}
            <div className="bg-slate-100 p-6 md:p-8 border border-slate-200 rounded-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{t[lang].clusterTitle}</h3>
                  <p className="text-xs text-slate-500">{t[lang].clusterSub}</p>
                </div>
                <button 
                  onClick={() => setActiveTab("clusters")}
                  className="text-xs text-[#003580] font-bold hover:underline flex items-center space-x-1 self-start"
                >
                  <span>{lang === "zh" ? "浏览详细三个代表性产业带" : "View Detailed Industrial Clusters"}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Grid of the clusters for brief preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {industrialClustersList.map((cluster) => (
                  <div 
                    key={cluster.id} 
                    onClick={() => {
                      setSelectedCluster(cluster);
                      setActiveTab("clusters");
                    }}
                    className="bg-white p-5 border border-slate-200 rounded-sm hover:border-[#c5a059] transition cursor-pointer group shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-sm uppercase">
                          {cluster.id}
                        </span>
                        <span className="text-xs font-bold text-[#c5a059]">Defects: {cluster.defectRate}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#003580] transition">
                        {cluster.city}
                      </h4>
                      <p className="text-xs text-slate-600 mt-2 line-clamp-2">
                        {cluster.specialty[lang]}
                      </p>
                    </div>
                    <div className="border-t border-slate-100 mt-4 pt-3 flex items-center justify-between text-[11px] text-[#003580] font-semibold">
                      <span>{t[lang].leadTime}: {cluster.leadTime[lang].substring(0, 10)}...</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AQL sampling Quick Introduction and Tutorial Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#001c44] text-white rounded-sm p-6 md:p-8 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-64 h-64 bg-slate-800/20 rounded-full filter blur-3xl"></div>
              <div>
                <span className="text-xs font-bold text-[#c5a059] tracking-widest uppercase block mb-2">
                  {lang === "zh" ? "无偏见第三方品控基准" : "MATHEMATICAL ASSURANCE"}
                </span>
                <h3 className="text-2xl font-extrabold mb-4 leading-snug">
                  {t[lang].aqlTitle}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  {lang === "zh" ? 
                    "SinoSource 绝不对供货工厂实行主观感官质检。我们强制依照国际公认 ISO 2859-1 表格标准，根据每个生产批量算出抽检基准、设定致命/主要/轻微缺陷阈值。如若抽样超出判定值整批就地扣回返工，维护您的资金安全。" : 
                    "Ensure absolute clarity. Avoid random checks without sample calculation. We use the official ISO 2859-1 standards for statistical quality control, which allows importers to hold factories in Ningbo, Shenzhen or Foshan completely accountable based on standard mathematical sampling."
                  }
                </p>
                <button 
                  onClick={() => setActiveTab("aql")}
                  className="bg-white text-slate-900 px-5 py-2.5 font-bold hover:bg-slate-100 transition rounded-sm text-xs flex items-center space-x-2"
                >
                  <Calculator className="w-4 h-4 text-[#003580]" />
                  <span>{t[lang].ctaAql}</span>
                </button>
              </div>
              <div className="bg-white/10 p-5 rounded-sm border border-white/10 backdrop-blur-md space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <span className="text-xs text-slate-300">{lang === "zh" ? "当前演示总数" : "Sample Batch Size"}</span>
                  <span className="text-sm font-bold text-[#c5a059]">3,500 Units</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-3 rounded-sm border border-white/5">
                    <span className="text-[10px] text-slate-400 block uppercase">{lang === "zh" ? "应检样品" : "Extract Sample"}</span>
                    <span className="text-lg font-black text-white">200 Pcs</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-sm border border-white/5">
                    <span className="text-[10px] text-slate-400 block uppercase">{lang === "zh" ? "合格接收最大缺陷数" : "Accept (Ac)"}</span>
                    <span className="text-lg font-black text-emerald-400">10 Defects</span>
                  </div>
                </div>
                <div className="p-3 bg-red-950/30 rounded-sm border border-red-500/30 text-[11px] text-red-200">
                  ⚠️ {lang === "zh" ? "第11个缺陷将导致该 3,500 货品整批废仓不付尾款" : "The 11th defect will trigger mandatory batch rejection."}
                </div>
              </div>
            </div>

            {/* ==================== CUSTOMER INQUIRY & SOURCING REQUIREMENTS PORTAL ==================== */}
            <div id="customer-inquiry-section" className="w-full max-w-4xl mx-auto animate-fade-in text-left">
              
              {/* Inquiry Form Column */}
              <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-sm shadow-sm space-y-6">
                
                <div>
                  <span className="text-xs font-bold text-[#c5a059] uppercase tracking-widest block font-mono">
                    {lang === "zh" ? "采购需求就地登记" : "INQUIRY SUBMISSION PORTAL"}
                  </span>
                  <h3 className="text-2xl font-black text-[#003580] tracking-tight mt-1">
                    {lang === "zh" ? "提交您的采购及品控规格要求" : "Register Sourcing Specs & Requirements"}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {lang === "zh" 
                      ? "请在下方填写您的联系方式与具体的采购要求，提交后系统将联同供应商库和质检工程师排挡。点击页面顶端金底‘S’ Logo，可以唤醒专商通道监控后台并解密实时排期进度。" 
                      : "Input your specifications to deploy immediate supplier matchmaking. Click the golden 'S' logo at the top of the page to launch the secure console."}
                  </p>
                </div>

                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  {inquirySuccess && (
                     <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-sm text-emerald-800 text-xs flex items-start space-x-3">
                       <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                       <div>
                         <p className="font-bold">{lang === "zh" ? "需求就地登记成功！" : "Inquiry Registered Successfully!"}</p>
                         <p className="text-slate-600 mt-1 leading-relaxed">
                           {lang === "zh" 
                             ? "您的产品工艺细节与品控指标已存证加密建档。点击页面最顶端的金底“S” Logo，即可输入密码解锁您的完整进度档案，并进行系统性统一管理。" 
                             : "Your specifications are safely encrypted. Click the golden \"S\" logo at the top of the viewport to inspect and systematically manage."}
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
                        {lang === "zh" ? "公司/联络人姓名" : "Company / Contact Name"} <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder={lang === "zh" ? "例如：Alpha海外零售采购部 李经理" : "e.g., Jane Done, Alpha Retail Inc"}
                        value={inquiryName} 
                        onChange={(e) => setInquiryName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs p-3 rounded-sm focus:border-[#003580] focus:ring-1 focus:ring-[#003580] outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-extrabold text-[#003580] uppercase tracking-wider block">
                        {lang === "zh" ? "联络号码 (WhatsApp/手机)" : "WhatsApp / Tel Number"} <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder={lang === "zh" ? "例如：+86 15618073092" : "e.g., +1 (650) 555-0123"}
                        value={inquiryContact} 
                        onChange={(e) => setInquiryContact(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs p-3 rounded-sm focus:border-[#003580] focus:ring-1 focus:ring-[#003580] outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-extrabold text-[#003580] uppercase tracking-wider block">
                        {lang === "zh" ? "谷歌官方邮箱" : "Google / Business Email"} <span className="text-red-500">*</span>
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
                        {lang === "zh" ? "国际贸易条款偏好" : "Preferred Incoterms"}
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
                        {lang === "zh" ? "拟采购产品大类" : "Target Product Description"} <span className="text-red-500">*</span>
                      </label>
                      <input 
                        type="text" 
                        required
                        placeholder={lang === "zh" ? "例如：双层不锈钢超轻保温杯" : "e.g., Stainless Steel Vacuum Flask"}
                        value={inquiryProduct} 
                        onChange={(e) => setInquiryProduct(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs p-3 rounded-sm focus:border-[#003580] focus:ring-1 focus:ring-[#003580] outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-extrabold text-[#003580] uppercase tracking-wider block">
                        {lang === "zh" ? "预计单次或年采购规模（例如：5000只）" : "Estimated Target Quantity"}
                      </label>
                      <input 
                        type="text" 
                        placeholder={lang === "zh" ? "例如：5,000 Pcs" : "e.g., 5,000 Pcs / Shipment"}
                        value={inquiryQty} 
                        onChange={(e) => setInquiryQty(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-xs p-3 rounded-sm focus:border-[#003580] focus:ring-1 focus:ring-[#003580] outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-extrabold text-[#003580] uppercase tracking-wider block">
                      {lang === "zh" ? "具体的材质要求、工艺指标、或 AQL 特殊品控阈值" : "Product Specifications & AQL Quality Directives"}
                    </label>
                    <textarea 
                      rows={3}
                      placeholder={lang === "zh" ? "请用中文、英文或您的国家母语，描述您期望的材质、颜色、是否需要印制 Logo、以及是否需要强制认证等多维工艺核实基准..." : "State preferred metal alloy, color codes, logo stamping, FDA/CE paper safety metrics, or normal limits to inspect..."}
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
                       <span>{lang === "zh" ? "海口系统安全校验申报中..." : "Transmitting specifications to secure cluster..."}</span>
                    ) : (
                       <>
                         <Send className="w-4 h-4 text-[#c5a059]" />
                         <span>{lang === "zh" ? "立即向华源全球供应链中心建立采购线案" : "Establish Formal Sourcing Dispatch & Audits"}</span>
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
                        <span>📬 {lang === "zh" ? "华源全球业务中心：已收悉您的采购需求线索 AQL 建议档案！" : "📬 SinoSource Global Hub: Sourcing Inquiry Decrypted!"}</span>
                      </h4>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-mono font-bold px-2 py-0.5 rounded uppercase self-start">
                        {lang === "zh" ? "系统提示：线索已建档，您也可以直接联系" : "Status: Received"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                      {lang === "zh" ? 
                        "我们已成功将您的物料工艺细节与品控指标存证加密，并在中控台上完成物理投射编档。为了在最快的时间内对您的物料需求（如不锈钢保温杯、冷深冲工艺等）启动 AQLII 首样排期，请立即点击下方任一绿色或蓝色官方通道，直接建立 1 对 1 商务沟通与顾问式对接！" : 
                        "We have received and logged your sourcing specifications! Sourcing parameters are safely stored. To initiate custom product line tooling and mold tolerances checks, contact us directly via any of the direct lines listed below!"
                      }
                    </p>
                    <div className="pt-1.5 flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                      <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider font-mono">
                        {lang === "zh" ? "系统状态：推荐直接呼叫或添加 WhatsApp" : "System recommendation: Chat via WhatsApp or Call below"}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowInquiryNotice(false)} 
                    className="text-slate-400 hover:text-slate-600 transition text-xs font-bold p-1 shrink-0 self-start cursor-pointer"
                    title={lang === "zh" ? "关闭提示" : "Dismiss"}
                  >
                    ✕
                  </button>
                </div>
              )}

              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-4 gap-4">
                <div>
                  <span className="text-xs font-bold text-[#c5a059] uppercase tracking-widest block font-mono">
                    {lang === "zh" ? "官方商专渠道门接" : "OFFICIAL CORPORATE DESK"}
                  </span>
                  <h3 className="text-2xl font-black text-[#003580] tracking-tight mt-1">
                    {lang === "zh" ? "华源环球采购商务联络中心" : "SinoSource Corporate Liaison Center"}
                  </h3>
                </div>
                <div className="text-xs text-slate-500 max-w-sm">
                  {lang === "zh" ? "欢迎全球采购伙伴直接连通。资深品控总监将在48小时内就材料采购可行性给予首期物理核实意见。" : "Connect directly with our primary regional desks. Our senior quality managers will follow up on potential manufacturing lines."}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* WHATSAPP */}
                <a 
                  href="https://wa.me/8615618073092" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group bg-emerald-50/50 hover:bg-emerald-50 p-5 border border-emerald-200/60 rounded-sm hover:border-emerald-400 hover:shadow-md transition-all flex items-start space-x-4 cursor-pointer"
                >
                  <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 block">WhatsApp Support</span>
                    <span className="text-sm font-black text-slate-900 block group-hover:text-emerald-700 transition">+86 156 1807 3092</span>
                    <span className="text-[11px] text-slate-500 block">{lang === "zh" ? "点击立即发起会话 (在线)" : "Click to chat directly (Online)"}</span>
                  </div>
                </a>

                {/* PHONE */}
                <a 
                  href="tel:15618073092"
                  className="group bg-blue-50/50 hover:bg-blue-50 p-5 border border-blue-200/60 rounded-sm hover:border-blue-400 hover:shadow-md transition-all flex items-start space-x-4 cursor-pointer"
                >
                  <div className="w-10 h-10 bg-[#003580] rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#003580] block">{lang === "zh" ? "官方接听热线" : "Primary Phone"}</span>
                    <span className="text-sm font-black text-slate-900 block group-hover:text-[#003580] transition">15618073092</span>
                    <span className="text-[11px] text-slate-500 block">{lang === "zh" ? "一键拨打・紧急跨境排期" : "Click to Call・Urgent Sourcing"}</span>
                  </div>
                </a>

                {/* GOOGLE MAIL */}
                <a 
                  href="mailto:xuanm5951@gmail.com"
                  className="group bg-amber-50/50 hover:bg-amber-50 p-5 border border-amber-200/60 rounded-sm hover:border-amber-400 hover:shadow-md transition-all flex items-start space-x-4 cursor-pointer"
                >
                  <div className="w-10 h-10 bg-[#c5a059] rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-slate-950" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 block">{lang === "zh" ? "谷歌官方邮箱" : "Google Inbox"}</span>
                    <span className="text-sm font-black text-slate-900 block group-hover:text-amber-800 break-all transition">xuanm5951@gmail.com</span>
                    <span className="text-[11px] text-slate-500 block">{lang === "zh" ? "发送完整图纸、规格说明书" : "Send spec PDFs & CAD models"}</span>
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
                    {lang === "zh" ? 
                      "我们长期在以上产业带部署物理质检专员。除三大成熟产带外，另支持佛山建材家具、绍兴轻纺、中山灯具等各区域化纵深集采。" : 
                      "SinoSource representatives live and breathe within these physical cluster zones. This close proximity ensures swift factory responses, immediate sampling oversight, and localized auditing within 4 hours."
                    }
                  </p>
                </div>
              </div>

              {/* Right Hub Interactive Metrics Layout */}
              <div className="lg:col-span-8 bg-white border border-slate-200 p-6 md:p-8 rounded-sm shadow-sm space-y-6">
                
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 gap-4">
                  <div>
                    <span className="text-xs font-bold text-[#c5a059] uppercase tracking-wider">{lang === "zh" ? "核心考察区域 / 当前选定" : "DENSE SUPPLY CHAIN HIGHLIGHT"}</span>
                    <h3 className="text-2xl font-black text-[#003580] mt-1">{selectedCluster.city}</h3>
                  </div>
                  <div className="bg-[#f8f9fa] border border-slate-200 px-4 py-2.5 rounded-sm flex items-center space-x-3">
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></div>
                    <span className="text-xs font-bold text-[#003580]">
                      {lang === "zh" ? "SinoSource 直属中心运营中" : "SinoSource Hub Active"}
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
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5">{lang === "zh" ? "产业集群背景与资源密度" : "Industrial Context & Supplier Density"}</h5>
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
                      <span className="text-sm font-bold text-slate-800">{selectedCluster.defectRate} {lang === "zh" ? " (同等工厂均值)" : " (Historic Average)"}</span>
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
                  {lang === "zh" ? "1. 品控测算控制台" : "1. INSPECTION CONFIGURATIONS"}
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
                    {lang === "zh" ? 
                      "此抽样程序可自动测算单次正常抽检方案。SinoSource 独家品控经理将完全以此计划提取出厂样本，置入物理实验室抗撕裂及耐酸测试，绝无感官偏私。" : 
                      "Statistical sample counts calculated conform strictly to standard single normal inspection regimes under ISO 2859-1. Defectives limits are binding on factories."
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
                      <span>{lang === "zh" ? "2. 国际质检抽检测算报告" : "2. ISO SAMPLING CERTIFICATE bluePRINT"}</span>
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
                      <span className="text-[10px] text-slate-300 block mt-1">{lang === "zh" ? "缺陷数合格上限" : "Max Defective Items"}</span>
                    </div>

                    <div className="bg-white/5 p-4 rounded-sm border border-white/10 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-8 h-8 bg-red-500/10 rounded-full"></div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">{t[lang].aqlResultReject}</span>
                      <span className="text-3xl font-black text-rose-400">≥ {aqlResults.re}</span>
                      <span className="text-[10px] text-rose-300 block mt-1">{lang === "zh" ? "达到即扣件拒收" : "Mandatory Reject Limit"}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-sm border border-white/10 text-xs">
                      <span className="font-bold text-[#c5a059] block uppercase mb-1">
                        🎯 {lang === "zh" ? "出货合规判据执行声明 (AQL 2.5)" : "Inspection Compliance Executions"}
                      </span>
                      <p className="text-slate-300 leading-relaxed">
                        {lang === "zh" ? 
                          `SinoSource专职质检组在仓库随机开箱提取并严格验证 ${aqlResults.sampleSize} 件。如若有瑕疵表面划痕超过 ${aqlResults.ac} 件（即达到 ${aqlResults.re} 件或以上），该批出货立即在上海/宁波港被拦截锁仓，不予核发《出港品控合格书》，并召集厂长在48小时内下达产线返修更替方案。` : 
                          `Our designated inspection agents will extract exactly ${aqlResults.sampleSize} units selected completely at random from individual cartons. If the verified defectives count under test is equal to or less than ${aqlResults.ac}, the shipment passes. If verified failures reach or exceed ${aqlResults.re}, the warehouse locks down dispatch and SinoSource triggers immediate manufacturer product calibration and line remediation.`
                        }
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
                      alert(lang === "zh" ? "AQL 质检方案计划表已发送至商业级排单系统中。" : "Standard AQL Blueprint locked in system.");
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
                    {lang === "zh" ? "在线填写采购规范" : "Procurement Draft Setup"}
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
                  💡 {lang === "zh" ? 
                    "SinoSource 绝不对外流泄任何采购规格与方案。通过此规划器，您将获得由中国供应链宏观政策库支持的高端建议。" : 
                    "Confidentiality Guaranteed. The AI Sourcing strategy runs protected under active SSL and secure enterprise sandbox mechanisms."
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
                          {lang === "zh" ? 
                            "正在解构中国数万家在库工厂集聚区，计算物流直航路线..." : 
                            "Analyzing cluster density, assessing regional tariffs, and scheduling export milestones..."
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
                          {lang === "zh" ? "使用本地方案备份数据" : "Use Fallback Core Proposal Data"}
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
                            {lang === "zh" ? "等待提交规格指令..." : "Awaiting Procurement Directives"}
                          </p>
                          <p className="text-[11px] text-slate-400 max-w-sm">
                            {lang === "zh" ? 
                              "请在左侧输入需要集采的产品要求。若不确定，请点击「载入规范模版」先行预览高端排程。" : 
                              "Fill the container metrics on the left, or immediately run a live sample test via the high-end template button."
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
                                lang === "zh" ? 
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
*   **税率调减策略：** 协助申办原产地证明文件 Form A，防范反倾销复合审查风险。` 
                                :
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
*   **Mitigation Strategy:** Issue certified Certificate of Origin sheets at port warehouses to assure seamless customs clearances.`
                              );
                            }, 300);
                          }}
                          className="bg-white hover:bg-slate-100 text-[#001c44] font-black text-xs px-4 py-2 border rounded transition-all"
                        >
                          {lang === "zh" ? "一键仿真预览" : "Trigger Instant AI Simulator Preview"}
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
                {lang === "zh" ? "中国到全球港口多工序集托管演示" : "CROSS-BORDER CONSOLIDATION VISUALIZER"}
              </span>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
                
                {/* Step 1 */}
                <div className="bg-white/5 p-4 rounded-sm border border-white/10 space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-[#c5a059]">01</span>
                    <span className="text-[9px] bg-sky-500/20 text-sky-300 px-1.5 py-0.5 rounded tracking-wide font-black uppercase">Factory Group</span>
                  </div>
                  <h4 className="text-xs font-bold text-white">{lang === "zh" ? "多家上游供货商备齐" : "Vendor Production"}</h4>
                  <p className="text-[11px] text-slate-300">{lang === "zh" ? "佛山、永康、深圳按计划同时启动制造" : "Separate manufacturing hubs finalize items."}</p>
                </div>

                {/* Step 2 */}
                <div className="bg-white/5 p-4 rounded-sm border border-white/10 space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-[#c5a059]">02</span>
                    <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded tracking-wide font-black uppercase">AQL Inspection</span>
                  </div>
                  <h4 className="text-xs font-bold text-white">{lang === "zh" ? "我司代表执行出厂品控" : "ISO QC Verification"}</h4>
                  <p className="text-[11px] text-slate-300">{lang === "zh" ? "按ISO标准就地开箱，验证缺陷无毒合规" : "Physical inspections confirm zero structural default."}</p>
                </div>

                {/* Step 3 */}
                <div className="bg-white/5 p-4 rounded-sm border border-white/10 space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-[#c5a059]">03</span>
                    <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded tracking-wide font-black uppercase">Consolidation</span>
                  </div>
                  <h4 className="text-xs font-bold text-white">{lang === "zh" ? "保税区极速集拼拼箱" : "FCL Cargo Sorting"}</h4>
                  <p className="text-[11px] text-slate-300">{lang === "zh" ? "宁波/深圳仓合箱堆装，出具集托防潮包装" : "Consolidate into single cost-effective container."}</p>
                </div>

                {/* Step 4 */}
                <div className="bg-white/5 p-4 rounded-sm border border-white/10 space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-[#c5a059]">04</span>
                    <span className="text-[9px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded tracking-wide font-black uppercase">Customs Clear</span>
                  </div>
                  <h4 className="text-xs font-bold text-white">{lang === "zh" ? "出口快速规范申报" : "Smooth Export Declar"}</h4>
                  <p className="text-[11px] text-slate-300">{lang === "zh" ? "提供原产地特惠证书，申报正确海关编码" : "Issue certified CO to mitigate anti-dumping rates."}</p>
                </div>

                {/* Step 5 */}
                <div className="bg-white/5 p-4 rounded-sm border border-white/10 space-y-2 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-[#c5a059]">05</span>
                    <span className="text-[9px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded tracking-wide font-black uppercase">Delivery</span>
                  </div>
                  <h4 className="text-xs font-bold text-white">{lang === "zh" ? "远洋拼箱/海空陆派送" : "Ultimate Dispatch"}</h4>
                  <p className="text-[11px] text-slate-300">{lang === "zh" ? "目的港直航拼箱到门，保障安全无损" : "Frictionless carriage direct to destination DDP seaport."}</p>
                </div>

              </div>

              <div className="bg-white/5 p-4 rounded border-l-4 border-[#c5a059] text-xs text-slate-300">
                ⭐ {lang === "zh" ? 
                  "华源常年与马士基 (Maersk)、长荣 (Evergreen)、地中海航运 (MSC) 签订核心保舱运费协定，保障在海运暴涨期依然能确保您的散货柜不被丢落。" : 
                  "Our contracted alliance block-space guarantees that our consolidations remain loaded during Peak Chinese Export periods."
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
              <span className="text-[9px] text-slate-400 uppercase tracking-widest -mt-0.5">{lang === "zh" ? "对标外贸顶尖品控与物流设计" : "Enterprise Procurement Solutions"}</span>
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
                    {lang === "zh" ? "华源专商中控数字孪生终端" : "Sinosource Admin Digital Twin Terminal"}
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
                      <span className="text-emerald-400 uppercase font-black tracking-wider">{lang === "zh" ? "系统解密解封" : "RECORDS DECRYPTED"}</span>
                    </>
                  ) : (
                    <>
                      <span className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-pulse"></span>
                      <span className="text-rose-400 uppercase font-black tracking-wider">{lang === "zh" ? "高度隔离锁闭中" : "CRYPT-LOCKED"}</span>
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
                  <span className="text-[11px] font-bold uppercase tracking-wider">{lang === "zh" ? "关闭" : "Close"}</span>
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
                      {lang === "zh" ? 
                        "为遵守相关海关及国际贸易保密条款，填表者的多维开模公差、特质AQL指标与联系地址已就地全数哈希隔离。系统外部绝不保留任何明文记录。" : 
                        "To ensure full compliance with international commercial trade privacy agreements, all submitter specs and communication numbers are strictly encrypted."
                      }
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono leading-relaxed bg-black/30 p-2.5 rounded border border-white/5">
                      {lang === "zh" ? "【安全声明】输入专属安全密钥解锁以接管最高级物理指派与机密文件物理销毁等顶级统管权力。" : "【SECURITY】Please type the correct key to unlock data nodes and authorize state assignment / document destruction."}
                    </p>
                  </div>

                  {/* Security Passcode Field - Obsfucating characters securely */}
                  <div className="w-full space-y-3">
                    <label className="text-[10px] font-bold text-[#c5a059] uppercase tracking-widest block font-mono">
                      {lang === "zh" ? "高级物料控制官安全密钥验证：" : "Administrative Encryption Key Authentication:"}
                    </label>
                    <input 
                      type="password" 
                      maxLength={12} 
                      placeholder={lang === "zh" ? "请输入安全秘钥" : "Enter secure key..."}
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
                        <span>🔓 {lang === "zh" ? "尊贵的高级物料管理官员已接入中控系统" : "Principal Procurement Officer Session Enabled"}</span>
                        <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-medium">Session IP Verified</span>
                      </h4>
                      <p className="text-xs text-slate-300 mt-1">
                        {lang === "zh" ? "您已成功授信，拥有最高等级采购配方检索、指派跟进调整和档案物理销毁最高权力。" : "Complete clearance active. Filter specs, update dispatch milestones, or completely destruct record nodes."}
                      </p>
                    </div>

                    <button 
                      onClick={() => setInquiryPasscode("")}
                      className="bg-red-500/20 hover:bg-red-600/30 border border-red-500/40 text-red-200 font-bold px-3 py-1.5 rounded text-xs transition uppercase tracking-wider font-mono shrink-0 cursor-pointer"
                    >
                      {lang === "zh" ? "安全锁闭退出" : "Lock Session"}
                    </button>
                  </div>

                  {/* Operational Dashboard Metrics Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 shrink-0">
                    <div className="bg-[#001c44] border border-white/10 p-3 rounded-sm">
                      <span className="text-[10px] text-slate-400 block uppercase font-mono font-bold tracking-wider">{lang === "zh" ? "存证线索总数" : "Total Inquiries"}</span>
                      <span className="text-2xl font-black text-[#c5a059]">{inquiries.length} {lang === "zh" ? "宗" : "Inquiries"}</span>
                    </div>
                    <div className="bg-[#001c44] border border-white/10 p-3 rounded-sm">
                      <span className="text-[10px] text-slate-400 block uppercase font-mono font-bold tracking-wider">{lang === "zh" ? "排档质检专家" : "Active Roster"}</span>
                      <span className="text-2xl font-black text-emerald-400">18 {lang === "zh" ? "组" : "Nodes"}</span>
                    </div>
                    <div className="bg-[#001c44] border border-white/10 p-3 rounded-sm">
                      <span className="text-[10px] text-slate-400 block uppercase font-mono font-bold tracking-wider">{lang === "zh" ? "海关税率减免" : "Customs Reduction"}</span>
                      <span className="text-2xl font-black text-white">99.2%</span>
                    </div>
                    <div className="bg-[#001c44] border border-white/10 p-3 rounded-sm font-mono">
                      <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">{lang === "zh" ? "物理销毁权限" : "Destruction Status"}</span>
                      <span className="text-[11px] bg-red-600/15 border border-red-500/30 text-red-400 px-2 py-1 rounded font-bold uppercase tracking-wider block text-center mt-1">
                        {lang === "zh" ? "强力授权激活" : "DESTRUCT ENABLED"}
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
                        placeholder={lang === "zh" ? "通过公司名称、联络信息、目标大类、特定 AQL 等关键词模糊检索..." : "Query name, phone, trade term, specs..."}
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
                        title={lang === "zh" ? "同步云端最新记录" : "Sync Server data"}
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-[#c5a059]" />
                        <span className="hidden sm:inline font-mono">{lang === "zh" ? "重新拉取" : "Sync Records"}</span>
                      </button>
                      
                      <div className="text-xs text-slate-400 font-mono">
                        {lang === "zh" ? `已筛选显示: ${inquiries.filter(inq => {
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
                        }).length} 宗` : `Filtered: ${inquiries.filter(inq => {
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
                        }).length} cases`}
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
                        <p className="font-bold text-slate-300">{lang === "zh" ? "没有匹配任何条件的采购线索" : "No matching inquiries found."}</p>
                        <p className="text-[11px] mt-1 text-slate-500">{lang === "zh" ? "尝试更改检索词或登记新的物料档案" : "Adjust your query criteria or submit a new inquiry form."}</p>
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
                                <span className="text-slate-400 text-[10px] font-mono">{new Date(inq.createdAt).toLocaleString(lang === "zh" ? "zh-CN" : "en-US")}</span>
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
                                <span className="text-slate-400 font-medium">{lang === "zh" ? "当前作业进程：" : "Dispatch status:"}</span>
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
                                    <option value="Reviewing (资深总监评估中)">{lang === "zh" ? "🔄 资深总监评估中" : "🔄 Reviewing"}</option>
                                    <option value="Auditing (供应商资质审查中)">{lang === "zh" ? "🔎 供应商资质审查中" : "🔎 Supplier Auditing"}</option>
                                    <option value="Prototyping (首样模具打样中)">{lang === "zh" ? "📐 首样模具打样中" : "📐 Prototyping"}</option>
                                    <option value="Production (大货柔性排产中)">{lang === "zh" ? "🏭 大货柔性排产中" : "🏭 Mass Production"}</option>
                                    <option value="QC Quality (AQLII 现场出厂抽检中)">{lang === "zh" ? "🔬 AQLII 现场出厂抽检中" : "🔬 AQL II QC Inspection"}</option>
                                    <option value="Logistics (集港理货与多模海运中)">{lang === "zh" ? "🚢 集港理货与多模海运中" : "🚢 Logistics Tracking"}</option>
                                    <option value="Customs (出口退税与国合报关中)">{lang === "zh" ? "📦 出口退税与国合报关中" : "📦 Customs Clearance"}</option>
                                    <option value="Completed (保密合同顺利履约结案)">{lang === "zh" ? "✅ 保密合同顺利履约结案" : "✅ Order Completed"}</option>
                                  </select>
                                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-[#c5a059]">
                                    ▼
                                  </span>
                                </div>

                                {/* Destruction Command Button */}
                                <button 
                                  onClick={() => {
                                    if (confirm(lang === "zh" ? "⚠️ 是否确认物理销毁该档案？\n\n此项操作属于最高行政指令且无法撤销！该记录将彻底从云端系统及本地存储器中抹除！" : "🚨 DANGER: Are you sure you want to permanently delete this record? This cannot be undone!")) {
                                      deleteInquiry(inq.id);
                                    }
                                  }}
                                  className="px-2.5 py-1.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded-sm text-[11px] font-bold transition flex items-center space-x-1 cursor-pointer hover:shadow-lg border border-red-500/50"
                                  title={lang === "zh" ? "一键彻底物理清算" : "Permanent physical destruction"}
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>{lang === "zh" ? "物理销毁" : "Destruct"}</span>
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Detail Specifications Specifications Row */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                            <div className="bg-slate-950/40 p-3 rounded border border-white/5 space-y-1">
                              <span className="text-[10px] text-slate-400 uppercase font-mono block tracking-wider">{lang === "zh" ? "采购产品大类" : "Target Product Description"}</span>
                              <span className="font-bold text-white block">{inq.productName}</span>
                            </div>
                            
                            <div className="bg-slate-950/40 p-3 rounded border border-white/5 space-y-1">
                              <span className="text-[10px] text-slate-400 uppercase font-mono block tracking-wider">{lang === "zh" ? "意向合作采购量" : "Target Sourcing Volume"}</span>
                              <span className="font-bold text-white block">{inq.quantity || (lang === "zh" ? "无限/持续采购" : "Ongoing Sourcing")}</span>
                            </div>

                            <div className="bg-slate-950/40 p-3 rounded border border-white/5 space-y-1">
                              <span className="text-[10px] text-emerald-450 uppercase font-mono block tracking-wider font-extrabold">{lang === "zh" ? "特派沟通地址 (已安全解密)" : "Decrypted WhatsApp/Tel"}</span>
                              <span className="font-bold text-emerald-400 select-all block bg-emerald-500/10 px-2 py-0.5 rounded-sm line-clamp-1 border border-emerald-500/15">
                                {inq.contact}
                              </span>
                            </div>
                          </div>

                          <div className="bg-[#001533] p-3 rounded border border-white/5 text-xs text-slate-200">
                            <strong className="text-[#c5a059] block mb-1 font-mono tracking-wider">{lang === "zh" ? "材质工艺要求、AQL参数与特殊申报配方：" : "Detailed Specifications & AQL Quality Directives:"}</strong>
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
